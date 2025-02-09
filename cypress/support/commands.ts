/// <reference types="cypress" />
import './commands'
import 'cypress-wait-for-stable-dom';

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('loginApi', (login, password) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3001/login',
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            type: 'LOGIN',
            username: login,
            password: password
        }
    }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('user');

        const user = response.body.user;

        const authState = {
            actions: [{ type: 'redirectHomeAfterLogin' }],
            activities: {},
            meta: {},
            events: [],
            value: 'authorized',
            context: { user },
            _event: {
                name: 'done.invoke.authentication.loading:invocation[0]',
                data: { user },
                $$type: 'scxml',
                type: 'external',
            },
        };
        cy.window().then((win) => {
            win.localStorage.setItem('authState', JSON.stringify(authState));
        });
        cy.log('AuthState set in Local Storage:', JSON.stringify(authState, null, 2));
    })

})



// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
    namespace Cypress {
        interface Chainable {
            loginApi(login: string, password: string): Chainable<void>
            setLocalStorage(key: string, value: string): Chainable<void>
        }
    }
}