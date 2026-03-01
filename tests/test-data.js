import EnvHelper from '../helpers/env.helper.js';

const credentials = EnvHelper.getCredentials();

export const TEST_USER = {
    email: credentials.email,
    wrongEmail: credentials.wrongEmail,
    emptyEmail: credentials.emptyEmail,

    password: credentials.password,
    wrongPassword: credentials.wrongPassword,
    emptyPassword: credentials.emptyPassword,
    shortPassword: credentials.shortPassword,
    passwordCase: credentials.passwordCase,
    passwordSymbols: credentials.passwordSymbols,

    phoneNumber: credentials.phoneNumber,
    emptyNumber: credentials.emptyNumber,
    wrongNumber: credentials.wrongNumber,
    firstName: credentials.firstName,
    lastName: credentials.lastName,
};


export const ERROR_MESSAGES = {
    INVALID_CREDENTIALS: 'Login or password is incorrect. Please try again.',
    INVALID_USER: 'No active account found with the given credentials.',
    WRONG_EMAIL: 'Неверный адрес электронной почты',
    EMPTY_NUMBER: 'Номер телефона является обязательным полем',
    EMPTY_EMAIL: 'Email является обязательным полем',
    EMPTY_PASSWORD: 'Пароль является обязательным полем',
    WRONG_NUMBER: 'Номер телефона неверного формата',
    SHORT_PASSWORD: 'Пароль должен состоять из 8 символов',
    PASSWORD_CASE: 'Пароль должен содержать прописные и заглавные',
    PASSWORD_SYMBOLS: 'Пароль должен содержать символы или цифры'
}