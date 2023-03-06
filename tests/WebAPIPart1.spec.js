const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APIUtils');



const loginPayLoad = { userEmail: "akshaymane04@ymail.com", userPassword: "30AKSmane#" };
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0" }] };

let response;

/* This code will execute once for all test case */
test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
});

/* This code will execute before every test case */
test.beforeEach(() => {

});

test.only('Place Order', async ({browser, page}) => {

    //method to execute javascript code
    page.addInitScript(value=>{
        window.localStorage.setItem('token', value);

    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");
    
    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {

        const actualRowOrderId = await rows.nth(i).locator("th").textContent();

        if (response.orderID.includes(actualRowOrderId)) {

            console.log("Yes it's")
            rows.nth(i).locator("button").first().click();
            break;
        }
    }


    const orderIdDetails = await page.locator(".col-text").textContent();

    expect(orderIdDetails.includes(response.orderID)).toBeTruthy();

    await page.close();

});