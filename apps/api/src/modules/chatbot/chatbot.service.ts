import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LLM_ADAPTER, type LlmAdapter } from './llm/llm-adapter.interface';
import { detectLanguage, type SupportedLanguage } from './language';
import { retrieveKnowledge } from './knowledge-base';
import { buildSystemPrompt } from './prompt';

export interface ChatReply {
  conversationId: string;
  reply: string;
  language: SupportedLanguage;
  demoMode: boolean;
  escalated: boolean;
  ticketReference?: string;
  sources: string[];
}

const ESCALATION_TRIGGERS = [
  'speak to a human',
  'talk to a human',
  'human agent',
  'real person',
  'speak to someone',
  'talk to someone',
  'escalate',
];

@Injectable()
export class ChatbotService {
  private readonly logger = new Logger(ChatbotService.name);

  constructor(
    @Inject(LLM_ADAPTER) private readonly llm: LlmAdapter,
    private readonly prisma: PrismaService,
  ) {}

  async handleMessage(input: {
    conversationId?: string;
    message: string;
    userId?: string;
  }): Promise<ChatReply> {
    const language = detectLanguage(input.message);
    const conversationId = input.conversationId ?? (await this.createConversation(input.userId, language));

    await this.persistMessage(conversationId, 'CUSTOMER', input.message, language);

    const wantsHuman = ESCALATION_TRIGGERS.some((t) => input.message.toLowerCase().includes(t));
    const knowledge = retrieveKnowledge(input.message, 3);

    // Build model context. Retrieved documents are passed as clearly-delimited,
    // untrusted reference material to reduce prompt-injection risk.
    const history = await this.loadHistory(conversationId, 8);
    const systemPrompt = buildSystemPrompt({ language, knowledge });

    let reply: string;
    let demoMode = false;

    if (!this.llm.isConfigured) {
      demoMode = true;
      reply = this.demoReply(language, knowledge.length > 0, wantsHuman);
    } else {
      try {
        const completion = await this.llm.complete({
          messages: [
            { role: 'system', content: systemPrompt },
            ...history,
            { role: 'user', content: input.message },
          ],
          temperature: 0.3,
          maxTokens: 600,
          timeoutMs: 20_000,
        });
        reply = completion.content;
      } catch (error) {
        this.logger.warn(`Falling back to demo reply: ${(error as Error).message}`);
        demoMode = true;
        reply =
          "I'm sorry, I couldn't reach my knowledge service just now. I can still help with common questions, or I can ask a human agent to follow up. What would you like to do?";
      }
    }

    await this.persistMessage(conversationId, 'NOVA', reply, language);

    let ticketReference: string | undefined;
    if (wantsHuman) {
      ticketReference = await this.escalate(conversationId, input.message, input.userId);
    }

    return {
      conversationId,
      reply,
      language,
      demoMode,
      escalated: wantsHuman,
      ticketReference,
      sources: knowledge.map((k) => k.slug),
    };
  }

  private async createConversation(userId: string | undefined, language: SupportedLanguage) {
    const conversation = await this.prisma.conversation.create({
      data: { customerId: userId ?? null, language, status: 'ACTIVE' },
    });
    return conversation.id;
  }

  private async persistMessage(
    conversationId: string,
    sender: 'CUSTOMER' | 'NOVA' | 'AGENT' | 'SYSTEM',
    content: string,
    language: SupportedLanguage,
  ) {
    await this.prisma.conversationMessage.create({
      data: { conversationId, sender, content, language },
    });
  }

  private async loadHistory(conversationId: string, limit: number) {
    const messages = await this.prisma.conversationMessage.findMany({
      where: { conversationId, isInternal: false },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return messages
      .reverse()
      .filter((m) => m.sender === 'CUSTOMER' || m.sender === 'NOVA')
      .map((m) => ({
        role: (m.sender === 'CUSTOMER' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: m.content,
      }));
  }

  private async escalate(
    conversationId: string,
    message: string,
    userId: string | undefined,
  ): Promise<string | undefined> {
    // Only create a real ticket when we have an authenticated customer to own it.
    // Anonymous visitors keep the conversation marked as escalated for an agent.
    await this.prisma.conversation.update({
      where: { id: conversationId },
      data: { status: 'ESCALATED', summary: message.slice(0, 500) },
    });

    if (!userId) return undefined;

    const reference = `NVS-${Date.now().toString(36).toUpperCase()}`;
    const ticket = await this.prisma.ticket.create({
      data: {
        reference,
        customerId: userId,
        category: 'General',
        subject: 'Chat escalation',
        description: message.slice(0, 2000),
        priority: 'HIGH',
      },
    });
    return ticket.reference;
  }

  private demoReply(
    language: SupportedLanguage,
    hasKnowledge: boolean,
    wantsHuman: boolean,
  ): string {
    const intro =
      language === 'pcm'
        ? 'No wahala, I can help you check the next steps.'
        : "I'm here to help.";

    if (wantsHuman) {
      return `${intro} I can pass this to a human support agent. Could you confirm you'd like me to escalate this conversation? (Demo mode: no live model is connected yet, but I can still create a support ticket.)`;
    }
    if (hasKnowledge) {
      return `${intro} (Demo mode: no live AI model is connected yet, so I'm using our approved help topics.) Could you tell me a little more about what you need?`;
    }
    return `${intro} I don't have a verified answer for that yet, and I'd rather not guess. Would you like me to help with a common topic, or ask a human agent to follow up? (Demo mode.)`;
  }
}
