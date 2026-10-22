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

## Configuration
| Variable | Purpose |
| --- | --- |
| `AI_PROVIDER_API_KEY` | Enables live model calls (empty = demo mode) |
| `AI_PROVIDER_MODEL` | Model name (default `gpt-4o-mini`) |
| `AI_PROVIDER_BASE_URL` | Optional OpenAI-compatible gateway URL |

## Testing
`language.spec.ts` and `knowledge-base.spec.ts` cover detection and retrieval. Behavioural
conversation tests (multi-turn, escalation, provider timeout, prompt injection) land in Phase 6.
