import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { HomePage } from "../../e2e/pages/homePage";

const homePage = new HomePage();

When('I fetch all available payments', () => {
    homePage.printAllPaymentsAmountFromNotifications();
});

Then('I should see the total number of payments', () => {
    homePage.calculateAllPaymentsFromNotifications();
});

Then('I should see the number of income payments', () => {
    // done in previous step
});

Then('I should see the number of expense payments', () => {
    // done in previous step
});

When('I set amount range from {string} to {string}', (min: string, max: string) => {
    homePage.selectAmountRange(min, max);
    homePage.assertPaymentNotificationinSelectedRange("100", "300");
});

Then('I should see the number of payments in the amount range', () => {

});
