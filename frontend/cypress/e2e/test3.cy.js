
/* eslint-disable no-undef */
describe('login and check the cost and booking api', () => {

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
    cy.get('[data-testid="email-input"]').type('vishal@gmail.com').blur();
    cy.get('[data-testid="password-input"]').type('1234').blur();
    cy.get('[data-testid="login-button"]').click();

    // Verify redirection to dashboard
    cy.url().should('include', '/dashboard');

    // Click "Book a Haul" button to go to the booking form
    cy.get('.dashboard-button').click();

    // Verify navigation to booking form
    cy.url().should('include', '/booking-form');
  });

  it('should call location API for pickup and dropoff, cost API, and booking API', () => {

    // Fill Pickup Address
    cy.get('[data-testid="pickupStreet-input"]').type('123 Main St').blur();
    cy.get('[data-testid="pickupCity-input"]').type('Gainesville').blur();
    cy.get('[data-testid="pickupState-select"]').click();
    cy.get('.ant-select-dropdown:not(.ant-select-dropdown-hidden)')
      .should('be.visible')
      .find('.ant-select-item-option')
      .first()
      .click();
    cy.get('[data-testid="pickupZip-input"]').type('32601').blur();

    // Fill Dropoff Address
    cy.get('[data-testid="dropoffStreet-input"]').type('456 Elm St').blur();
    cy.get('[data-testid="dropoffCity-input"]').type('Orlando').blur();
    cy.get('[data-testid="dropoffState-select"]').click();
    cy.get('.ant-select-dropdown:not(.ant-select-dropdown-hidden)')
      .should('be.visible')
      .contains('.ant-select-item-option', 'Arizona')
      .click();
    cy.get('[data-testid="dropoffZip-input"]').type('32801').blur();

    // Fill Cargo and Vehicle Type
    cy.get('[data-testid="cargoType-input"]').type('Electronics').blur();
    cy.get('[data-testid="vehicleType-select"]').click();
    cy.get('.ant-select-dropdown:not(.ant-select-dropdown-hidden)')
      .should('be.visible')
      .contains('.ant-select-item-option', 'Medium')
      .click();

    // Pickup Time
    cy.get('[data-testid="pickupTime-datepicker"]').click();
    cy.get('.ant-picker-now-btn').click();

    // Wait before submit to ensure validation is complete
    cy.wait(500);
    cy.intercept('GET', '/v1/location*').as('getLocation');
    cy.intercept('POST', 'http://localhost:8080/v1/cargo/cost').as('getCost');
    
    cy.get('[data-testid="submitButton1"]').click();
    // Wait and verify backend calls
    cy.wait('@getLocation').its('request.url').should('include', '/v1/location');
    cy.wait('@getLocation'); // Second time for dropoff
    cy.wait('@getCost').then((interception) => {
      expect(interception.request.body).to.have.property('name', 'Electronics');
    });
    
    cy.intercept('POST', 'v1/cargo/addCargo').as('addCargo');
    // Confirm booking in Modal
    cy.get('[data-testid="confirmButton"]').click();
    
    // Validate final booking API
    cy.wait('@addCargo').its('request.body').should((body) => {
      expect(body.name).to.eq('Electronics');
      expect(body.vehicle_type).to.eq('medium');
      expect(body.pickup).to.have.property('latitude');
      expect(body.dropoff).to.have.property('longitude');
    });
  });


  it('should navigate to /bookings and validate bookings page content and layout', () => {
    // Navigate directly using navbar or any visible button
    cy.contains('Bookings').click(); // Adjust this selector if needed

    // Confirm URL change
    cy.url().should('include', '/bookings');

    // Check for page heading
    cy.contains('Your Bookings').should('be.visible');

    // Validate table structure and data rendering
    cy.get('.bookings-table').should('exist');
    cy.get('.ant-table-row').should('have.length.at.least', 1); // assuming at least one booking
    cy.get('.ant-table-thead').within(() => {
      cy.contains('Pickup Location').should('exist');
      cy.contains('Dropoff Location').should('exist');
      cy.contains('Vehicle').should('exist');
      cy.contains('Cost').should('exist');
      cy.contains('Status').should('exist');
    });

    // Check that cost and status are displayed correctly
    cy.get('.ant-table-row').first().within(() => {
      cy.contains(/\$\d+/); // cost format like "$100"
      cy.contains(/Confirmed|Pending|Cancelled/); // status options
    });
  });

});

