// playwright.config.js
import { defineConfig } from '@playwright/test';
import EnvHelper from './helpers/env.helper.js';

export default defineConfig({
    testDir: './tests',
    timeout: 30000,
    expect: {
        timeout: 10000
    },
    use: {
        baseURL: EnvHelper.getBaseUrl(),
        actionTimeout: 10000,
        navigationTimeout: 30000,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' },
        },
    ],
});