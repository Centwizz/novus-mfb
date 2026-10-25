import { expect, test } from '@playwright/test';

/**
 * First-visit behaviour of the cookie notice.
 *
 * These tests deliberately start with NO stored consent, so they cannot use the
 * pre-seeded storage state the rest of the suite relies on.
 */
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('cookie notice', () => {
  test('appears on a first visit and explains that nothing optional is set', async ({ page }) => {
    await page.goto('/');

    const notice = page.getByRole('region', { name: 'Cookie notice' });
    await expect(notice).toBeVisible();
    await expect(notice).toContainText(/no advertising or analytics cookies are set/i);
    await expect(notice.getByRole('link', { name: /privacy policy/i })).toHaveAttribute(
      'href',
      '/privacy-policy',
    );
  });

  test('is dismissed once and stays dismissed after a reload', async ({ page }) => {
    await page.goto('/');

    const notice = page.getByRole('region', { name: 'Cookie notice' });
    await notice.getByRole('button', { name: 'Understood' }).click();
    await expect(notice).toBeHidden();

    await page.reload();
    await expect(page.getByRole('region', { name: 'Cookie notice' })).toBeHidden();
  });

  test('footer "Cookie settings" reopens the notice', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Understood' }).click();

    await page.getByRole('button', { name: 'Cookie settings' }).click();
    await expect(page.getByRole('region', { name: 'Cookie notice' })).toBeVisible();
  });

  test('never covers the chat launcher', async ({ page }) => {
    await page.goto('/');

    const noticeButton = page
      .getByRole('region', { name: 'Cookie notice' })
      .getByRole('button', { name: 'Understood' });
    const chatButton = page.getByRole('button', { name: /chat with nova/i });

    await expect(noticeButton).toBeVisible();
    await expect(chatButton).toBeVisible();

    const noticeBox = await noticeButton.boundingBox();
    const chatBox = await chatButton.boundingBox();
    expect(noticeBox).not.toBeNull();
    expect(chatBox).not.toBeNull();

    if (noticeBox && chatBox) {
      const overlaps =
        noticeBox.x < chatBox.x + chatBox.width &&
        noticeBox.x + noticeBox.width > chatBox.x &&
        noticeBox.y < chatBox.y + chatBox.height &&
        noticeBox.y + noticeBox.height > chatBox.y;
      expect(overlaps, 'the chat launcher must not sit on top of the notice action').toBe(false);
    }
  });

  test('does not introduce horizontal overflow', async ({ page }) => {
    await page.goto('/');

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('is reachable on an inner page too', async ({ page }) => {
    await page.goto('/privacy-policy');

    await expect(page.getByRole('region', { name: 'Cookie notice' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Cookies and local storage' })).toBeVisible();
  });
});
