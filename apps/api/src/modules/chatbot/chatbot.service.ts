import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LLM_ADAPTER, type LlmAdapter } from './llm/llm-adapter.interface';
import { detectLanguage, type SupportedLanguage } from './language';
import { findBestKnowledge, retrieveKnowledge } from './knowledge-base';
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
  'agent',
  'representative',
  'human',
];

const GREETING_PATTERN =
  /^(hi|hello|hey|hiya|good (morning|afternoon|evening)|how far|kedu|bawo|sannu|ndewo)\b/i;

const THANKS_PATTERN = /(thank|thanks|daalu|dalu|nagode|na gode|ese|mo dupe|much appreciated)/i;

/** Short, natural acknowledgements per language. */
const GREETING: Record<SupportedLanguage, string> = {
  en: 'Hello! Welcome to Novus MFB. I am Nova, your virtual assistant.',
  pcm: 'How far! Welcome to Novus MFB. My name na Nova, your virtual assistant.',
  yo: 'Báwo ni! Káàbọ̀ sí Novus MFB. Èmi ni Nova, olùrànlọ́wọ́ rẹ.',
  ig: 'Ndeewo! Nnọọ na Novus MFB. Abụ m Nova, onye enyemaka gị.',
  ha: 'Sannu! Barka da zuwa Novus MFB. Ni ce Nova, mataimakiyar ku.',
};

const THANKS: Record<SupportedLanguage, string> = {
  en: "You're very welcome. Is there anything else I can help with?",
  pcm: 'No wahala at all. Anything else you want make I help you with?',
  yo: 'Kò tọ́pẹ́. Ṣé ohun mìíràn wà tí mo lè ràn yín lọ́wọ́?',
  ig: 'Ọ dị mma. Ọ dị ihe ọzọ m nwere ike inyere gị aka?',
  ha: 'Babu komai. Akwai wani abu da zan iya taimaka muku da shi?',
};

const HOW_CAN_I_HELP: Record<SupportedLanguage, string> = {
  en: 'How can I help you today?',
  pcm: 'How can I help you today?',
  yo: 'Báwo ni mo lè ràn yín lọ́wọ́ lónìí?',
  ig: 'Kedu ka m ga-enyere gị aka taa?',
  ha: 'Yaya zan taimaka muku a yau?',
};

const NO_MATCH: Record<SupportedLanguage, string> = {
  en: "I don't have a verified answer for that yet, and I would rather not guess. I can help with accounts, transfers, cards, savings, loans, security or contacting support — or I can ask a human agent to follow up.",
  pcm: 'I no get correct answer for that one yet, and I no want guess. I can help you with account, transfer, card, savings, loan, security or how to reach support — or I can ask human agent to follow up.',
  yo: 'Mi ò tíì ní ìdáhùn tí a fọwọ́sí fún un, mi ò sì fẹ́ díbọ́n. Mo lè ràn yín lọ́wọ́ lórí àkọsílẹ̀, ìgbéwọ́lé, káàdì, ìṣowó, ẹ̀bùn, ààbò tàbí bí a lè kan sí ẹ̀ka ìtọ́jú — tàbí kí n béèrè fún aṣojú ènìyàn.',
  ig: 'Enweghị m azịza a kwadoro maka nke ahụ, achọghị m ịkọ nkọ. Enwere m ike inyere gị aka gbasara akaụntụ, mbufe, kaadị, nchekwa ego, mgbazinye, nchekwa ma ọ bụ ịkpọtụrụ nkwado — ma ọ bụ m nwere ike ịjụ onye nnọchi anya mmadụ.',
  ha: "Ba ni da tabbataccen amsa kan hakan tukuna, kuma ba na son yin hasashe. Zan iya taimakawa kan asusu, musayar kudi, kati, ajiya, lamuni, tsaro ko tuntubar tallafi — ko kuma in nemi wakilin mutum ya bi diddigin.",
};

const ESCALATION_OFFER: Record<SupportedLanguage, string> = {
  en: 'I can flag this conversation for a human support agent. Would you like me to do that?',
  pcm: 'I can mark this conversation for human support agent. You want make I do am?',
  yo: 'Mo lè fi ìjíròrò yìí hàn fún aṣojú ìtọ́jú ènìyàn. Ṣé kí n ṣe bẹ́ẹ̀?',
  ig: 'Enwere m ike igosi mkparịta ụka a nye onye nnọchi anya mmadụ. Ị chọrọ ka m mee ya?',
  ha: 'Zan iya nuna wannan tattaunawa ga wakilin tallafi na mutum. Kuna so in yi hakan?',
};

@Injectable()
export class ChatbotService {
  private readonly logger = new Logger(ChatbotService.name);

  /**
   * The database is the primary store. If PostgreSQL is unreachable (for
   * example during local development before Phase 3 is unblocked) Nova keeps
   * working from an in-memory transcript, so the UI is demonstrable. Nothing is
   * ever written to localStorage and no fake records are invented: the moment
   * the database is available again, persistence resumes automatically.
   */
  private readonly memoryTranscripts = new Map<
    string,
    { role: 'user' | 'assistant'; content: string }[]
  >();
  private memorySequence = 0;
  private databaseUnavailable = false;

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
    const conversationId =
      input.conversationId ?? (await this.createConversation(input.userId, language));

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
      reply = this.demoReply(input.message, language, wantsHuman);
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
        reply = this.demoReply(input.message, language, wantsHuman);
      }
    }

    await this.persistMessage(conversationId, 'NOVA', reply, language);

    const ticketReference = wantsHuman
      ? await this.escalate(conversationId, input.message, input.userId)
      : undefined;

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

  /**
   * Answers directly from the approved knowledge base when no LLM is
   * configured. The previous version only ever asked a follow-up question,
   * which made demo mode feel broken.
   */
  private demoReply(message: string, language: SupportedLanguage, wantsHuman: boolean): string {
    const text = message.trim();

    if (GREETING_PATTERN.test(text) && text.split(/\s+/).length <= 5) {
      return `${GREETING[language]} ${HOW_CAN_I_HELP[language]}`;
    }

    if (THANKS_PATTERN.test(text) && text.split(/\s+/).length <= 6) {
      return THANKS[language];
    }

    const best = findBestKnowledge(message);

    if (!best) {
      return wantsHuman ? ESCALATION_OFFER[language] : NO_MATCH[language];
    }

    // When the visitor asks for a person, answer with the escalation content
    // only. Appending the generic follow-up used to repeat the offer twice.
    if (wantsHuman) return best.content;

    return `${best.content} Is there anything else you would like me to check, or would you prefer to speak to a human agent?`;
  }

  private async createConversation(userId: string | undefined, language: SupportedLanguage) {
    return this.withDatabase(
      async () => {
        const conversation = await this.prisma.conversation.create({
          data: { customerId: userId ?? null, language, status: 'ACTIVE' },
        });
        return conversation.id;
      },
      () => {
        const id = `mem-${++this.memorySequence}`;
        this.memoryTranscripts.set(id, []);
        return id;
      },
    );
  }

  private async persistMessage(
    conversationId: string,
    sender: 'CUSTOMER' | 'NOVA' | 'AGENT' | 'SYSTEM',
    content: string,
    language: SupportedLanguage,
  ) {
    await this.withDatabase(
      async () => {
        await this.prisma.conversationMessage.create({
          data: { conversationId, sender, content, language },
        });
      },
      () => {
        const transcript = this.memoryTranscripts.get(conversationId) ?? [];
        transcript.push({
          role: sender === 'CUSTOMER' ? 'user' : 'assistant',
          content,
        });
        // Keep memory bounded; this is a demo fallback, not a database.
        this.memoryTranscripts.set(conversationId, transcript.slice(-20));
      },
    );
  }

  private async loadHistory(conversationId: string, limit: number) {
    return this.withDatabase(
      async () => {
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
      },
      () => (this.memoryTranscripts.get(conversationId) ?? []).slice(-limit),
    );
  }

  private async escalate(
    conversationId: string,
    message: string,
    userId: string | undefined,
  ): Promise<string | undefined> {
    // Only create a real ticket when we have an authenticated customer AND a
    // database to store it in. Anonymous visitors keep the conversation marked
    // as escalated for an agent instead of being given a fake reference.
    const stored = await this.withDatabase(
      async () => {
        await this.prisma.conversation.update({
          where: { id: conversationId },
          data: { status: 'ESCALATED', summary: message.slice(0, 500) },
        });
        return true;
      },
      () => false,
    );

    if (!stored || !userId) return undefined;

    return this.withDatabase(
      async () => {
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
      },
      () => undefined,
    );
  }

  /**
   * Runs a database operation, falling back to the in-memory path when the
   * database cannot be reached. The failure is logged once, not on every
   * message, so a missing PostgreSQL instance does not flood the logs.
   *
   * Only genuine connectivity errors disable the database for the rest of the
   * process; a stale conversation id (record not found) simply uses the
   * fallback for that one call.
   */
  private async withDatabase<T>(
    operation: () => Promise<T>,
    fallback: () => T | Promise<T>,
  ): Promise<T> {
    if (this.databaseUnavailable) return fallback();

    try {
      return await operation();
    } catch (error) {
      if (this.isConnectionError(error)) {
        this.databaseUnavailable = true;
        this.logger.warn(
          `Database unavailable — Nova is answering from the approved knowledge base and keeping the transcript in memory. ${(error as Error).message}`,
        );
      } else {
        this.logger.debug(
          `Nova database operation fell back to memory: ${(error as Error).message}`,
        );
      }
      return fallback();
    }
  }

  private isConnectionError(error: unknown): boolean {
    const candidate = error as { code?: string; message?: string };
    if (candidate.code && ['P1001', 'P1002', 'P1008', 'P1017'].includes(candidate.code)) {
      return true;
    }
    const message = (candidate.message ?? '').toLowerCase();
    return (
      message.includes("can't reach database server") ||
      message.includes('connection refused') ||
      message.includes('econnrefused') ||
      message.includes('connection terminated') ||
      message.includes('timed out')
    );
  }
}
