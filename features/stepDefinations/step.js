const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../../pageObjects/POManager');
const { expect } = require('@playwright/test');

Given('A login to ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

    await this.poManager.getLoginPage().goTo();
    await this.poManager.getLoginPage().validLogin(username, password);

});

When('Add {string} to cart', async function (productName) {

    await this.poManager.getDashboardPage().searchProductAddCart(productName);
    await this.poManager.getDashboardPage().navigateToCart();
});

Then('Verify {string} is displayed in the cart', async function (productName) {

    const cartPage = this.poManager.getCartPage();
    await this.poManager.getCartPage().VerifyProductIsDisplayed(productName);
    await this.poManager.getCartPage().Checkout();

});

When('Enter valid details and place the order', async function () {

    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await this.poManager.getOrdersReviewPage().searchCountryAndSelect("ind", "India");
    this.orderId = await this.poManager.getOrdersReviewPage().SubmitAndGetOrderId();
    console.log(this.orderId);
});

Then('Verify order is present in the Order history', async function () {

    await this.poManager.getDashboardPage().navigateToOrders();
    await this.poManager.getOrdersHistoryPage().searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await this.poManager.getOrdersHistoryPage().getOrderId())).toBeTruthy();
});