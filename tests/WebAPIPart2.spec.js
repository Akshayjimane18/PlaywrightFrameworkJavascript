const { test, expect, request } = require('@playwright/test');

let webContext;

test.beforeAll(async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator("#userEmail").fill("akshaymane04@ymail.com");
    await page.locator("#userPassword").fill("30AKSmane#");
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");

    await context.storageState({path:'state.json'});
    webContext = await browser.newContext({storageState:'state.json'});
});

test('Client New App', async () => {
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    const products = page.locator(".card-body");
    const productName = "zara coat 3";
    
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();

    for (let i = 0; i < count; i++) {

        if (await products.nth(i).locator("b").textContent() === productName) {

            await products.nth(i).locator("//*[normalize-space()='Add To Cart']").click();
            break;

        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const itemAddedTocart = page.locator("h3:has-text('zara coat 3')").isVisible();
    await expect(itemAddedTocart).toBeTruthy();
    await page.locator("//*[text()='Checkout']").click();
    //only type will directly copy paste the value, but delay will enter word by word
    await page.locator("[placeholder*='Country']").type("ind", { delay: 100 });
    const options = page.locator(".ta-results");
    await options.waitFor();
    const optionsCount = await options.locator("button").count();
    for (let i = 0; i < optionsCount; i++) {
        const text = await options.locator("button").nth(i).textContent();
        if (text === " India") {

            await options.locator("button").nth(i).click();
            break;
        }

    }

    await expect(page.locator(".user__name label")).toHaveText("akshaymane04@ymail.com");
    await page.locator("a.btnn").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orederId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orederId);

    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {

        const actualRowOrderId = await rows.nth(i).locator("th").textContent();

        if (orederId.includes(actualRowOrderId)) {

            console.log("Yes it's")
            rows.nth(i).locator("button").first().click();
            break;
        }
    }


    const orderIdDetails = await page.locator(".col-text").textContent();

    expect(orederId.includes(orderIdDetails)).toBeTruthy();



});