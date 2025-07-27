import { test, expect } from '@playwright/test';
import { ShoppingPage } from './pages/ShoppingPage';

test('Inventory Item Successfull', async ({ page },testInfo) => {

    await page.goto('https://www.saucedemo.com/inventory.html');

    const shoppingPage = new ShoppingPage(page);
    await shoppingPage.verifyPage();
    await testInfo.attach('ShoppingPage',{
        body: await page.screenshot(),
        contentType: 'image/png'
    })
});

test('Sorting price from highest to lowest', async ({ page },testInfo) => {

    await page.goto('https://www.saucedemo.com/inventory.html');

    const shoppingPage = new ShoppingPage(page);
    await shoppingPage.orderItems('hilo');
    await shoppingPage.verifyItemPrice('$49.99', '$7.99');
    await testInfo.attach('ShoppingSort1',{
        body: await page.screenshot(),
        contentType: 'image/png'
    })
});

test('Sorting names from highest to lowest', async ({ page },testInfo) => {

    await page.goto('https://www.saucedemo.com/inventory.html');

    const shoppingPage = new ShoppingPage(page);
    await shoppingPage.orderItems('za');
    await shoppingPage.verifyItemName('Test.allTheThings() T-Shirt (Red)', 'Sauce Labs Backpack');
    await testInfo.attach('ShoppingSort2',{
        body: await page.screenshot(),
        contentType: 'image/png'
    })
});