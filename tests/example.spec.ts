import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


test('test', async ({ page }) => {
  await page.goto('https://mercadolibre.com.co');

  await page.getByRole('combobox', { name: 'Ingresa lo que quieras encontrar' }).fill('Iphone');

  await page.keyboard.press('Enter')

  await expect(page.getByText('iPhone').nth(0)).toBeVisible();

  const list = await page.locator('ol li h3 a').allInnerTexts();

  for (let title of list) {
    console.log(title)
  }

});
