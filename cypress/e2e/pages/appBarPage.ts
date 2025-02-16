export class AppBarPage {
    private newPaymentButton = '[data-test="nav-top-new-transaction"]';
    private notificationLink = '[data-test="nav-top-notifications-link"]';

    clickNewPaymentButton(){
        cy.get(this.newPaymentButton).click();
    }

    clickNotificationLink(){
        cy.get(this.notificationLink).click();
    }

}