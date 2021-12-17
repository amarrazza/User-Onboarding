describe('User Onboarding', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    const nameInput = () => cy.get('input[name=name]');
    const emailInput = () => cy.get('input[name=email]');
    const passInput = () => cy.get('input[name=password]');
    const termsBox = () => cy.get('input[name=terms]');
    const subBtn = () => cy.get('button[id="sub"]');

    it('elements are showing', () => {
        nameInput().should('exist');
        cy.contains('Terms of Service').should('exist');
    })
    it('can type, assert and submit', () => {
        nameInput()
            .should('have.value', '')
            .type('Austin')
            .should('have.value', 'Austin')
        emailInput()
            .type('amarrazza@gmail.com')
        passInput()
            .type('froggie')
        termsBox()
            .click()
        subBtn()
            .should('not.be.disabled')
            .click()
        cy.contains('Austin').should('exist')
        nameInput()
            .should('have.value', '')
    })
})