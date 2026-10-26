import { expect, test } from '@playwright/test';
import { siteConfig } from '../src/lib/site-config';

/**
 * Browser icons, page logo variants, the social card, and the crawl metadata
 * must all be real responses — not references to files that were never generated.
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

test('page logo variants are transparent and keep a visible mark', async ({ page }) => {
  await page.goto('/');

  const result = await page.evaluate(async () => {
    const analyse = async (src: string) => {
      const image = new Image();
      image.src = src;
      await image.decode();

      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Could not create a 2D canvas context');

      context.drawImage(image, 0, 0);
      const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
      const alphaAt = (x: number, y: number) => data[(y * canvas.width + x) * 4 + 3] ?? 255;

      let visible = 0;
      let opaqueWhite = 0;
      let whiteVisible = 0;
      let firstVisible: { r: number; g: number; b: number; a: number } | null = null;

      for (let offset = 0; offset < data.length; offset += 4) {
        const a = data[offset + 3] ?? 0;
        if (a === 0) continue;
        const r = data[offset] ?? 0;
        const g = data[offset + 1] ?? 0;
        const b = data[offset + 2] ?? 0;
        visible += 1;
        if (r === 255 && g === 255 && b === 255) {
          whiteVisible += 1;
          if (a === 255) opaqueWhite += 1;
        }
        if (!firstVisible) firstVisible = { r, g, b, a };
      }

      return {
        width: canvas.width,
        height: canvas.height,
        corners: [
          alphaAt(0, 0),
          alphaAt(canvas.width - 1, 0),
          alphaAt(0, canvas.height - 1),
          alphaAt(canvas.width - 1, canvas.height - 1),
        ],
        center: alphaAt(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2)),
        visible,
        opaqueWhite,
        whiteVisible,
        firstVisible,
      };
    };

    return {
      transparent: await analyse('/brand/novus-mfb-logo-transparent.png'),
      inverse: await analyse('/brand/novus-mfb-logo-inverse.png'),
    };
  });

  // The outer square and the enclosed negative-space triangle are transparent.
  expect(result.transparent.corners).toEqual([0, 0, 0, 0]);
  expect(result.transparent.center).toBe(0);
  expect(result.transparent.visible).toBeGreaterThan(0);
  expect(result.transparent.opaqueWhite).toBe(0);
  expect(result.transparent.firstVisible).not.toBeNull();

  // The dark-surface variant keeps the same alpha shape but paints it white.
  expect(result.inverse.corners).toEqual([0, 0, 0, 0]);
  expect(result.inverse.center).toBe(0);
  expect(result.inverse.visible).toBe(result.transparent.visible);
  expect(result.inverse.whiteVisible).toBe(result.inverse.visible);
});

test('header and footer use the transparent mark and full lockup; the dark auth panel uses the inverse', async ({
  page,
}) => {
  const decode = (src: string | null) => decodeURIComponent(src ?? '');

  for (const path of ['/', '/about']) {
    await page.goto(path);
    const headerLogo = page.locator('header img').first();
    const footerLogo = page.locator('footer img').first();

    expect(decode(await headerLogo.getAttribute('src'))).toContain(
      'novus-mfb-logo-transparent.png',
    );
    expect(decode(await footerLogo.getAttribute('src'))).toContain(
      'novus-mfb-logo-transparent.png',
    );

    const footerLockup = page.locator('footer a[aria-label="Novus MFB home"]').first();
    await expect(footerLockup).toBeVisible();
    await expect(footerLockup).toContainText('Novus MFB');
    await expect(footerLockup).toContainText('Microfinance Bank');
  }

  await page.goto('/login');
  const mainLogos = page.locator('main img');
  const sources = await mainLogos.evaluateAll((images) =>
    images.map((image) => image.getAttribute('src') ?? ''),
  );
  expect(sources.some((src) => decode(src).includes('novus-mfb-logo-inverse.png'))).toBe(true);

  const allPageSources = await page
    .locator('header img, footer img, main img')
    .evaluateAll((images) =>
      images.map((image) => decodeURIComponent(image.getAttribute('src') ?? '')),
    );
  expect(allPageSources.some((src) => src.includes('/brand/novus-mfb-logo.png'))).toBe(false);
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
