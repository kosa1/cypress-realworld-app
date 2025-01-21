import { MyAccountPage } from "./myAccountPage";
import { BankAccountsPage } from "./bankAccountsPage";
import { Notifications } from "./notificationsPage";

export class HomePage {
    goToHome(): HomePage {
        cy.contains("Home").click();
        return new HomePage();
    }

    goToMyAccount(): MyAccountPage {
        cy.contains("My Account").click();
        return new MyAccountPage();
    }

    goToBankAccounts(): BankAccountsPage {
        cy.contains("Bank Acounts").click();
        return new BankAccountsPage();
    }

    goToNotifications(): Notifications {
        cy.contains("Bank Acounts").click();
        return new Notifications();
    }
}