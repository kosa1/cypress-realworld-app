declare namespace Cypress {
    interface Chainable {
      /**
       * Custom command to log in via API
       * @param username - The username for login
       * @param password - The password for login
       */
      loginApi(username: string, password: string): Chainable<void>;
    }
  }
  