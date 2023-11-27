Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Juan')
    cy.get('#lastName').type('Felipe')
    cy.get('#email').type('juandsfelipe@hotmail.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button','Enviar').click()
})