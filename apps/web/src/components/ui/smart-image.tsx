import Image from 'next/image';
import { cn } from '@/lib/cn';
import type { ImageSlot } from '@/lib/images';

interface SmartImageProps {
  slot: ImageSlot;
  /**
   * Sizes attribute for responsive loading. Always pass this for full-bleed or
   * grid images so the browser picks an appropriately sized file.
   */
  sizes: string;
  className?: string;
  /** Load eagerly (above the fold). Defaults to lazy. */
  priority?: boolean;
  /** Overrides the manifest aspect (rarely needed). */
  aspect?: string;
  /** Object position, e.g. "center top" to protect faces/heads from cropping. */
  objectPosition?: string;
}

/**
 * Renders an image declared in the central manifest (`src/lib/images.ts`).
 *
 * Every banner, section photo and portrait goes through here, so:
 *   - the file lives in `apps/web/public/images/...` (never beside a component);
 *   - replacing the file at the same path needs NO code change;
 *   - `object-fit: cover` fills the slot without ever distorting the image;
 *   - the aspect ratio comes from the manifest, so the slot never shifts.
 *
 * If `slot.src` is null the slot renders nothing (used for intentionally
 * reserved-but-empty positions). Missing files are handled by `onError` at the
 * call site when a fallback is desired.
 */
export function SmartImage({
  slot,
  sizes,
  className,
  priority = false,
  aspect,
  objectPosition = 'center',
}: SmartImageProps) {
  if (!slot.src) return null;

  return (
    <Image
      src={slot.src}
      alt={slot.alt}
      width={slot.width}
      height={slot.height}
      sizes={sizes}
      priority={priority}
      className={cn(slot.fit === 'cover' ? 'object-cover' : 'object-contain', className)}
      style={{ aspectRatio: aspect ?? slot.aspect, objectPosition }}
    />
  );
}
