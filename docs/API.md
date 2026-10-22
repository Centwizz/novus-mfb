# API - Novus MFB

REST API for the Novus MFB platform, built with NestJS.

## Base URL
`/api/v1` (URI versioning). Swagger docs: `/api/docs`.

## Response envelope
Success:
```json
{ "success": true, "data": { }, "requestId": "..." }
```
Error:
```json
{ "success": false, "error": { "code": "STRING", "message": "Safe message" }, "requestId": "..." }
```
Errors never include stack traces, database errors or secrets.

## Endpoints (Phase 1 foundation)

### Health
- `GET /api/v1/health` — dependency status (database, AI provider)
- `GET /api/v1/health/live` — minimal liveness probe

### Chatbot (Nova)
- `POST /api/v1/chatbot/message`
  - Body: `{ "conversationId"?: uuid, "message": string, "language"?: "en"|"pcm"|"yo"|"ig"|"ha" }`
  - Returns: `{ conversationId, reply, language, demoMode, escalated, ticketReference?, sources }`
  - Rate limited: 20 requests / minute / IP
  - `demoMode: true` when no LLM key is configured (never claims a live model)

### Contact
- `POST /api/v1/contact` — accepts a general enquiry (validated), returns `202`.
  Persistence is added in Phase 5.

## Conventions
- Global `ValidationPipe` with `whitelist` + `forbidNonWhitelisted`.
- Request IDs on every response (`x-request-id` header).
- Rate limiting via `@nestjs/throttler`.
- CORS restricted to `ALLOWED_ORIGINS`.
- Security headers via `helmet`.

## Adding endpoints
1. Create a module under `src/modules/<name>`.
2. Define a DTO with `class-validator` decorators.
3. Add `@ApiTags`/`@ApiOperation` for Swagger.
4. Register the module in `app.module.ts`.
5. Write a `.spec.ts` test alongside the service.
