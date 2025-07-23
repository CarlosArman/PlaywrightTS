import { test, expect } from '@playwright/test';

test('purchase an item', async ({ page }) => {
    await page.goto('https://saucedemo.com');

    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    const itemsContainer = await page.locator('#inventory_container .inventory_item').all();

    const randomIndex = Math.floor(Math.random() * itemsContainer.length);

    const randomItem = itemsContainer[randomIndex];

    const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText();
    const expectedName = await randomItem.locator('.inventory_item_name').innerText();
    const expectedPrice = await randomItem.locator('.inventory_item_price').innerText();


    console.log(`Price: ${expectedPrice} Name: ${expectedName} Description: ${expectedDescription}`)

    await randomItem.getByRole('button', { name: 'Add to cart' }).click();

    await page.locator('a.shopping_cart_link').click();

    const actualDescription = await page.locator('.inventory_item_desc').innerText();
    const actualName = await page.locator('.inventory_item_name').innerText();
    const actualPrice = await page.locator('.inventory_item_price').innerText();

    await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();
    await expect(expectedDescription).toEqual(actualDescription);
    await expect(expectedName).toEqual(actualName);
    await expect(expectedPrice).toEqual(actualPrice);

    console.log(`Price: ${actualPrice} Name: ${actualName} Description: ${actualDescription}`)

    await page.getByRole('button', { name: 'Checkout' }).click();

    await page.getByRole('textbox', { name: 'First Name' }).fill('Jhon');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Dhoe');
    await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('1100');

    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Finish' }).click();

    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();

});
