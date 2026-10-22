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
- [ ] Design system with tokens (from logo)
- [ ] Reusable components
- [ ] Homepage replication
- [ ] Other public pages
- [ ] Navigation
- [ ] Responsive design
- [ ] Visual verification

### PHASE 3: DATABASE DESIGN & BACKEND ARCHITECTURE
- [ ] Prisma schema design
- [ ] NestJS modules
- [ ] API conventions
- [ ] Migrations and seeds

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
- [ ] Novus MFB Logo (official file)
- [ ] Brand colors
- [ ] Business info/contact details
- [ ] Product descriptions/terms
- [ ] Regulatory/legal wording
- [ ] Support channels
- [ ] AI provider credentials
- [ ] Email/SMS provider
- [ ] Hosting/domain
- [ ] Banking API credentials (if applicable)

## 5. Risks
- Empty repo, starting fresh
- No logo/colors provided
- Cannot see internal OPay architecture
- Must not copy proprietary code/assets
- Must not make unverified regulatory claims
- AI/banking integrations need credentials

## Phase 0 Status
In progress - creating docs
