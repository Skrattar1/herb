import {expect} from "@playwright/test";
import LoginModalPage from './loginModal.page.js';

class RegisterPage extends LoginModalPage {
    constructor(page) {
        super(page);

        // Элементы страницы
        this.title = page.locator('h1.title');
        this.saveButton = page.getByText('Сохранить данные');
        this.firstNameInput = page.getByRole('textbox', { name: 'Имя' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Фамилия' });
        this.emailInput = page.getByRole('textbox', { name: 'Электронная почта/логин *' })
        this.phoneInput = page.getByRole('textbox', { name: 'Номер телефона *' });
        this.passwordInput = page.getByRole('textbox', { name: 'Пароль *' })
        this.dateOfBirthInput = page.getByPlaceholder('Дата рождения');
        this.personalDataCheckbox = page.locator('input[name="personal_data"]');
        this.tosCheckbox = page.locator('input[name="personalDataDocument"]');
        this.fieldClear = page.locator('.field-group__clear')
        this.calendarMenu = page.locator('.dp__menu_inner');
        this.monthToggle = page.locator('[data-test-id="month-toggle-overlay-0"]');
        this.yearToggle = page.locator('[data-test-id="year-toggle-overlay-0"]');
        this.overlay = page.locator('.dp__overlay');
        this.overlayCell = page.locator('.dp__overlay_cell');

        //Сообщения об ошибках
        this.wrongNumber = page.locator('span.field-group__error')
            .filter({hasText: 'Номер телефона неверного формата'});
        this.shortPassword = page.locator('span.field-group__error')
            .filter({hasText: 'Пароль должен состоять из 8 символов'});
        this.passwordCase = page.locator('span.field-group__error')
            .filter({hasText: 'Пароль должен содержать прописные и заглавные'});
        this.passwordSymbols = page.locator('span.field-group__error')
            .filter({hasText: 'Пароль должен содержать символы или цифры'});
        this.emptyEmail = page.locator('span.field-group__error')
            .filter({ hasText: 'Email является обязательным полем' });
        this.emptyPassword = page.locator('span.field-group__error')
            .filter({ hasText: 'Пароль является обязательным полем' });
        this.emptyNumber = page.locator('span.field-group__error')
            .filter({ hasText: 'Номер телефона является обязательным полем'});
    };

    async fillFirstName(name) {
        await this.firstNameInput.fill(name);
    }

    async fillLastName(name) {
        await this.lastNameInput.fill(name);
    }

    async fillEmail(email) {
        await this.emailInput.fill(email);
    }

    async fillPhone(phone) {
        await this.phoneInput.fill(phone);
    }

    async fillPassword(password) {
        await this.passwordInput.fill(password);
    }

    async selectDateOfBirth(date) {
        const [day, month, year] = date.split('.').map(Number);

        await this.dateOfBirthInput.click();
        await this.calendarMenu.waitFor({ state: 'visible', timeout: 5000 });

        // Выбор года
        await this.yearToggle.click();
        await this.overlay.waitFor({ state: 'visible' });
        await this.overlayCell.filter({ hasText: year.toString() }).click();
        await this.overlay.waitFor({ state: 'hidden', timeout: 5000 });

        // Выбор месяца
        await this.monthToggle.click();
        await this.overlay.waitFor({ state: 'visible' });

        const monthNames = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
            'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
        await this.overlayCell.filter({ hasText: monthNames[month - 1] }).click();
        await this.overlay.waitFor({ state: 'hidden', timeout: 5000 });

        // Ждём появления календаря и ищем день
        const daySelector = `.dp__calendar .dp__cell_inner:has-text("${day}")`;

        // Ждём появления дня
        await this.page.locator(daySelector).first().waitFor({
            state: 'visible',
            timeout: 5000
        });

        // Кликаем по дню
        await this.page.locator(daySelector).first().click();

        // Проверяем, что значение установилось
        await expect(this.dateOfBirthInput).toHaveValue(date);
    }

    async loginWithEmptyCredentials() {
        await this.emailInput.fill("");
        await this.phoneInput.fill("");
        await this.passwordInput.fill("");
        await this.firstNameInput.fill("");
        await this.lastNameInput.fill("");
        await this.emailInput.fill("");
        await this.saveButton.click()
    }

    async checkPersonalDataCheckbox() {
        await this.personalDataCheckbox.check();
    }

    async uncheckPersonalDataCheckbox() {
        await this.personalDataCheckbox.uncheck();
    }

    async checkTosCheckbox() {
        await this.tosCheckbox.check();
    }

    async clickRegisterButton() {
        await this.registerButton.click();
    }
}

export default RegisterPage;