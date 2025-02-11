# User Story 1: Authentication for HaulAssist (Front end)

## As a user,
I want to register and log in securely,  
So that I can access logistics and assistance services.

## Acceptance Criteria:

### Registration:
- Users sign up with their name, email, phone, and password.
- Validate inputs and send a confirmation email.

### Login:
- Users login with email and password.
- Return JWT on success; show errors on failure.

### Token Management:
- Store JWT securely.
- Verify the token for protected routes.
- Token expiration requires re-login.

### Navigation Bar:
- Provide a responsive navigation bar.
- Login/Register options for the user.
- Token expiration requires re-login.

## Front-end (ReactJS):
- Recoil for state management.
- Axios for API calls.



# User Story 2: Backend for Login page and Authentication

## As a user,
I want to be able to perform login and retrieval operations with user accounts
and any cargo associated with the account

## Acceptance Criteria

### Create account
- Handle account creation using a user model in PostgreSQL
- Store user accounts in PostgreSQL tables
- Implement JWT-based authentication.
- Verify hashed passwords during login.
- Generate JWT tokens on successful login.

### Authentication management
- Create user model to encapsulate user objects and manage them in DB
- Implement user profile retrieval endpoint.
- Handle token expiration and re-login.
- Log errors and provide meaningful error messages.

### Cargo model and management
- Create a cargo model for storing data on the cargo
- Handle special conditions like fragility and oversized loads
- Create a repository to query and return cargo data