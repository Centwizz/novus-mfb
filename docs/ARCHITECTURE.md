# ARCHITECTURE - Novus MFB Platform

## Overview
Monorepo with Next.js (frontend) and NestJS (backend), PostgreSQL via Prisma, Redis for caching/rate limiting, AI chatbot with replaceable LLM adapter.

## Monorepo Structure
`
novus-mfb/
+-- apps/
¦   +-- web/          # Next.js 15+ App Router frontend
¦   +-- api/          # NestJS backend API
+-- packages/
¦   +-- shared-types/      # Shared TypeScript types
¦   +-- shared-validation/ # Zod schemas
+-- infrastructure/
¦   +-- docker/       # Docker configs
+-- docs/             # Documentation
+-- scripts/          # Utility scripts
+-- package.json      # Root workspace config
`

## Frontend (apps/web)
- **Framework:** Next.js with App Router, TypeScript strict
- **Styling:** Tailwind CSS
- **Components:** Reusable component library
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React
- **State:** React hooks/context as needed
- **Auth:** Cookie-based sessions (httpOnly cookies)
- **API Client:** Fetch/axios to backend

## Backend (apps/api)
- **Framework:** NestJS, TypeScript
- **API:** REST, versioned /api/v1
- **Validation:** class-validator/class-transformer (NestJS pipes)
- **Auth:** Session-based or JWT with httpOnly cookies
- **Modules:** Auth, Users, Customers, Support, Chatbot, KnowledgeBase, Notifications, Admin, Audit, Health
- **Docs:** Swagger/OpenAPI at /api/docs

## Database
- **DB:** PostgreSQL
- **ORM:** Prisma
- **Migrations:** Version controlled
- **Entities:** Users, CustomerProfiles, Roles, Permissions, Sessions, SupportTickets, Conversations, Messages, KnowledgeBaseArticles, AuditEvents, etc.

## AI Chatbot (Nova)
- **Adapter Pattern:** Replaceable LLM provider (OpenAI, Anthropic, etc.)
- **Server-side only:** Keys never exposed to client
- **Knowledge Base:** RAG/retrieval from approved content
- **Languages:** EN, Nigerian Pidgin, Yoruba, Igbo, Hausa
- **Handoff:** To human support agents
- **Security:** No direct DB/tool access without authorization

## Infrastructure
- **Local Dev:** Docker Compose (Postgres, Redis)
- **Storage:** S3-compatible if needed
- **Email/SMS:** Provider adapters
- **Auth:** Secure sessions
- **Real-time:** WebSockets/SSE for agent chat (if needed)

## Security Principles
- HttpOnly secure cookies
- CSRF protection
- Rate limiting
- Input validation everywhere
- RBAC
- Audit logging
- No secrets in client
- Prompt injection protection
- PII minimization
