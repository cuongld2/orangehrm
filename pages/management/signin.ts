import { expect, TestInfo, type Locator, type Page } from '@playwright/test';

export class SignInPage {
  readonly page: Page;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInHeader: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.signInHeader = page.locator('h5', { hasText: 'Login' });
    this.signInButton = page.getByRole('button', { name: ' Login ' });
  }

  async gotoSignInPage() {
    await this.page.goto('/web/index.php/auth/login');
    await expect(this.signInHeader).toBeVisible();
  }

  async fillUsername(username: string) {
    await this.userNameInput.fill(username);
}

async fillPassword(password: string) {
    await this.passwordInput.fill(password);
}

async clickSignInButton() {
    await this.signInButton.click();
}

async checkSignInSuccessfully(){
    await expect(this.page.locator('h6', {hasText:"Dashboard"})).toBeVisible();
}

async verifySignInUsingEmailAndPassword(testInfo: TestInfo) {
    await this.gotoSignInPage();
    if (!process.env.USERNAME_ACCOUNT_REGULAR_USER) {
        throw new Error('USERNAME_ACCOUNT_REGULAR_USER environment variable is not set');
    }
    const email = process.env.USERNAME_ACCOUNT_REGULAR_USER;
    if (!process.env.PASSWORD_ACCOUNT_REGULAR_USER) {
        throw new Error('PASSWORD_ACCOUNT_REGULAR_USER environment variable is not set');
    }
    const password = process.env.PASSWORD_ACCOUNT_REGULAR_USER;
    await this.fillUsername(email);
    await this.fillPassword(password);
    const beforeSignIn = await this.page.screenshot();
    testInfo.attach('Home Page', {
        body: beforeSignIn,
        contentType: 'image/png',
  });
    await this.clickSignInButton();
    const afterSignIn = await this.page.screenshot();
    testInfo.attach('Home Page', {
        body: afterSignIn,
        contentType: 'image/png',
  });
    await this.checkSignInSuccessfully();
    }

    async verifySignInUsingEmailAndPasswordWithArgument(email:string, password:string, testInfo: TestInfo) {
        await this.gotoSignInPage();
        await this.fillUsername(email);
        await this.fillPassword(password);
        console.log("email", email);
        console.log("password", password);
        const beforeSignIn = await this.page.screenshot();
        testInfo.attach('Home Page', {
            body: beforeSignIn,
            contentType: 'image/png',
      });
        await this.clickSignInButton();
        const afterSignIn = await this.page.screenshot();
        testInfo.attach('Home Page', {
            body: afterSignIn,
            contentType: 'image/png',
      });
        await this.checkSignInSuccessfully();
        }
    
    async verifySignInUsingEmailAndPasswordWithError(username:string, password: string, errorMessage: string, testInfo: TestInfo) {
        await this.gotoSignInPage();
        await this.fillUsername(username);
        await this.fillPassword(password);
          const beforeSignIn = await this.page.screenshot();
        testInfo.attach('Home Page', {
            body: beforeSignIn,
            contentType: 'image/png',
      });
        await this.clickSignInButton();
        const afterSignIn = await this.page.screenshot();
        testInfo.attach('Home Page', {
            body: afterSignIn,
            contentType: 'image/png',
      });
        await expect(this.page.locator('p', { hasText: errorMessage }).first()).toBeVisible();
        }
    
        async verifyForgotPasswordLink(testInfo: TestInfo) {
            await this.gotoSignInPage();
            const beforeSignIn = await this.page.screenshot();
        testInfo.attach('Home Page', {
            body: beforeSignIn,
            contentType: 'image/png',
      });
            await this.page.locator('p', { hasText: 'Forgot your password?' }).click();
            const afterSignIn = await this.page.screenshot();
        testInfo.attach('Home Page', {
            body: afterSignIn,
            contentType: 'image/png',
        });
        await expect(this.page.locator('h6', { hasText: 'Reset Password' })).toBeVisible();
        }

        async verifySignUpLink(testInfo: TestInfo) {
            await this.gotoSignInPage();
            const beforeSignIn = await this.page.screenshot();
        testInfo.attach('Home Page', {
            body: beforeSignIn,
            contentType: 'image/png',
      });
            await this.page.getByRole('link', { name: 'Sign up' }).first().click();
            const afterSignIn = await this.page.screenshot();
        testInfo.attach('Home Page', {
            body: afterSignIn,
            contentType: 'image/png',
        });
        await expect(this.page.locator('h2', { hasText: 'Create Your Store Account' })).toBeVisible();
        }
        async verifyUsernamePasswordsRequired(testInfo: TestInfo) {
            await this.gotoSignInPage();
            await this.signInButton.click();
            expect((await this.page.locator('span', { hasText: 'Required' }).all()).length).toBe(2);
        }
            

}