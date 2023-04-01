// @ts-check
const { defineConfig, devices } = require('@playwright/test');


module.exports = defineConfig({
  testDir: './tests',
  //retries: 1,
  //workers:2,
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  projects: [
    {
      name: 'safari',
      use: {

        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'on', //off-on
        ...devices['iPhone 11']
      }
    },
    {
      name: 'chrome',
      use: {

        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        trace: 'retain-on-failure', //off-on
        video: 'retain-on-failure',
        //viewport: { width: 360, height: 740 },
      },

    }


  ]
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */



});

