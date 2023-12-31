import { test as setup, expect } from '@playwright/test';
import { successLoginCredentials } from '../testdata/creds.ts';  

const authFile = '.auth/standard_user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('/');
  await page.getByTestId('username').fill(successLoginCredentials.username);
  await page.getByTestId('password').fill(successLoginCredentials.password);
  await page.getByTestId('login-button').click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('https://www.saucedemo.com/inventory.html');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  //await expect(page.getByRole('button', { id: 'Open Menu' })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});