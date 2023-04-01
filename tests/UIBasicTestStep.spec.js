const { test, expect } = require('@playwright/test');

//test.describe.configure({mode:'serial'});
test.describe.configure({mode:'parallel'});
//test.skip//also possible to skip the testcase
test('UI Controls', async ({ browser, page }) => {

    // const context = await browser.newContext();
    // const page = await context.newPage();
    /* page is the fixture  which will keep above context bydefault*/
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const signIn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText");


});

test('First playwright test', async ({ browser }) => {


    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const signIn = page.locator("#signInBtn");
    const cardTitle = page.locator(".card-body a");

    console.log(await page.title());

    await userName.type("rahulshetty");
    await password.type("learning");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    //type - fill
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    //await page.waitForLoadState("networkidle"); used when application is service based under network/xhr

    //race condition
    await Promise.all(
        [
            page.waitForNavigation(),
            signIn.click(),
        ]
    );


    // console.log(await cardTitle.first().textContent());
    // console.log(await cardTitle.nth(1).textContent());
    const allTitles = await cardTitle.allTextContents();
    console.log(allTitles);
});

test('Child window handling', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    //if multiple pages are there then put comma after newPage
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            documentLink.click(),
        ]

    );

    const text = await newPage.locator(".red").textContent();

    const arrayText = text.split("@");

    const userName = page.locator('#username');
    const domainName = arrayText[1].split(" ")[0];
    await page.locator('#username').type(domainName);
    await page.pause();
    console.log(await page.locator('#username').textContent());



});

test('Client New App', async ({ browser, page }) => {
    await page.goto("https://rahulshettyacademy.com/client");

    const products = page.locator(".card-body");
    const productName = "zara coat 3";
    await page.locator("#userEmail").fill("akshaymane04@ymail.com");
    await page.locator("#userPassword").fill("30AKSmane#");
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");
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