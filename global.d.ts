/// <reference types="cypress" />

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

declare global {
  const Given: any;
  const When: any;
  const Then: any;
}

export {};

