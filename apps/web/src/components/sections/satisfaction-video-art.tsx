import { cn } from '@/lib/cn';

/**
 * Artwork standing in for the reference's customer-service video tiles.
 * Original brand-coloured compositions rather than unrelated stock photography.
 */
export function SatisfactionVideoArt({
  variant,
  className,
}: {
  variant: 'service' | 'customers';
  className?: string;
}) {
  return (
    <svg
      className={cn(className)}
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Customer service illustration"
      focusable="false"
    >
      <defs>
        <linearGradient id={`sv-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#010065" />
          <stop offset="100%" stopColor="#3d40e6" />
        </linearGradient>
      </defs>

      <rect width="400" height="300" fill={`url(#sv-${variant})`} />
      <circle cx="330" cy="60" r="90" fill="#ff0000" opacity="0.18" />

      {/* Headset / support agent abstraction */}
      <circle cx="200" cy="132" r="46" fill="#ffffff" opacity="0.92" />
      <circle cx="200" cy="120" r="26" fill="#9ea5ff" />
      <path d="M164 118 a40 40 0 0 1 72 0" fill="none" stroke="#010065" strokeWidth="9" strokeLinecap="round" />
      <rect x="150" y="176" width="100" height="58" rx="18" fill="#ffffff" opacity="0.85" />

      {/* Chat bubbles */}
      <rect x="48" y="52" width="120" height="46" rx="14" fill="#ffffff" opacity="0.9" />
      <rect x="64" y="68" width="76" height="9" rx="4.5" fill="#010065" opacity="0.55" />
      <rect x="64" y="82" width="48" height="9" rx="4.5" fill="#010065" opacity="0.35" />

      <rect x="256" y="196" width="112" height="42" rx="14" fill="#ff0000" opacity="0.9" />
      <rect x="272" y="210" width="66" height="8" rx="4" fill="#ffffff" opacity="0.9" />
      <rect x="272" y="223" width="42" height="8" rx="4" fill="#ffffff" opacity="0.7" />
    </svg>
  );
}
