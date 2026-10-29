# Novus MFB — Website Images

Everything here is a **drop-in replacement**. To change any picture on the website, replace the
file in this folder using **the same filename**. No HTML, CSS, JavaScript or React code needs to
change.

After replacing a file you only need to refresh the browser. In production, redeploy (see
[Cache and deployment](#cache-and-deployment)).

---

## Quick start — replace one image

1. Open this folder: `apps/web/public/images/`
2. Find the folder + filename you want (see the inventory below).
3. Save your new picture **over the old file, keeping the same name** (e.g.
   `banners/about-hero.jpg` for a placeholder, or `banners/home-hero.webp` for a hero).
4. Make sure your picture has roughly the **same aspect ratio** listed below, otherwise it will be
   cropped (it will never be stretched or distorted).
5. Refresh the browser.

> **Important:** do not rename files. The filename is the link between the file and the website.

---

## Folder structure

```text
apps/web/public/images/
├── README.md                     ← this file
├── banners/                      full-width page banners
│   ├── home-hero.webp            home page hero — DESKTOP
│   ├── home-hero-mobile.webp     home page hero — PHONES
│   ├── about-hero.jpg
│   ├── personal-banking.jpg
│   ├── services-banner.jpg      (used by the Savings page)
│   ├── loans-banner.jpg
│   ├── contact-banner.jpg
│   ├── security-banner.jpg
│   ├── careers-banner.jpg
│   └── newsroom-banner.jpg
├── home/                         home page section imagery
│   ├── services.jpg             Our Services row 1
│   ├── debit-card.jpg           Our Services row 2
│   ├── savings.jpg              Our Services row 3
│   ├── mobile-banking.jpg       Download-app band
│   ├── security-fraud.jpg       Security tile 1
│   ├── security-lock.jpg        Security tile 2
│   ├── customer-service.jpg     Satisfaction tile 1
│   └── customer-stories.jpg     Satisfaction tile 2
├── about/                        About page imagery + board portraits
│   ├── about-intro.jpg
│   ├── team-group.jpg
│   ├── board-chairman.jpg
│   ├── board-member-02.jpg
│   ├── board-member-03.jpg
│   └── board-member-04.jpg
├── team/                         staff portraits
│   ├── managing-director.jpg
│   ├── operations-manager.jpg
│   ├── customer-service-manager.jpg
│   └── it-manager.jpg
├── services/                     product page imagery
│   ├── personal-banking.jpg
│   ├── savings.jpg
│   └── loans.jpg
└── icons/                        small icons (empty — reserved)
```

---

## Full image inventory

**Format:** the 31 placeholder files are **JPG**. The two home hero files are real photographs and
remain **WebP**. All slots are served through `next/image`, which negotiates AVIF/WebP
automatically.

**Max size** is a practical budget for good performance, not a hard limit.

### Banners

| File | Page / section | Recommended size | Ratio | Orientation | Max |
| --- | --- | --- | --- | --- | --- |
| `banners/home-hero.webp` | Home — hero banner (desktop + tablet) | **1920 × 800** | 1920:800 (2.4:1) | Landscape | 350 KB |
| `banners/home-hero-mobile.webp` | Home — hero banner (phones) | **780 × 1688** | 390:844 | Portrait | 250 KB |
| `banners/about-hero.jpg` | About Us — banner | **1920 × 480** | 4:1 | Landscape | 250 KB |
| `banners/personal-banking.jpg` | Personal Banking — banner | **1920 × 480** | 4:1 | Landscape | 250 KB |
| `banners/services-banner.jpg` | Savings — banner | **1920 × 480** | 4:1 | Landscape | 250 KB |
| `banners/loans-banner.jpg` | Loans — banner | **1920 × 480** | 4:1 | Landscape | 250 KB |
| `banners/contact-banner.jpg` | Contact — banner | **1920 × 480** | 4:1 | Landscape | 250 KB |
| `banners/security-banner.jpg` | Security — banner | **1920 × 480** | 4:1 | Landscape | 250 KB |
| `banners/careers-banner.jpg` | Careers — banner | **1920 × 480** | 4:1 | Landscape | 250 KB |
| `banners/newsroom-banner.jpg` | Newsroom — banner | **1920 × 480** | 4:1 | Landscape | 250 KB |

> **Banner tip:** page banners have text over the left-hand side. Keep the **left third of the
> picture calm and fairly dark** so the white heading stays readable. The site adds a dark scrim
> automatically, but a busy left edge still hurts legibility.

### Home page sections

| File | Page / section | Recommended size | Ratio | Orientation | Max |
| --- | --- | --- | --- | --- | --- |
| `home/services.jpg` | Our Services — row 1 (transfers) | **1244 × 910** | 622:455 (1.37:1) | Landscape | 200 KB |
| `home/debit-card.jpg` | Our Services — row 2 (cards) | **1244 × 910** | 622:455 | Landscape | 200 KB |
| `home/savings.jpg` | Our Services — row 3 (savings) | **1244 × 910** | 622:455 | Landscape | 200 KB |
| `home/mobile-banking.jpg` | Download-app band | **1426 × 794** | 49.56:27.56 (1.8:1) | Landscape | 220 KB |
| `home/security-fraud.jpg` | Security — tile 1 | **1400 × 592** | 1004:425 (2.36:1) | Landscape | 180 KB |
| `home/security-lock.jpg` | Security — tile 2 | **1400 × 592** | 1004:425 | Landscape | 180 KB |
| `home/customer-service.jpg` | Customer satisfaction — tile 1 | **800 × 600** | 4:3 | Landscape | 150 KB |
| `home/customer-stories.jpg` | Customer satisfaction — tile 2 | **800 × 600** | 4:3 | Landscape | 150 KB |

> Rows 1 and 3 of "Our Services" sit on a **dark indigo** panel; row 2 sits on a **light** panel.
> Choose colours that contrast with each.

### About page

| File | Page / section | Recommended size | Ratio | Orientation | Max |
| --- | --- | --- | --- | --- | --- |
| `about/about-intro.jpg` | About — mission image | **1200 × 900** | 4:3 | Landscape | 180 KB |
| `about/team-group.jpg` | About — team group photo (reserved) | **1600 × 900** | 16:9 | Landscape | 250 KB |

### Board of Directors portraits

| File | Person slot | Recommended size | Ratio | Orientation | Max |
| --- | --- | --- | --- | --- | --- |
| `about/board-chairman.jpg` | Board Chairman | **800 × 1000** | 4:5 | **Portrait** | 120 KB |
| `about/board-member-02.jpg` | Board Member 02 | **800 × 1000** | 4:5 | **Portrait** | 120 KB |
| `about/board-member-03.jpg` | Board Member 03 | **800 × 1000** | 4:5 | **Portrait** | 120 KB |
| `about/board-member-04.jpg` | Board Member 04 | **800 × 1000** | 4:5 | **Portrait** | 120 KB |

### Team portraits

| File | Person slot | Recommended size | Ratio | Orientation | Max |
| --- | --- | --- | --- | --- | --- |
| `team/managing-director.jpg` | Managing Director / CEO | **800 × 1000** | 4:5 | **Portrait** | 120 KB |
| `team/operations-manager.jpg` | Operations Manager | **800 × 1000** | 4:5 | **Portrait** | 120 KB |
| `team/customer-service-manager.jpg` | Customer Service Manager | **800 × 1000** | 4:5 | **Portrait** | 120 KB |
| `team/it-manager.jpg` | IT / Technology Manager | **800 × 1000** | 4:5 | **Portrait** | 120 KB |

> **Portrait tip:** portraits are cropped with the **top** of the image anchored, so keep the
> person's head in the **upper third** with a little space above the hair. Chest-up framing at
> 800 × 1000 works best.

### Service pages

| File | Page | Recommended size | Ratio | Orientation | Max |
| --- | --- | --- | --- | --- | --- |
| `services/personal-banking.jpg` | Personal Banking | **1244 × 910** | 622:455 | Landscape | 200 KB |
| `services/savings.jpg` | Savings | **1244 × 910** | 622:455 | Landscape | 200 KB |
| `services/loans.jpg` | Loans | **1244 × 910** | 622:455 | Landscape | 200 KB |

---

## About the current placeholder images

The two home hero files (`banners/home-hero.webp` and `banners/home-hero-mobile.webp`) are **real
photographs**. Every other file is a generated **JPG placeholder**. Each placeholder:

- is named with its intended use in large type (e.g. `ABOUT US BANNER`);
- shows the exact recommended pixel size;
- uses Novus brand colours;
- for people, shows a **neutral faceless silhouette** labelled `PLACEHOLDER · not a real person`.

**The people shown are not real directors or employees of Novus MFB.** The names on the cards
("Board Chairman", "Managing Director", etc.) are role labels, not identities.

Regenerate all placeholders at any time:

```powershell
node scripts/generate-placeholder-images.mjs
```

> ⚠️ That command **overwrites the 31 JPG placeholder files**. It deliberately skips the two home
> hero photographs, so it is safe to run after the heroes have been replaced.

---

## Replacing a board or staff portrait

1. Save the portrait as **800 × 1000** px, ratio **4:5**, portrait orientation.
2. Overwrite the matching file, e.g. `about/board-chairman.jpg`.
3. Update the person's **name** (and role/bio if you have them) in
   `apps/web/src/lib/images.ts` — search for `boardMembers` or `teamMembers`.
4. Refresh.

Until step 3 is done, the card will show the new photo next to the placeholder name.

### Adding another board member or staff member

1. Save a new portrait, e.g. `about/board-member-05.jpg` (800 × 1000).
2. Open `apps/web/src/lib/images.ts`.
3. Add an entry to the end of the `boardMembers` (or `teamMembers`) array:

   ```ts
   {
     src: '/images/about/board-member-05.jpg',
     name: 'Full Name Here',
     role: 'Non-Executive Director',
     bio: 'Optional short biography.',   // optional — delete this line if not supplied
     label: 'BOARD MEMBER 05',
   },
   ```

4. Save the file. The carousel updates automatically — no component changes.

**Removing** a person is the reverse: delete their array entry (and optionally the image file).

---

## How the site finds these images

- The **single source of truth** is `apps/web/src/lib/images.ts`. It lists every slot, its path,
  its recommended dimensions and its aspect ratio.
- Components render images through `src/components/ui/smart-image.tsx`, which reads that manifest.
- Because paths are **public URLs** (`/images/...`), they work identically on your Windows machine
  and on the deployed server. There are no absolute `C:\` paths anywhere in the code.

## Supported formats

| Format | Supported | Notes |
| --- | --- | --- |
| **JPG / JPEG** | ✅ | Used by all 31 placeholders; fine for photographs |
| **WebP** | ✅ | Used by the two real home hero photographs |
| AVIF | ✅ | Even smaller; slower to encode |
| PNG | ✅ | Use for transparency/logos |
| SVG | ✅ | Use for icons and diagrams |

Whatever format you use, **keep the existing filename and extension** (`.jpg` for placeholders,
`.webp` for the two hero photos), or update the path in `src/lib/images.ts` to match your new
extension.

## Cache and deployment

**Local development** (`npm run dev:web`): the browser may cache an image. Hard-refresh with
`Ctrl + Shift + R` (or `Ctrl + F5`).

**Production build** (`npm run build`): Next.js fingerprints optimised images by their content, so a
replaced file gets a **new URL** and is picked up immediately after a redeploy. To update live:

```powershell
git add apps/web/public/images
git commit -m "images: replace <which image>"
# then redeploy
```

If you are hosting on a CDN, purge the CDN cache for `/images/*` and `/_next/image*` after deploying.

## Related documentation

- `docs/IMAGE_ASSET_GUIDE.md` — architecture, naming conventions and responsive image rules.
- `apps/web/src/lib/images.ts` — the image manifest.
