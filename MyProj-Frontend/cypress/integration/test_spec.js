describe('My First Test', function() {
  it('Check server works', function() {
    cy.visit('http://localhost:3000');
    cy.get('.App').should('exist');
    cy.get('.App-error').should('not.exist');
  });
});
