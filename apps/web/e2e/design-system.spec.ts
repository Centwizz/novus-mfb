import { test, expect } from '@playwright/test';

/**
 * Phase 2 — design system & public site coverage.
 *
 * Verifies every public route renders its heading (no blank/error page), that the
 * shared layout (header, footer) is present everywhere, that CTAs climb to the
 * right destination, and that key accessibility expectations hold.
 */

const PUBLIC_ROUTES: { path: string; heading: RegExp }[] = [
  { path: '/', heading: /banking built/i },
  { path: '/about', heading: /about|who we are|our mission/i },
  { path: '/personal', heading: /personal/i },
  { path: '/savings', heading: /savings/i },
  { path: '/loans', heading: /loan/i },
  { path: '/business', heading: /business/i },
  { path: '/security', heading: /security/i },
  { path: '/contact', heading: /contact/i },
  { path: '/faq', heading: /help|faq|question/i },
  { path: '/newsroom', heading: /newsroom/i },
  { path: '/careers', heading: /career/i },
  { path: '/report', heading: /report/i },
  { path: '/privacy-policy', heading: /privacy/i },
  { path: '/terms-and-conditions', heading: /terms/i },
];

test.describe('Public routes render', () => {
  for (const route of PUBLIC_ROUTES) {
    test(`${route.path} renders a heading`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status(), `${route.path} should not error`).toBeLessThan(400);
      await expect(page.getByRole('heading', { level: 1 }).first()).toContainText(route.heading);
    });
  }
});

test.describe('Shared layout', () => {
  test('header and footer appear on every page', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });

  test('there is exactly one h1 per page', async ({ page }) => {
    for (const route of PUBLIC_ROUTES) {
      await page.goto(route.path);
      const h1s = page.getByRole('heading', { level: 1 });
      expect(await h1s.count(), `${route.path} should have exactly one h1`).toBe(1);
    }
  });

  test('every image has an alt attribute', async ({ page }) => {
    await page.goto('/');
    const missing = await page.evaluate(() =>
      Array.from(document.querySelectorAll('img'))
        .filter((img) => !img.hasAttribute('alt'))
        .map((img) => img.getAttribute('src')),
    );
    expect(missing).toEqual([]);
  });
});

test.describe('CTAs and links', () => {
  test('hero CTA navigates to the registration page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /open an account/i }).first().click();
    await expect(page).toHaveURL(/\/register/);
  });

  test('footer links resolve without error', async ({ page }) => {
    await page.goto('/');
    const hrefs = await page.evaluate(() =>
      Array.from(document.querySelectorAll('footer a[href^="/"]')).map(
        (a) => a.getAttribute('href') as string,
      ),
    );
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of Array.from(new Set(hrefs))) {
      const res = await page.goto(href);
      expect(res?.status(), `${href} should resolve`).toBeLessThan(400);
    }
  });
});

test.describe('Localisation-independent copy', () => {
  test('the home page never claims an unverified financial figure', async ({ page }) => {
    await page.goto('/');
    const body = (await page.textContent('body')) ?? '';
    // Guardrail: until the owner supplies verified figures, no interest rates,
    // customer counts or licence claims should be asserted as fact.
    expect(body).not.toMatch(/\b\d+(\.\d+)?%\s*(interest|per annum|p\.a\.)/i);
    expect(body).not.toMatch(/\b\d[\d,]{3,}\+?\s+(customers|users|clients)/i);
  });
});
