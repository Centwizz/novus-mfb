# PROJECT PLAN: NOVUS MFB - COMPLETE BANKING WEBSITE, BACKEND & AI CUSTOMER SERVICE PLATFORM

## 1. Project Overview
Build a complete web platform for Novus MFB modeled after https://www.opayweb.com/ with original implementation, full backend, database, authentication, support portal, AI chatbot (Nova), admin dashboard, security controls, tests, and deployment configuration.

## 2. Current State (Phase 0 Audit)
- **Repository:** C:\Novusweb - Initialised as a git repo with the full monorepo foundation
- **Git:** Initialised; Phase 1 foundation committed
- **Reference site:** OPay web studied - marketing-focused fintech site (`docs/REFERENCE_AUDIT.md`)
- **Logo/Branding:** Supplied by owner (`assets/novusmfb logo.png`); colours extracted — primary
  `#010065`, accent `#FF0000`

## 3. Project Phases

### PHASE 0: REPOSITORY AUDIT, REFERENCE RESEARCH & TECHNICAL PLAN (CURRENT)
- [x] Inspect reference website structure
- [x] Create reference audit
- [x] Create architecture plan
- [x] Create tech stack doc
- [x] Create security plan
- [x] Create testing plan
- [x] Document risks and prerequisites
- [x] Request approval to move to Phase 1

### PHASE 1: PROJECT FOUNDATION & DEVELOPMENT ENVIRONMENT
- [x] Initialize monorepo structure
- [x] Configure TypeScript strict mode
- [x] Setup linting/formatting
- [x] Environment validation
- [x] Git setup (.gitignore)
- [x] Docker Compose (Postgres, Redis)
- [x] Dev/test DB setup
- [x] Error handling/logging
- [x] Root README
- [x] CI checks
- [x] Health check endpoints
- [x] Verify frontend/backend run — see `docs/PHASE_1_VERIFICATION.md`. API booted and
      health/docs/contact endpoints verified 200/202/400 as designed; web app built (25 routes).
      Database-backed endpoints remain unverified until PostgreSQL is reachable (environment
      dependency, not a code defect).

### PHASE 2: NOVUS MFB DESIGN SYSTEM & FRONTEND REPLICATION
- [x] Design system with tokens (from logo) — `docs/DESIGN_SYSTEM.md`, `tailwind.config.ts`
- [x] Reusable components — `ui/` primitives (button, card, form, section, page-header,
      legal-page, accordion), `layout/` (header, footer, auth-shell), `brand/logo`, `chat/`
- [x] Homepage replication — hero, services, security, support, FAQ, CTA sections
- [x] Other public pages — about, personal, savings, loans, business, security, contact, faq,
      newsroom, careers, report, privacy-policy, terms-and-conditions
- [x] Navigation — header dropdowns + mobile drawer, footer groups, integrity test (14 routes)
- [x] Responsive design — mobile-first layouts, mobile overflow E2E test, `prefers-reduced-motion`
- [x] Visual verification — `e2e/design-system.spec.ts` (routes render, one h1, image alt text,
      CTA targets, no unverified claims). Owner visual review still recommended.

> **Deferred:** full Playwright E2E execution needs both dev servers running; the database-backed
> specs additionally need PostgreSQL (see `docs/POSTGRES_SETUP_CHECKLIST.md`).

### PHASE 3: DATABASE DESIGN & BACKEND ARCHITECTURE
- [x] Prisma schema design — 16 models in `apps/api/prisma/schema.prisma`
- [x] NestJS modules — health, chatbot, contact, auth (scaffold), prisma, config
- [x] API conventions — `/api/v1` versioning, exception filter, logging + request IDs
- [ ] Migrations and seeds — migration SQL and seed written; **applying them is blocked on
      PostgreSQL** (see `docs/POSTGRES_SETUP_CHECKLIST.md`)

### PHASE 4: CUSTOMER AUTHENTICATION & ACCOUNT MANAGEMENT
- [ ] Registration/login/logout
- [ ] Email/phone verification
- [ ] Password reset
- [ ] Session management
- [ ] RBAC
- [ ] MFA (optional)
- [ ] Rate limiting

### PHASE 5: CUSTOMER SUPPORT PORTAL & ADMINISTRATIVE DASHBOARD
- [ ] Customer support area
- [ ] Ticketing system
- [ ] Support agent dashboard
- [ ] Admin dashboard
- [ ] Internal notes

### PHASE 6: AI CUSTOMER-SERVICE CHATBOT (Nova)
- [ ] Chat UI
- [ ] Natural conversation
- [ ] Typing indicators
- [ ] Nigerian languages (EN, Pidgin, Yoruba, Igbo, Hausa)
- [ ] LLM integration
- [ ] Knowledge base
- [ ] Human handoff
- [ ] Security restrictions
- [ ] Tests

### PHASE 7: OPTIONAL BANKING PORTAL
- [ ] Assess needs, adapters if approved, clear labeling

### PHASE 8: SECURITY HARDENING & QA
- [ ] OWASP ASVS, tests, accessibility, performance

### PHASE 9: DEPLOYMENT
- [ ] Hosting, env, HTTPS, migrations, monitoring

### PHASE 10: DOCUMENTATION & HANDOVER
- [ ] Complete docs, handover report

## 4. Critical Prerequisites
- [x] Novus MFB Logo (official file) — `assets/novusmfb logo.png`
- [x] Brand colors — sampled from the logo; **confirmation still recommended**
- [ ] Business info/contact details — placeholders in `site-config.ts`
- [ ] Product descriptions/terms
- [ ] Regulatory/legal wording — badges hidden until verified
- [ ] Support channels — hotline/WhatsApp not configured
- [ ] AI provider credentials — Nova runs in demo mode until provided
- [ ] Email/SMS provider
- [ ] Hosting/domain
- [ ] Banking API credentials (if applicable)
- [ ] PostgreSQL installed locally (deferred by owner — see `docs/POSTGRES_SETUP_CHECKLIST.md`)

## 5. Risks
- No verified business/contact/product/regulatory content yet — no such claims are made
- Cannot see internal OPay architecture; only publicly observable patterns are replicated
- Must not copy proprietary OPay code/assets — all implementation is original
- AI/banking integrations need credentials before they can go live
- Local environment: no Docker/PostgreSQL, slow network, Prisma binary host unreachable
  (mitigated; see `docs/PHASE_1_VERIFICATION.md` §4)

## Phase Status
- Phase 0: complete (all docs)
- Phase 1: complete and verified (`docs/PHASE_1_VERIFICATION.md`)
- Phase 2: **superseded** — the first visual pass did not match the reference. See below.
- Phase 2b (UI reference correction): **complete, awaiting owner visual review.**
  Audit, mismatch report and corrections are recorded in `docs/UI_REFERENCE_COMPARISON.md`.
  The homepage was rebuilt to the reference's verified layout: photo-style full-bleed hero
  (aspect 1920/800) with overlaid text, three alternating full-width "Our Services" panels,
  a new download-app band, a new testimonials section, a solid-brand-band security section
  with media tiles, a new customer-satisfaction section, and a five-column footer with a
  separate bottom bar. Verified: typecheck PASS, lint PASS (0/0), `next build` PASS
  (25/25 pages), web unit tests 14/14 PASS. **Not verified: any visual/pixel comparison —
  no browser is available in this environment.**
- Phase 3: schema, modules and conventions in place; migration/seed application blocked on
  PostgreSQL (deferred by owner)
