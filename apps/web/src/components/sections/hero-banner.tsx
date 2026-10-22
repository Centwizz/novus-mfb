/**
 * Branded hero banner artwork.
 *
 * The reference site uses a photographic banner (2304x918, ratio 2.51) with the
 * headline overlaid on the lower-left. Novus has no equivalent licensed photograph,
 * so this renders an original, brand-correct SVG at the same aspect ratio and with
 * the same tonal structure: a lighter upper area and a deeper, darker lower band so
 * white overlaid text keeps strong contrast.
 *
 * Replace this component with a real photograph when the owner supplies one — the
 * surrounding layout expects nothing more than a full-bleed, cover-fitted image.
 */
export function HeroBannerArt({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1920 800"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Abstract Novus MFB brand artwork"
      focusable="false"
    >
      <defs>
        <linearGradient id="heroSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2bb0" />
          <stop offset="45%" stopColor="#010065" />
          <stop offset="100%" stopColor="#01003b" />
        </linearGradient>
        <linearGradient id="heroScrim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#01003b" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#010065" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#010065" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="heroGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7a7ffb" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#7a7ffb" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="heroOrb" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#9ea5ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#9ea5ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1920" height="800" fill="url(#heroSky)" />

      {/* Soft light source, upper right — mirrors the reference's bright right side. */}
      <circle cx="1500" cy="200" r="430" fill="url(#heroOrb)" />
      <circle cx="1640" cy="470" r="300" fill="url(#heroGlow)" />

      {/* Depth contours */}
      <path
        d="M0 620 C 380 545, 700 700, 1080 610 C 1380 540, 1660 640, 1920 560 L1920 800 L0 800 Z"
        fill="#010028"
        opacity="0.55"
      />
      <path
        d="M0 700 C 420 640, 760 780, 1120 700 C 1420 636, 1680 726, 1920 668 L1920 800 L0 800 Z"
        fill="#00001a"
        opacity="0.6"
      />

      {/* Left-to-right scrim that guarantees headline contrast, exactly as a photo
          overlay would. */}
      <rect width="1920" height="800" fill="url(#heroScrim)" />

      {/* Brand accent bar, bottom edge */}
      <rect x="0" y="792" width="1920" height="8" fill="#ff0000" opacity="0.9" />
    </svg>
  );
}
