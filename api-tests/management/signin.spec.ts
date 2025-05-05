import { expect, request, test} from '@playwright/test';
import { SignInPage } from '../../pages/management/signin';
import { HomePage } from '../../pages/management/home';
test('Get employees list - Positive - Default params',{
  tag: ['@positive','@signin','@regression'],
}, async ({ page, request }, testInfo) => {
  const signInPage = new SignInPage(page);
  await signInPage.verifySignInUsingEmailAndPassword(testInfo);
  let cookieOrange = '';
  await page.context().cookies().then(async (cookies) => {
    const cookie = cookies.find(cookie => cookie.name === 'orangehrm');
    if (cookie) {
      console.log(`Session ID: ${cookie.value}`);
      cookieOrange = cookie.value;
    } else {
      throw new Error('Session ID cookie not found');
    }
  });
  const newIssue = await request.get(`/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC`,
    {
        headers: { 
        Cookie: `orangehrm=${cookieOrange}`,
        }   
    }
);
  expect(newIssue.ok()).toBeTruthy();
  expect(newIssue.status()).toBe(200);
  expect(newIssue.statusText()).toBe("OK");
  expect((((await newIssue.json())["meta"]))["total"]).toBeGreaterThan(0);
});