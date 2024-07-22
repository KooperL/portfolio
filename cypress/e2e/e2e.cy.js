/// <reference types="cypress" />

describe("Portfolio site e2e", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Home page", () => {
    it("Displays the correct content", () => {
      cy.get('[data-test="home-internal-link-container"]')
        .children()
        .should("have.length", 3);
      cy.get('[data-test="home-internal-link-container"]')
        .children()
        .first()
        .should("have.text", "Projects");
      cy.get('[data-test="home-internal-link-container"]')
        .children()
        .last()
        .should("have.text", "Contact");

      cy.get('[data-test="home-external-link-container"]')
        .children()
        .should("have.length", 2);
      cy.get('[data-test="home-external-link-container"]')
        .children()
        .first()
        .should("have.text", "GitHub")
        .should("have.attr", "href", "https://github.com/KooperL");
      cy.get('[data-test="home-external-link-container"]')
        .children()
        .last()
        .should("have.text", "LinkedIn")
        .should("have.attr", "href", "https://linkedin.com/in/kooper");
    });
  });

  describe("About page", () => {
    it("Displays the correct content", () => {
      cy.get('[data-test="home-link-to-about"]').click();

      cy.location("pathname", { timeout: 60000 }).should("equal", "/about");
      cy.get('[data-test="title"]').should("contain", "About me");
    });
  });

  describe("Projects page", () => {
    it("Displays the correct content", () => {
      cy.get('[data-test="home-link-to-projects"]').click();
      cy.location("pathname", { timeout: 60000 }).should("equal", "/projects");

      cy.get('[data-test="title"]')
        .first()
        .should("contain", "Published sites");
      cy.get('[data-test="title"]')
        .first()
        .next()
        .should("have.attr", "href", "/projects/bingoApp");
      cy.get('[data-test="title"]')
        .next()
        .next()
        .should("have.attr", "href", "/projects/pento");

      cy.get('[data-test="title"]').last().should("contain", "My projects");
      cy.get('[data-test="title"]')
        .last()
        .next()
        .should(
          "have.attr",
          "href",
          "https://github.com/KooperL/svelte-pocketbase-quickstart",
        );
      cy.get('[data-test="title"]')
        .last()
        .next()
        .next()
        .should("have.attr", "href", "https://github.com/KooperL/mdApp");
    });

    it("navigates back to home correctly", () => {
      cy.get('[data-test="home-link-to-projects"]').click();
      cy.get('[data-test="nav-home"]').click();
      cy.location("pathname", { timeout: 60000 }).should("equal", "/");
    });

    describe("Individual project links", () => {
      it("Links to bingo site", () => {
        cy.get('[data-test="home-link-to-projects"]').click();
        cy.get('[data-test="projects-link-to-bingo"]').click();
        cy.get('[data-test="title"]').first().next();

        cy.location("pathname", { timeout: 60000 }).should(
          "equal",
          "/projects/bingoApp",
        );
        cy.get('[data-test="title"]').first().should("contain", "dropzones.io");
      });
      it("Links to pento site", () => {
        cy.get('[data-test="home-link-to-projects"]').click();
        cy.get('[data-test="projects-link-to-pento"]').click();
        cy.get('[data-test="title"]').first().next();

        cy.location("pathname", { timeout: 60000 }).should(
          "equal",
          "/projects/pento",
        );
        cy.get('[data-test="title"]').first().should("contain", "pento.page");
      });
    });
  });

  describe("Contact page", () => {
    it("Displays the correct content", () => {
      cy.get('[data-test="home-link-to-contact"]').click();

      cy.location("pathname", { timeout: 60000 }).should("include", "/contact");
      cy.get('[data-test="title"]').should("contain", "Contact me");
    });
    describe("can submit a contact enquiry", () => {
      let uuid = new Date();
      uuid = uuid.toISOString();
      const contactFormInput = {
        name: `name-${uuid}`,
        email: `email-${uuid}`,
        message: `message-${uuid}`,
      };

      it("Submits with an email address", () => {
        cy.get('[data-test="home-link-to-contact"]').click();

        cy.get('[data-test="name-input"]').clear().type(`{enter}`);
        cy.focused().then(($el) => {
          expect($el).to.have.data("test", "name-input");
        });
        cy.get('[data-test="name-input"]')
          .clear()
          .type(`1-${contactFormInput.name}{enter}`);

        cy.get('[data-test="message-input"]').type(
          `1-${contactFormInput.message}`,
        );
        cy.get('[data-test="email-input"]').type(
          `1-${contactFormInput.email}@example.com`,
        );

        cy.intercept(
          "https://writing-wealth.pockethost.io/api/collections/messages/records?autocancel=false",
        ).as("submissionPOST");
        cy.get('[data-test="submit-input"]').should("exist").click();
        cy.wait("@submissionPOST");

        cy.get('[data-test="contact-submission-confirmation"]').should("exist");
      });
      it("Submits without an email address", () => {
        cy.get('[data-test="home-link-to-contact"]').click();

        cy.get('[data-test="name-input"]').clear().type(`{enter}`);
        cy.focused().then(($el) => {
          expect($el).to.have.data("test", "name-input");
        });
        cy.get('[data-test="name-input"]')
          .clear()
          .type(`2-${contactFormInput.name}{enter}`);

        cy.get('[data-test="message-input"]').type(
          `2-${contactFormInput.message}`,
        );

        cy.intercept(
          "https://writing-wealth.pockethost.io/api/collections/messages/records?autocancel=false",
        ).as("submissionPOST");
        cy.get('[data-test="submit-input"]').should("exist").click();
        cy.wait("@submissionPOST");

        cy.get('[data-test="contact-submission-confirmation"]').should("exist");
      });
    });
    it("navigates back to home correctly", () => {
      cy.get('[data-test="nav-home"]').click();
      cy.location("pathname", { timeout: 60000 }).should("equal", "/");
    });
  });
});
