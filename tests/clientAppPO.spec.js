const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager');



test.only('Client New App', async ({ browser, page }) => {

    const poManager = new POManager(page);
    const username = "akshaymane04@ymail.com";
    const password = "30AKSmane#";

    await poManager.getLoginPage().goTo();
    await poManager.getLoginPage().validLogin(username, password);


    const productName = "zara coat 3";

    await poManager.getDashboardPage().searchProductAddCart(productName);
    await poManager.getDashboardPage().navigateToCart();

    const cartPage = poManager.getCartPage();
    await poManager.getCartPage().VerifyProductIsDisplayed(productName);
    await poManager.getCartPage().Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await poManager.getOrdersReviewPage().searchCountryAndSelect("ind", "India");
    const orderId = await poManager.getOrdersReviewPage().SubmitAndGetOrderId();
    console.log(orderId);
    await poManager.getDashboardPage().navigateToOrders();
    await poManager.getOrdersHistoryPage().searchOrderAndSelect(orderId);
    expect(orderId.includes(await poManager.getOrdersHistoryPage().getOrderId())).toBeTruthy();

});