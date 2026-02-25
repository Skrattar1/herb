import { test, expect } from '@playwright/test';
import LoginModalPage from './pages/loginModal.page.js';
import EnvHelper from '../helpers/env.helper.js';
import { ERROR_MESSAGES } from './test-data.js';

test.describe('Авторизация пользователя', () => {

    test.beforeEach(async ({page}) => {
        const loginModal = new LoginModalPage(page);
        await loginModal.navigate();
    });

    test('Успешный вход с валидными данными', async ({page}) => {
        const loginModal = new LoginModalPage(page);
        const {email, password} = EnvHelper.getCredentials();

        await loginModal.openModal();
        await loginModal.loginWithCredentials(email, password);

        await loginModal.waitForWelcomeModal();
        await expect(loginModal.welcomeModal).toBeVisible();
    });

    test('Валидация Email', async ({ page }) => {
        const loginModal = new LoginModalPage(page);
        const {wrongEmail, password } = EnvHelper.getCredentials();

        await loginModal.openModal();
        await loginModal.loginWithCredentials(wrongEmail, password);

        await loginModal.waitForWrongEmail();
        await expect(loginModal.wrongEmail).toBeVisible();
    });

    test('Валидация пользователя', async ({ page }) => {
        const loginModal = new LoginModalPage(page);
        const {invalidEmail, password } = EnvHelper.getCredentials();

        await loginModal.openModal();
        await loginModal.loginWithCredentials(invalidEmail, password);

        await loginModal.waitForInvalidUser();
        await expect(loginModal.invalidUser).toBeVisible();
    });

    test('Валидация кнопки регистрации', async ({ page }) => {
        const loginModal = new LoginModalPage(page);

        await loginModal.openModal();
        await expect(loginModal.registerButton).toBeVisible();

        // Кнопка существует в DOM
        await expect(loginModal.registerButton).toBeAttached();

        // Кнопка видима и содержит текст
        await expect(loginModal.registerButton).toBeVisible();
        await expect(loginModal.registerButton).toContainText('Зарегистрируйтесь');
    })

    test('Валидация полей', async ({ page }) => {
        const loginModal = new LoginModalPage(page);

        await loginModal.openModal();

        // Видимость полей
        await expect(loginModal.emailInput).toBeVisible();
        await expect(loginModal.passwordInput).toBeVisible();

        // Поля пустые при загрузке
        await expect(loginModal.emailInput).toBeEmpty();
        await expect(loginModal.passwordInput).toBeEmpty();

        // Placeholder
        await expect(loginModal.emailInput).toHaveAttribute('placeholder', 'Email');
        await expect(loginModal.passwordInput).toHaveAttribute('placeholder', 'Пароль');

        // Тип полей
        await expect(loginModal.emailInput).toHaveAttribute('type', 'email');
        await expect(loginModal.passwordInput).toHaveAttribute('type', 'password');
    })

    test('Валидация кнопки входа', async ({ page }) => {
        const loginModal = new LoginModalPage(page);

        await loginModal.openModal();

        // Видимость кнопки
        await expect(loginModal.loginButton).toBeVisible();

        // Текст на кнопке
        await expect(loginModal.loginButton).toHaveText('Войти в аккаунт');

        // Кнопка доступна для клика
        await expect(loginModal.loginButton).toBeEnabled();
    })

    test('Валидация кнопки восстановления пароля', async ({ page }) => {
        const loginModal = new LoginModalPage(page);

        await loginModal.openModal();

        // Видимость кнопки
        await expect(loginModal.resetPasswordButton).toBeVisible();

        // Текст на кнопке
        await expect(loginModal.resetPasswordButton).toHaveText('Восстановить пароль');

        // Кнопка доступна для клика
        await expect(loginModal.resetPasswordButton).toBeEnabled();
    })
});

test.describe('Негативные сценарии', () => {

    test('Ошибка при неверном пароле', async ({ page }) => {
        const loginModal = new LoginModalPage(page);
        const { email, wrongPassword } = EnvHelper.getCredentials();

        await loginModal.openModal();
        await loginModal.loginWithCredentials(email, wrongPassword);

        await loginModal.waitForError();
        await expect(loginModal.errorMessage).toBeVisible();
        await expect(loginModal.errorMessage).toHaveText(ERROR_MESSAGES.INVALID_CREDENTIALS);
    });

    test('Ошибка при пустом поле электронной почты', async ({ page }) => {
        const loginModal = new LoginModalPage(page);
        const { email, password } = EnvHelper.getCredentials();

        await loginModal.openModal();
        await loginModal.loginWithCredentials('', password);

        await loginModal.waitForEmptyEmail();
        await expect(loginModal.emptyEmail).toBeVisible();
        await expect(loginModal.emptyEmail).toHaveText(ERROR_MESSAGES.EMPTY_EMAIL_FIELD);
    });

    test('Ошибка при пустом поле пароля', async ({ page }) => {
        const loginModal = new LoginModalPage(page);
        const { email, password } = EnvHelper.getCredentials();

        await loginModal.openModal();
        await loginModal.loginWithCredentials(email, '');

        await loginModal.waitForEmptyPassword();
        await expect(loginModal.emptyPassword).toBeVisible();
        await expect(loginModal.emptyPassword).toHaveText(ERROR_MESSAGES.EMPTY_PASSWORD_FIELD);
    });
});
