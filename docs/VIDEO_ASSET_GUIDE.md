# Video asset guide

This is the owner-facing companion to
`apps/web/public/videos/README.md`. It explains what each video slot is for, what
to send, and how to replace it without touching code.

## The replacement contract

**Filename is the API.** Replacing a file with the same name in the same folder
requires no source edits.

```
apps/web/public/videos/home/customer-service.mp4
```

Drop a new MP4 over that path and the home page uses it. Nothing else changes.

To add a brand-new video slot you edit two places:

1. Add the file under `public/videos/...`.
2. Add an entry to `apps/web/src/lib/videos.ts` (src, poster, size, aspect,
   label) and render `<SmartVideo slot={...} />` in the section.

## What to send

| Slot | What the clip should show | Orientation | Length |
| --- | --- | --- | --- |
| `home/customer-service.mp4` | A real support interaction: an agent helping a customer, warm and calm. No identifiable account data on screen. | Landscape 4:3 | 6–10 s |
| `home/customer-stories.mp4` | A customer using the product confidently (phone in hand, smiling). Only use people who have signed a release form. | Landscape 4:3 | 6–10 s |
| `home/security-fraud.mp4` | Abstract security visuals — a lock, a shield, a phone being secured. Avoid showing real PINs, OTPs or card numbers. | Landscape ~2.36:1 | 6–10 s |
| `home/security-lock.mp4` | Someone locking a card in an app, or an abstract "frozen card" animation. | Landscape ~2.36:1 | 6–10 s |

## Technical checklist

- MP4 / H.264, `yuv420p`, faststart, **no audio**.
- Source width at least the size in the table; keep under the file-size limits in
  the folder README.
- Centre-safe composition: mobile crops the edges.
- No on-screen text that carries meaning (it cannot be translated or read at
  small sizes).
- Never include real customer data, account numbers, card numbers, PINs or OTPs.
- Ensure you have written permission for every identifiable person.

## What is shipped today

Four generated placeholder clips (brand navy, large type naming the intended
footage). They are safe to deploy: they contain no claims, no people and no
financial data. Replace them before launch, and set `isPlaceholder: false` in
`src/lib/videos.ts` for each real clip you supply.

## Why posters still exist

Each video slot declares a poster image from
`apps/web/src/lib/images.ts`. The poster is shown while the clip buffers, when
autoplay is blocked, when the visitor prefers reduced motion, and if the video
file is missing. That is why every slot stays visually complete even with no
video at all.
