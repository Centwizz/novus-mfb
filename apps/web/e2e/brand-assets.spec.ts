import { expect, test } from '@playwright/test';

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
  // The date is pinned by siteConfig.lastContentUpdate.
  expect(body).toContain('2026-10-25');
});

test('robots.txt keeps private flows out of the index', async ({ request }) => {
  const response = await request.get('/robots.txt');
  const body = await response.text();

  for (const path of ['/dashboard', '/forgot-password', '/verify-email', '/reset-password']) {
    expect(body).toContain(`Disallow: ${path}`);
  }
  expect(body).toContain('Sitemap:');
});
