
import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/Loginpage';

test.describe('SauceDemo Login Tests', () => {

  test('TC001 - Login with valid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory/);

    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('TC002 - Login with invalid password', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login('standard_user', 'wrong_password');

    await expect(loginPage.errorMessage).toBeVisible();

    await expect(loginPage.errorMessage)
      .toContainText('Username and password do not match');
  });

  test('TC003 - Login without username and password', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login('', '');

    await expect(loginPage.errorMessage).toBeVisible();

    await expect(loginPage.errorMessage)
      .toContainText('Username is required');
  });

  test('TC004 - Login with valid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory/);
  });

});
