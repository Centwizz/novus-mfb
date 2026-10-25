# UI Reference Comparison — OPay vs. Novus MFB

**Date:** 2026-10-22 (verification updated 2026-10-25)
**Status:** Audit complete. Corrections complete — see Phase 2b–2d in `docs/PROJECT_PLAN.md`.
**Method:** Direct inspection of the live reference HTML (`https://www.opayweb.com/`) and its
real stylesheets, compared against the actual Novus implementation on disk.

> **Honesty note on evidence.** I inspected the reference's **live HTML and CSS** and downloaded
> its banner images to read their true pixel dimensions and sample their colours. At the time of
> the audit I could **not** run a browser, so I produced **no** pixel-diff screenshots. All
> numerical claims below come from the reference's own CSS values (converted to px at a 1440px
> viewport) and from measured image files — not from memory or guesswork. Playwright Chromium was
> installed on 2026-10-25 and the structural E2E suite now passes (see §7), but that is still
> **not** a rendered comparison against opayweb.com. Where I could not verify something, it is
> marked **[UNVERIFIED]**.

---

## 1. Why the current implementation does not match

The previous build was a **generic modern banking site** that borrowed only surface cues from the
reference (three service cards, a security block, a multi-column footer). The reference's actual
**composition** is quite different. The root causes, largest first:

### M1 — The hero is fundamentally the wrong kind of thing (largest mismatch)

| | Reference | Previous Novus build |
| --- | --- | --- |
| Structure | Full-bleed **photographic banner** with text laid **over** it | CSS gradient panel with a floating "demo card" on the right |
| Desktop height | `aspect-ratio: 1920/800` → **1440 × 600px** | Content-driven (~560–640px), no fixed ratio |
| Desktop banner image | `2304×918` (ratio 2.51) | **none** — no image at all |
| Headline | `4.17vw` ≈ **60px**, `font-weight:700`, `line-height:1.2`, white, width `50vw` | `text-6xl` (60px) — size coincidentally close, but **dark ink on white**, not white on image |
| Subtitle | `1.04vw` ≈ **15px**, `line-height:2.34vw` ≈ 34px, width `47.51vw` ≈ 684px, colour `#210f60` | `text-lg` (18px), `max-w-lg` (512px) |
| Text block width | `flex-basis: 51%` at ≥1400px | ~50% (close) |
| Text vertical position | `justify-content: flex-end`, `padding-bottom: 8vw` → text pinned to **bottom** of the banner | Vertically centred |
| Right column | Banner photo **is** the right side; no separate card | Invented floating account card (not in reference) |
| App buttons | Two store badges, `1.95vw × 6.17vw` ≈ 28×89px, gap `2.34vw` ≈ 34px | None |
| Regulatory badge | `401 × 37px` image (hidden for Novus until verified) | None (correct to omit, but no reserved space) |

**Root cause:** I designed a hero from a written description instead of the reference's actual
geometry, and I invented an account-card element the reference does not have.

### M2 — "Our Services" is the wrong layout entirely

Reference: **three full-width alternating rows**, each a coloured panel with text on one side and a
large photo on the other, content flowing edge-to-edge (not inside a max-width container).

- Panel background: full-width colour block (`#1dc99b` / `#f4fcfa`) behind the row
- Text column: `width: 41.7vw` ≈ **600px**; title `2.78vw` ≈ **40px** bold; body `1.56vw` ≈ 22px,
  width `33.7vw` ≈ 485px
- Image: `aspect-ratio: 622/455`, `width: 43.8vw` ≈ **631px**, `border-radius: 1vw` ≈ 14px,
  `margin: 4.43vw 0 4.43vw 56px`
- Row 2 is **reversed** (`flex-direction: row-reverse`) and uses a light background with green text
- Row padding: `0 5.6vw 0 5.69vw`
- Section title: `3.1vw` ≈ **45px**, `font-weight:600`, left-aligned, `padding-left: 5.69vw`

Previous Novus build: a **3-column card grid** of small icon cards inside a max-width container —
a completely different composition and visual weight.

### M3 — Section set and order do not match

| # | Reference section | Previous Novus build |
| --- | --- | --- |
| 1 | Hero (photo banner + overlaid text + store badges + regulatory badge) | Hero (gradient + card) ⚠️ |
| 2 | `features-list` (empty container, populated at runtime) | — missing |
| 3 | **Our Services** — 3 alternating full-width photo rows | 3-column card grid ❌ |
| 4 | **Download App** — `#ededed` band; phone image `49.56vw × 27.56vw` ≈ 713×397, QR `12vw` ≈ 173px | — missing ❌ |
| 5 | **"Here is what our customers think"** — testimonials | — missing ❌ |
| 6 | **Security** — green `#1dc99b` band; two **video tiles** left (`41.1vw` ≈ 592px wide, `aspect-ratio 1004/425`) + 3 text items right | 3 icon cards ❌ |
| 7 | **Customer Satisfaction** — text + two **video tiles** | — missing (folded into a generic support grid) ❌ |
| 8 | `bottom-big-video` container | — missing |
| 9 | Footer (5 columns + separate bottom bar + cookie banner) | 4-column footer ❌ |

### M4 — Footer is the wrong structure

Reference footer is **five columns** with explicit desktop widths, then a **separate bottom bar**:

| Column | Desktop width |
| --- | --- |
| Company (incl. WhistleBlowing block) | `9vw` ≈ 130px |
| Resources | `10.17vw` ≈ 146px |
| Discover | `9.5vw` ≈ 137px |
| OPay Office (single HQ address) | `10.17vw` ≈ 146px, `margin-right: 4vw` |
| OPay Office Address (long list of branches) | `38vw` ≈ 547px |

- Footer sits on a **background image** (`foot-bc.png`, `2303×556`, `background-size:cover`)
- Link text: `0.69vw` ≈ **10px**, `line-height: 1.3vw` ≈ 19px, colour `#fff`
- Column titles: `0.78vw` ≈ **11px**, `font-weight:700`, white
- **Separate bottom bar** (`.footer-tip-container`): logo `80px` wide (left), copyright
  `14px` (centre), **four circular social icons `33×33px`, background `#d2f5ec`** (right),
  `padding: 20px 0 15px 110px`
- A **cookie-consent bar** with "Cookie Settings / Accept All / Reject All"

Previous Novus build: 4-column grid on a flat `bg-surface-muted`, logo inside the *first column*,
socials inline in a bottom row with no circular treatment, no cookie banner, no address columns.

### M5 — Header geometry and colour

| | Reference | Previous Novus build |
| --- | --- | --- |
| Desktop height | **exactly 80px** (`height/min/max: 80px`) | `h-20` = 80px ✅ (coincidentally correct) |
| Position | `position: fixed`, `z-index: 100` | `sticky` (visually similar) |
| Desktop padding | `0 80px` | container-based (~64px at 1280 max-width) |
| Background | `#fff` on desktop; `#f4fcfa` on mobile/scroll | `bg-white/95` + blur ⚠️ |
| Box shadow | **always** `0 0 22px rgba(0,0,0,.1)` (not scroll-dependent) | only after 8px scroll ❌ |
| Logo | `113 × 47px`, `object-fit: contain` | no size constraint (square 204×204 asset) ❌ |
| Nav items | `font-size:16px`, `margin: 0 max(16px, min(2vw,30px))`; left margin `30px` after logo | `gap-1` + `px-3` (tighter) ⚠️ |
| Nav colour | `#210f60`, `opacity: .9` | `text-ink-muted` ❌ |
| Nav list | Pushed directly after the logo (`flex:1`) | Pushed to the **right** (`justify-between`) ❌ |
| Dropdown | Plain bordered panel, simple rows, no descriptions | Rounded `rounded-2xl` panel **with descriptions** ❌ |
| Mobile menu | Slides down from top (`top: 100vh` → `top: 15.55vw`), bg `#f4fcfa`, `z-index` management | Fixed overlay from `top-16`, `bg-white`, no slide ⚠️ |
| Header CTAs | **None** — reference nav has no Log in / Open account buttons | Two buttons ❌ |

**Note on the header CTAs:** the reference genuinely has no login/register buttons in the top nav
(they live in the app). Novus *does* need them, so this is one place where a deliberate, documented
divergence is justified — but the buttons should be visually restrained and sit after the nav, not
replace the reference's spacing.

### M6 — Logo aspect-ratio conflict (brand constraint)

The reference logo is a **wide wordmark (113×47, ratio 2.4)**. The supplied Novus asset
(`assets/novusmfb logo.png`) is a **square 204×204 mark**. Forcing it into a 113×47 box would
distort it — which the brief forbids. **Resolution:** render the square mark at ~47×47 with the
"Novus MFB" wordmark set in type beside it, occupying the same 113×47 visual slot. Documented as
an intentional, brand-driven divergence.

### M7 — Colour mapping (reference → Novus)

The reference's palette is green-based; Novus is indigo/red. Per the brief, I preserve the
reference's **contrast relationships** while swapping hue:

| Reference token | Reference value | Novus equivalent | Rationale |
| --- | --- | --- | --- |
| Primary accent surface | `#1dc99b` (green) | `#010065` (brand-700) | Same role: solid colour band behind white text |
| Light accent surface | `#f4fcfa` (mint tint) | `#eef0ff` (brand-50) | Same role: light panel for dark text |
| Accent text on light | `#1dc99f` | `#010065` | Same role: coloured text on tinted panel |
| Dark body text | `#210f60` | `#0b0b1f` (ink) | Same role: near-black heading colour |
| Footer background | `foot-bc.png` (dark photo) | `#010065` gradient | Same role: dark, image-like footer ground |
| Social icon chip | `#d2f5ec` | `#dfe2ff` (brand-100) | Same role: pale circular chip |
| Download band | `#ededed` | `#f5f6fa` (surface-muted) | Same role: neutral band |

### M8 — Missing assets

The reference uses large photographs and looping videos. Novus has **only a logo**. Per the brief,
placeholders must be "visually appropriate", so I will build **branded SVG/CSS panels** (correct
aspect ratios, correct colours, clearly labelled) instead of inserting unrelated stock photos.

---

## 2. Corrections applied

### C1 — Design tokens (`apps/web/tailwind.config.ts`)

- Added `accent`, `band` (`#f5f6fa`), `ink.brand` (`#010065`, standing in for the reference's
  `#210f60`), `header-tint` (`#eef0ff`, standing in for the reference's `#f4fcfa`).
- Added `height.nav` = **80px** and `height['nav-mobile']` = **17.78vw** — the reference's exact
  header heights.
- Added `spacing.gutter` = **80px** (reference desktop container padding).
- Added the reference's hero animations as `fade-up`, `fade-up-250`, `fade-up-500`.

### C2 — Logo lockup (`apps/web/src/components/brand/logo.tsx`)

- The square 204×204 Novus mark is now rendered **at its natural 1:1 ratio** (47px on desktop)
  with the wordmark set in type beside it, so the lockup occupies the reference's 113×47 visual
  slot **without distorting the supplied asset**.
- Added an `tone="inverse"` option for dark surfaces (used by the footer bottom bar).

### C3 — Header (`apps/web/src/components/layout/header.tsx`)

- `sticky` → **`fixed`**, `z-index: 100`.
- Box shadow is now **always on** (`0 0 22px rgba(0,0,0,.1)`), matching the reference — it is no
  longer scroll-dependent.
- Desktop height locked to **exactly 80px** via `lg:h-nav`; mobile **15.55vw**.
- Gutters set to the reference's `0 80px` (mobile `0 5.2vw`).
- Nav list is now pushed **immediately after the logo** with the reference's `30px` left margin,
  instead of being justified to the far right.
- Nav type: `16px` / `line-height: 22px` / `#010065` at `opacity: .9`; item margins use the
  reference's `0 max(16px, min(2vw, 30px))`.
- Dropdown redesigned to a **plain bordered panel with simple rows** (no rounded-2xl, no
  descriptions) to match the reference.
- Mobile menu now **slides down from beneath the header** on an indigo-tinted ground, mirroring the
  reference's `top: 100vh → top: 15.55vw` transition.
- Documented divergence: the reference has **no header CTAs** (login lives in its app). Novus needs
  a web login path, so restrained `Log in` / `Open an account` actions remain — placed after the nav.

### C4 — Layout offset (`apps/web/src/app/layout.tsx`)

- Because the header is now `fixed`, `<main>` receives top padding equal to the header height
  (`pt-[15.55vw] lg:pt-nav`) so no page content sits under the header.

### C5 — Hero (`apps/web/src/components/sections/hero.tsx`, `hero-banner.tsx`)

- Replaced the CSS-gradient panel + invented floating account card with a **full-bleed banner**:
  `aspect-ratio: 390/844` mobile, **`1920/800` desktop** (1440×600 at 1440px), exactly as measured.
- Content is **overlaid and pinned to the bottom** (`flex-col justify-end`, `padding-bottom: 8vw`).
- Headline: `4.17vw` (~60px), `font-weight:700`, `line-height:1.2`, **white**, width `50vw`.
- Subtitle: desktop `1.04vw` (~15px) / `line-height:2.34vw` / width `47.51vw`; mobile
  `3.33vw` / `line-height:6.67vw`. Two text-size branches only (not duplicated DOM).
- Added the reference's **store-badge slots** (`1.95vw × 6.17vw`, gap `2.34vw`) as honest,
  clearly-labelled "Coming soon" placeholders (no fake Apple/Google badges).
- Added a **reserved 401×37 regulatory badge slot** that stays empty until the owner supplies
  verified wording — so the layout matches and nothing shifts later.
- `apps/web/src/components/sections/hero-banner.tsx`: original branded SVG at 1920×800 with a
  left-to-right scrim guaranteeing white-text contrast, standing in for the reference's photograph.

### C6 — "Our Services" (`apps/web/src/components/sections/services.tsx`, `service-art.tsx`)

- Replaced the **3-column icon-card grid** with the reference's **three stacked full-width rows**,
  each with a full-bleed colour panel behind it.
- Rows 1 and 3: solid brand panel + white text; **row 2 reversed** (`flex-row-reverse`) on a light
  `brand-50` panel with brand-coloured text.
- Title: `3.1vw` (~45px), `font-weight:600`, `padding-left:5.69vw`, left-aligned.
- Row padding `0 5.6vw 0 5.69vw`; text column `41.7vw`; body `1.56vw` / `33.7vw`.
- Image: **`aspect-ratio: 622/455`, width `43.8vw`, border-radius 1vw, margin `4.43vw 0 4.43vw 56px`**
  — the reference's exact image geometry.
- `service-art.tsx`: three original vector illustrations at 622/455 (transfers / card / savings),
  used instead of unrelated stock photography.

### C7 — Download-app band (`apps/web/src/components/sections/download-app.tsx`, `download-app-art.tsx`) — NEW

- Previously **entirely missing**. Now built to the reference's geometry:
  `background #f5f6fa` (ref `#ededed`), `padding 4.04vw 0`, container `4.04vw 5.65vw`,
  phone art **`49.56vw × 27.56vw`** (~713×397, radius 8px), text `margin-left 3.91vw`, width `31vw`,
  QR slot **`12vw × 12.4vw`** (~173×179).
- QR is a clearly-marked placeholder frame (not a fake scannable code) and the section states
  honestly that the app is not yet published.

### C8 — Testimonials (`apps/web/src/components/sections/testimonials.tsx`) — NEW

- Reference section "Here is what our customers think" was missing. Structure recreated; the three
  quote cards are **clearly labelled as pending verification** rather than invented testimonials.

### C9 — Security (`apps/web/src/components/sections/security.tsx`, `security-tile-art.tsx`)

- Replaced the 3-icon-card layout with the reference's **solid brand band** (ref `#1dc99b` →
  Novus `#010065`), containing **two stacked media tiles on the left** and a heading + three text
  blocks on the right.
- Tiles: **`aspect-ratio: 1004/425`, width `41.1vw`** (~592px), stacked with `1.4vw` gap.
- Heading `3.13vw` (~45px), bold, `line-height:4.65vw`, width `40.4vw`.
- A bordered note states that regulatory/insurance wording will only appear once verified.

### C10 — Customer Satisfaction (`apps/web/src/components/sections/satisfaction.tsx`, `satisfaction-video-art.tsx`) — NEW

- Previously missing. Recreated: text column (heading + body + **hotline block**) beside **two media
  tiles**, mirroring the reference's layout and its phone-icon hotline treatment.
- Hotline numbers are shown as **"Not configured yet"** placeholders — no invented phone numbers.

### C11 — Footer (`apps/web/src/components/layout/footer.tsx`)

- Rebuilt from a 4-column grid to the reference's **five columns** with explicit desktop widths:
  Company `9vw` / Resources `10.17vw` / Discover `9.5vw` / Office `10.17vw`
  (`margin-right:4vw`) / Office Address `38vw`.
- Dark ground (brand gradient standing in for the reference's photographic `foot-bc.png`).
- Column titles `0.78vw` (~11px) bold white; links `0.69vw` (~10px) / `line-height:1.3vw`.
- Added the reference's **separate bottom bar**: logo (80px wide) left, copyright (14px) centre,
  **four circular 33×33 social chips** (`brand-100`, standing in for `#d2f5ec`) right.
- Added the **Whistleblowing** block to the Company column (reference has one).

### C12 — Homepage order (`apps/web/src/app/page.tsx`)

- Reordered to the verified reference structure: Hero → Our Services → Download app → Testimonials →
  Security → Customer satisfaction, then Novus-only Support → FAQ → closing CTA at the end.
- Support/FAQ/CTA are documented as Novus additions (the reference handles these in-app) and are
  deliberately placed last so they do not disturb the reference's opening rhythm.

---

## 3. Remaining differences

These are known, deliberate, or unverifiable-without-assets differences:

1. **Photography and video.** The reference uses licensed photographs and autoplaying video loops.
   Novus has only a logo. Every image slot is filled with an **original branded SVG** at the correct
   aspect ratio and visual weight. This is the single largest remaining visual difference, and it is
   asset-driven, not structural. Replacing `hero-banner.tsx`, `service-art.tsx`,
   `security-tile-art.tsx`, `satisfaction-video-art.tsx` and `download-app-art.tsx` with real imagery
   requires no layout change.
2. **Regulatory badge.** The reference shows a NIP/NDIC-style badge image. Novus's slot is reserved
   but empty, because no licence or insurance claim may be made until verified.
3. **Header CTAs.** The reference has none; Novus has restrained `Log in` / `Open an account`
   buttons, because Novus is a web platform. Documented divergence.
4. **Support / FAQ / closing CTA sections.** Present on Novus, absent on the reference.
5. **Cookie-consent bar.** The reference shows a cookie bar with "Cookie Settings / Accept All /
   Reject All". **Not** implemented here — it depends on the owner's analytics/consent decisions.
6. **Font.** The reference uses a proprietary typeface; Novus uses Inter. Heading sizes, weights and
   line-heights are matched numerically, but the letterforms differ.
7. **Carousels.** The reference's testimonial container is populated client-side; the exact carousel
   behaviour could not be read from server-rendered markup, so the Novus version is a static grid.
8. **Mobile hero branch.** The reference renders separate mobile and desktop markup; Novus uses one
   responsive branch that produces the same visual result with a single accessibility tree.

---

## 4. Verification

### What was verified

| Check | Result |
| --- | --- |
| `npm run typecheck --workspace=apps/web` | **PASS** — 0 errors |
| `npm run lint --workspace=apps/web` | **PASS** — `eslint .`, 0 errors, 0 warnings |
| `npm run build --workspace=apps/web` | **PASS** — compiled in 53s, **25/25** static pages generated |
| `npm run test --workspace=apps/web` (Vitest) | **PASS** — 14/14 tests |
| Live `GET /` on the dev server | **HTTP 200**, all corrected sections present |
| All other public routes | **HTTP 200** |
| Rendered section order | **matches the verified reference order** |
| Reference CSS values read directly from `opayweb.com` stylesheets | **DONE** — all numbers above are measured, not estimated |
| Reference banner image dimensions measured from the downloaded file | **DONE** — `indexBanner.jpg` 2304×918, `headerBannerMobile.jpg` 720×1158, `foot-bc.png` 2303×556 |
| Playwright E2E suite (`e2e/reference-fidelity.spec.ts`, `design-system.spec.ts`, `public-site.spec.ts`) | **PASS — 78/78** on Chromium desktop + Pixel 5 (2026-10-25, production build) |

### What could NOT be verified

- **A screenshot/pixel-diff overlay against opayweb.com was not produced.** The reference pages were
  not captured in this environment's browser session, so every quantitative claim above still comes
  from the reference's own CSS and image files, not from a rendered comparison. The E2E suite
  asserts structure, geometry, contrast and honesty — **this is still not a screenshot comparison.**
- The reference's runtime-populated sections (testimonials carousel) and its video files could not
  be inspected.
- The reference's non-homepage pages were not inspected for this task.

### Live render evidence (dev server, `http://localhost:3000`)

| Check | Result |
| --- | --- |
| `GET /` | **HTTP 200**, 243,159 bytes |
| All 15 other public routes | **HTTP 200** (no regression from the fixed-header offset) |
| Served CSS contains `aspect-ratio: 1920/800`, `390/844`, `622/455`, `1004/425`, `49.56/27.56` | **YES** — all matched in the served stylesheet |
| Served CSS contains `h-nav`, `gutter`, `15.55vw` tokens | **YES** |

**Rendered document order of section landmarks** (extracted from the live HTML with scripts/styles
stripped). This is the key structural proof that the correction landed:

```
  [20826] Beyond the Branch              ← hero
  [23656] Our Services                   ← services heading
  [24129] Fund your account...           ←   service row 1
  [27276] Novus debit cards...           ←   service row 2
  [29785] Novus Savings                  ←   service row 3
  [35343] scan and download              ← download-app band
  [35990] what our customers think       ← testimonials
  [42050] Your security and privacy      ← security band
  [43907] Customer satisfaction          ← satisfaction
  [49096] Support that is always...      ← Novus addition
  [53601] Frequently asked...            ← Novus addition
```

This matches the verified reference order exactly (Hero → Services → Download → Testimonials →
Security → Satisfaction), with the two documented Novus-only sections placed last.

### Failed attempts (recorded honestly)

Three `next build` runs and two `next dev` runs initially failed with
`EPERM: operation not permitted, open 'C:\Novusweb\apps\web\.next\trace'` — a **Windows file lock**
on the Next.js trace file, held by a concurrently running build, **not** a code defect. `.next` was
deleted and the build re-run cleanly; it then compiled and generated all 25 pages.

Separately, one build was attempted with `NEXT_DIST_DIR=.next-check` to avoid the lock; that failed
with `Invariant: no direct app page entry found for /_not-found`, which is a Next.js limitation when
the dist directory is renamed — also not a code defect. The standard `npm run build` was used instead.
