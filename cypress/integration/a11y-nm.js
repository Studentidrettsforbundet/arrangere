describe("Accessibility", () => {
  it("should be accessible", () => {
    cy.visit("/applications");
    cy.get("a span[class='MuiButton-label']").eq(1).click();
    cy.on("uncaught:exception", () => {
      cy.reload();
      done();
      return false;
    });
    cy.injectAxe();
    cy.configureAxe({
      rules: [
        {
          id: "color-contrast",
          enabled: false,
        },
      ],
    });

    cy.get(".chapterButtons")
      .find("button")
      .each(($button, i) => {
        cy.wrap($button).click();
        cy.wait(1000).then(() => {
          cy.checkA11y();
        });
      });
  });

