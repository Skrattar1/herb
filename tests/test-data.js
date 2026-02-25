import EnvHelper from '../helpers/env.helper.js';

const credentials = EnvHelper.getCredentials();

export const TEST_USER = {
    email: credentials.email,
    password: credentials.password,
    wrongPassword: credentials.wrongPassword,
    wrongEmail: credentials.wrongEmail,
    phoneNumber: credentials.phoneNumber,
    firstName: credentials.firstName,
    lastName: credentials.lastName,
};

export const ERROR_MESSAGES = {
    INVALID_CREDENTIALS: 'Login or password is incorrect. Please try again.',
    INVALID_USER: 'No active account found with the given credentials.',
    WRONG_EMAIL: 'Неверный адрес электронной почты.',
    WRONG_NUMBER: 'Номер телефона является обязательным полем',
    EMPTY_EMAIL_FIELD: 'Email является обязательным полем',
    EMPTY_PASSWORD_FIELD: 'Пароль является обязательным полем',
    EMPTY_PHONE_FIELD: 'Номер телефона является обязательным полем',
    SHORT_PASSWORD: 'Пароль должен состоять из 8 символов',
    PASSWORD_CASE: 'Пароль должен содержать прописные и заглавные',
    PASSWORD_SYMBOLS: 'Пароль должен содержать символы или цифры'
}