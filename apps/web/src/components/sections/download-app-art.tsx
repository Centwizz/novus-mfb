import { cn } from '@/lib/cn';

/**
 * Artwork for the app-download band, at the reference's 49.56/27.56 ratio
 * (approximately 713x397 on desktop). The reference uses a photograph of a hand
 * holding a phone; this is an original brand-coloured composition standing in for
 * that photograph.
 */
export function DownloadAppArt({ className }: { className?: string }) {
  return (
    <svg
      className={cn(className)}
      viewBox="0 0 713 397"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Illustration of the Novus MFB mobile app"
      focusable="false"
    >
      <defs>
        <linearGradient id="da-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#010065" />
          <stop offset="100%" stopColor="#1a1bcc" />
        </linearGradient>
        <linearGradient id="da-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#eef0ff" />
        </linearGradient>
      </defs>

      <rect width="713" height="397" fill="url(#da-bg)" />
      <circle cx="120" cy="330" r="150" fill="#3d40e6" opacity="0.35" />
      <circle cx="620" cy="70" r="120" fill="#ff0000" opacity="0.15" />

      {/* Phone */}
      <rect x="272" y="52" width="170" height="310" rx="24" fill="#01003b" />
      <rect x="282" y="62" width="150" height="290" rx="18" fill="url(#da-screen)" />
      <rect x="330" y="52" width="54" height="8" rx="4" fill="#01003b" />

      {/* App UI mock */}
      <rect x="298" y="92" width="70" height="10" rx="5" fill="#c3c8ff" />
      <rect x="298" y="116" width="118" height="46" rx="10" fill="#010065" />
      <rect x="312" y="132" width="52" height="7" rx="3.5" fill="#ffffff" opacity="0.8" />
      <rect x="312" y="145" width="34" height="7" rx="3.5" fill="#ffffff" opacity="0.5" />
      <rect x="298" y="176" width="118" height="12" rx="6" fill="#dfe2ff" />
      <rect x="298" y="198" width="88" height="12" rx="6" fill="#dfe2ff" />
      <rect x="298" y="220" width="104" height="12" rx="6" fill="#dfe2ff" />
      <rect x="298" y="252" width="118" height="32" rx="16" fill="#ff0000" opacity="0.85" />

      {/* Floating card chip */}
      <rect x="470" y="228" width="130" height="82" rx="14" fill="#ffffff" opacity="0.95" />
      <rect x="486" y="246" width="46" height="9" rx="4.5" fill="#c3c8ff" />
      <rect x="486" y="264" width="84" height="26" rx="8" fill="#010065" />
      <circle cx="580" cy="282" r="10" fill="#ff0000" />
    </svg>
  );
}
