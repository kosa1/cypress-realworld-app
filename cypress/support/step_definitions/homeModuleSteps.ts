import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { HomePage } from "../../e2e/pages/homePage";

const homePage = new HomePage();

When('I fetch all available payments', () => {
    homePage.getAllPaymentsAmountFromNotifications();
});

Then('I should see the total number of payments', () => {
    homePage.calculateAllPaymentsFromNotifications();
});

Then('I should see the number of income payments', () => {
 
});

Then('I should see the number of expense payments', () => {
   
});

Then('the total number of payments should equal the sum of incomes and expenses', () => {
    
});

When('I set amount range from {string} to {string}', (min: string, max: string) => {
    homePage.selectAmountRange(min, max);
});

Then('I should see the number of payments in the amount range', () => {
    
});
