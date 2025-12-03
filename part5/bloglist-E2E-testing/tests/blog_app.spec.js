const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith, createBlog } = require('./helper');
const { title } = require('process');

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
                page.getByText('Jhon Doe logged in')
            ).not.toBeVisible();
        });
    });

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'jhondoe', 'password');
        });

        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, {
                title: 'testing blog',
                author: 'jhon doe',
                url: 'https://honest-threat.org',
            });

            const blog = page.locator('.blog').last();
            await expect(blog).toBeVisible();
            await expect(blog).toContainText('testing blog');
        });

        describe('and one blog exists', () => {
            beforeEach(async ({ page }) => {
                await createBlog(page, {
                    title: 'testing blog',
                    author: 'jhon doe',
                    url: 'https://important-dial.org',
                });
            });

            test('the blog can be liked.', async ({ page }) => {
                const blog = page.locator('.blog');
                await blog.getByRole('button', { name: 'view' }).click();
                await blog.getByRole('button', { name: 'like' }).click();

                const likes = blog.locator('.blog-likes');
                await expect(likes).toContainText('likes 1');
            });

            test('the user who added the blog can delete the blog', async ({
                page,
            }) => {
                const blog = page.locator('.blog');
                await blog.getByRole('button', { name: 'view' }).click();

                page.on('dialog', async (dialog) => {
                    expect(dialog.type()).toContain('confirm');
                    await dialog.accept();
                });

                await blog.getByRole('button', { name: 'delete' }).click();
                await expect(blog).not.toBeVisible();
            });
        });

        describe('', () => {
            beforeEach(async ({ page, request }) => {
                await request.post('/api/users', {
                    data: {
                        name: 'Gustavo Waters',
                        username: 'gustavo',
                        password: 'password',
                    },
                });
                await createBlog(page, {
                    title: 'this blog created by jhon doe',
                    author: 'jhon doe',
                    url: 'http://swift-attention.net',
                });
            });

            test("only the user who added the blog sees the blog's delete button", async ({
                page,
            }) => {
                const loggedUser = await page.getByText('Jhon Doe logged in');
                await loggedUser.getByRole('button', { name: 'logout' }).click();

                await loginWith(page, 'gustavo', 'password');
                const blog = page.getByText('this blog created by jhon doe').locator('..');
                await blog.getByRole('button', { name: 'view' }).click();

                await expect(
                    blog.getByRole('button', { name: 'delete' })
                ).toHaveCount(0);
            });
        });
    });
});
