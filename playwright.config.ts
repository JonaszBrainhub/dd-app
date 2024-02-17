import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',

  // Run all tests in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Opt out of parallel tests on CI.
  workers: undefined,
  // Reporter to use
  reporter: [['html'], ['dot']],

  use: {
    ignoreHTTPSErrors: true,
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: 'http://localhost:3000',

    // Collect trace when retrying the failed test.
    trace: 'retain-on-failure',
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: 'setup',
      testMatch: /.*setup.ts/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
  // Run your local dev server before starting the tests.
  webServer: {
    command: 'bun start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    ignoreHTTPSErrors: true,
  },
});
