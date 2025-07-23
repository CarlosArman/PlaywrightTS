import { expect, Locator, Page } from "@playwright/test";


export class LoginPage {

    private readonly usernameTextBox: Locator;
    private readonly passwordTextBox: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        this.usernameTextBox = page.getByRole('textbox', { name: 'Username' });
        this.passwordTextBox = page.getByRole('textbox', { name: 'Password' });
        this.loginButton     = page.getByRole('button', { name: 'Login' });
        this.errorMessage    = page.locator('div.error h3');
    }

    async fillUsername(username: string) {
        await this.usernameTextBox.fill(username);
    }

    async fillPassword(password: string) {
        await this.passwordTextBox.fill(password);
    }

    async clickOnLogin() {
        await this.loginButton.click();
    }

    async loginWithCredentiales(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickOnLogin();
    }

    async verifyPage() {
        await expect.soft(this.usernameTextBox).toBeVisible();
        await expect.soft(this.passwordTextBox).toBeVisible();
        await expect.soft(this.loginButton).toBeVisible();

    }

    async verifyErrorMessage(message: string) {
        await expect(this.errorMessage).toHaveText(message);
    }
}