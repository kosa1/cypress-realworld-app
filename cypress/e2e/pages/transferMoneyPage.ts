export class TransferMoneyPage {
    private userSearchSelector = "#user-list-search-input";
    private userListItemSelector = "[data-test^='user-list-item-']";
    private amountSelector = "#amount";
    private noteSelector = "#transaction-create-description-input";
    private payButtonSelector = "[data-test='transaction-create-submit-payment']";
    private transtactionSuccessMessageSelector = "[data-test='alert-bar-success']";


    searchUser(userName: string) {
        cy.get(this.userSearchSelector).type(userName);
    }

    getUserListItems(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.userListItemSelector);
    }

    printAllfoundUsers() {
        this.getUserListItems().each($item => {
            cy.wrap($item).find(".MuiListItemText-primary").invoke('text').then(name => {
                cy.log("name: " + name.trim());
            })
        })
    }

    selectTransferUser(user: string) {
        this.getUserListItems().each($item => {
            cy.wrap($item).then($element => {
                const userName: string = $element.find('.MuiListItemText-primary').text().trim();

                if (user === userName) {
                    cy.wrap($element).click();
                }
            })
        })
    }

    enterAmount(amount: string) {
        cy.get(this.amountSelector).type(amount);
    }

    enterNote(note: string) {
        cy.get(this.noteSelector).type(note);
    }

    clickPayButton(): void {
        cy.get(this.payButtonSelector).click();
    }

    successMessageDisplayed(): void {
        cy.get(this.transtactionSuccessMessageSelector).should('be.visible');
        cy.get(this.transtactionSuccessMessageSelector).contains('Transaction Submitted!');

    }
}