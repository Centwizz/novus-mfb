import { test, expect, type Locator } from '@playwright/test';

/**
 * Phase 2 — design system & public site coverage.
 *
 * Verifies every public route renders its heading (no blank/error page), that the
 * shared layout (header, footer) is present everywhere, that CTAs climb to the
 * right destination, and that key accessibility expectations hold.
 */

/**
 * Effective text contrast, compositing translucent backgrounds up the tree.
 * Used to catch the previous white-on-white CTA hover state.
 */
async function contrastRatio(locator: Locator): Promise<number> {
  return locator.evaluate((element) => {
    type Rgba = { r: number; g: number; b: number; a: number };

    const parse = (value: string): Rgba => {
      const [r = 0, g = 0, b = 0, a = 1] = (value.match(/[\d.]+/g) ?? []).map(Number);
      return { r, g, b, a };
    };

    const composite = (top: Rgba, bottom: Rgba): Rgba => {
      const alpha = top.a + bottom.a * (1 - top.a);
      if (alpha === 0) return { r: 0, g: 0, b: 0, a: 0 };
      return {
        r: Math.round((top.r * top.a + bottom.r * bottom.a * (1 - top.a)) / alpha),
        g: Math.round((top.g * top.a + bottom.g * bottom.a * (1 - top.a)) / alpha),
        b: Math.round((top.b * top.a + bottom.b * bottom.a * (1 - top.a)) / alpha),
        a: alpha,
      };
    };

    const layers: Rgba[] = [];
    let node: Element | null = element;
    while (node) {
      const background = parse(getComputedStyle(node).backgroundColor);
      if (background.a > 0) layers.push(background);
      if (background.a >= 1) break;
      node = node.parentElement;
    }

    let background: Rgba = { r: 255, g: 255, b: 255, a: 1 };
    for (let index = layers.length - 1; index >= 0; index -= 1) {
      const layer = layers[index];
      if (layer) background = composite(layer, background);
    }

    let foreground = parse(getComputedStyle(element).color);
    if (foreground.a < 1) foreground = composite(foreground, background);

    const linear = (value: number) => {
      const channel = value / 255;
      return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    };
    const luminance = (colour: Rgba) =>
      0.2126 * linear(colour.r) + 0.7152 * linear(colour.g) + 0.0722 * linear(colour.b);

    const foregroundLuminance = luminance(foreground);
    const backgroundLuminance = luminance(background);
    return (
      (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
      (Math.min(foregroundLuminance, backgroundLuminance) + 0.05)
    );
  });
}

const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/personal',
  '/savings',
  '/loans',
  '/security',
  '/contact',
  '/faq',
  '/newsroom',
  '/careers',
  '/report',
  '/privacy-policy',
  '/terms-and-conditions',
];

test.describe('Public routes render', () => {
  for (const path of PUBLIC_ROUTES) {
    test(`${path} renders a heading`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status(), `${path} should not error`).toBeLessThan(400);

      // A route is healthy when it renders a real, visible h1. The exact marketing
      // copy is deliberately not pinned here: it changes with content decisions and
      // is covered by content review, not by a structural smoke test.
      const heading = page.getByRole('heading', { level: 1 }).first();
      await expect(heading, `${path} should render an h1`).toBeVisible();
      await expect(heading).not.toBeEmpty();
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
    for (const path of PUBLIC_ROUTES) {
      await page.goto(path);
      // `toHaveCount` retries; a bare `count()` can observe the instant during
      // hydration when React has cleared the subtree it is about to re-render,
      // which produced a spurious "0 h1" failure on /contact under load.
      await expect(
        page.getByRole('heading', { level: 1 }),
        `${path} should have exactly one h1`,
      ).toHaveCount(1);
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

  test('CTA band buttons stay legible in default and hover states', async ({ page, isMobile }) => {
    await page.goto('/');
    const cta = page.locator('section').filter({
      has: page.getByRole('heading', { name: 'Ready to bank with Novus MFB?' }),
    });
    await cta.scrollIntoViewIfNeeded();

    const open = cta.getByRole('link', { name: 'Open an account', exact: true });
    const contact = cta.getByRole('link', { name: 'Contact us', exact: true });

    // Inverse is a filled white button; inverseOutline is deliberately hollow.
    await expect(open).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    await expect(contact).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');

    for (const link of [open, contact]) {
      await page.mouse.move(0, 0);
      await expect.poll(() => contrastRatio(link)).toBeGreaterThanOrEqual(4.5);

      // Hover is not meaningful on touch-first devices; the mobile project still
      // checks the resting state above.
      if (!isMobile) {
        await link.hover();
        await expect.poll(() => contrastRatio(link)).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  test('mobile account CTAs close the menu and release the scroll lock', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const { name, path } of [
      { name: 'Log in', path: '/login' },
      { name: 'Open an account', path: '/register' },
    ]) {
      await page.goto('/');
      const toggle = page.locator('button[aria-controls="mobile-menu"]');
      const menu = page.locator('#mobile-menu');

      await toggle.click();
      await expect(toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(menu).toHaveAttribute('aria-hidden', 'false');
      await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('hidden');

      await menu.getByRole('link', { name, exact: true }).click();

      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(menu).toHaveAttribute('aria-hidden', 'true');
      await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('');
    }
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

test.describe('About page — Board of Directors and Team', () => {
  test('both people sections render with carousel controls', async ({ page }) => {
    await page.goto('/about');

    await expect(
      page.getByRole('heading', { level: 2, name: /meet our board of directors/i }),
    ).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: /meet our team/i })).toBeVisible();

    // Two carousels, each with prev/next navigation.
    const carousels = page.getByRole('region', { name: /board of directors|our team/i });
    await expect(carousels).toHaveCount(2);
    await expect(page.getByRole('button', { name: /^previous$/i })).toHaveCount(2);
    await expect(page.getByRole('button', { name: /^next$/i })).toHaveCount(2);
  });

  test('carousel navigation respects the ends of the list', async ({ page }) => {
    await page.goto('/about');
    const board = page.getByRole('region', { name: /board of directors/i });
    const prev = board.getByRole('button', { name: /^previous$/i });
    const next = board.getByRole('button', { name: /^next$/i });

    // Starts at the first slide: "previous" must be disabled.
    await expect(prev).toBeDisabled();

    await next.click();
    await expect(prev).toBeEnabled();
  });

  test('carousel never causes horizontal overflow', async ({ page }) => {
    for (const viewport of [
      { width: 1440, height: 900 },
      { width: 1024, height: 768 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto('/about');
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `no horizontal scroll at ${viewport.width}px`).toBeLessThanOrEqual(1);
    }
  });

  test('placeholder profiles are labelled honestly', async ({ page }) => {
    await page.goto('/about');
    const body = (await page.textContent('body')) ?? '';
    expect(body).toMatch(/placeholder profile/i);
    // No invented biographies or claimed credentials.
    expect(body).not.toMatch(/\b\d+\s+years? of (experience|banking)\b/i);
  });
});

test.describe('Central image assets', () => {
  test('every declared image resolves with HTTP 200', async ({ page, request }) => {
    await page.goto('/about');
    const sources = await page.evaluate(() =>
      Array.from(document.querySelectorAll('img'))
        .map((img) => img.getAttribute('src'))
        .filter((src): src is string => Boolean(src)),
    );

    // next/image emits either "/images/..." or "/_next/image?url=%2Fimages%2F...".
    // Normalise both back to the public asset path before checking.
    const own = sources
      .map((src) => {
        if (src.startsWith('/images/')) return src;
        if (src.startsWith('/_next/image')) {
          const raw = src.split('url=')[1]?.split('&')[0];
          return raw ? decodeURIComponent(raw) : null;
        }
        return null;
      })
      .filter((src): src is string => Boolean(src && src.startsWith('/images/')));

    expect(own.length).toBeGreaterThan(0);

    for (const src of Array.from(new Set(own))) {
      const res = await request.get(src);
      expect(res.status(), `${src} should be served`).toBe(200);
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
