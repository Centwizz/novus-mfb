# Design System

The Novus MFB design system is the single source of truth for colour, type, spacing,
elevation, motion and reusable UI. It is derived from the official logo
(`assets/novusmfb logo.png`) so the site cannot drift from the brand.

## 1. Brand origin

Colours were sampled directly from the supplied logo, not invented:

| Token | Value | Origin |
| --- | --- | --- |
| `brand-700` (primary) | `#010065` | Dominant deep indigo/navy in the logo mark |
| `accent` | `#FF0000` | Red accent in the logo mark |
| `surface` | `#FFFFFF` | White element in the logo mark |

> **TODO(owner):** confirm these are the approved digital brand colours. If the logo is
> revised, update `apps/web/tailwind.config.ts` and everything downstream follows.

## 2. Where tokens live

- **Source of truth:** `apps/web/tailwind.config.ts` (`theme.extend`).
- **Global base styles:** `apps/web/src/app/globals.css` (focus rings, headings, reduced motion).
- **Content strings / business info:** `apps/web/src/lib/site-config.ts`.

Because every component uses the `brand-*`, `accent`, `surface`, `ink` and `border`
utilities, changing a token updates the whole interface at once.

## 3. Colour palette

### Brand (primary)

| Step | Hex | Use |
| --- | --- | --- |
| `brand-50` | `#eef0ff` | Tinted surfaces, icon chips, badges |
| `brand-100` | `#dfe2ff` | Badge borders, subtle fills |
| `brand-500` | `#3d40e6` | Links, interactive accents |
| `brand-600` | `#1a1bcc` | Eyebrow text, hover states |
| **`brand-700`** | **`#010065`** | **Primary brand — buttons, headings, nav** |
| `brand-800` | `#01004f` | Pressed/active states |
| `brand-900` | `#01003b` | Gradient ends, dark panels |

### Accent & semantic

| Token | Hex | Use |
| --- | --- | --- |
| `accent` | `#ff0000` | High-emphasis accent (used sparingly) |
| `success` | `#12805c` | Confirmations, positive status |
| `warning` | `#b45309` | Caution, pending status |
| `danger` | `#b91c1c` | Errors, destructive actions |

### Neutrals

| Token | Hex | Use |
| --- | --- | --- |
| `ink` | `#0b0b1f` | Headings and primary text |
| `ink-muted` | `#4b4b63` | Body copy |
| `ink-subtle` | `#71718a` | Captions, metadata |
| `border` | `#e3e5ee` | Dividers and card outlines |
| `surface-muted` | `#f5f6fa` | Alternating section backgrounds |

## 4. Typography

- **Family:** Inter (loaded via `next/font`), falling back to the system UI stack.
- Headings are `font-semibold`, `tracking-tight`, with `text-wrap: balance`.
- Body copy uses `text-wrap: pretty`.
- The public site's heading sizes are **derived from the reference site's own CSS**, expressed in
  viewport units so they scale the same way the reference does. Examples:
  - Hero `h1`: `4.17vw` desktop (~60px at 1440px) / `11.11vw` mobile, `font-weight: 700`,
    `line-height: 1.2`.
  - Section titles: `3.1vw` desktop / `7vw` mobile, `font-weight: 600`.
  - Service row titles: `2.78vw`, `font-weight: 700`.
  Inner pages (app and auth screens) still use Tailwind's default type scale.

## 4a. Layout dimensions derived from the reference

These are **measured** values from `opayweb.com`'s stylesheets, not choices made here. See
`docs/UI_REFERENCE_COMPARISON.md` for the full derivation.

| Element | Desktop | Mobile |
| --- | --- | --- |
| Header height | **80px** (`h-nav`) | **15.55vw** |
| Header gutters | **80px** (`px-gutter`) | `5.2vw` |
| Section side padding | `5.65vw` (`spacing.section`) | `5.65vw` |
| Homepage hero ratio | **1920 / 800** | **390 / 844** |
| Service image ratio | **622 / 455** | same |
| Security tile ratio | **1004 / 425** | same |
| Download-app art ratio | **49.56 / 27.56** | same |
| Footer column widths | `9vw / 10.17vw / 9.5vw / 10.17vw / 38vw` | stacked, 50% pairs |

## 5. Radius & elevation

Sections built to the reference use **small, measured radii** rather than the large soft radii used
on inner pages — the reference's corners are tight.

| Token | Value |
| --- | --- |
| `rounded-xl` | `0.875rem` |
| `rounded-2xl` | `1.25rem` (default for inner-page cards and inputs) |
| `rounded-3xl` | `1.75rem` (chat window) |
| `rounded-lg` | `0.5rem` — download-app band (reference: `border-radius: 8px`) |
| `shadow-card` | Resting card elevation (inner pages) |
| `shadow-card-hover` | Hover elevation (inner pages) |
| Always-on header shadow | `0 0 22px rgba(0,0,0,0.1)` — matches the reference; not scroll-dependent |

## 6. Motion

- `animate-fade-in` — 0.4s, entrance fade + slight rise.
- `animate-fade-up` / `fade-up-250` / `fade-up-500` — the reference's staged hero entrance
  (title, then subtitle, then badges).
- `animate-typing-dot` — Nova's typing indicator.
- **Reduced motion:** all animation is disabled when the user sets
  `prefers-reduced-motion: reduce` (see `globals.css`).

## 7. Components

All live under `apps/web/src/components`.

### Primitives (`ui/`)

| Component | Purpose |
| --- | --- |
| `Button` / `ButtonLink` | Primary, outline and ghost variants; `sm`/`md`/`lg` sizes |
| `Card` / `FeatureCard` | Rounded, elevated containers |
| `Field` / `Input` / `Textarea` | Labelled form controls with error and a11y wiring |
| `Section` / `SectionHeading` | Consistent vertical rhythm and heading blocks |
| `PageHeader` | Inner-page title band |
| `LegalPage` | Long-form legal document layout |
| `Accordion` | Keyboard-accessible FAQ disclosure (one open at a time) |

### Layout (`layout/`)

| Component | Purpose |
| --- | --- |
| `Header` | Fixed 80px nav, dropdown groups, slide-down mobile menu, account CTAs |
| `Footer` | Five reference-derived columns + separate bottom bar with social chips and a "Cookie settings" control |
| `AuthShell` | Split brand/auth panel for login and registration |
| `CookieConsent` | Non-modal storage notice; fixed above the footer, below the Nova launcher |
| `CookieSettingsButton` | Re-opens the notice by clearing the stored acknowledgement |

### Homepage sections (`sections/`)

Built to the reference's measured geometry. Each image slot has a paired original SVG artwork
component, so real imagery can be dropped in without any layout change.

| Component | Purpose |
| --- | --- |
| `Hero` + `HeroBannerArt` | Full-bleed banner (1920/800) with overlaid, bottom-pinned text and store badges |
| `ServicesSection` + `ServiceArt` | Three alternating full-width panels with 622/455 imagery |
| `DownloadAppSection` | Neutral band, replaceable phone image (49.56/27.56) and a QR placeholder that is hidden below `lg` |
| `TestimonialsSection` | Customer quote cards (placeholders until verified quotes are supplied) |
| `SecuritySection` + `SecurityTileArt` | Solid brand band with two 1004/425 tiles and three text blocks |
| `SatisfactionSection` + `SatisfactionVideoArt` | Text, hotline block and two media tiles |
| `SupportSection`, `FaqSection`, `CtaSection` | Novus-only additions, placed after the reference sections |

### Branding & assistant

| Component | Purpose |
| --- | --- |
| `Logo` | Official mark + wordmark, light/dark variants |
| `ChatLauncher` | Floating Nova assistant entry point |

## 7a. Browser icons and social card

Generated from the single owner-supplied logo by `scripts/generate-brand-assets.mjs`:

```powershell
npm run assets:brand
```

| Output | Size | Used by |
| --- | --- | --- |
| `src/app/favicon.ico` | 16 + 32 | Browser tabs, bookmarks |
| `src/app/icon.png` | 512 | Modern browsers, install prompts |
| `src/app/apple-icon.png` | 180 | iOS home screen |
| `public/brand/og-image.png` | 1200×630 | Open Graph and X/Twitter cards |

Rules baked into the generator:

- The source logo is **204×204 with an opaque white background** (no alpha channel). Icons
  therefore keep a white ground. Producing a transparent mark would mean fabricating artwork
  that was never supplied.
- The mark is trimmed of its own white border and re-centred, so padding is even at every size.
- The social card contains only the name and tagline. No licence, deposit-insurance or
  customer-count claims are drawn, because none are verified.
- The outputs live in **`src/app`**, never a top-level `apps/web/app`. A root `app/` directory
  shadows `src/app` in Next.js and silently removes every page from the build.
- This script is separate from `scripts/generate-placeholder-images.mjs`. The placeholder
  generator writes JPG files and deliberately skips the two real home hero photographs, so it
  cannot overwrite them.

## 8. Accessibility commitments

- Target: **WCAG 2.2 AA**.
- A visible focus ring is applied globally via `:focus-visible`.
- Semantic landmarks: `header` (banner), `nav`, `main`, `footer` (contentinfo).
- Exactly one `<h1>` per page (enforced by an E2E test).
- All images require an `alt` attribute (enforced by an E2E test).
- The FAQ accordion exposes `aria-expanded` / `aria-controls` and is fully keyboard operable.
- Colour is never the sole carrier of meaning — icons and text labels accompany it.
- The cookie notice is a non-modal `role="region"`; it never traps focus, never locks scrolling,
  and its action is inset from the floating chat button on phones. Because this build sets no
  optional cookies, it offers one honest acknowledgement rather than an Accept/Reject choice
  that would imply tracking that does not exist.

## 9. Guardrails

- No unverified figures: interest rates, customer counts and licence claims must not appear
  unless supplied by the owner. `apps/web/src/lib/site-config.ts` holds `TODO(owner)` markers and
  `siteConfig.regulatory.showBadges` stays `false` until verified wording is provided.
- A regression test asserts the home page contains no percentage-based rate or customer-count
  claim (see `e2e/design-system.spec.ts`).

## 10. Testing

| Layer | File | What it checks |
| --- | --- | --- |
| Unit | `tests/navigation.test.ts` | Every header/footer link maps to a real route |
| Unit | `tests/consent.test.ts` | Consent parsing fails closed; version and timestamp validation |
| E2E | `e2e/public-site.spec.ts` | Hero, nav resolution, Nova launcher, mobile overflow |
| E2E | `e2e/design-system.spec.ts` | All routes render, one h1, image alt text, CTA targets, no unverified claims |
| E2E | `e2e/reference-fidelity.spec.ts` | Homepage section order, 80px fixed header, full-bleed hero with white overlaid heading, three full-width service rows, five-column footer, QR hidden below `lg` and visible on desktop, no horizontal scroll at five reference viewports, placeholder honesty |
| E2E | `e2e/cookie-consent.spec.ts` | First-visit notice, dismissal persistence, footer re-open, no overlap with the chat launcher, no horizontal overflow |
| E2E | `e2e/brand-assets.spec.ts` | Icons, social card, sitemap and robots are real 200 responses; OG/Twitter metadata present |

> Executed on 2026-10-26 against a production build (`E2E_BASE_URL=http://localhost:3000`):
> **112/112 PASS** on Chromium desktop and Pixel 5 — the original 78 plus the consent,
> brand-asset and responsive-QR specs. Run `npx playwright install chromium` once per machine before the first
> E2E run. Against `next dev`, cold route compilation can exceed the 30s navigation timeout on
> slow machines; use a production build for the authoritative run.

Commands (from the repository root):

```powershell
npm run test   --workspace=apps/web   # unit
npx playwright install chromium       # once, downloads the browser
npm run test:e2e --workspace=apps/web # starts the dev server automatically
# or, against an already-running production build:
# $env:E2E_BASE_URL='http://localhost:3000'; npx playwright test
```
