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

### PHASE 0: REPOSITORY AUDIT, REFERENCE RESEARCH & TECHNICAL PLAN (COMPLETE)
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
- [x] Visual verification — executed 2026-10-25 with Playwright Chromium: 78/78 E2E PASS on
      desktop Chrome and Pixel 5 (routes render, one h1, image alt text, CTA targets, carousel
      ends, no horizontal overflow, honest placeholders, no unverified claims). A separate
      scripted audit measured six viewports (1440×900, 1366×768, 1024×768, 768×1024, 390×844,
      375×812) across 19 routes with zero problems. Owner visual review still recommended.

> **Deferred:** Playwright Chromium is now installed and the public-site E2E suite runs against a
> production build. Database-backed specs still need PostgreSQL (see
> `docs/POSTGRES_SETUP_CHECKLIST.md`).

### PHASE 3: DATABASE DESIGN & BACKEND ARCHITECTURE
- [x] Prisma schema design — 15 models in `apps/api/prisma/schema.prisma`
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
- [x] Chat UI — launcher, panel, suggestion chips, typing indicator, Escape/outside-click close,
      opens above the fixed header (`z-index` and height are computed from `--nav-h`)
- [x] Natural conversation — weighted knowledge retrieval + greeting/thanks detection
- [x] Typing indicators
- [x] Nigerian languages (EN, Pidgin, Yoruba, Igbo, Hausa) — weighted marker detection
- [ ] LLM integration — `LlmAdapter` exists; demo mode until an API key is supplied
- [x] Knowledge base — ~30 verified-safe entries in `knowledge-base.ts` with scoring + tests
- [ ] Human handoff — escalation intent is detected and acknowledged honestly; no agent
      dashboard/queue until Phase 5
- [x] Security restrictions — no PIN/OTP/card collection, no balance guessing, no transaction
      execution, honest "not available" answers
- [ ] Tests — unit tests PASS (language 4/4, knowledge base 4/4); DB-backed conversation tests
      blocked on PostgreSQL

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
  (25/25 pages), web unit tests 14/14 PASS, Playwright E2E 78/78 PASS (desktop Chrome +
  Pixel 5) and a six-viewport scripted geometry audit with zero problems (see Phase 2d).
- Phase 2c (image asset management, banners, Board of Directors & Team): **complete,
  awaiting owner visual review.**
  All public imagery now comes from one central directory, `apps/web/public/images/`, declared
  in a single manifest (`apps/web/src/lib/images.ts`). Replacing a picture is a file swap with
  the same filename — no code change. 33 branded placeholders were generated at their exact
  slot dimensions by `scripts/generate-placeholder-images.mjs`. Every public page banner uses
  `PageBanner` (image + brand scrim, `object-fit: cover`); the home hero has separate desktop
  (1920×800) and mobile (390×844) assets with CSS fallback. The About page gained
  "Meet Our Board of Directors" (carousel) and "Meet Our Team", both rendered by the same
  `PeopleCarousel`/`PersonCard` components so they cannot drift apart, backed by an accessible
  touch/keyboard carousel (3/2/1 cards, ends handled, dots, no horizontal overflow).
  All people entries are explicitly labelled placeholders — no invented identities, roles
  beyond generic role labels, or biographies. Docs: `apps/web/public/images/README.md`
  (per-file inventory) and `docs/IMAGE_ASSET_GUIDE.md` (architecture).
  Verified: `tsc --noEmit` PASS, web lint PASS (0/0), `next build` PASS (25/25), Playwright
  E2E 78/78 PASS including carousel ends, 3/2/1 visibility at 1440/1024/390, image 200s and
  no horizontal overflow.
- Phase 2d (replaceable videos, chat layering, header/hero/typography fixes): **complete,
  awaiting owner visual review.**
  Four central placeholder videos live in `apps/web/public/videos/home/` and are declared in
  `apps/web/src/lib/videos.ts`; swapping a file with the same name needs no code change.
  `<SmartVideo>` falls back to the image-manifest poster when a clip is missing, is muted and
  `aria-hidden`, and pauses under `prefers-reduced-motion`. Docs:
  `apps/web/public/videos/README.md` and `docs/VIDEO_ASSET_GUIDE.md`.
  The Nova panel now always opens above the fixed header (`z-[120]`, height clamped to the
  viewport below `--nav-h`), closes on Escape and opens from any "Start a chat" button.
  Header height is a single `--nav-h` token shared by the header, main offset, hero, mobile
  drawer, auth screens and chat. The hero banner starts at y=0 behind the header and fills the
  viewport; the mobile drawer is `inert` when closed and locks background scroll. The 1024px
  nav/CTA collision is gone (16px clearance). Visible desktop text is now ≥12px (store badges,
  footer, hero subtitle floors raised) and CTA/auth headings are explicitly white on brand
  backgrounds.
  The demo chatbot answers from ~30 verified-safe knowledge entries using weighted retrieval
  in five languages, and keeps an in-memory transcript when PostgreSQL is unreachable while
  stating honestly that it cannot see balances or move money.
  Verified: web + API `tsc --noEmit` PASS; web + API lint PASS (0/0); web unit 14/14; API unit
  8/8; API build PASS; web build PASS (25/25); Playwright 78/78; scripted six-viewport audit
  (19 routes × 6 viewports) 0 problems — no horizontal overflow, hero top 0 with the header
  overlaid, 3/2/1 carousel visibility, one-step Next/keyboard/swipe, chat panel never under the
  nav, all four MP4s decode, no visible desktop text below 12px. Manually exercised
  `/api/v1/chatbot/message` for greeting, balance, transfer, card loss, unauthorised
  transaction and human escalation. **Not verified: PostgreSQL persistence (deferred);
  screenshots were captured but not visually compared against the reference.**
- Phase 2e (browser icons, social card, cookie notice, crawl metadata): **complete.**
  `scripts/generate-brand-assets.mjs` (run with `npm run assets:brand`) derives
  `src/app/favicon.ico` (16 + 32), `src/app/icon.png` (512), `src/app/apple-icon.png` (180) and
  `public/brand/og-image.png` (1200×630) from the supplied logo. The logo is opaque white, so
  the icons keep a white ground; no transparent mark was fabricated. Open Graph and X/Twitter
  card metadata now reference the card, without inventing a social handle.
  A non-modal cookie notice explains that **no cookies or analytics are set** and stores only
  the acknowledgement in local storage; the footer's "Cookie settings" reopens it. The privacy
  policy gained a matching "Cookies and local storage" section. The sitemap now uses a
  hand-maintained content date (`siteConfig.lastContentUpdate`) with per-route priorities, and
  robots excludes the private flows.
  Verified: web `tsc --noEmit` PASS; lint 0/0; web unit 24/24 (10 new consent tests); web build
  PASS (25 pages + icons + sitemap + robots); Playwright **112/112** PASS on Chromium desktop
  and Pixel 5 against a production build, including first-visit consent, dismissal persistence,
  footer re-open, measured non-overlap with the Nova launcher, and 200 responses for every
  generated icon/card. **Incident fixed:** writing the icons to a top-level `apps/web/app`
  directory made Next prefer it over `src/app` and silently drop all 25 pages from the build;
  the generator now writes to `src/app` and deletes any stray root `app/`.
- Phase 2f (responsive polish): **complete.** The Download App QR placeholder is desktop-only
  (`hidden … lg:flex`): a phone user is already on the device that would scan it, so the slot is
  removed below 1024px and the phone artwork fills the band instead. Verified by measurement
  (mobile `display: none`, 0×0; desktop 173×179) and by a new E2E test that checks hidden at
  390px and visible at 1440px. The `h1`-per-page test was also hardened to `toHaveCount(1)`,
  since a bare `count()` observed a transient hydration re-render and spuriously reported
  `/contact` had no h1. Full suite: **112/112** PASS on both projects.
- Phase 3: schema, modules and conventions in place; migration/seed application blocked on
  PostgreSQL (deferred by owner)