import { LoginPage }  from "../../pages/loginPage";

const loginPage = new LoginPage();

Given("I open the login page", () => {
  loginPage.visit();
});

When("I fill in the username as {string} and password as {string}", (username: string, password: string) => {
  loginPage.fillUsername(username);
  loginPage.fillPassword(password);
});

When("I click the login button", () => {
  loginPage.clickLogin();
});

Then("I should see the dashboard", () => {
  loginPage.checkDashboardIsVisible();
});

