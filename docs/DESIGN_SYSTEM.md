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
- The type scale uses Tailwind's defaults; hero headings go up to `text-6xl` on large screens.

## 5. Radius & elevation

| Token | Value |
| --- | --- |
| `rounded-xl` | `0.875rem` |
| `rounded-2xl` | `1.25rem` (default for cards and inputs) |
| `rounded-3xl` | `1.75rem` (hero panels, chat window) |
| `shadow-card` | Resting card elevation |
| `shadow-card-hover` | Hover elevation |
| `shadow-header` | Subtle sticky-header separator |

## 6. Motion

- `animate-fade-in` — 0.4s, entrance fade + slight rise.
- `animate-slide-up` — 0.5s, used for hero/secondary content.
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
| `Header` | Sticky nav, dropdown groups, mobile drawer, CTA |
| `Footer` | Multi-column link groups, contact info, legal row |
| `AuthShell` | Split brand/auth panel for login and registration |

### Branding & assistant

| Component | Purpose |
| --- | --- |
| `Logo` | Official mark + wordmark, light/dark variants |
| `ChatLauncher` | Floating Nova assistant entry point |

## 8. Accessibility commitments

- Target: **WCAG 2.2 AA**.
- A visible focus ring is applied globally via `:focus-visible`.
- Semantic landmarks: `header` (banner), `nav`, `main`, `footer` (contentinfo).
- Exactly one `<h1>` per page (enforced by an E2E test).
- All images require an `alt` attribute (enforced by an E2E test).
- The FAQ accordion exposes `aria-expanded` / `aria-controls` and is fully keyboard operable.
- Colour is never the sole carrier of meaning — icons and text labels accompany it.

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
| E2E | `e2e/public-site.spec.ts` | Hero, nav resolution, Nova launcher, mobile overflow |
| E2E | `e2e/design-system.spec.ts` | All routes render, one h1, image alt text, CTA targets, no unverified claims |

Commands (from the repository root):

```powershell
npm run test   --workspace=apps/web   # unit
npm run test:e2e --workspace=apps/web # Playwright (needs dev server + API for full coverage)
```
