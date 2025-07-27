import { test as setup, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ShoppingPage } from './pages/ShoppingPage';

const authFile = "playwright/.auth/user.json";

setup("authenticate",async({page})=>{
    await page.goto('https://saucedemo.com');

    const loginPage = new LoginPage(page);
    await loginPage.loginWithCredentiales('standard_user', 'secret_sauce');

    const shoppingPage = new ShoppingPage(page);
    await shoppingPage.verifyPage();

    await page.context().storageState({path: authFile})

})