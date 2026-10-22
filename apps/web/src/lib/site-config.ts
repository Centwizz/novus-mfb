/**
 * Central site configuration.
 *
 * Everything that is Novus-specific branding or business content lives here so it
 * can be updated (or wired to the CMS/admin module in later phases) without editing
 * components. Values that require verified business information from the project
 * owner are clearly marked with TODO(owner) placeholders — they are NOT invented
 * facts and must be replaced before launch.
 */

export const siteConfig = {
  name: 'Novus MFB',
  legalName: 'Novus Microfinance Bank', // TODO(owner): confirm exact registered legal name
  shortName: 'Novus',
  tagline: 'Banking built around you',
  description:
    'Novus MFB is a digital-first microfinance bank offering simple, secure and accessible financial services. Open an account, save, borrow and manage your money with confidence.',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1',
  // TODO(owner): replace with verified contact details before launch.
  contact: {
    // NOTE: placeholder — not a real number.
    phone: 'Not configured',
    whatsapp: 'Not configured',
    email: 'support@novusmfb.com', // TODO(owner): confirm
    supportHours: 'Monday – Friday, 8:00am – 6:00pm (WAT)',
  },
  social: {
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
  },
  assistant: {
    name: 'Nova',
    // NOTE: demo mode is explicitly surfaced in the UI when the API key is absent.
    intro:
      "Hello! Welcome to Novus MFB. I'm Nova, your virtual customer-service assistant. How can I help you today?",
  },
  // Regulatory/insurance claims are intentionally NOT asserted until verified by the owner.
  // TODO(owner): supply verified licence/insurance wording to display trust badges.
  regulatory: {
    licenceText: 'Licensed by the Central Bank of Nigeria', // TODO(owner): verify
    insuredText: 'Deposits insured by the NDIC', // TODO(owner): verify
    showBadges: false,
  },
} as const;

export type SiteConfig = typeof siteConfig;
