import { test} from '@playwright/test';
import { SignInPage } from '../../pages/management/signin';
import { HomePage } from '../../pages/management/home';
test('SignIn - Positive - Sign in using username and password',{
  tag: ['@positive','@signin','@regression'],
}, async ({ page }, testInfo) => {
  const signInPage = new SignInPage(page);
  await signInPage.verifySignInUsingEmailAndPassword(testInfo);
});

test('SignIn - Negative - Sign in using username and password - Invalid username',{
  tag: ['@negative','@signin'],
}, async ({ page }, testInfo) => {
  const signInPage = new SignInPage(page);
  await signInPage.verifySignInUsingEmailAndPasswordWithError("Admin123", "admin123" ,"Invalid credentials", testInfo);
});

test('SignIn - Negative - Sign in using username and password - Invalid password',{
  tag: ['@negative','@signin'],
}, async ({ page }, testInfo) => {
  const signInPage = new SignInPage(page);
  await signInPage.verifySignInUsingEmailAndPasswordWithError("Admin", "admin12345" ,"Invalid credentials", testInfo);
});

  test('SignIn - Negative - Sign in using email and password - Verify forgot password link',{
    tag: ['@negative','@signin'],
  }, async ({ page }, testInfo) => {
    const signInPage = new SignInPage(page);
    await signInPage.verifyForgotPasswordLink(testInfo);
  });

  test('SignIn - Negative - Sign in using username and password - Verify username and passwords are required fields',{
    tag: ['@negative','@signin'],
  }, async ({ page }, testInfo) => {
    const signInPage = new SignInPage(page);
    await signInPage.verifyUsernamePasswordsRequired(testInfo);
  });