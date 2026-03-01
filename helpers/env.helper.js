import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

class EnvHelper {
    static decodeBase64(base64String) {
        if (!base64String) return '';
        return Buffer.from(base64String, 'base64').toString('utf-8');
    }

    static getEmail() {
        return this.decodeBase64(process.env.EMAIL_BASE64);
    }

    static getPassword() {
        return this.decodeBase64(process.env.PASSWORD_BASE64);
    }

    static getEmptyPassword() {
        return process.env.EMPTY_PASSWORD;
    }

    static getWrongEmail () {
        return process.env.WRONG_EMAIL;
    }

    static getEmptyNumber () {
        return process.env.EMPTY_NUMBER;
    }

    static getInvalidEmail() {
        return process.env.INVALID_EMAIL;
    }

    static getEmptyEmail() {
        return process.env.EMPTY_EMAIL;
    }

    static getShortPassword() {
        return process.env.SHORT_PASSWORD;
    }

    static getWrongNumber() {
        return process.env.WRONG_NUMBER;
    }

    static getFirstName() {
        return process.env.FIRST_NAME;
    }

    static getLastName() {
        return process.env.LAST_NAME;
    }

    static getPhoneNumber() {
        return process.env.PHONE_NUMBER;
    }

    static getCredentials() {
        return {
            email: this.getEmail(),
            password: this.getPassword(),
            emptyPassword: this.getEmptyPassword(),
            wrongEmail: this.getWrongEmail(),
            invalidEmail: this.getInvalidEmail(),
            phoneNumber: this.getPhoneNumber(),
            firstName: this.getFirstName(),
            lastName: this.getLastName(),
            emptyNumber: this.getEmptyNumber(),
            emptyEmail: this.getEmptyEmail(),
            shortPassword: this.getShortPassword(),
        };
    }

    static getBaseUrl() {
        return process.env.BASE_URL;
    }
}

export default EnvHelper;