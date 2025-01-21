/// <reference types="cypress" />

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

declare global {
  const Given: typeof Given;
  const When: typeof When;
  const Then: typeof Then;
}
