import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../../e2e/pages/loginPage";
import { MyAccountPage } from "../../e2e/pages/myAccountPage";
import { HomePage } from "../../e2e/pages/homePage";

const loginPage = new LoginPage();
const homePage = new HomePage();
const myAccountPage = new MyAccountPage();

Given("I am logged in as {string} user with {string} password", (user: string, password: string) => {
    loginPage.visit();
    loginPage.fillUsername(user);
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
