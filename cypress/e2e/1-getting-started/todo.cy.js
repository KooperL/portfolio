/// <reference types="cypress" />

describe('Portfolio site e2e', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Displays correct content', () => {
    cy.get('[data-test="home-internal-link-container"]').children().should('have.length', 3)
    cy.get('[data-test="home-internal-link-container"]').children().first().should('have.text', 'Projects')
    cy.get('[data-test="home-internal-link-container"]').children().last().should('have.text', 'Contact')
    
    cy.get('[data-test="home-external-link-container"]').children().should('have.length', 2)
    cy.get('[data-test="home-external-link-container"]').children().first().should('have.text', 'GitHub')
    cy.get('[data-test="home-external-link-container"]').children().last().should('have.text', 'LinkedIn')
  })

  it('can submit a contact enquiry', () => {
    cy.get('[data-test="home-link-to-contact"]').click()

    cy.location('pathname', {timeout: 60000}).should('include', '/contact');
    cy.get('[data-test="title"]').should('contain', 'Contact me')

    let uuid = new Date()
    uuid = uuid.toISOString()
    const contactFormInput = {
      name: `name-${uuid}`,
      email: `email-${uuid}`,
      message: `message-${uuid}`
    }

    cy.get('[data-test="name-input"]').clear().type(`{enter}`)
    cy.focused().then($el => {
      expect($el).to.have.data('test', 'name-input');
    })
    cy.get('[data-test="name-input"]').clear().type(`1-${contactFormInput.name}{enter}`)

    cy.get('[data-test="message-input"]').type(`1-${contactFormInput.message}`)
    cy.get('[data-test="email-input"]').type(`1-${contactFormInput.email}@example.com`)

    cy.intercept('https://writing-wealth.pockethost.io/api/collections/messages/records?autocancel=false').as('submissionPOST')
    cy.get('[data-test="submit-input"]').should('exist').click()
    cy.wait('@submissionPOST')
    // cy.wait(1000)

    cy.get('[data-test="contact-submission-confirmation"]').should('exist')
    
    cy.get('[data-test="nav-home"]').click()
    cy.location('pathname', {timeout: 60000}).should('equal', '/');
  })
})
