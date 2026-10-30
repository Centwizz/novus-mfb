import { test, expect } from '@playwright/test';

/**
 * The model sometimes answers with Markdown even though the prompt asks for
 * plain text. The chat bubble must render that subset instead of showing
 * literal `**`, `*` or `#` characters to the customer.
 */
test('Nova renders Markdown formatting instead of literal asterisks', async ({ page }) => {
  await page.route('**/api/v1/chatbot/message', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        conversationId: 'mem-formatting-1',
        reply: '**Bold** text and *italic* text.\n### Heading\n- first item\n- second item',
        language: 'en',
        demoMode: false,
        escalated: false,
        sources: [],
      }),
    });
  });

  await page.goto('/');
  await page.getByRole('button', { name: /chat with nova/i }).click();
  await page.locator('#nova-input').fill('hello');
  await page.getByRole('button', { name: 'Send message' }).click();

  const bubble = page
    .locator('[role="dialog"] .rounded-bl-sm')
    .filter({ hasText: 'Bold text and italic text.' });

  await expect(bubble.locator('strong')).toHaveText('Bold');
  await expect(bubble.locator('em')).toHaveText('italic');
  await expect(bubble.locator('p.font-semibold')).toHaveText('Heading');
  await expect(bubble.locator('li')).toHaveCount(2);

  // No raw control characters remain visible.
  await expect(bubble).not.toContainText('**');
  await expect(bubble).not.toContainText('###');
});
