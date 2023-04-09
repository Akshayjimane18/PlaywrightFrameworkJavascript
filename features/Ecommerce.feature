Feature: Ecommerce Validations

    @Regression
    @foo
    Scenario: Placing the Order
        Given A login to ecommerce application with "akshaymane04@ymail.com" and "30AKSmane#"
        When Add "zara coat 3" to cart
        Then Verify "zara coat 3" is displayed in the cart
        When Enter valid details and place the order
        Then Verify order is present in the Order history

#Run the file with command - npx cucumber-js --tags "@Regression" --exit

#Parallel Execution - npx cucumber-js --tags "@Regression" --parallel 2 --exit

#For the report - npx cucumber-js --tags "@Regression" --exit --format html:cucumber-report.html

#Scenario Outline: use Example same as Java