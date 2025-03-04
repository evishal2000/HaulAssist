# User Story: End-to-End Testing, Integration Testing, and Frontend-Backend Integration for HaulAssist

## As a development team member,
I want to perform comprehensive end-to-end (E2E) and integration testing for HaulAssist, and integrate the frontend with the backend,
So that we can ensure the reliability, functionality, and seamless interaction of our entire system.

## Acceptance Criteria
- E2E tests are written for all key user flows using Cypress
- Integration tests are created to verify interactions between frontend and backend
- Frontend is successfully integrated with backend APIs
- Test coverage includes main pages, authentication flow, and API interactions
- All tests pass successfully before code is merged into the main branch

## Tasks
- Develop E2E tests for main user flows
- Create integration tests for frontend-backend API interactions
- Set up Cypress for automated E2E testing
- Implement API mocking and real API tests for integration testing
- Integrate frontend components with backend APIs
- Ensure proper error handling and data flow between frontend and backend
- Debug and fix any failing tests or integration issues


# Frontend Unit Tests


# Backend Unit Tests

- TestAuthRegisterHandler : Tests the new user registration functionality of HaulAssist
- TestAuthRegisterHandlerFail : Tests the failure case for new user registration
- TestLoginHandler : Tests Login functionality of HaulAssist
- TestLoginHandlerFail : Tests the failure case for login
- TestGetProfileHandler : Tests fetching user profile
- TestGetCoordinatesHandler : Success, Missing Attribute and Internal Server Error Test cases


# Backend API documentation

## v1/health    GET
This is a utility function to check if the server is up and running successfully.
- Authorization : None
- Parameters : None
- Response : HTTP 200 response


## v1/register  POST
This endpoint registers a new user with the platform
- Authorization : None
- Parameters: name, email, password
- Response : HTTP 200 response

## v1/login    POST
This endpoint allows a pre-existing user to log into HaulAssist
- Authorization : None
- Parameters : email, password
- Response : String authorization token

## v1/user/profile GET
This endpoint allows a user to fetch their profile from the DB
- Authorization : String authorization token
- Parameters : None
- Response : JSON object[] of user model
