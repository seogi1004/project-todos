describe('My First Test', function() {
    it('successfully loads', function() {
        cy.visit('/');
        cy.get('.v-text-field__slot > input[type=text]').should("have.attr", "placeholder", "할 일을 입력하세요");
    })
})