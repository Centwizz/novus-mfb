import { Injectable, Logger } from '@nestjs/common';
import {
  LlmAdapter,
  LlmCompletionOptions,
  LlmCompletionResult,
} from './llm-adapter.interface';

/**
 * OpenAI-compatible chat completions adapter.
 *
 * Uses the Chat Completions HTTP API so the same adapter works against OpenAI or
 * any compatible gateway (set AI_PROVIDER_BASE_URL). The key is read from server
 * environment only and never returned to clients.
 */
@Injectable()
export class OpenAiCompatibleAdapter implements LlmAdapter {
  readonly provider = 'openai-compatible';
  private readonly logger = new Logger(OpenAiCompatibleAdapter.name);

  private get apiKey(): string | undefined {
    return process.env.AI_PROVIDER_API_KEY;
  }

  private get baseUrl(): string {
    return process.env.AI_PROVIDER_BASE_URL ?? 'https://api.openai.com/v1';
  }

  private get model(): string {
    return process.env.AI_PROVIDER_MODEL ?? 'gpt-4o-mini';
  }

  get isConfigured(): boolean {
    return Boolean(this.apiKey);
  }

  async complete(options: LlmCompletionOptions): Promise<LlmCompletionResult> {
    if (!this.apiKey) {
      throw new Error('AI provider is not configured');
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 20_000);

    try {
      const res = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: options.messages,
          temperature: options.temperature ?? 0.3,
          max_tokens: options.maxTokens ?? 600,
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        this.logger.warn(`LLM provider error ${res.status}: ${text.slice(0, 200)}`);
        throw new Error(`LLM provider responded with ${res.status}`);
      }

      const data = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
        model?: string;
      };

      const content = data.choices?.[0]?.message?.content?.trim();
      if (!content) throw new Error('LLM provider returned an empty response');

      return { content, model: data.model ?? this.model, provider: this.provider };
    } finally {
      clearTimeout(timeout);
    }
  }
}
