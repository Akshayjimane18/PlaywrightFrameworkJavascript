const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const playwright = require('@playwright/test');
const { POManager } = require('../../pageObjects/POManager');

//If you want to apply for multiple scenario then use or and condition in tags here
Before({tags: "@foo"},async function () {

    const browser = await playwright.chromium.launch({
        headless: false,
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);

});

After(async function () {

    console.log("I am last to execute");
});

BeforeStep(async function () {

});

AfterStep(async function ({ result }) {

    if (result.status === Status.FAILED) {

        await this.page.screenshot({ path: 'screenshot1.png' });

    }

});