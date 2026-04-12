import { chromium, expect, test } from '@playwright/test';
import { fileURLToPath } from 'node:url';

test('renders the popup launchpad and adds a task', async () => {
  const extensionPath = fileURLToPath(
    new URL('../../.output/chrome-mv3', import.meta.url),
  );
  const context = await chromium.launchPersistentContext('', {
    headless: !!process.env.CI,
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
    ],
  });

  try {
    const worker =
      context.serviceWorkers()[0] ??
      (await context.waitForEvent('serviceworker'));
    const extensionId = worker.url().split('/')[2];

    const page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/popup.html`);

    await expect(
      page.getByRole('heading', { name: 'Starter Launchpad' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Task Board' }),
    ).toBeVisible();

    await page.getByLabel('New task').fill('Verify the release checklist');
    await page.getByRole('button', { name: 'Add' }).click();

    await expect(page.getByText('Verify the release checklist')).toBeVisible();
    await expect(page.getByText('1 of 3 tasks done')).toBeVisible();
  } finally {
    await context.close();
  }
});
