import { expect, Locator, Page } from "@playwright/test";

export class ShoppingPage {

    private readonly sortButton: Locator;
    private readonly title: Locator;
    private readonly inventoryItem: Locator;
    private readonly itemPrice: Locator;
    private readonly itemName: Locator;
    private readonly itemImage: Locator;
    private readonly addToCartButton: Locator;

    constructor(page: Page) {
        this.sortButton = page.locator('select.product_sort_container');
        this.title = page.locator('.title');
        this.inventoryItem = page.locator('.inventory_item');
        this.itemPrice = page.locator(".inventory_item_price");
        this.itemName = page.locator(".inventory_item_name");
        this.itemImage = page.locator("img.inventory_item_img");
        this.addToCartButton = page.locator(".btn_inventory");
    }

    async verifyPage() {
        await expect.soft(this.sortButton).toBeVisible();
        await expect.soft(this.title).toHaveText('Products');
        await expect.soft((await this.inventoryItem.all()).length).toBeGreaterThan(0);
    }

    async orderItems(value: string) {
        await this.sortButton.selectOption(value);
    }

    async verifyItemPrice(first: string, last: string) {
        await expect.soft(this.itemPrice.first()).toHaveText(first),
        await expect.soft(this.itemPrice.last()).toHaveText(last)
    }

    async verifyItemName(first: string, last: string) {
        await expect.soft(this.itemName.first()).toHaveText(first),
        await expect.soft(this.itemName.last()).toHaveText(last)
    }

    async clickImageByIndex( index:number) {
       await this.itemImage.nth(index).click();
    }
}