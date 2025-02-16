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

declare global {
    namespace Cypress {
        interface Chainable {
            /**
        * Custom command to log in via API
        * @param username - The username for login
        * @param password - The password for login
        */
            loginApi(login: string, password: string): Chainable<void>
        }
    }
}