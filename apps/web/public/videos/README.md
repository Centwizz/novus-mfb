# Video assets

All videos on the public website live in this folder. No video file is imported
from an absolute path, and no component contains a hard-coded URL beyond the
central manifest at `apps/web/src/lib/videos.ts`.

## How replacement works

1. Keep the **same filename** and drop your clip into the same folder.
2. That is the whole change — no code edit, no rebuild of a component, no deploy
   config change.

Example: to replace the customer-service loop, overwrite
`public/videos/home/customer-service.mp4`. The section picks it up on the next
request (or after a redeploy if the site is statically cached).

If a clip is missing or fails to load, the section falls back to the poster image
declared for that slot in `src/lib/videos.ts` — the layout never collapses.

## File inventory

| File | Used on | Slot aspect | Source size | Length | Format | Max size |
| --- | --- | --- | --- | --- | --- | --- |
| `home/customer-service.mp4` | Home — Customer satisfaction, left tile | 4 / 3 | 1200 × 900 | 8 s loop | MP4 (H.264, no audio) | 3 MB |
| `home/customer-stories.mp4` | Home — Customer satisfaction, right tile | 4 / 3 | 1200 × 900 | 8 s loop | MP4 (H.264, no audio) | 3 MB |
| `home/security-fraud.mp4` | Home — Security band, top tile | 1004 / 425 | 1004 × 426 | 8 s loop | MP4 (H.264, no audio) | 2 MB |
| `home/security-lock.mp4` | Home — Security band, bottom tile | 1004 / 425 | 1004 × 426 | 8 s loop | MP4 (H.264, no audio) | 2 MB |

All clips are currently **placeholders**: a brand-coloured card with large type
naming the intended footage. Record that in `src/lib/videos.ts` with
`isPlaceholder: true`; set it to `false` when real footage is supplied.

## Encoding rules

- Container: MP4, H.264 (`yuv420p`) with `-movflags +faststart`.
- No audio track. The players are muted, looping and decorative; audio would
  never play and only adds weight.
- Keep clips short (6–10 s) and under the size limits above. These are
  background loops, not films.
- Match the slot aspect ratio. Slight differences are centre-cropped by
  `object-fit: cover`, but the main subject must stay in the centre safe area.
- Do not burn text into real footage unless it is legally required: text is
  hard to read on small screens and cannot be translated.

## Regenerating the placeholders

```powershell
node scripts/generate-placeholder-videos.mjs           # skip existing files
node scripts/generate-placeholder-videos.mjs --force   # overwrite everything
```

The script needs `ffmpeg` with `libfreetype` (for `drawtext`) on `PATH`. On
Windows: `choco install ffmpeg -y`. If ffmpeg is unavailable the site still
works — every slot simply shows its poster image.

The generated clips contain the text "Placeholder video — replace this file", so
it is impossible to ship them by accident without noticing.

## Accessibility

- Videos are muted, looping and marked `aria-hidden` — the section heading and
  copy carry the meaning.
- `prefers-reduced-motion: reduce` pauses playback and leaves the poster image
  visible.
- There are no autoplaying videos with sound anywhere on the site.
