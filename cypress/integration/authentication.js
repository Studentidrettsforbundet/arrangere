/// <reference types="Cypress" />

describe("Sign up", () => {
  it("should fill signup form with weak password and not redirect", () => {
    cy.visit("/signup");
    cy.get("[type='text']")
      .type("nybruker@test.no")
      .should("have.value", "nybruker@test.no");
    cy.get("[type='password']")
      .first()
      .type("teste")
      .should("have.value", "teste");
    cy.get("[type='password']")
      .last()
      .type("teste")
      .should("have.value", "teste");
    cy.get("[type='checkbox']").check();
    cy.get("button").click();
    cy.location("pathname", { timeout: 10000 }).should("eq", "/signup");
  });

  it("should fill in signup form with bad email and not redirect", () => {
    cy.visit("/signup");

    cy.get("[type='text']").type("nybruker");
    cy.get("[type='password']").first().type("teste123");
    cy.get("[type='password']").last().type("teste123");
    cy.get("[type='checkbox']").check();
    cy.get("button").click();
    cy.get("form").should("contain", "Ugyldig e-postadresse");
    cy.location("pathname", { timeout: 10000 }).should("eq", "/signup");
  });

  it("should not check of for GDPR and not redirect", () => {
    cy.visit("/signup");

    cy.get("[type='text']").type("nybruker@test.no");
    cy.get("[type='password']").first().type("teste123");
    cy.get("[type='password']").last().type("teste123");
    cy.get("button").click();

    cy.get("form").should(
      "contain",
      "Du må samtykke til NSIs gjeldende personvernspolicy"
    );

    cy.location("pathname", { timeout: 10000 }).should("eq", "/signup");
  });

  it("should fill signup form and redirect to homepage", () => {
    cy.visit("/signup");

    cy.get("[type='text']").type("nybruker@test.no");
    cy.get("[type='password']").first().type("teste123");
    cy.get("[type='password']").last().type("teste123");

    cy.get("[type='checkbox']").check();
    cy.get("button").click();

    cy.location("pathname", { timeout: 10000 }).should("eq", "/");
  });

  it("should go to userprofile, log out, and then redirect to login", () => {
    cy.visit("/login");
    cy.get("nav").contains("Brukerprofil").click();
    cy.location("pathname", { timeout: 10000 }).should("eq", "/userprofile");

    cy.get('[href="/login"]').click();

    cy.location("pathname", { timeout: 10000 }).should("eq", "/login");
  });

  describe("Log in", () => {
    it("should try to log in with wrong password", () => {
      cy.visit("/login");

      cy.get('[type="text"]')
        .type("nybruker@test.no")
        .should("have.value", "nybruker@test.no");

      cy.get('[type="password"]').type("teste").should("have.value", "teste");

      cy.get("button").click();

      cy.location("pathname", { timeout: 10000 }).should("eq", "/login");
      cy.get("form").should("contain", "E-post eller passord er feil");
    });

    it("should try to log in with no password", () => {
      cy.visit("/login");

      cy.get('[type="text"]')
        .type("nybruker@test.no")
        .should("have.value", "nybruker@test.no");

      cy.get("button").click();

      cy.location("pathname", { timeout: 10000 }).should("eq", "/login");
      cy.get("form").should("contain", "Fyll inn alle feltene");
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

      cy.title().should("eq", "Arrangere");
      cy.get("nav").contains("Brukerprofil").click();
      cy.get('[href="/login"]').click();
    });
  });
});
