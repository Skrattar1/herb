class LoginModalPage {
    constructor(page) {

        //Элементы страницы
        this.page = page;
        this.welcomeModal = page.locator('div.modal__login');
        this.emailInput = page.locator('input[type="email"]');
        this.passwordInput = page.locator('input[type="password"]');
        this.loginButton = page.getByRole('button', { name: 'Войти в аккаунт', exact: true });
        this.mainLoginButton = page.locator('span.user-auth__item');
        this.registerButton = page.locator('a.modal__login-link')
            .filter({ hasText: 'Зарегистрируйтесь' });
        this.resetPasswordButton = page.locator('button', { hasText: 'Восстановить пароль' });

        //Сообщения об ошибках
        this.errorMessage = page.locator('span.modal__login-error');
        this.wrongEmail = page.locator('span.field-group__error')
            .filter({ hasText: 'Неверный адрес электронной почты'});
        this.emptyEmail = page.locator('span.field-group__error')
            .filter({ hasText: 'Email является обязательным полем' });
        this.emptyPassword = page.locator('span.field-group__error')
            .filter({ hasText: 'Пароль является обязательным полем' });
        this.invalidUser = page.locator('span.modal__login-error')
            .filter({ hasText: 'No active account found with the given credentials' });
    }

    async navigate() {
        await this.page.goto('/');
        await this.mainLoginButton.waitFor({ state: 'visible', timeout: 10000 });
    }

    async openModal() {
        await this.mainLoginButton.click();
        await this.emailInput.waitFor({ state: 'visible', timeout: 30000 });
        await this.passwordInput.waitFor({ state: 'visible', timeout: 30000 });
    }

    async loginWithCredentials(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async waitForError(timeout = 50000) {
        await this.errorMessage.waitFor({ state: 'visible', timeout});
    }

    async waitForEmptyEmail(timeout = 50000) {
        await this.emptyEmail.waitFor({ state: 'visible', timeout });
    }

    async waitForEmptyPassword(timeout = 50000) {
        await this.emptyPassword.waitFor({ state: 'visible', timeout });
    }

    async waitForWrongEmail(timeout = 50000) {
        await this.wrongEmail.waitFor({ state: 'visible', timeout });
    }

    async waitForInvalidUser (timeout = 50000) {
        await this.invalidUser.waitFor({ state: 'visible', timeout });
    }

    async waitForWelcomeModal(timeout = 50000) {
        await this.welcomeModal.waitFor({ state: 'visible', timeout });
    }
}

export default LoginModalPage;