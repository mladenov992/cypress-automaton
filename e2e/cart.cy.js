describe('Shopping Cart Tests', () => {
  beforeEach(() => {
    // Navigate to the Women section before each test
    cy.visit('http://www.automationpractice.pl/index.php?id_category=3&controller=category');
  });

  it('Should navigate to Women, choose Printed Chiffon Dress, change size to L, and add to cart', () => {
    // Click on the container above Printed Chiffon Dress
    cy.get('.last-line > .product-container > .left-block > .product-image-container > .product_img_link > .replace-2x').click();

    // Change size to L
    cy.get('#group_1').select('L');

    // Add to cart
    cy.get('button[name="Submit"]').click();

    // Proceed to checkout
    cy.get('.button-medium > span').click();

    // Verify the modal appears confirming the addition
    cy.get('.layer_cart').should('be.visible')
      .within(() => {
        cy.get('.icon-ok').should('exist');
        cy.contains('Product successfully added to your shopping cart');
        cy.get('a[title="Proceed to checkout"]').click();
      });

    // Verify the shopping cart summary
    cy.url().should('include', 'controller=order');
    cy.get('#cart_summary').should('exist')
      .within(() => {
        cy.get('.cart_description').should('contain.text', 'Printed Chiffon Dress');
        cy.get('.cart_quantity_input').should('have.value', '1'); // Verify quantity
        cy.get('.cart_size').should('contain.text', 'L'); // Verify size
      });
  });

  it('Should add an item to the shopping cart and verify it', () => {
    // Add the first item to the cart
    cy.get('.product-container').first().within(() => {
      cy.get('.ajax_add_to_cart_button').click(); // Add to cart button
    });

    // Verify the modal appears confirming the addition
    cy.get('.layer_cart').should('be.visible')
      .within(() => {
        cy.get('.icon-ok').should('exist');
        cy.contains('Product successfully added to your shopping cart');
        cy.get('a[title="Proceed to checkout"]').click(); // Proceed to checkout button
      });

    // Verify the shopping cart summary
    cy.url().should('include', 'controller=order');
    cy.get('#cart_summary').should('exist')
      .within(() => {
        cy.get('.cart_description').should('exist');
        cy.get('.cart_quantity_input').should('have.value', '1'); // Verify quantity
      });
  });

  it('Should remove an item from the shopping cart', () => {
    // Add the first item to the cart
    cy.get('.product-container').first().within(() => {
      cy.get('.ajax_add_to_cart_button').click();
    });

    // Proceed to checkout
    cy.get('.layer_cart').should('be.visible')
      .within(() => {
        cy.get('a[title="Proceed to checkout"]').click();
      });

    // Remove the item from the cart
    cy.get('.cart_quantity_delete').click();

    // Verify the cart is empty
    cy.get('.alert.alert-warning').should('contain.text', 'Your shopping cart is empty.');
  });

  it('Should verify the shopping cart page functionality', () => {
    // Add an item to the cart
    cy.get('.product-container').first().within(() => {
      cy.get('.ajax_add_to_cart_button').click();
    });

    // Proceed to checkout
    cy.get('.layer_cart').should('be.visible')
      .within(() => {
        cy.get('a[title="Proceed to checkout"]').click();
      });

    // Verify cart summary page
    cy.url().should('include', 'controller=order');
    cy.get('#cart_summary').should('exist')
      .within(() => {
        cy.get('.cart_description').should('exist');
        cy.get('.cart_quantity_input').should('have.value', '1');
        cy.get('.cart_total_price').should('exist'); // Verify total price is displayed
      });

    // Update quantity
    cy.get('.cart_quantity_up').click();
    cy.get('.cart_quantity_input').should('have.value', '2'); // Verify updated quantity

    // Remove the item
    cy.get('.cart_quantity_delete').click();
    cy.get('.alert.alert-warning').should('contain.text', 'Your shopping cart is empty.');
  });
});