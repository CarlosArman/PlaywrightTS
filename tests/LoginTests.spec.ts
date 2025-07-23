import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ShoppingPage } from './pages/ShoppingPage';

test('Login Successfull', async ({ page }) => {

    await page.goto('https://saucedemo.com');

    const loginPage = new LoginPage(page);
    await loginPage.loginWithCredentiales('standard_user', 'secret_sauce');

    const shoppingPage = new ShoppingPage(page);
    await shoppingPage.verifyPage();
    await page.screenshot({path:'screemshot/loginsuccessfull.png', fullPage:true})

});

test('Login Unsuccessfull', async ({ page }) => {

    await page.goto('https://saucedemo.com');

    const loginPage = new LoginPage(page);
    await loginPage.loginWithCredentiales('locked_out_user', 'secret_sauce');
    await loginPage.verifyErrorMessage('Epic sadface: Sorry, this user has been locked out.');
    await page.screenshot({path:'screemshot/loginunsuccesfull.png'})

});

test('Verify Login Page', async ({ page },testInfo) => {

    await page.goto('https://saucedemo.com');

    const loginPage = new LoginPage(page);
    await loginPage.verifyPage();
    await testInfo.attach('verifyLoginPage',{
        body: await page.screenshot(),
        contentType: 'image/png'
    })

  //  await page.screenshot({path:'screemshot/verifylogin.png'})

});

// npx playwright test nombreDelArchivo -g "Verify Login Page" --repeat-each 5
// npx playwright show-report

