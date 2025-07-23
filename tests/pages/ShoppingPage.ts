import { expect, Locator, Page } from "@playwright/test";

export class ShoppingPage {

    private readonly sortButton:Locator;
    private readonly title:Locator;
    private readonly inventoryItem:Locator;
    
    constructor(page:Page) {
         this.sortButton    = page.locator('select.product_sort_container');
         this.title         = page.locator('.title');
         this.inventoryItem = page.locator('.inventory_item');
    }

    async verifyPage(){
       await expect.soft(this.sortButton).toBeVisible();
       await expect.soft(this.title).toHaveText('Products');
       await expect.soft((await this.inventoryItem.all()).length).toBeGreaterThan(0);

    }
}