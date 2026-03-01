import { test, expect } from '@playwright/test';
import RegisterPage from './pages/register.page.js';
import LoginModalPage from "./pages/loginModal.page.js";
import EnvHelper from '../helpers/env.helper.js';
import { TEST_USER} from "./test-data.js";
import { ERROR_MESSAGES } from './test-data.js';




test.describe('Регистрация пользователя', () => {

    test.beforeEach(async ({page}) => {
        const loginModal = new LoginModalPage(page);
        const {email, password} = EnvHelper.getCredentials();

        await loginModal.navigate();
        await loginModal.openModal();
        await loginModal.registerButtonClick();
    });

    test('Отображение всех элементов формы регистрации', async ({page}) => {
        const registerPage = new RegisterPage(page);

        // Проверка видимости основных полей
        await expect(registerPage.firstNameInput).toBeVisible();
        await expect(registerPage.lastNameInput).toBeVisible();
        await expect(registerPage.emailInput).toBeVisible();
        await expect(registerPage.phoneInput).toBeVisible();
        await expect(registerPage.dateOfBirthInput).toBeVisible();
        await expect(registerPage.passwordInput).toBeVisible();
        await expect(registerPage.personalDataCheckbox).toBeVisible();
        await expect(registerPage.tosCheckbox).toBeVisible();
    });

    test('Валидация полей при пустой форме', async ({page}) => {
        const registerPage = new RegisterPage(page);

        await registerPage.mainLoginButton.click();
        await registerPage.clickRegisterButton();
        await registerPage.loginWithEmptyCredentials();

        // Проверка сообщений об ошибках
        await expect(registerPage.emptyEmail).toHaveText(ERROR_MESSAGES.EMPTY_EMAIL)
        await expect(registerPage.shortPassword).toHaveText(ERROR_MESSAGES.SHORT_PASSWORD)
        await expect(registerPage.passwordCase).toHaveText(ERROR_MESSAGES.PASSWORD_CASE)
        await expect(registerPage.passwordSymbols).toHaveText(ERROR_MESSAGES.PASSWORD_SYMBOLS)
        await expect(registerPage.emptyNumber).toHaveText(ERROR_MESSAGES.EMPTY_NUMBER);
    });

    test('Валидация поля email с некорректным значением', async ({page}) => {
        const registerPage = new RegisterPage(page);

        await registerPage.mainLoginButton.click();
        await registerPage.clickRegisterButton();
        await registerPage.fillEmail(TEST_USER.wrongEmail);

        await expect(registerPage.wrongEmail).toHaveText(ERROR_MESSAGES.WRONG_EMAIL);
    });

    test('Валидация поля email с невалидным форматом', async ({page}) => {
        const registerPage = new RegisterPage(page);

        await registerPage.mainLoginButton.click();
        await registerPage.clickRegisterButton();
        await registerPage.fillEmail(TEST_USER.wrongEmail);

        await expect(registerPage.wrongEmail).toHaveText(ERROR_MESSAGES.WRONG_EMAIL);
    });

    test('Валидация поля email с корректным значением', async ({page}) => {
        const registerPage = new RegisterPage(page);

        await registerPage.mainLoginButton.click();
        await registerPage.clickRegisterButton();
        await registerPage.fillEmail(TEST_USER.email);

        await expect(registerPage.wrongEmail).not.toBeVisible();
    });

    test('Валидация номера телефона с корректным значением', async ({page}) => {
        const registerPage = new RegisterPage(page);

        await registerPage.mainLoginButton.click();
        await registerPage.clickRegisterButton();
        await registerPage.fillPhone(TEST_USER.phoneNumber);

        await expect(registerPage.wrongNumber).not.toBeVisible();
    });

    test('Валидация пароля - недостаточная длина', async ({page}) => {
        const registerPage = new RegisterPage(page);

        await registerPage.mainLoginButton.click();
        await registerPage.clickRegisterButton();
        await registerPage.fillPassword('1234567');

        await expect(registerPage.shortPassword).toBeVisible();
    });

    test('Валидация пароля - отсутствие заглавных букв', async ({page}) => {
        const registerPage = new RegisterPage(page);

        await registerPage.mainLoginButton.click();
        await registerPage.clickRegisterButton();
        await registerPage.fillPassword('password123!');

        await expect(registerPage.passwordCase).toBeVisible();
    });

    test('Валидация пароля - отсутствие символов или цифр', async ({page}) => {
        const registerPage = new RegisterPage(page);

        await registerPage.mainLoginButton.click();
        await registerPage.clickRegisterButton();
        await registerPage.fillPassword('Password');

        await expect(registerPage.passwordSymbols).toBeVisible();
    });

    test('Валидация пароля - корректный пароль', async ({page}) => {
        const registerPage = new RegisterPage(page);

        await registerPage.mainLoginButton.click();
        await registerPage.clickRegisterButton();
        await registerPage.fillPassword(TEST_USER.password);

        await expect(registerPage.shortPassword).not.toBeVisible();
        await expect(registerPage.passwordCase).not.toBeVisible();
        await expect(registerPage.passwordSymbols).not.toBeVisible();
    });

    test('Выбор даты рождения через календарь', async ({page}) => {
        const registerPage = new RegisterPage(page);

        await registerPage.mainLoginButton.click();
        await registerPage.clickRegisterButton();

        const testDate = '15.05.1990';
        await registerPage.selectDateOfBirth(testDate);

        // Дополнительная проверка, что дата установилась
        await expect(registerPage.dateOfBirthInput).toHaveValue(testDate);
    });

    test('Отметка чекбоксов', async ({page}) => {
        const registerPage = new RegisterPage(page);

        await registerPage.mainLoginButton.click();
        await registerPage.clickRegisterButton();

        // Проверка начального состояния
        await expect(registerPage.personalDataCheckbox).not.toBeChecked();
        await expect(registerPage.tosCheckbox).not.toBeChecked();

        // Отметка чекбоксов
        await registerPage.checkPersonalDataCheckbox();
        await registerPage.checkTosCheckbox();

        // Проверка, что отметились
        await expect(registerPage.personalDataCheckbox).toBeChecked();
        await expect(registerPage.tosCheckbox).toBeChecked();

        // Снятие отметки
        await registerPage.uncheckPersonalDataCheckbox();
        await expect(registerPage.personalDataCheckbox).not.toBeChecked();
    });

    test('Успешная регистрация с валидными данными', async ({page}) => {
        const registerPage = new RegisterPage(page);

        await registerPage.mainLoginButton.click();
        await registerPage.clickRegisterButton();

        // Генерируем уникальный email для теста, чтобы не конфликтовать с существующим
        const uniqueEmail = `test${Date.now()}@example.com`;

        // Заполняем все поля
        await registerPage.fillFirstName(TEST_USER.firstName);
        await registerPage.fillLastName(TEST_USER.lastName);
        await registerPage.fillEmail(uniqueEmail);
        await registerPage.fillPhone(TEST_USER.phoneNumber);
        await registerPage.selectDateOfBirth('15.05.1990');
        await registerPage.fillPassword(TEST_USER.password);
        await registerPage.checkPersonalDataCheckbox();
        await registerPage.checkTosCheckbox();

        // Отправка формы
        await registerPage.saveButton.click();

        // Проверка успешной регистрации (редирект или сообщение)
        await expect(registerPage.title).toBeVisible({timeout: 10000});
    });
});

/*//Если решим дизейблить снопку до регистрации
test('Кнопка регистрации неактивна пока не заполнены обязательные поля', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.mainLoginButton.click();
    await registerPage.clickRegisterButton();

    // Кнопка должна быть неактивна в начале
    await expect(registerPage.registerButton).toBeDisabled();

    // Заполняем обязательные поля
    await registerPage.fillFirstName(TEST_USER.firstName);
    await registerPage.fillLastName(TEST_USER.lastName);
    await registerPage.fillEmail(TEST_USER.email);
    await registerPage.fillPhone(TEST_USER.phoneNumber);
    await registerPage.fillPassword(TEST_USER.password);
    await registerPage.checkPersonalDataCheckbox();
    await registerPage.checkTosCheckbox();

    // Кнопка должна стать активной
    await expect(registerPage.registerButton).toBeEnabled();
});*/


