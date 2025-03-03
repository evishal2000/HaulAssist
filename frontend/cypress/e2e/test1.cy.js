describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
  })
})

describe('about page', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/about')
  })
})
describe('Features page', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/features')
  })
})


describe('UI Rendering Tests', () => {
  it('should load the landing page correctly', () => {
      cy.visit('/');
      cy.contains('Logistics Partner').should('be.visible');
     
  });
});



describe('Authentication Tests', () => {
  beforeEach(() => {
      cy.visit('/login'); 
  });
  
  it('should navigate to the register page when register button is clicked', () => {
    cy.get('.register-link').click();
    cy.url().should('include', '/register');
});
  it('should display login form', () => {
      cy.get('[data-testid="email-input"]').should('be.visible');
      cy.get('[data-testid="password-input"]').should('be.visible');
      cy.get('[data-testid="login-button"]').should('be.visible');
  });


  it('should login successfully with valid credentials', () => {
    cy.intercept('POST', '/v1/register', { statusCode: 200, body: { token: 'fake-jwt-token' } }).as('loginRequest');
      cy.get('[data-testid="email-input"]').type('vishal@gmail.com');
      cy.get('[data-testid="password-input"]').type('1234');
      cy.get('[data-testid="login-button"]').click();
      
      cy.url().should('include', '/dashboard');
  });



});

