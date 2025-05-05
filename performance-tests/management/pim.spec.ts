import { expect, test} from '@playwright/test';
import { SignInPage } from '../../pages/management/signin';
import { HomePage } from '../../pages/management/home';
import { PIMPage } from '../../pages/management/pim';

test.beforeEach(async ({ page }, testInfo) => {
  const signInPage = new SignInPage(page);
  await signInPage.verifySignInUsingEmailAndPassword(testInfo);
});

test('PIM Search - Performance Test - Search using employee name',{
  tag: ['@search','@pim','@performance'],
}, async ({ page }, testInfo) => {
  const homePage = new HomePage(page);
  await homePage.goToPIMPage(testInfo);
  const pimPage = new PIMPage(page);
  await pimPage.verifyFilterByEmployeeName("Charlotte Smith", testInfo);
  const navigationTimingJson = await page.evaluate(() =>
    JSON.stringify(performance.getEntriesByType('navigation'))
  )
  const navigationTiming = JSON.parse(navigationTimingJson)
  navigationTiming.forEach((entry: any) => {
    expect(entry['duration']).toBeLessThan(2000); // 2 seconds
  });
});
