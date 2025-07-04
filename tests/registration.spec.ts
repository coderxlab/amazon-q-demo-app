import { test, expect } from '@playwright/test';

test.describe('Registration Flow', () => {
  test('Complete registration with valid data → success redirect to /login', async ({ page }) => {
    // Navigate to registration page
    await page.goto('/register');
    
    // Verify we're on the registration page
    await expect(page).toHaveTitle('Register - Supabase Auth App');
    await expect(page.getByRole('heading', { name: 'Sign Up' })).toBeVisible();
    
    // Fill in first name
    await page.getByRole('textbox', { name: 'Enter First Name' }).fill('John');
    
    // Fill in last name
    await page.getByRole('textbox', { name: 'Enter Last Name' }).fill('Doe');
    
    // Fill in username
    await page.getByRole('textbox', { name: 'Enter Username' }).fill('johndoe123');
    
    // Fill in email
    await page.getByRole('textbox', { name: 'Enter Email' }).fill('john.doe@example.com');
    
    // Fill in password
    await page.getByRole('textbox', { name: 'Enter Password' }).fill('Password123!');
    
    // Fill in confirm password
    await page.getByRole('textbox', { name: 'Confirm Password' }).fill('Password123!');
    
    // Check the terms and conditions checkbox
    await page.getByRole('checkbox', { name: 'I agree to all terms' }).check();
    
    // Click the Register button
    await page.getByRole('button', { name: 'Register' }).click();
    
    // Verify redirect to login page with success message
    await expect(page).toHaveURL(/\/login\?message=Registration\+successful/);
  });
});