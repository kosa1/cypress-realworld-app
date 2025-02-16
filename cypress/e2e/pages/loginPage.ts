export class LoginPage {
    visit(): void {
      cy.visit("/login");
    }
  
    fillUsername(username: string): void {
      cy.get("#username").type(username);
    }
  
    fillPassword(password: string): void {
      cy.get("#password").type(password);
    }
  
    clickLogin(): void {
      cy.get("button.SignInForm-submit").click();
    }
  
    checkDashboardIsVisible(): void {
      cy.get("header.MuiPaper-root").should("be.visible");
      cy.url().then(currentUrl => {
        expect(currentUrl).to.eq('http://localhost:3000/');
      })
      cy.url().should('eq', 'http://localhost:3000/');
    }
  }
  