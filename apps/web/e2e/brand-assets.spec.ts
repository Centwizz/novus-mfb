import { expect, test } from '@playwright/test';
import { siteConfig } from '../src/lib/site-config';

/**
 * Browser icons, the social card, and the crawl metadata must all be real
 * responses — not references to files that were never generated.
 */
const assets = [
  { url: '/favicon.ico', type: /image\/(x-icon|vnd\.microsoft\.icon)/ },
  { url: '/icon.png', type: /image\/png/ },
  { url: '/apple-icon.png', type: /image\/png/ },
  { url: '/brand/og-image.png', type: /image\/png/ },
  { url: '/sitemap.xml', type: /(application|text)\/xml/ },
  { url: '/robots.txt', type: /text\/plain/ },
];

for (const asset of assets) {
  test(`${asset.url} is served`, async ({ request }) => {
    const response = await request.get(asset.url);
    expect(response.status(), `${asset.url} status`).toBe(200);
    expect(response.headers()['content-type'] ?? '').toMatch(asset.type);
    expect((await response.body()).byteLength).toBeGreaterThan(0);
  });
}

test('the document advertises the social card and Twitter card type', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    /\/brand\/og-image\.png$/,
  );
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', '1200');
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute('content', '630');
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    'content',
    'summary_large_image',
  );
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
    'content',
    /\/brand\/og-image\.png$/,
  );
});

test('an icon link is declared in the document head', async ({ page }) => {
  await page.goto('/');
  const iconLinks = page.locator('head link[rel="icon"], head link[rel="apple-touch-icon"]');
  expect(await iconLinks.count()).toBeGreaterThan(0);
});

test('the sitemap uses the maintained content date, not build time', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  const body = await response.text();

  expect(body).toContain('/personal');
  expect(body).toContain('/privacy-policy');
  // Transient and private routes must stay out of the sitemap.
  expect(body).not.toContain('/verify-email');
  expect(body).not.toContain('/dashboard');

  // Every entry carries `siteConfig.lastContentUpdate`, the hand-maintained
  // date, rather than whatever time the build happened to run.
  const expected = new Date(siteConfig.lastContentUpdate).toISOString();
  const lastmods = [...body.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1] ?? '');
  expect(lastmods.length).toBeGreaterThan(0);
  for (const value of lastmods) expect(value).toBe(expected);
});

test('robots.txt keeps private flows out of the index', async ({ request }) => {
  const response = await request.get('/robots.txt');
  const body = await response.text();

  for (const path of ['/dashboard', '/forgot-password', '/verify-email', '/reset-password']) {
    expect(body).toContain(`Disallow: ${path}`);
  }
  expect(body).toContain('Sitemap:');
});

test('placeholder images are JPEG and hero photographs are WebP', async ({ request }) => {
  const placeholder = await request.get('/images/about/about-intro.jpg');
  expect(placeholder.status(), 'placeholder image status').toBe(200);
  expect(placeholder.headers()['content-type'] ?? '').toMatch(/image\/jpeg/);

  const hero = await request.get('/images/banners/home-hero-mobile.webp');
  expect(hero.status(), 'hero image status').toBe(200);
  expect(hero.headers()['content-type'] ?? '').toMatch(/image\/webp/);
});
