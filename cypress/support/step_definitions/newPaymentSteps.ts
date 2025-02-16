import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { AppBarPage } from "../../e2e/pages/appBarPage";
import { TransferMoneyPage } from "../../e2e/pages/transferMoneyPage";
import { HomePage } from "../../e2e/pages/homePage";

const appBarPage = new AppBarPage();
const transferPage = new TransferMoneyPage();
const homePage = new HomePage();

const balance: string = "";

Given('I have sufficient balance in the account', () => {
    homePage.updateBalance().then(() => {
        const storedBalance = homePage.getStoredBalance();
        cy.log("Stored balance: " + storedBalance);

        expect(storedBalance).to.be.gt(0);
    })


});

When('I navigate to the transfer page by clicking the "$NEW" button', function () {
    // Click on the "NEW" button to go to the transfer page
    appBarPage.clickNewPaymentButton();
});

When('I select {string} as the contact', function (contactName) {
    // Select a contact from the list
    transferPage.selectTransferUser('Helen Moen');
});

When('I enter an amount of {string}', (amount: string) => {
    // Enter amount in the transfer input field
    transferPage.enterAmount(amount);
});

When('I type {string} as a note', function (note: string) {
    // Enter a note for the transaction
    transferPage.enterNote(note);

});

When('I click the "Pay" button', function () {
    // Click on the Pay button to submit the transaction
    transferPage.clickPayButton();
});

Then('a message with "Transaction submitted!" appears', function () {
    // Verify success message appears
    transferPage.successMessageDisplayed();
});

Then('the balance is decreased by {string}', function (updatedBalance: string) {
    // Verify balance update
    cy.waitForStableDOM({ pollInterval: 1000, timeout: 10000 })
    homePage.calculateBalanceAfterTransfer(1);
   
});
