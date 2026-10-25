import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

/**
 * Crawler rules.
 *
 * Private account areas and the entry points to private flows stay out of the
 * index. `/login` and `/register` remain crawlable — they are public pages.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard',
        '/admin',
        '/agent',
        '/reset-password',
        '/forgot-password',
        '/verify-email',
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
