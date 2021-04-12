beforeEach(() => {
  cy.visit("/studentcup");
  cy.wait(1000);
  cy.injectAxe();
});
describe("Accessibility", () => {
  it("should be accessible", () => {
    cy.get(".chapterButtons")
      .find("button")
      .each(($button) => {
        cy.wrap($button).click();
        cy.wait(1000).then(() => {
          cy.checkA11y();
        });
      });
  });
});
