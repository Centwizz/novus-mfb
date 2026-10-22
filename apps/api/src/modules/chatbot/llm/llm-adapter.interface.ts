export interface LlmMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LlmCompletionOptions {
  messages: LlmMessage[];
  temperature?: number;
  maxTokens?: number;
  timeoutMs?: number;
}

export interface LlmCompletionResult {
  content: string;
  model: string;
  provider: string;
}

/**
 * Provider-agnostic LLM adapter interface.
 *
 * Implementations must never be constructed or called from the browser; API keys
 * live only in server-side environment configuration.
 */
export interface LlmAdapter {
  readonly provider: string;
  readonly isConfigured: boolean;
  complete(options: LlmCompletionOptions): Promise<LlmCompletionResult>;
}

export const LLM_ADAPTER = Symbol('LLM_ADAPTER');
