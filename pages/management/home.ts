import { expect, TestInfo, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly logOutButton: Locator;
  readonly homeHeader: Locator;
  readonly logInHeader: Locator;
  readonly pimMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logOutButton = page.locator('button[data-slot="button"]');
    this.homeHeader = page.locator('h6', { hasText: 'Dashboard' });
    this.logInHeader = page.locator('h2', { hasText: 'Welcome Back' });
    this.pimMenu = page.locator('span', { hasText: 'PIM' });
  }

  async goToPIMPage(testInfo: TestInfo){
    const beforeGoToPIMPage = await this.page.screenshot();
    testInfo.attach('Home Page', {
        body: beforeGoToPIMPage,
        contentType: 'image/png',
  });
    await this.pimMenu.click();
    const afterGotoPIMPage = await this.page.screenshot();
    testInfo.attach('Home Page', {
        body: afterGotoPIMPage,
        contentType: 'image/png',
  });
    await expect(this.page.locator('h5', { hasText: 'Employee Information' })).toBeVisible();
  }

  async logOut() {
    await this.logOutButton.click();
    await expect(this.logInHeader).toBeVisible();
  }
}
