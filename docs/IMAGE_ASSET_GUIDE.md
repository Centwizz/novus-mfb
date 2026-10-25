# Image Asset Guide

**Status:** implemented
**Owner-facing companion:** `apps/web/public/images/README.md` (the practical, file-by-file guide)

This document explains *how* images work in the Novus MFB web app — the architecture, the naming
conventions and the rules that keep image replacement source-code-free.

---

## 1. The problem this solves

The site needs to show banners, section artwork and staff portraits, but:

- the project owner must be able to **replace any picture himself** without touching code;
- the same layout must not break when an image is swapped for a different file;
- images must never be scattered next to components;
- no absolute `C:\...` paths may leak into the code.

## 2. Architecture at a glance

```text
apps/web/public/images/<folder>/<name>.webp      ← the actual files (public URLs)
        ▲
        │ referenced by public path only ("/images/home/services.webp")
        │
apps/web/src/lib/images.ts                        ← MANIFEST: path + dimensions + ratio + alt
        ▲
        │ consumed by
        │
apps/web/src/components/ui/smart-image.tsx        ← renders <Image> with cover + fixed ratio
        ▲
        │ used by
        │
components/sections/*  ·  ui/page-banner.tsx  ·  ui/person-card.tsx
```

Three files, three responsibilities:

| File | Responsibility |
| --- | --- |
| `public/images/**` | Holds the bytes. Replaced by the owner. |
| `src/lib/images.ts` | Declares every slot: path, recommended px size, aspect ratio, alt text. |
| `src/components/ui/smart-image.tsx` | Applies `object-fit: cover`, the ratio and responsive `sizes`. |

**Key property:** the filename is the contract. Replacing
`public/images/about/board-chairman.webp` with a new file of the same name changes the website
with **zero code edits**.

## 3. Why a manifest instead of hard-coded paths

Hard-coding `src="/images/home/services.webp"` in a component works but rots: dimensions drift,
alt text gets forgotten, and nobody knows the recommended size.

The manifest centralises:

- **the recommended source dimensions** (used by the README and by `next/image`);
- **the aspect ratio** the layout reserves, which prevents layout shift;
- **the alt text**, so accessibility is not an afterthought;
- **the slot label** (e.g. `HOME HERO (DESKTOP)`) used by the placeholder generator.

## 4. Responsive image rules

1. **Never distort.** `SmartImage` always applies `object-cover` (or `object-contain` where
   declared). The container's aspect ratio wins; the image is cropped, never stretched.
2. **Reserve the ratio.** Containers use `aspect-[…]` matching the manifest, so the page does not
   jump while images load.
3. **Use `sizes`.** Every call passes a `sizes` hint so phones download a small file and desktops a
   large one. Examples used in this project:
   - full-bleed banner → `sizes="100vw"`
   - 3-up grid → `sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 80vw"`
   - 44vw service panel → `sizes="(min-width: 1024px) 44vw, 90vw"`
4. **Protect subjects from cropping.** Portraits pass `objectPosition="center top"` so heads are
   never cut off when the crop tightens on mobile.
5. **Mobile-specific crops where justified.** The home hero has a dedicated portrait asset
   (`home-hero-mobile.webp`); everything else reuses one file cropped by CSS, which keeps the asset
   count manageable.
6. **Above-the-fold images are `priority`;** everything else lazy-loads by default.

### Format and weight

- Preferred format: **WebP**. `next.config.mjs` also lists AVIF, and `next/image` negotiates the
  best format the browser supports.
- Per-slot size budgets are documented in `public/images/README.md` (roughly 120–350 KB).
- No extra image-processing dependency was added; optimisation is handled by `next/image`
  and the placeholder generator uses `sharp`, which already ships with Next.js.

## 5. Naming conventions

```text
<area>/<purpose>.webp
```

- **Lowercase, hyphen-separated.** `board-member-02`, not `BoardMember2`.
- **Describe the slot, not the picture.** `home-hero`, not `sunset-photo`.
- **Number repeated slots predictably.** `board-member-02`, `-03`, `-04`.
- **Role-based names for people.** `managing-director.webp` — so replacing the person does not
  require renaming the file.

## 6. Banner behaviour

Inner pages use `src/components/ui/page-banner.tsx`:

- full-bleed image with `object-cover`;
- fixed band heights: `15rem` mobile → `18rem` tablet → `21rem` desktop (`1920 × 480` slot);
- a brand gradient scrim over the image so white text is legible whatever photo is supplied;
- copy bottom-left, matching the reference site's treatment.

The home hero uses two assets:

| Slot | File | Used on |
| --- | --- | --- |
| Desktop | `banners/home-hero.webp` | ≥1024px |
| Mobile | `banners/home-hero-mobile.webp` | <1024px |

If you only supply the desktop file, mobile simply shows the same picture cropped by
`object-cover` — there is no broken state. To use a proper mobile crop, replace the mobile file.

## 7. People: Board of Directors and Team

Both sections are rendered by the **same** component, so they cannot drift apart:

```text
src/components/ui/people-carousel.tsx   → section shell + carousel
src/components/ui/carousel.tsx          → accessible, touch-enabled carousel
src/components/ui/person-card.tsx       → one profile card
```

Data lives in `src/lib/images.ts`: `boardMembers` and `teamMembers`.

**All current entries are placeholders.** The names are role labels ("Board Chairman",
"Managing Director"), not real people, and the cards say so explicitly. No biography is invented.

### Carousel behaviour

- **3 cards** on desktop (≥1024px), **2** on tablet (≥640px), **1** on mobile.
- Prev/next buttons disable at the ends.
- Pagination dots jump directly to a slide.
- Keyboard: `←` / `→` step, `Home` / `End` jump.
- Touch/pointer: horizontal swipe with a 40px threshold (so a tap never navigates).
- The track is clipped (`overflow-hidden`), so **horizontal page scrolling is impossible**.
- A polite live region announces the current slide to screen readers.

## 8. Adding or changing a person

1. Add the portrait at **800 × 1000** (4:5) under `public/images/about/` or `public/images/team/`.
2. Add an entry to `boardMembers` / `teamMembers` in `src/lib/images.ts`:

   ```ts
   {
     src: '/images/team/head-of-credit.webp',
     name: 'Full Name',
     role: 'Head of Credit',
     bio: 'Optional, only if supplied and approved.',
     label: 'HEAD OF CREDIT',
   }
   ```

3. The carousel, card and pagination update automatically.

To remove someone, delete their entry.

## 9. Guardrails

- **No invented people or credentials.** Every unsupplied profile is visibly labelled
  "Placeholder profile — awaiting details from the bank."
- **No unrelated stock photography.** Placeholders are generated brand graphics at the correct
  ratio, never random photos of strangers.
- **No absolute local paths** anywhere in the codebase.
- **Regulatory imagery stays absent** until verified. The hero reserves a badge slot but renders
  nothing there.

## 10. Regenerating placeholders

```powershell
node scripts/generate-placeholder-images.mjs
```

Writes all 33 placeholder files at their exact slot dimensions and reports each file size.

> ⚠️ Destructive: overwrites every file in `public/images/`. Do not run after supplying real
> photographs.

## 11. Verification performed

| Check | Result |
| --- | --- |
| `npx tsc --noEmit` (web) | PASS |
| `npm run lint --workspace=apps/web` | PASS (0/0) |
| `npm run build --workspace=apps/web` | PASS |
| `npm run test --workspace=apps/web` | PASS |
| Placeholder files exist at declared dimensions | PASS (33 files verified via `sharp` metadata) |
| All image paths are public `/images/...` URLs | PASS |
