import { test} from '@playwright/test';
import { SignInPage } from '../../pages/management/signin';
import { HomePage } from '../../pages/management/home';
import { before } from 'node:test';
import { PIMPage } from '../../pages/management/pim';

test.beforeEach(async ({ page }, testInfo) => {
  const signInPage = new SignInPage(page);
  await signInPage.verifySignInUsingEmailAndPassword(testInfo);
});

test('PIM Search - Positive - Search using employee name',{
  tag: ['@positive','@search','@pim','@regression'],
}, async ({ page }, testInfo) => {
  const homePage = new HomePage(page);
  await homePage.goToPIMPage(testInfo);
  const pimPage = new PIMPage(page);
  await pimPage.verifyFilterByEmployeeName("Charlotte Smith", testInfo);
});

test('PIM Search - Positive - Search using employee status',{
  tag: ['@positive','@search','@pim','@regression'],
}, async ({ page }, testInfo) => {
  const homePage = new HomePage(page);
  await homePage.goToPIMPage(testInfo);
  const pimPage = new PIMPage(page);
  await pimPage.verifyFilterByEmploymentStatus("Full-Time Contract", testInfo);
});

test('PIM Search - Negative - Search using invalid employee name',{
  tag: ['@negative','@search','@pim'],
}, async ({ page }, testInfo) => {
  const homePage = new HomePage(page);
  await homePage.goToPIMPage(testInfo);
  const pimPage = new PIMPage(page);
  await pimPage.verifyFilterByInvalidEmployeeName("Invalid Name", testInfo);
});