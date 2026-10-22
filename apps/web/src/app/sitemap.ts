import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

const routes = [
  '',
  '/about',
  '/personal',
  '/savings',
  '/loans',
  '/business',
  '/security',
  '/contact',
  '/faq',
  '/newsroom',
  '/careers',
  '/report',
  '/privacy-policy',
  '/terms-and-conditions',
  '/login',
  '/register',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
