import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { siteConfig } from '@/lib/site-config';

interface LogoProps {
  className?: string;
  /** Rendered height of the mark in pixels. */
  height?: number;
  withWordmark?: boolean;
  href?: string | null;
}

/**
 * Novus MFB logo lockup.
 *
 * The mark is the owner-supplied asset (public/brand/novus-mfb-logo.png). The
 * wordmark beside it is rendered in the site font so the lockup stays crisp and
 * accessible at any size.
 */
export function Logo({ className, height = 40, withWordmark = true, href = '/' }: LogoProps) {
  const content = (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <Image
        src="/brand/novus-mfb-logo.png"
        alt=""
        width={height}
        height={height}
        priority
        className="h-auto w-auto"
        style={{ height }}
      />
      {withWordmark ? (
        <span className="flex flex-col leading-none">
          <span className="text-lg font-bold tracking-tight text-brand-700">{siteConfig.name}</span>
          <span className="text-[10px] font-medium uppercase tracking-widest text-ink-subtle">
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
