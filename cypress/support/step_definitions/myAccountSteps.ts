import { Given, When, Then, DataTable } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../../e2e/pages/loginPage";
import { MyAccountPage } from "../../e2e/pages/myAccountPage";
import { HomePage } from "../../e2e/pages/homePage";

const loginPage = new LoginPage();
const homePage = new HomePage();
const myAccountPage = new MyAccountPage();

Given("I am logged in as {string} user with {string} password", (user: string, password: string) => {
    const login = Cypress.env('USERNAME') || user;

    loginPage.visit();
    loginPage.fillUsername(login);
    loginPage.fillPassword(password);
    loginPage.clickLogin();
    loginPage.checkDashboardIsVisible();
});

When("I navigate to the {string} module", (moduleName: string) => {
    homePage.goToMyAccount();
});

When("I clear the entire form", () => {
    myAccountPage.clearEntireForm();
});

Then("the form fields should be empty", () => {
    cy.get(myAccountPage.elements.name).should("have.value", "");
    cy.get(myAccountPage.elements.surname).should("have.value", "");
    cy.get(myAccountPage.elements.email).should("have.value", "");
    cy.get(myAccountPage.elements.phoneNumber).should("have.value", "");
});

When("I fill in the following valid data:", (dataTable: DataTable) => {
    const data = dataTable.rowsHash() as {
        name: string;
        surname: string;
        email: string;
        phoneNumber: string;
    };
    myAccountPage.fillEntireForm(data);
});


Then("the form fields should display:", (dataTable: DataTable) => {
    const data = dataTable.rowsHash() as {
        name: string;
        surname: string;
        email: string;
        phoneNumber: string
    };
    myAccountPage.verifyFieldValues(data);
});

Then("I should see the following validation errors:", (dataTable: DataTable) => {
    const errors = dataTable.hashes().map(error => ({
        field: error["Field"],
        message: error["Error Message"]
    }));
    myAccountPage.verifyValidationErrors(errors);
});

When("I fill in the following invalid data:", (dataTable: DataTable) => {
    const data = dataTable.rowsHash() as {
        name: string;
        surname: string;
        email: string;
        phoneNumber: string;
    };
    // myAccountPage.fillEntireForm(data);
    myAccountPage.clearNamefield();
    myAccountPage.clearSurnameField();
    myAccountPage.fillEmail(data.email);
    myAccountPage.fillPhoneNumber(data.phoneNumber);

});

When("I save the form", () => {
    myAccountPage.saveUserSettings();
});

Then('the {string} button should be inactive', (buttonName: string) => {
    cy.contains('button', buttonName)
        .should('have.attr', 'disabled');
});

Then('a {string} request should be sent with status code {int}', (requestName: string, statusCode: number) => {
    cy.request('GET', `/${requestName}`).then(res => {
        expect(res.status).to.eq(statusCode);
    })
    // cy.wait('@checkAuthRequest').then((interception) => {
    //     expect(interception.response?.statusCode).to.eq(statusCode); // Sprawdzamy kod odpowiedzi
    // });
});
