import { test, expect } from '@playwright/test';

test.describe('Public site', () => {
  test('home page renders the hero and primary CTA', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Banking built');
    await expect(page.getByRole('link', { name: 'Open an account' }).first()).toBeVisible();
  });

  test('primary navigation links resolve', async ({ page }) => {
    const links = ['/about', '/personal', '/savings', '/loans', '/security', '/faq'];
    for (const href of links) {
      const res = await page.goto(href);
      expect(res?.status(), `${href} should return a success status`).toBeLessThan(400);
    }
  });

  test('Nova chat launcher opens and shows the welcome message', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /chat with nova/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText(/welcome to Novus MFB/i)).toBeVisible();
  });

  test('no horizontal overflow on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    expect(overflow).toBe(false);
  });
});
