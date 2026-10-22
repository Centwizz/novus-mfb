import { cn } from '@/lib/cn';

/**
 * Artwork standing in for the reference's autoplaying security video tiles.
 *
 * Reference tile ratio is 1004/425 (approximately 592x251 on desktop). The tiles sit
 * on the solid brand band, so the artwork uses contrasting light tones to read as
 * distinct media panels, matching the visual weight of a photographic/video tile.
 */
export function SecurityTileArt({
  variant,
  className,
}: {
  variant: 'shield' | 'lock';
  className?: string;
}) {
  return (
    <svg
      className={cn(className)}
      viewBox="0 0 1004 425"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={variant === 'shield' ? 'Fraud protection illustration' : 'Account locking illustration'}
      focusable="false"
    >
      <defs>
        <linearGradient id={`st-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dfe2ff" />
        </linearGradient>
      </defs>

      <rect width="1004" height="425" fill={`url(#st-${variant})`} />
      <circle cx="880" cy="60" r="150" fill="#c3c8ff" opacity="0.55" />
      <circle cx="120" cy="400" r="130" fill="#9ea5ff" opacity="0.35" />

      {variant === 'shield' ? (
        <g>
          <path
            d="M400 96 l120 44 v86 c0 66 -52 104 -120 128 c-68 -24 -120 -62 -120 -128 v-86 z"
            fill="#010065"
          />
          <path d="M352 214 l34 34 l68 -68" stroke="#ffffff" strokeWidth="16" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="600" y="180" width="240" height="14" rx="7" fill="#010065" opacity="0.75" />
          <rect x="600" y="212" width="180" height="14" rx="7" fill="#010065" opacity="0.5" />
          <rect x="600" y="244" width="210" height="14" rx="7" fill="#010065" opacity="0.35" />
        </g>
      ) : (
        <g>
          <rect x="392" y="196" width="180" height="140" rx="16" fill="#010065" />
          <path
            d="M424 196 v-28 a58 58 0 0 1 116 0 v28"
            fill="none"
            stroke="#010065"
            strokeWidth="20"
            strokeLinecap="round"
          />
          <circle cx="482" cy="252" r="16" fill="#ff0000" />
          <rect x="476" y="262" width="12" height="42" rx="6" fill="#ff0000" />
          <rect x="620" y="180" width="230" height="14" rx="7" fill="#010065" opacity="0.75" />
          <rect x="620" y="212" width="170" height="14" rx="7" fill="#010065" opacity="0.5" />
          <rect x="620" y="244" width="200" height="14" rx="7" fill="#010065" opacity="0.35" />
        </g>
      )}
    </svg>
  );
}
