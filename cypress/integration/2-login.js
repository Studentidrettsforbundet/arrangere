/// <reference types="Cypress" />

describe("Login in", () => {
  it("should try to log in - should not log in", () => {
    cy.visit("/login");

    cy.get('[type="text"]')
      .type("nybruker@test.no")
      .should("have.value", "nybruker@test.no");

    cy.get('[type="password"]').type("teste").should("have.value", "teste");

    cy.get("button").click();

    cy.location("pathname", { timeout: 10000 }).should("eq", "/login");
    cy.get("form").should("contain", "E-post eller passord er feil");
  });

  it("should fill login form and redirect to homepage, then log out", () => {
    cy.visit("/login");

    cy.get('[type="text"]')
      .type("nybruker@test.no")
      .should("have.value", "nybruker@test.no");

    cy.get('[type="password"]')
      .type("teste123")
      .should("have.value", "teste123");

    cy.get("button").click();

    cy.location("pathname", { timeout: 10000 }).should("eq", "/");

    cy.title().should("eq", "Søknadsportal");
    cy.get("nav").contains("Brukerprofil").click();
    cy.get(".MuiButton-text").click();
  });
});
