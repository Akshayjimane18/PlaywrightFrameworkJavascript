const base = require('@playwright/test');

exports.custometest = base.test.extend(

    {
        testDataForOrder:
        {

            username: "akshaymane04@ymail.com",
            password: "30AKSmane#",
            productName: "zara coat 3"

        }
    }
)