describe('Search Box Tests', () => {
  beforeEach(() => {
    // Navigate to the website before each test
    cy.visit('http://www.automationpractice.pl');
  });

  it('Should display search results for a valid search term', () => {
    cy.get('#search_query_top')
      .type('dress');
    cy.get('button[name="submit_search"]')
      .click();

    // Verify that the results page shows relevant results
    cy.url().should('include', 'search_query=dress');
    cy.get('.product-listing')
      .should('exist')
      .and('contain.text', 'dress');
  });

  it('Should display a message for an invalid search term', () => {
    cy.get('#search_query_top')
      .type('nonexistentitem123');
    cy.get('button[name="submit_search"]')
      .click();

    // Verify that a "no results" message is displayed
    cy.get('.alert.alert-warning')
      .should('exist')
      .and('contain.text', 'No results were found for your search');
  });

  it('Should display a validation message for an empty search', () => {
    cy.get('button[name="submit_search"]')
      .click();

    // Verify that an appropriate validation message is displayed
    cy.get('.alert.alert-warning')
      .should('exist')
      .and('contain.text', 'Please enter a search keyword');
  });
});
