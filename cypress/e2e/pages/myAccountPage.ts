
export class MyAccountPage {
    elements = {
        name: "#user-settings-firstName-input",
        surname: "#user-settings-lastName-input",
        email: "#user-settings-email-input",
        phoneNumber: "#user-settings-phoneNumber-input",
        saveButton: 'button[data-test="user-settings-submit"]'

    }
    fillName(name: string): void {
        cy.get(this.elements.name).type(name);
    }

    fillSurname(surname: string): void {
        cy.get(this.elements.surname).type(surname);
    }

    fillEmail(email: string): void {
        cy.get(this.elements.email).type(email);
    }

    fillPhoneNumber(phoneNumber: string): void {
        cy.get(this.elements.phoneNumber).type(phoneNumber);
    }

    saveUserSettings(): void {
        cy.get(this.elements.saveButton).click();
    }

    clearEntireForm(): void {
        cy.get(this.elements.name).clear();
        cy.get(this.elements.surname).clear();
        cy.get(this.elements.email).clear();
        cy.get(this.elements.phoneNumber).clear();
    }
}