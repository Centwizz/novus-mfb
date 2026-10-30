# Nova — AI Customer-Service Assistant

Nova is the Novus MFB virtual assistant. It answers customer questions using an **approved
knowledge base**, escalates to human agents, and never performs banking transactions.

## Architecture

```
Browser (chat widget)
   │  POST /api/v1/chatbot/message  (server-side only)
   ▼
NestJS ChatbotModule
   ├── ChatbotService        orchestrates the turn
   ├── language.ts           heuristic language detection (en, pcm, yo, ig, ha)
   ├── knowledge-base.ts     approved entries + keyword retrieval
   ├── prompt.ts             system prompt + guardrails
   └── llm/                  replaceable LlmAdapter
         └── openai-compatible.adapter.ts  (OpenAI or any compatible gateway)
```

- **All model calls happen on the server.** `AI_PROVIDER_API_KEY` is never sent to the browser.
- **Adapter pattern** (`LlmAdapter`) makes the provider replaceable without touching the service.
- **Demo mode**: if no key is configured, the service returns `demoMode: true` and uses approved
  knowledge only. The UI labels this plainly — a live model is never pretended.

## Guardrails (`prompt.ts`)
- Never invent rates, fees, balances, transaction status, timelines, eligibility or policy.
- Never request/accept PIN, OTP, password or full card details.
- Cannot transact, change balances, approve loans or reset credentials.
- Retrieved knowledge is treated as **untrusted data** (delimited) to reduce prompt injection.
- Never reveal another customer's data.

## Languages
Heuristic detection from message text only — **never** inferred from a person's name or
appearance. Supported: English (`en`), Nigerian Pidgin (`pcm`), Yoruba (`yo`), Igbo (`ig`),
Hausa (`ha`). Customers can switch at any time.

> The keyword lists in `language.ts` are intentionally simple and transparent. They are not an
> attempt to determine anyone's tribe or ethnicity, and no such claim is made in the UI.

## Human handoff
Triggered by explicit requests (e.g. "speak to a human", "escalate"):
1. The conversation is marked `ESCALATED`.
2. If the customer is authenticated, a ticket is created with a reference (e.g. `NVS-…`).
3. The reply tells the customer a human is needed and gives the reference.
4. Nova never claims a human is typing unless an agent is actually assigned.

## Persistence & privacy
- Conversations and messages are stored in the database (`Conversation`, `ConversationMessage`).
- Ownership checks and pagination are added in Phase 6 alongside authenticated history.
- Internal agent notes are stored separately (`isInternal`) and never surfaced to customers.
- If PostgreSQL is unreachable, Nova keeps a bounded in-memory transcript and answers from the
  approved knowledge base. Database access pauses for 30 seconds after a connection failure,
  then retries automatically, so persistence resumes without restarting the API.
- The fallback cache holds at most 500 conversations (oldest evicted) and 20 messages per
  transcript, so anonymous traffic cannot grow memory without bound. `conversationId` must be
  a UUID or a `mem-…` id issued by this API; arbitrary strings are rejected at the DTO.
- Conversations created during an outage keep a `mem-…` id and stay in memory for their
  lifetime; their id is never written to a database foreign key. A `mem-…` id from a previous
  process is treated as stale and replaced with a fresh conversation.
- The browser calls one same-origin endpoint (`/api/v1/chatbot/message`, rewritten to the API by
  Next.js). There is no hard-coded backend host or multi-endpoint retry chain.

## Configuration
| Variable | Purpose |
| --- | --- |
| `AI_PROVIDER_API_KEY` | Enables live model calls (empty = demo mode) |
| `AI_PROVIDER_MODEL` | Model name (default `gpt-4o-mini`) |
| `AI_PROVIDER_BASE_URL` | Optional OpenAI-compatible gateway URL |

Example — OpenRouter (any OpenAI-compatible gateway works):

```dotenv
AI_PROVIDER_BASE_URL=https://openrouter.ai/api/v1
AI_PROVIDER_MODEL=deepseek/deepseek-chat-v3-0324
AI_PROVIDER_API_KEY=<server-side key>
```

The key is read from the API process environment only. Keep it in `apps/api/.env` (gitignored)
and never in a script, test fixture or committed file.

## Testing
- `language.spec.ts` — detection, including whole-word matching regressions.
- `knowledge-base.spec.ts` — retrieval and no-invented-figures checks.
- `chatbot.service.spec.ts` — outage fallback, 30 s retry, memory-only conversations, stale
  `mem-…` ids, transcript-cache bound and escalation wording.
- `dto/chat-message.dto.spec.ts` — conversation-id format validation.

Multi-turn/provider-timeout/prompt-injection tests against a live provider remain for Phase 6.
