/**
 * Public site navigation.
 *
 * Every href here MUST resolve to a real implemented route (enforced by tests in
 * Phase 2). Dropdown groups mirror the reference site's information hierarchy.
 */

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavLink[];
}

export type NavItem = NavLink | NavGroup;

export function isNavGroup(item: NavItem): item is NavGroup {
  return 'items' in item;
}

export const primaryNav: NavItem[] = [
  {
    label: 'Company',
    items: [
      {
        label: 'About Us',
        href: '/about',
        description: 'Our mission, values and the people behind Novus MFB.',
      },
      {
        label: 'Contact Us',
        href: '/contact',
        description: 'Speak to our team or find a branch near you.',
      },
      {
        label: 'Careers',
        href: '/careers',
        description: 'Build the future of banking with us.',
      },
    ],
  },
  {
    label: 'Products',
    items: [
      {
        label: 'Personal Banking',
        href: '/personal',
        description: 'Everyday accounts, transfers and cards.',
      },
      {
        label: 'Savings',
        href: '/savings',
        description: 'Grow your money with flexible savings plans.',
      },
      {
        label: 'Loans',
        href: '/loans',
        description: 'Fair, transparent credit when you need it.',
      },
      {
        label: 'Business Banking',
        href: '/business',
        description: 'Accounts and tools for small businesses.',
      },
    ],
  },
  { label: 'Security', href: '/security' },
  { label: 'Help', href: '/faq' },
  { label: 'Newsroom', href: '/newsroom' },
];

export const footerNav = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Newsroom', href: '/newsroom' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Report an Issue', href: '/report' },
    { label: 'Security', href: '/security' },
    { label: 'Careers', href: '/careers' },
  ] satisfies NavLink[],
  products: [
    { label: 'Personal Banking', href: '/personal' },
    { label: 'Savings', href: '/savings' },
    { label: 'Loans', href: '/loans' },
    { label: 'Business Banking', href: '/business' },
  ] satisfies NavLink[],
  resources: [
    { label: 'Help Centre', href: '/faq' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  ] satisfies NavLink[],
} as const;
