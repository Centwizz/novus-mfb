import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { siteConfig } from '@/lib/site-config';

interface LogoProps {
  className?: string;
  /** Rendered height of the square mark in pixels. */
  height?: number;
  withWordmark?: boolean;
  href?: string | null;
  /** Colour treatment for the mark and wordmark when placed over a dark surface. */
  tone?: 'default' | 'inverse';
}

/**
 * Novus MFB logo lockup.
 *
 * The reference site uses a wide wordmark logo (113x47). The owner-supplied Novus
 * asset is a SQUARE mark (204x204), so stretching it to 113x47 would distort it —
 * which the brand rules forbid. Instead the square mark is rendered at its natural
 * 1:1 ratio (47px tall on desktop) with the wordmark set in type beside it, so the
 * lockup occupies the same visual slot as the reference without deforming the mark.
 *
 * Page marks come from transparent derivatives generated from the original opaque
 * file (see `scripts/generate-brand-assets.mjs`). The original remains the source
 * for browser icons; the inverse variant is the same mark in white for dark panels.
 */
export function Logo({
  className,
  height = 40,
  withWordmark = true,
  href = '/',
  tone = 'default',
}: LogoProps) {
  const iconSrc =
    tone === 'inverse'
      ? '/brand/novus-mfb-logo-inverse.png'
      : '/brand/novus-mfb-logo-transparent.png';

  const content = (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <Image
        src={iconSrc}
        alt=""
        width={height}
        height={height}
        priority
        className="h-auto w-auto shrink-0"
        style={{ height }}
      />
      {withWordmark ? (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              'text-lg font-bold tracking-tight',
              tone === 'inverse' ? 'text-white' : 'text-brand-700',
            )}
          >
            {siteConfig.name}
          </span>
          <span
            className={cn(
              'text-[12px] font-medium uppercase tracking-wider',
              tone === 'inverse' ? 'text-white/70' : 'text-ink-subtle',
            )}
          >
            Microfinance Bank
          </span>
        </span>
      ) : null}
    </span>
  );

  if (href === null) return content;

  return (
    <Link href={href} aria-label={`${siteConfig.name} home`} className="shrink-0">
      {content}
    </Link>
  );
}
