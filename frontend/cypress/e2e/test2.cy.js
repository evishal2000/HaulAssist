/* eslint-disable no-undef */
describe('Booking Form Flow', () => {
  beforeEach(() => {
    cy.visit('/login');

    // Ensure login form is visible
    cy.get('[data-testid="email-input"]').should('be.visible');
    cy.get('[data-testid="password-input"]').should('be.visible');
    cy.get('[data-testid="login-button"]').should('be.visible');

    // Mock login API request
    cy.intercept('POST', '/v1/register', { 
      statusCode: 200, 
      body: { token: 'fake-jwt-token' } 
    }).as('loginRequest');

    // Perform login
    cy.get('[data-testid="email-input"]').type('evishal20@gmail.com');
    cy.get('[data-testid="password-input"]').type('123456');
    cy.get('[data-testid="login-button"]').click();


    // Verify redirection to dashboard
    cy.url().should('include', '/dashboard');

    // Click "Book a Haul" button to go to the booking form
    cy.get('.dashboard-button').click();
    
    // Verify navigation to booking form
    cy.url().should('include', '/booking-form');
  });


  it('should render all booking form fields', () => {
    cy.get('[data-testid="pickupStreet-input"]').should('be.visible');
    cy.get('[data-testid="pickupCity-input"]').should('be.visible');
    cy.get('[data-testid="pickupZip-input"]').should('be.visible');
    cy.get('[data-testid="dropoffStreet-input"]').should('be.visible');
    cy.get('[data-testid="dropoffCity-input"]').should('be.visible');
    cy.get('[data-testid="dropoffZip-input"]').should('be.visible');
    cy.get('[data-testid="cargoType-input"]').should('be.visible');
    cy.get('[data-testid="pickupTime-datepicker"]').should('be.visible');
    cy.get('[data-testid="submitButton1"]').should('be.visible');
  });
  
  
  it('should show validation errors if required fields are empty', () => {
    // Click the submit button
    cy.get('[data-testid="submitButton1"]').click();  
  
    // Wait for the validation error messages to appear
    cy.get('.ant-form-item-explain-error').should('be.visible');  
  
    // Check if the required field validation message contains the word 'required'
    cy.get('.ant-form-item-explain-error').should('contain', 'required');
  });

  
it('should allow filling and submitting the form', () => {  
cy.get('[data-testid="pickupStreet-input"]').type('123 Main St').blur();
cy.get('[data-testid="pickupCity-input"]').type('Gainesville').blur();
cy.get('[data-testid="pickupZip-input"]').type('32608').blur();

// Select pickup state from dropdown
cy.get('[data-testid="pickupState-select"]').click();
cy.wait(500);
cy.get('.ant-select-dropdown:not(.ant-select-dropdown-hidden)').contains('Florida').click();

// Fill in dropoff address
cy.get('[data-testid="dropoffStreet-input"]').type('456 Elm St').blur();
cy.get('[data-testid="dropoffCity-input"]').type('Orlando').blur();
cy.get('[data-testid="dropoffZip-input"]').type('32801').blur();

// Select dropoff state from dropdown
cy.get('[data-testid="dropoffState-select"]').click();
cy.wait(500);
cy.get('.ant-select-dropdown:not(.ant-select-dropdown-hidden)').contains('Florida').click();

// Fill in cargo type
cy.get('[data-testid="cargoType-input"]').type('Electronics').blur();

// Select vehicle type from dropdown
cy.get('[data-testid="vehicleType-select"]').click();
cy.wait(500);
cy.get('.ant-select-dropdown:not(.ant-select-dropdown-hidden)').contains('Medium').click();

// Select pickup time and confirm with the "OK" button
cy.get('[data-testid="pickupTime-datepicker"]').click();
cy.wait(500);
cy.get('.ant-picker-now-btn').contains('Now').click(); 

// Click the submit button
cy.get('[data-testid="submitButton1"]').click();
  
});
});