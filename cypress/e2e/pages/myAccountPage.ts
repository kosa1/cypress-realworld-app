
export class MyAccountPage {
    elements = {
        name: "#user-settings-firstName-input",
        surname: "#user-settings-lastName-input",
        email: "#user-settings-email-input",
        phoneNumber: "#user-settings-phoneNumber-input",
        saveButton: 'button[data-test="user-settings-submit"]',
        errorMessage: (fieldId: string) => `#user-settings-${fieldId}-input-helper-text`

    }
    fillName(name: string): void {
        cy.get(this.elements.name).clear().type(name);
    }

    fillSurname(surname: string): void {
        cy.get(this.elements.surname).clear().type(surname);
    }

    fillEmail(email: string): void {
        cy.get(this.elements.email).clear().type(email);
    }

    fillPhoneNumber(phoneNumber: string): void {
        cy.get(this.elements.phoneNumber).clear().type(phoneNumber);
    }

    saveUserSettings(): void {
        cy.get(this.elements.saveButton).click();
    }

    fillEntireForm(data: { name: string; surname: string; email: string; phoneNumber: string }): void {
        cy.get(this.elements.name).clear().type(data.name);
        cy.get(this.elements.surname).clear().type(data.surname);
        cy.get(this.elements.email).clear().type(data.email);
        cy.get(this.elements.phoneNumber).clear().type(data.phoneNumber);
    }

    clearEntireForm(): void {
        cy.get(this.elements.name).clear();
        cy.get(this.elements.surname).clear();
        cy.get(this.elements.email).clear();
        cy.get(this.elements.phoneNumber).clear();
    }

    clearNamefield(): void {
        cy.get(this.elements.name).clear();
    }

    clearSurnameField(): void {
        cy.get(this.elements.surname).clear();
    }

    verifyFieldValues(data: { name: string; surname: string; email: string; phoneNumber: string }): void {
        cy.get(this.elements.name).should("have.value", data.name);
        cy.get(this.elements.surname).should("have.value", data.surname);
        cy.get(this.elements.email).should("have.value", data.email);
        cy.get(this.elements.phoneNumber).should("have.value", data.phoneNumber);
    }

    verifyValidationErrors(errors: { field: string; message: string }[]): void {
        errors.forEach(error => {
          cy.get(this.elements.errorMessage(error.field)).should("contain.text", error.message);
        });
      
    }

}