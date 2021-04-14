describe("Accessibility", () => {
  it("should be accessible", () => {
    cy.visit("/applications");
    cy.get("a span[class='MuiButton-label']").eq(3).click();
    cy.wait(2000);
    cy.on("uncaught:exception", (err, runnable) => {
      cy.reload();

      done();
      return false;
    });
    cy.injectAxe();

    cy.get(".chapterButtons")
      .find("button")
      .each(($button, i) => {
        if (i == 1) {
          console.log("innertext", $button.innerText);
          return;
        } else {
          cy.wrap($button).click();
          cy.wait(1000).then(() => {
            cy.checkA11y();
          });
        }
      });
  });
});
