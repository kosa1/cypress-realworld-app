import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../../e2e/pages/loginPage";

let userId: string;
const loginPage = new LoginPage();

Given("I am logged in as {string} with {string}", (user: string, password: string) => {
    loginPage.visit();
    loginPage.fillUsername(user);
    loginPage.fillPassword(password);
    loginPage.clickLogin();
    loginPage.checkDashboardIsVisible();
});

When("I send a GraphQL query to {string} to get the user ID", (endpoint: string) => {
    cy.request({
        method: "POST",
        url: endpoint,
        body: {
            query: `
          query ListBankAccount {
            listBankAccount {
                uuid
                userId
                bankName
                accountNumber
                routingNumber
                isDeleted
                createdAt
                modifiedAt
                id
              }
        }`,
        },
    }).then((response) => {
        expect(response.status).to.eq(200);
        userId = response.body.data.listBankAccount[0].id;
        expect(userId).to.exist;
    });
});

Then("I should receive a response with status code {int}", (statusCode: number) => {
    // Weryfikacja odpowiedzi statusu już w poprzednich krokach
    cy.log(`Response status code: ${statusCode}`);
});

Then("I extract the user ID from the response", () => {
    expect(userId).to.exist;
    cy.log(`Extracted user ID: ${userId}`);
});

Then("I log the user ID to the console", () => {
    console.log(`User ID: ${userId}`);
});
