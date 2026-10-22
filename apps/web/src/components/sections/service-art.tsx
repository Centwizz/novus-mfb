import { cn } from '@/lib/cn';

/**
 * Branded service artwork, drawn at the reference's exact 622/455 aspect ratio.
 *
 * The reference fills these slots with photographs of people using the product.
 * Novus has no licensed photography, so these are original vector illustrations
 * built from the Novus palette — visually appropriate for the intended content,
 * correctly proportioned, and clearly not pretending to be photographs.
 *
 * Swap this component for real imagery when the owner supplies it; the parent
 * layout only requires a full-bleed element with a 622/455 ratio.
 */
export function ServiceArt({
  variant,
  className,
}: {
  variant: 'transfers' | 'card' | 'savings';
  className?: string;
}) {
  return (
    <svg
      className={cn(className)}
      viewBox="0 0 622 455"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={
        variant === 'transfers'
          ? 'Illustration of transferring money'
          : variant === 'card'
            ? 'Illustration of a Novus debit card'
            : 'Illustration of savings growth'
      }
      focusable="false"
    >
      <defs>
        <linearGradient id={`sa-bg-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eef0ff" />
          <stop offset="100%" stopColor="#dfe2ff" />
        </linearGradient>
        <linearGradient id={`sa-brand-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a1bcc" />
          <stop offset="100%" stopColor="#010065" />
        </linearGradient>
      </defs>

      <rect width="622" height="455" fill={`url(#sa-bg-${variant})`} />

      {variant === 'transfers' ? <Transfers /> : null}
      {variant === 'card' ? <Card /> : null}
      {variant === 'savings' ? <Savings /> : null}
    </svg>
  );
}

function Transfers() {
  return (
    <g>
      {/* Two device panels with a transfer arrow */}
      <rect x="86" y="96" width="176" height="264" rx="18" fill="#ffffff" />
      <rect x="102" y="126" width="144" height="12" rx="6" fill="#c3c8ff" />
      <rect x="102" y="152" width="104" height="10" rx="5" fill="#dfe2ff" />
      <rect x="102" y="200" width="144" height="72" rx="12" fill="url(#sa-brand-transfers)" />
      <rect x="118" y="222" width="72" height="9" rx="4.5" fill="#ffffff" opacity="0.85" />
      <rect x="118" y="242" width="46" height="9" rx="4.5" fill="#ffffff" opacity="0.6" />

      <rect x="360" y="130" width="176" height="196" rx="18" fill="#ffffff" />
      <rect x="376" y="158" width="120" height="11" rx="5.5" fill="#c3c8ff" />
      <rect x="376" y="182" width="86" height="9" rx="4.5" fill="#dfe2ff" />
      <rect x="376" y="222" width="144" height="10" rx="5" fill="#eef0ff" />
      <rect x="376" y="246" width="112" height="10" rx="5" fill="#eef0ff" />
      <rect x="376" y="278" width="144" height="30" rx="15" fill="#ff0000" opacity="0.9" />

      <path
        d="M272 214 h72"
        stroke="#010065"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray="16 12"
      />
      <path d="M330 200 l16 14 -16 14 z" fill="#010065" />
    </g>
  );
}

function Card() {
  return (
    <g>
      <rect x="0" y="118" width="290" height="190" rx="18" fill="#dfe2ff" />
      <rect
        x="128"
        y="96"
        width="366"
        height="225"
        rx="20"
        fill="url(#sa-brand-card)"
        transform="rotate(-6 311 208)"
      />
      <g transform="rotate(-6 311 208)">
        <rect x="162" y="132" width="46" height="34" rx="7" fill="#ffd166" />
        <rect x="162" y="196" width="196" height="14" rx="7" fill="#ffffff" opacity="0.35" />
        <rect x="162" y="224" width="132" height="12" rx="6" fill="#ffffff" opacity="0.22" />
        <rect x="162" y="266" width="88" height="12" rx="6" fill="#ffffff" opacity="0.5" />
        <circle cx="428" cy="266" r="20" fill="#ff0000" />
        <circle cx="452" cy="266" r="20" fill="#ffffff" opacity="0.55" />
      </g>
    </g>
  );
}

function Savings() {
  return (
    <g>
      {/* Growth bars */}
      <rect x="120" y="286" width="56" height="70" rx="10" fill="#9ea5ff" />
      <rect x="196" y="248" width="56" height="108" rx="10" fill="#7a7ffb" />
      <rect x="272" y="204" width="56" height="152" rx="10" fill="#3d40e6" />
      <rect x="348" y="156" width="56" height="200" rx="10" fill="url(#sa-brand-savings)" />

      {/* Trend line */}
      <path
        d="M130 268 L206 228 L282 186 L364 128"
        fill="none"
        stroke="#ff0000"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="364" cy="128" r="12" fill="#ff0000" />

      {/* Coin */}
      <circle cx="452" cy="120" r="42" fill="#ffffff" />
      <circle cx="452" cy="120" r="30" fill="#ffd166" />
      <text
        x="452"
        y="132"
        textAnchor="middle"
        fontSize="30"
        fontWeight="700"
        fill="#010065"
        fontFamily="system-ui, sans-serif"
      >
        N
      </text>
    </g>
  );
}
