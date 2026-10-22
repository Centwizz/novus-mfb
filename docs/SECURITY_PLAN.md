# SECURITY PLAN - Novus MFB

## Authentication & Authorization
- Secure password hashing (bcrypt/argon2)
- HttpOnly, Secure, SameSite cookies
- Session management with revocation
- RBAC (customer, support agent, admin)
- Rate limiting on auth endpoints
- Password reset with short-lived tokens
- Email/phone verification
- MFA consideration

## Input Validation & Injection Prevention
- Validate all inputs (client + server)
- Parameterized queries via Prisma
- DTO validation in NestJS
- Sanitize outputs
- File upload validation (type/size)
- Prevent SQL injection, XSS, command injection

## Session & Cookie Security
- HttpOnly cookies
- Secure flag in production
- SameSite=Strict/Lax as appropriate
- CSRF protection
- Session timeout and rotation
- Logout invalidates session

## API Security
- /api/v1 versioning
- Rate limiting per endpoint
- CORS configuration
- Request validation
- Consistent error messages (no stack traces)
- Request IDs for tracing
- API keys never in client

## AI Chatbot Security
- All LLM calls server-side
- System prompt with guardrails
- No direct DB access by LLM
- Tool use with explicit schemas
- PII filtering before sending to LLM
- Prompt injection detection
- No secrets/financial data leakage
- Human handoff required for sensitive actions
- Rate limiting per user/session

## Data Protection
- Encrypt sensitive data at rest/in transit (TLS)
- Minimize data collection
- Secure token storage (hashed)
- Audit logging
- Data retention policy
- Secure deletion
- No plaintext passwords/tokens

## Infrastructure Security
- Security headers (HSTS, CSP, X-Content-Type-Options, etc.)
- Environment variable validation
- Secrets not in repo
- Dependency scanning
- Regular updates
- Secure file storage
- Backup strategy

## OWASP ASVS Alignment
Follow OWASP ASVS verification categories throughout implementation and testing.
