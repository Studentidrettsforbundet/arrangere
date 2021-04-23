const fillInForm = (inputType) => {
  if (inputType == "input") {
    cy.get("input").each(($input) => {
      let type = $input.attr("type");
      let value = "";
      if (type == "text") {
        value = "some text";
        cy.wrap($input).type(value).should("have.value", value);
      } else if (type == "date") {
        value = "2021-02-14";
        cy.wrap($input).type(value).should("have.value", value);
      } else if (type == "radio") {
        cy.wrap($input).check();
      }
    });
  }
  if (inputType == "textarea") {
    cy.get("textarea").each(($textarea) => {
      cy.wrap($textarea).type("Some text");
    });
  }
};
const getInput = () => {
  cy.get("body").then(($body) => {
    if ($body.find(".MuiAccordion-rounded").length) {
      cy.get(".MuiAccordion-rounded").eq(0).click();
    }
    if ($body.find("input").length) {
      fillInForm("input");
    }
    if ($body.find("textarea").length) {
      fillInForm("textarea");
    }
    cy.contains("Lagre").click();
    cy.get(".MuiAlert-message").should(
      "not.contain",
      "Ups, det skjedde en feil. Ikke lagret!"
    );

    if ($body.find("button").text().includes("Neste")) {
      cy.wrap($body).contains("Neste").click();
    }
  });
};

describe("Starts on an application, fills in and sends it", () => {
  it("Should start on an application and fill inn every inputfield", () => {
    cy.visit("/applications");
    cy.get("a span[class='MuiButton-label']").eq(1).click();
    cy.on("uncaught:exception", () => {
      cy.reload();
      return false;
    });
    cy.get(".chapterButtons")
      .find("button")
      .each(() => {
        getInput();
      });
  });
});
