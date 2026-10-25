/**
 * Central image manifest.
 *
 * EVERY banner, photo and profile picture on the public site is declared here.
 * Components read from this manifest, so replacing an image NEVER requires editing
 * a component — drop a new file at the same path with the same filename and the
 * site picks it up on refresh/rebuild. See apps/web/public/images/README.md.
 *
 * Dimensions below are the ACTUAL rendered slot sizes used by the layout, not
 * arbitrary numbers. `intrinsic` is the recommended source resolution; the layout
 * always renders at the ratio given by `aspect`.
 */

export interface ImageSlot {
  /** Public path under /images, or null when the slot is intentionally empty. */
  src: string | null;
  /** Alternative text. Empty string for decorative images. */
  alt: string;
  /** Intrinsic source width in px — recommended replacement size. */
  width: number;
  /** Intrinsic source height in px — recommended replacement size. */
  height: number;
  /** CSS aspect ratio, e.g. "16 / 9". Must match the layout slot. */
  aspect: string;
  /** How the image should fill its slot. */
  fit: 'cover' | 'contain';
  /** Which page/section this image appears in — shown in the placeholder. */
  label: string;
}

const slot = (s: ImageSlot): ImageSlot => s;

/* ------------------------------------------------------------------ */
/* Home page                                                          */
/* ------------------------------------------------------------------ */

export const homeImages = {
  /** Home hero banner. Desktop slot is 1920x800 (ratio 1920/800). */
  heroDesktop: slot({
    src: '/images/banners/home-hero.webp',
    alt: '',
    width: 1920,
    height: 800,
    aspect: '1920 / 800',
    fit: 'cover',
    label: 'HOME HERO (DESKTOP)',
  }),
  /** Home hero banner on phones. Slot is 390x844 (ratio 390/844). */
  heroMobile: slot({
    src: '/images/banners/home-hero-mobile.webp',
    alt: '',
    width: 780,
    height: 1688,
    aspect: '390 / 844',
    fit: 'cover',
    label: 'HOME HERO (MOBILE)',
  }),
  /** "Our Services" row 1 imagery. Slot ratio 622/455. */
  serviceTransfers: slot({
    src: '/images/home/services.webp',
    alt: 'Illustration representing transfers and bill payments',
    width: 1244,
    height: 910,
    aspect: '622 / 455',
    fit: 'cover',
    label: 'HOME — OUR SERVICES (ROW 1)',
  }),
  /** "Our Services" row 2 imagery. Slot ratio 622/455. */
  serviceCard: slot({
    src: '/images/home/debit-card.webp',
    alt: 'Illustration representing the Novus debit card',
    width: 1244,
    height: 910,
    aspect: '622 / 455',
    fit: 'cover',
    label: 'HOME — OUR SERVICES (ROW 2)',
  }),
  /** "Our Services" row 3 imagery. Slot ratio 622/455. */
  serviceSavings: slot({
    src: '/images/home/savings.webp',
    alt: 'Illustration representing savings growth',
    width: 1244,
    height: 910,
    aspect: '622 / 455',
    fit: 'cover',
    label: 'HOME — OUR SERVICES (ROW 3)',
  }),
  /** Download-app band artwork. Slot ratio 49.56/27.56 (~713x397 rendered). */
  downloadApp: slot({
    src: '/images/home/mobile-banking.webp',
    alt: 'Illustration of the Novus MFB mobile app',
    width: 1426,
    height: 794,
    aspect: '49.56 / 27.56',
    fit: 'cover',
    label: 'HOME — DOWNLOAD APP',
  }),
  /** Security band tile 1. Slot ratio 1004/425. */
  securityShield: slot({
    src: '/images/home/security-fraud.webp',
    alt: 'Illustration representing fraud protection',
    width: 1400,
    height: 592,
    aspect: '1004 / 425',
    fit: 'cover',
    label: 'HOME — SECURITY TILE 1',
  }),
  /** Security band tile 2. Slot ratio 1004/425. */
  securityLock: slot({
    src: '/images/home/security-lock.webp',
    alt: 'Illustration representing instant account locking',
    width: 1400,
    height: 592,
    aspect: '1004 / 425',
    fit: 'cover',
    label: 'HOME — SECURITY TILE 2',
  }),
  /** Customer-satisfaction media tile 1. Slot ratio 4/3. */
  satisfactionService: slot({
    src: '/images/home/customer-service.webp',
    alt: 'Illustration representing customer service',
    width: 800,
    height: 600,
    aspect: '4 / 3',
    fit: 'cover',
    label: 'HOME — SATISFACTION TILE 1',
  }),
  /** Customer-satisfaction media tile 2. Slot ratio 4/3. */
  satisfactionCustomers: slot({
    src: '/images/home/customer-stories.webp',
    alt: 'Illustration representing customer stories',
    width: 800,
    height: 600,
    aspect: '4 / 3',
    fit: 'cover',
    label: 'HOME — SATISFACTION TILE 2',
  }),
} as const;

/* ------------------------------------------------------------------ */
/* Inner-page banners                                                 */
/* ------------------------------------------------------------------ */

export const bannerImages = {
  about: slot({
    src: '/images/banners/about-hero.webp',
    alt: '',
    width: 1920,
    height: 480,
    aspect: '1920 / 480',
    fit: 'cover',
    label: 'ABOUT US BANNER',
  }),
  personal: slot({
    src: '/images/banners/personal-banking.webp',
    alt: '',
    width: 1920,
    height: 480,
    aspect: '1920 / 480',
    fit: 'cover',
    label: 'PERSONAL BANKING BANNER',
  }),
  savings: slot({
    src: '/images/banners/services-banner.webp',
    alt: '',
    width: 1920,
    height: 480,
    aspect: '1920 / 480',
    fit: 'cover',
    label: 'SAVINGS BANNER',
  }),
  loans: slot({
    src: '/images/banners/loans-banner.webp',
    alt: '',
    width: 1920,
    height: 480,
    aspect: '1920 / 480',
    fit: 'cover',
    label: 'LOANS BANNER',
  }),
  business: slot({
    src: '/images/banners/business-banking.webp',
    alt: '',
    width: 1920,
    height: 480,
    aspect: '1920 / 480',
    fit: 'cover',
    label: 'BUSINESS BANKING BANNER',
  }),
  contact: slot({
    src: '/images/banners/contact-banner.webp',
    alt: '',
    width: 1920,
    height: 480,
    aspect: '1920 / 480',
    fit: 'cover',
    label: 'CONTACT BANNER',
  }),
  security: slot({
    src: '/images/banners/security-banner.webp',
    alt: '',
    width: 1920,
    height: 480,
    aspect: '1920 / 480',
    fit: 'cover',
    label: 'SECURITY BANNER',
  }),
  careers: slot({
    src: '/images/banners/careers-banner.webp',
    alt: '',
    width: 1920,
    height: 480,
    aspect: '1920 / 480',
    fit: 'cover',
    label: 'CAREERS BANNER',
  }),
  newsroom: slot({
    src: '/images/banners/newsroom-banner.webp',
    alt: '',
    width: 1920,
    height: 480,
    aspect: '1920 / 480',
    fit: 'cover',
    label: 'NEWSROOM BANNER',
  }),
} as const;

/* ------------------------------------------------------------------ */
/* About page imagery                                                 */
/* ------------------------------------------------------------------ */

export const aboutImages = {
  intro: slot({
    src: '/images/about/about-intro.webp',
    alt: 'Novus MFB team at work',
    width: 1200,
    height: 900,
    aspect: '4 / 3',
    fit: 'cover',
    label: 'ABOUT — INTRO PHOTO',
  }),
  teamGroup: slot({
    src: '/images/about/team-group.webp',
    alt: 'The Novus MFB team',
    width: 1600,
    height: 900,
    aspect: '16 / 9',
    fit: 'cover',
    label: 'ABOUT — TEAM GROUP PHOTO',
  }),
} as const;

/* ------------------------------------------------------------------ */
/* People (Board of Directors + Team)                                 */
/* ------------------------------------------------------------------ */

export interface PersonSlot {
  /** Public path to the portrait, or null to render the initials placeholder. */
  src: string | null;
  /** Full name — replace with the real name when supplied. */
  name: string;
  /** Official designation / board role / job title. */
  role: string;
  /** Optional short biography. Omitted = not supplied yet. */
  bio?: string;
  /** Recommended portrait slot: 800x1000 (ratio 4/5). */
  label: string;
  /**
   * Set to `false` once this entry describes a real, verified person.
   *
   * Defaults to placeholder behaviour (honest by default): the card shows the
   * "Placeholder profile" note and the portrait is labelled as a placeholder
   * for screen readers. Add `isPlaceholder: false` together with the real name,
   * role and photo.
   */
  isPlaceholder?: boolean;
}

/**
 * Board of Directors.
 *
 * ALL entries are placeholders. They are NOT real people and must not be presented
 * as such. Replace `name`, `role`, `bio` and add `src` as real information arrives.
 * See docs/IMAGE_ASSET_GUIDE.md for the exact procedure.
 */
export const boardMembers: PersonSlot[] = [
  {
    src: '/images/about/board-chairman.webp',
    name: 'Board Chairman',
    role: 'Chairman, Board of Directors',
    label: 'BOARD CHAIRMAN',
  },
  {
    src: '/images/about/board-member-02.webp',
    name: 'Non-Executive Director',
    role: 'Board Member',
    label: 'BOARD MEMBER 02',
  },
  {
    src: '/images/about/board-member-03.webp',
    name: 'Independent Director',
    role: 'Board Member',
    label: 'BOARD MEMBER 03',
  },
  {
    src: '/images/about/board-member-04.webp',
    name: 'Executive Director',
    role: 'Board Member',
    label: 'BOARD MEMBER 04',
  },
];

/** Management / staff team. ALL placeholder entries — not real employees. */
export const teamMembers: PersonSlot[] = [
  {
    src: '/images/team/managing-director.webp',
    name: 'Managing Director',
    role: 'Managing Director / CEO',
    label: 'MANAGING DIRECTOR',
  },
  {
    src: '/images/team/operations-manager.webp',
    name: 'Head of Operations',
    role: 'Operations Manager',
    label: 'OPERATIONS MANAGER',
  },
  {
    src: '/images/team/customer-service-manager.webp',
    name: 'Customer Service Manager',
    role: 'Customer Service',
    label: 'CUSTOMER SERVICE MANAGER',
  },
  {
    src: '/images/team/it-manager.webp',
    name: 'Head of Technology',
    role: 'IT / Technology Manager',
    label: 'IT MANAGER',
  },
];

/* ------------------------------------------------------------------ */
/* Service detail pages                                               */
/* ------------------------------------------------------------------ */

export const serviceImages = {
  personal: slot({
    src: '/images/services/personal-banking.webp',
    alt: 'Everyday personal banking',
    width: 1244,
    height: 910,
    aspect: '622 / 455',
    fit: 'cover',
    label: 'PERSONAL BANKING IMAGE',
  }),
  savings: slot({
    src: '/images/services/savings.webp',
    alt: 'Savings and goals',
    width: 1244,
    height: 910,
    aspect: '622 / 455',
    fit: 'cover',
    label: 'SAVINGS IMAGE',
  }),
  loans: slot({
    src: '/images/services/loans.webp',
    alt: 'Loans and credit',
    width: 1244,
    height: 910,
    aspect: '622 / 455',
    fit: 'cover',
    label: 'LOANS IMAGE',
  }),
  business: slot({
    src: '/images/services/business-banking.webp',
    alt: 'Business banking',
    width: 1244,
    height: 910,
    aspect: '622 / 455',
    fit: 'cover',
    label: 'BUSINESS BANKING IMAGE',
  }),
} as const;
