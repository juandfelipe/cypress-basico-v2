/// <reference types="Cypress"/>
//https://github.com/juandfelipe/cypress-basico-v2/blob/main/lessons/05.md

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function () {
        cy.visit('src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'
        cy.get('#firstName').type('Juan')
        cy.get('#lastName').type('Felipe')
        cy.get('#email').type('juandsfelipe@hotmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button','Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Juan')
        cy.get('#lastName').type('Felipe')
        cy.get('#email').type('juandsfelipe.hotmail.com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não numérico', function() {
        cy.get('#phone').type('abcd').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Juan')
        cy.get('#lastName').type('Felipe')
        cy.get('#email').type('juandsfelipe@hotmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Juan')
            .should('have.value','Juan')
            .clear()
            .should('have.value','')
        cy.get('#lastName').type('Felipe')
            .should('have.value','Felipe')
            .clear()
            .should('have.value','')
        cy.get('#email').type('juandsfelipe@hotmail.com')
            .should('have.value','juandsfelipe@hotmail.com')
            .clear()
            .should('have.value','')
        cy.get('#phone').type('11111')
            .should('have.value','11111')
            .clear()
            .should('have.value','')
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    }) 

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })
    
    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value=feedback]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio)
                    .check()
                    .should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
    })
  })
