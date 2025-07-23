import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ShoppingPage } from './pages/ShoppingPage';

test('Interceptor Shopping Page', async ({ page }, testInfo) => {

    await page.route("**/*.{png,jpg,svg}", (route) => route.abort());
    await page.goto('https://saucedemo.com');

    const loginPage = new LoginPage(page);
    await loginPage.loginWithCredentiales('standard_user', 'secret_sauce');

    const shoppingPage = new ShoppingPage(page);
    await shoppingPage.verifyPage();

    await page.screenshot({ path: 'screemshot/loginsuccessfull.png', fullPage: true })

    await testInfo.attach('verifyLoginPage', {
        body: await page.screenshot(),
        contentType: 'image/png'
    })
});


test('Interceptor Page', async ({ page }, testInfo) => {

    await page.route("https://demoqa.com/BookStore/v1/Books", (route) => {
        route.fulfill({
            status: 304,
            headers: {
                'Content-Type': 'application/json'
            },
            body: `
            {
                  "books": [
                            {
                                "isbn": "9781449325862",
                                "title": "Git Pocket Guide",
                                "subTitle": "A Working Introduction",
                                "author": "Richard E. Silverman",
                                "publish_date": "2020-06-04T08:48:39.000Z",
                                "publisher": "O'Reilly Media",
                                "pages": 234,
                                "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
                                "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
                            }
                            ]
            }
            `
        })
    });

    await page.goto('https://demoqa.com/books');

    await page.screenshot({ path: 'screemshot/demoqa.png', fullPage: true })

    await testInfo.attach('demoqa', {
        body: await page.screenshot(),
        contentType: 'image/png'
    })


    await page.pause();
});


