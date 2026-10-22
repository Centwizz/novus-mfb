# TECH STACK - Novus MFB

## Frontend
| Technology | Purpose | Notes |
|------------|---------|-------|
| Next.js (App Router) | Framework | SSR/SSG where appropriate |
| React | UI Library | Latest stable |
| TypeScript (strict) | Language | Strict mode enabled |
| Tailwind CSS | Styling | Design system tokens |
| React Hook Form | Forms | With Zod validation |
| Zod | Validation | Shared schemas |
| Lucide React | Icons | Consistent icon set |
| Playwright | E2E Testing | Browser tests |

## Backend
| Technology | Purpose | Notes |
|------------|---------|-------|
| Node.js | Runtime | LTS version |
| NestJS | Framework | Modular architecture |
| TypeScript (strict) | Language | Same as frontend |
| Prisma | ORM | PostgreSQL |
| class-validator | Validation | DTO validation |
| Passport.js / Sessions | Auth | Secure session management |
| Swagger/OpenAPI | API Docs | Auto-generated |

## Database & Storage
| Technology | Purpose | Notes |
|------------|---------|-------|
| PostgreSQL | Primary DB | Relational data |
| Redis | Cache/Rate-limit/Jobs | Optional but recommended |
| Prisma Migrate | Migrations | Version controlled |

## Infrastructure & Tools
| Technology | Purpose | Notes |
|------------|---------|-------|
| Docker Compose | Local dev | Postgres, Redis |
| pnpm/npm/yarn | Package manager | Choose consistently |
| ESLint | Linting | Code quality |
| Prettier | Formatting | Code style |
| Git | Version control | Required |
| Jest/Vitest | Unit tests | Backend/frontend |
| Supertest | API tests | Backend |

## External Services (Configurable)
| Service | Purpose | Notes |
|---------|---------|-------|
| LLM Provider | AI chatbot | Adapter pattern, API key server-side |
| Email Provider | Notifications/verification | Configurable |
| SMS Provider | OTP (if used) | Configurable |
| Object Storage (S3-compatible) | File uploads | If needed |

## Principles
- Use official docs
- Minimal dependencies
- Type safety everywhere
- Security first
- Configurable via env vars
