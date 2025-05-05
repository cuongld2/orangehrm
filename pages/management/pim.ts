import { expect, TestInfo, type Locator, type Page } from '@playwright/test';

export class PIMPage {
  readonly page: Page;
  readonly employeeNameFilter: Locator;
  readonly employmentStatusFilter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.employeeNameFilter = page.getByPlaceholder('Type for hints...').first();
    this.employmentStatusFilter = page.locator('div[class="oxd-input-group oxd-input-field-bottom-space"]', { hasText: 'Employment Status' }).locator('div[class="oxd-select-text-input"]');
  }

  async filterByEmployeeName(employeeName: string){
    await this.employeeNameFilter.fill(employeeName);
    await this.page.locator('div[role="listbox"]', { hasText: employeeName }).click();
  }

  async filterByEmploymentStatus(employmentStatus: string){
    await this.employmentStatusFilter.click();
    await this.page.locator('div[role="listbox"]', { hasText: employmentStatus }).first().click();
    expect(await this.employmentStatusFilter.textContent()).toContain(employmentStatus);
  }

  async filterApplyButton(){
    await this.page.locator('button',{hasText:" Search "}).click();
    await expect(this.page.locator('span', { hasText: 'Found' })).toBeVisible();
  }

  async verifyFilterByEmployeeName(employeeName: string, testInfo: TestInfo) {
    const beforeFilter = await this.page.screenshot();
    testInfo.attach('PIM Page', {
        body: beforeFilter,
        contentType: 'image/png',
  });
    await this.filterByEmployeeName(employeeName);
    const afterFilter = await this.page.screenshot();
    testInfo.attach('PIM Page', {
        body: afterFilter,
        contentType: 'image/png',
  });
  await this.filterApplyButton();
  const employeeNameText = await this.page.locator('div[class="oxd-table-row oxd-table-row--with-border oxd-table-row--clickable"]').first().textContent();
  expect(employeeNameText).toContain(employeeName);
  }

  async verifyFilterByInvalidEmployeeName(employeeName: string, testInfo: TestInfo) {
    const beforeFilter = await this.page.screenshot();
    testInfo.attach('PIM Page', {
        body: beforeFilter,
        contentType: 'image/png',
  });
    await this.employeeNameFilter.fill(employeeName);
    const afterFilter = await this.page.screenshot();
    testInfo.attach('PIM Page', {
        body: afterFilter,
        contentType: 'image/png',
  });
  await this.page.locator('button',{hasText:" Search "}).click();
  await expect(this.page.locator('span', { hasText: 'No Records Found' })).toBeVisible();
  }

  async verifyFilterByEmploymentStatus(employmentStatus: string, testInfo: TestInfo) {
    const beforeFilter = await this.page.screenshot();
    testInfo.attach('PIM Page', {
        body: beforeFilter,
        contentType: 'image/png',
  });
    await this.filterByEmploymentStatus(employmentStatus);
    const afterFilter = await this.page.screenshot();
    testInfo.attach('PIM Page', {
        body: afterFilter,
        contentType: 'image/png',
  });
  await this.filterApplyButton();
  const employeeInfoText = await this.page.locator('div[class="oxd-table-row oxd-table-row--with-border oxd-table-row--clickable"]').first().textContent();
  expect(employeeInfoText).toContain(employmentStatus);
  }

}