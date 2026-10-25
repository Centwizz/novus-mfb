import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

/**
 * Indexable public routes.
 *
 * `lastModified` comes from a hand-maintained content date (see
 * `siteConfig.lastContentUpdate`) rather than build time, so the sitemap never
 * claims a page changed simply because it was deployed.
 *
 * Excluded on purpose:
 *   - `/dashboard` — private, also disallowed in robots.ts
 *   - `/verify-email` — a transient confirmation state, not a destination
 *   - `/reset-password`, `/forgot-password` — entry points for private flows
 *   - `/admin`, `/agent` — not implemented yet
 */
const routes: Array<{
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
  priority: number;
}> = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/personal', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/savings', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/loans', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/business', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/security', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/newsroom', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/careers', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/report', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/login', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/register', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms-and-conditions', changeFrequency: 'yearly', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(siteConfig.lastContentUpdate);

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
