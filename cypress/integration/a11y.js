const urls = ["/", "/userprofile", "/applications"];

describe("Accessibility", () => {
  urls.forEach((url) => {
    it(url + " should be accessible", () => {
      cy.visit(url);
      cy.wait(2000);
      cy.injectAxe();
      cy.checkA11y();
      if (url === "/") {
        cy.get(".MuiAccordion-rounded").eq(0).click();
        cy.checkA11y();
      }
    });
  });
});
