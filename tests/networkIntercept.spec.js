const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APIUtils');



const loginPayLoad = { userEmail: "akshaymane04@ymail.com", userPassword: "30AKSmane#" };
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0" }] };
const fakePayOrder = {message:"No Product in Cart"};

let response;

/* This code will execute once for all test case */
test.beforeAll(async ()=>{

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);

});

test.only('Network Intercept', async ({browser, page}) => {

    //method to execute javascript code
    page.addInitScript(value=>{
        window.localStorage.setItem('token', value);

    }, response.token);

    
    await page.goto("https://rahulshettyacademy.com/client");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/63e8da3e568c3e9fb113c8ad",
    route =>{
        
        const response = page.request.fetch(route.request());
        let body = JSON.stringify(fakePayOrder);
        route.fulfill(
            {
                response,
                body,
            }
        );
    });

    
    await page.locator("button[routerlink*='myorders']").click();

    

});