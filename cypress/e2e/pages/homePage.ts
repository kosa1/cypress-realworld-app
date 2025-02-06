import { MyAccountPage } from "./myAccountPage";
import { BankAccountsPage } from "./bankAccountsPage";
import { Notifications } from "./notificationsPage";
import { stringify } from "querystring";

type PaymentNotification = {
    id: string,
    amount: string
};

export class HomePage {
    private paymentNotifications?: PaymentNotification[];

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

    private fetchAllPaymentNotifications(): Cypress.Chainable<PaymentNotification[]> {
        const listSelector = '[data-test="transaction-list"] .ReactVirtualized__Grid';
        const transactionSelector = 'li[data-test^="transaction-item-"]';
        const itemsArray: PaymentNotification[] = [];
        const processedIds = new Set<string>();

        const scrollAndCollect = (): Cypress.Chainable<PaymentNotification[]> => {
            return cy.get(transactionSelector).then(($elements) => {
                $elements.each((_, el) => {
                    const $el = Cypress.$(el);
                    cy.wrap($el).scrollIntoView();

                    const itemId = ($el.data('test') as string).replace('transaction-item-', '');
                    if (!processedIds.has(itemId)) {
                        processedIds.add(itemId);
                        const itemData: PaymentNotification = {
                            id: itemId,
                            amount: $el.find('[data-test^="transaction-amount-"]').text().trim(),
                        };
                        itemsArray.push(itemData);
                    }
                });
            }).then(() => {
                cy.wait(500);
                return cy.get(listSelector).then(($list) => {
                    const listElement = $list[0];
                    const previousScrollTop = listElement.scrollTop;
                    listElement.scrollBy({ top: 300, behavior: 'smooth' });

                    return cy.wait(200).then(() => {
                        if (listElement.scrollTop > previousScrollTop) {
                            return scrollAndCollect();
                        } else {
                            return cy.wrap(itemsArray); // Zwracamy zebraną tablicę
                        }
                    });
                });
            });
        };

        return scrollAndCollect();
    }

    private getAllPaymentNotifications(): Cypress.Chainable<PaymentNotification[]> {
        if (this.paymentNotifications) {
            return cy.wrap(this.paymentNotifications);
        } else {
            return this.fetchAllPaymentNotifications().then((data) => {
                this.paymentNotifications = data;
                return cy.wrap(data);
            });
        }
    }

    getAllPaymentsAmountFromNotifications(): void {
        this.getAllPaymentNotifications().then((itemsArray) => {
            cy.log(`Pobrano ${itemsArray.length} transakcji.`);
            itemsArray.forEach(({ id, amount }) => {
                cy.log(`Transaction ID: ${id}, Amount: ${amount}`);
            });
        });

    }

    calculateAllPaymentsFromNotifications(): void {
        this.getAllPaymentNotifications().then((itemsArray) => {
            cy.log(`Obliczam sumę dla ${itemsArray.length} transakcji.`);
            const incomes: string[] = [];
            const expenses: string[] = [];

            itemsArray.forEach(({ amount }) => {
                if (amount.startsWith('-')) {
                    expenses.push(amount.slice(1).replace("$", ""));
                } else if (amount.startsWith('+')) {
                    incomes.push(amount.slice(1).replace("$", ""));
                }
            });

            const sumValues = (values: string[]): number => {
                return values.reduce((sum, value) => sum + parseFloat(value), 0);
            };

            const totalIncomes = sumValues(incomes);
            const totalExpenses = sumValues(expenses);
            const finalResult = totalIncomes - totalExpenses;

            cy.log(`Total incomes: ${totalIncomes}`);
            cy.log(`Total expenses: ${totalExpenses}`);
            cy.log(`Final result: ${finalResult}`);

        });
    }

    selectAmountRange(min: string, max: string): void {
        cy.get('[data-test="transaction-list-filter-amount-range-button"]').click({ force: true });
    
        function adjustSlider(startValue: number, targetValue: number, step: number, isMinSlider: boolean): void {
            cy.get('.MuiSlider-rail').click(startValue, 2, { force: true });
    
            cy.get('[data-test="transaction-list-filter-amount-range-text"]').then(rangeAmountText => {
                const match = rangeAmountText.text().match(/\$(\d{1,3}(?:,\d{3})*)\s-\s\$(\d{1,3}(?:,\d{3})*)/);
                if (!match) return;
    
                const minValue = parseInt(match[1].replace(/,/g, ''), 10);
                const maxValue = parseInt(match[2].replace(/,/g, ''), 10);
    
                if (isMinSlider && minValue !== targetValue) {
                    adjustSlider(startValue + step, targetValue, step, isMinSlider); // Rekurencyjne przesuwanie lewego suwaka
                } else if (!isMinSlider && maxValue !== targetValue) {
                    adjustSlider(startValue + step, targetValue, step, isMinSlider); // Rekurencyjne przesuwanie prawego suwaka
                }
            });
        }
    
        // Ustawienie lewego suwaka na 100 (przesuwa w prawo)
        adjustSlider(10, parseInt(min), 1, true);
    
        // Ustawienie prawego suwaka na 200 (przesuwa w lewo)
        adjustSlider(110, parseInt(max), -1, false);
    
        // Sprawdzenie końcowego zakresu
        cy.get('[data-test="transaction-list-filter-amount-range-text"]').should('contain.text', `Amount Range: $${min} - $${max}`);
    }
    
}
