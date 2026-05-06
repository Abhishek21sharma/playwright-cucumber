import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true, //AS:: this will ensure tests within a project also run at the same time
  //AS::
  //Yes. If your config has fullyParallel: true, Playwright will use all available workers to run tests regardless of which project they belong to

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  workers: 10, //AS:: added 10 workers to test 10 tests in parallel
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */

  //AS: Based on the workers and fullyParallel:true , all Projects will run in parallel
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      //testMatch: /.*chromium.spec.ts/, //this will run chromefile only..
      //also instead of this, we can adept tags use as well which is comman to cucumber too
      //so very handy
      grep: /@chromium/, // Only runs tests with this tag
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      //testMatch: /.*firefox.spec.ts/,
      grep: /@firefox/,
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
      //testMatch: /.*webkit.spec.ts/,
      grep: /@webkit/,
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
