import { cn } from '@/lib/cn';
import type { ImageSlot } from '@/lib/images';
import { SmartImage } from './smart-image';

interface PageBannerProps {
  slot: ImageSlot;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

/**
 * Inner-page banner: a full-bleed image with the page title overlaid.
 *
 * Mirrors the reference site's treatment — image fills the band with
 * `object-fit: cover`, a brand scrim guarantees text contrast at every screen
 * size, and the copy is bottom-left aligned.
 *
 * Layout:
 *   - desktop: 1920x480 slot (ratio 1920/480), ~26rem tall
 *   - mobile:  the same file, cropped from the centre; the band is shorter so no
 *              letterboxing or distortion occurs.
 *
 * Replace the image by dropping a new file at the manifest path — no code change.
 */
export function PageBanner({ slot, eyebrow, title, description, className }: PageBannerProps) {
  return (
    <section className={cn('relative w-full overflow-hidden bg-brand-800', className)}>
      {/* `min-h` (not a fixed height) so a long title or description grows the
          band instead of being clipped by `overflow-hidden`. */}
      <div className="relative min-h-[15rem] w-full sm:min-h-[18rem] lg:min-h-[21rem]">
        {/* Background image, decorative: the real heading is the <h1> below. */}
        {slot.src ? (
          <SmartImage
            slot={{ ...slot, alt: '' }}
            sizes="100vw"
            priority
            className="absolute inset-0 h-full w-full"
          />
        ) : null}

        {/* Brand scrim — same role as the reference's overlay so text stays legible. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-brand-900/85 via-brand-800/70 to-brand-700/45"
        />

        <div className="relative flex h-full min-h-[inherit] items-end">
          <div className="w-full px-[5.5vw] pb-8 lg:px-gutter lg:pb-12">
            <div className="max-w-3xl animate-fade-in">
              {eyebrow ? (
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-white/75">
                  {eyebrow}
                </p>
              ) : null}
              <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{title}</h1>
              {description ? (
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
                  {description}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
