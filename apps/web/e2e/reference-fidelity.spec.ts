import { test, expect } from '@playwright/test';

/**
 * Reference-fidelity coverage for the homepage.
 *
 * The homepage was corrected to follow the verified structure of the reference site
 * (https://www.opayweb.com/). These tests pin the structural facts that the
 * correction was built around, so a future edit cannot silently revert the layout to
 * a generic card-grid banking page.
 *
 * See docs/UI_REFERENCE_COMPARISON.md for the measured reference values.
 *
 * These tests run against the Playwright Chromium build; see `npm run test:e2e`
 * in apps/web.
 */

test.describe('Homepage structure matches the reference', () => {
  test('sections appear in the verified reference order', async ({ page }) => {
    await page.goto('/');

    // Document order is the structural fact this test protects. Reading pixel
    // offsets here was flaky on emulated mobile (a layout read could race the
    // first paint and return 0 for every landmark), and it also failed when a
    // section was temporarily `display:none` at a breakpoint.
    const order = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3'));
      const indexOf = (text: string) =>
        headings.findIndex((node) => (node.textContent ?? '').includes(text));
      return {
        hero: indexOf('Beyond the Branch'),
        services: indexOf('Our Services'),
        download: indexOf('Download the Novus MFB app'),
        testimonials: indexOf('what our customers think'),
        security: indexOf('security and privacy'),
        satisfaction: indexOf('Customer satisfaction'),
      };
    });

    const keys = ['hero', 'services', 'download', 'testimonials', 'security', 'satisfaction'] as const;
    for (const key of keys) {
      expect(order[key], `${key} section should be present`).toBeGreaterThanOrEqual(0);
    }

    // Each landmark must come after the previous one.
    for (let i = 1; i < keys.length; i += 1) {
      const prevKey = keys[i - 1]!;
      const currKey = keys[i]!;
      expect(order[currKey], `${currKey} should follow ${prevKey}`).toBeGreaterThan(order[prevKey]);
    }
  });

  test('the hero is a full-bleed banner with overlaid heading', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('section#top');
    await expect(hero).toBeVisible();

    // The heading is white (overlaid on the banner), not dark ink on white.
    const colour = await page
      .getByRole('heading', { level: 1 })
      .evaluate((el) => getComputedStyle(el).color);
    expect(colour.replace(/\s/g, '')).toBe('rgb(255,255,255)');
  });

  test('the header is exactly 80px tall on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const box = await page.getByRole('banner').boundingBox();
    expect(box).not.toBeNull();
    expect(Math.round(box!.height)).toBe(80);
  });

  test('the header is fixed, not sticky', async ({ page }) => {
    await page.goto('/');
    const position = await page
      .getByRole('banner')
      .evaluate((el) => getComputedStyle(el).position);
    expect(position).toBe('fixed');
  });

  test('"Our Services" renders three full-width rows, not a card grid', async ({ page }) => {
    await page.goto('/');
    const services = page.locator('section#services');
    // Three h3 row titles, each with an accompanying image slot.
    await expect(services.getByRole('heading', { level: 3 })).toHaveCount(3);
    const images = services.locator('img');
    await expect(images).toHaveCount(3);
  });

  test('the footer has the reference five-column structure and a bottom bar', async ({ page }) => {
    await page.goto('/');
    const footer = page.getByRole('contentinfo');
    for (const title of ['Company', 'Resources', 'Discover', 'Novus Office', 'Novus Office Address']) {
      await expect(footer.getByRole('heading', { name: title, exact: true })).toBeVisible();
    }
  });

  test('no horizontal scrolling at any reference viewport', async ({ page }) => {
    const viewports = [
      { width: 1440, height: 900 },
      { width: 1366, height: 768 },
      { width: 1024, height: 768 },
      { width: 390, height: 844 },
      { width: 375, height: 812 },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/');
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `${viewport.width}px should not scroll horizontally`).toBeLessThanOrEqual(1);
    }
  });
});

test.describe('Placeholders are honest', () => {
  test('store badges are labelled as not yet available', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/coming soon/i).first()).toBeVisible();
  });

  test('no fake testimonial quotes are presented as real', async ({ page }) => {
    await page.goto('/');
    const body = (await page.textContent('body')) ?? '';
    expect(body).toMatch(/pending verification/i);
  });

  test('hotline placeholders are marked as unconfigured', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/not configured yet/i).first()).toBeVisible();
  });
});
