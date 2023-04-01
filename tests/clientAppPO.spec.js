const { test, expect } = require('@playwright/test');
const { custometest } = require('../tests/utils/test-base');
const { POManager } = require('../pageObjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require('../tests/utils/PlaceOrderTestData.json')));


for (const data of dataSet) {
    test(`@smoke Parameterized Client New App ${data.productName}`, async ({page }) => {

        const poManager = new POManager(page);

        await poManager.getLoginPage().goTo();
        await poManager.getLoginPage().validLogin(data.username, data.password);

        await poManager.getDashboardPage().searchProductAddCart(data.productName);
        await poManager.getDashboardPage().navigateToCart();

        const cartPage = poManager.getCartPage();
        await poManager.getCartPage().VerifyProductIsDisplayed(data.productName);
        await poManager.getCartPage().Checkout();

        const ordersReviewPage = poManager.getOrdersReviewPage();
        await poManager.getOrdersReviewPage().searchCountryAndSelect("ind", "India");
        const orderId = await poManager.getOrdersReviewPage().SubmitAndGetOrderId();
        console.log(orderId);
        await poManager.getDashboardPage().navigateToOrders();
        await poManager.getOrdersHistoryPage().searchOrderAndSelect(orderId);
        expect(orderId.includes(await poManager.getOrdersHistoryPage().getOrderId())).toBeTruthy();

    });
}

custometest(`Fixter as a test @smoke @regression @sanity`, async ({page, testDataForOrder}) => {

    const poManager = new POManager(page);

    await poManager.getLoginPage().goTo();
    await poManager.getLoginPage().validLogin(testDataForOrder.username, testDataForOrder.password);

    await poManager.getDashboardPage().searchProductAddCart(testDataForOrder.productName);
    await poManager.getDashboardPage().navigateToCart();

    const cartPage = poManager.getCartPage();
    await poManager.getCartPage().VerifyProductIsDisplayed(testDataForOrder.productName);
    await poManager.getCartPage().Checkout();

});