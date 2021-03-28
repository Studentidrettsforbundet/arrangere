const urls = ["/login", "/signup"];

describe("Accessibility", () => {
  urls.forEach((url) => {
    it(url + " should be accessible", () => {
      cy.visit(url);
      cy.wait(1000);
      cy.injectAxe();
      cy.checkA11y();
    });
  });
});
