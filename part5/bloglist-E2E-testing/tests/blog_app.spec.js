const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith } = require('./helper');

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset');
        await request.post('/api/users', {
            data: {
                name: 'Jhon Doe',
                username: 'jhondoe',
                password: 'password',
            },
        });

        await page.goto('/');
    });

    test('Login form is shown', async ({ page }) => {
        const loginForm = page.getByText('log in to application').locator('..');
        await expect(loginForm).toBeVisible();
    });

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'jhondoe', 'password');
            await expect(page.getByText('Jhon Doe logged in')).toBeVisible();
        });

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'jhondoe', 'wrong');

            const errorDiv = page.locator('.notification.error');
            await expect(errorDiv).toContainText(
                'invalid username or password'
            );
            await expect(errorDiv).toHaveCSS('border-style', 'solid');
            await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)');
            await expect(
                page.getByText('Matti Luukkainen logged in')
            ).not.toBeVisible();
        });
    });
});
