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

    cy.get("button").click();

    cy.location("pathname", { timeout: 10000 }).should("eq", "/signup");
  });

  it("should fill in signup form with bad email", () => {
    cy.visit("/signup");

    cy.get("[type='text']").type("nybruker");
    cy.get("[type='password']").first().type("teste123");
    cy.get("[type='password']").last().type("teste123");

    cy.get("button").click();
    cy.get("form").should("contain", "Ugyldig e-postadresse");
  });
  it("should fill signup form and redirect to homepage", () => {
    cy.visit("/signup");

    cy.get("[type='text']").type("nybruker@test.no");
    cy.get("[type='password']").first().type("teste123");
    cy.get("[type='password']").last().type("teste123");

    cy.get("button").click();

    cy.location("pathname", { timeout: 10000 }).should("eq", "/");
  });

  it("should go to userprofile, log out, and then redirect to login", () => {
    cy.visit("/login");
    cy.get("nav").contains("Brukerprofil").click();
    cy.location("pathname", { timeout: 10000 }).should("eq", "/userprofile");

    cy.get(".MuiButton-text").click();

    cy.location("pathname", { timeout: 10000 }).should("eq", "/login");
  });

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
