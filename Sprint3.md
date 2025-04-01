# User Story: Booking, Navbar Updates, Protected Routes & Testing

### Booking Functionality
#### Acceptance Criteria:
- Users fill out a form with:
  - Pickup & Drop-off address
  - Cargo type
  - Vehicle type
  - Pickup time
- On submission, an estimated cost pop-up appears with a "Confirm" button.
- Confirming saves the booking.

---

###  Navbar Updates
#### Acceptance Criteria:
- *Logged-in Users:* See *Dashboard, Bookings, Logout; **Home & Login* disabled.
- *Logged-out Users:* See *Home & Login*; no access to Dashboard/Bookings.

---

### Protected Routes
#### Acceptance Criteria:
- *Dashboard & Bookings* pages require login.
- Unauthenticated users are redirected to the login page.

---

### Testing
#### Acceptance Criteria:

#### Unit Tests:
- *Authentication Tests:*
  - Verify login form renders correctly.
  - Ensure login with valid credentials redirects to the dashboard.
- *Booking Form Tests:*
  - Ensure all form fields are visible.
  - Validate required fields display error messages when empty.
  - Test successful form submission.

#### E2E Tests (Cypress):
- Booking flow from form fill-up to confirmation.
- Authentication and protected routes.
- Navbar behavior based on login status.

#### Integration Tests:
- Frontend-Backend API interactions for booking and cost estimation.
- Proper error handling and data flow verification.

---

### Updated Pages
- *Dashboard & Features* pages improved.
- *New "Bookings" Tab:* Displays booking history.

---

## Tasks:
- Implement booking form & confirmation pop-up.
- Update navbar based on authentication.
- Secure routes for dashboard & bookings.
- Develop unit, E2E tests.
- Debug and resolve failing tests.

# Backend Unit Tests
- TestCreateCargoHandler : Tests the cargo creation functionality of HaulAssist
- TestUpdateCargoHandler : Tests updating an existing cargo's details
- TestGetCargoByIDHandler : Tests fetching a specific cargo by its ID
- TestDeleteCargoByIDHandler : Tests deleting an existing cargo by its ID
- TestGetBookingsHandler : Tests fetching all bookings for a user and sorting/filtering them

## v1/cargo/addCargo POST
This endpoint allows a user to create a new cargo booking
- Authorization: String authorization token
- Request Body: JSON object
  ```json
  {
    "name": "string",
    "vehicle_type": "string",
    "pickup": {
      "latitude": float64,
      "longitude": float64
    },
    "dropoff": {
      "latitude": float64,
      "longitude": float64
    },
    "pickup_time": "ISO8601 datetime string"
  }
  ```
- Response: JSON object of created cargo model
- Status Codes:
  - 201: Created successfully
  - 400: Bad Request (missing required fields)
  - 401: Unauthorized
  - 500: Internal Server Error

## v1/cargo/{cargo_id} GET
This endpoint allows fetching a specific cargo booking by ID
- Authorization: None
- Parameters: 
  - cargo_id: Integer (path parameter)
- Response: JSON object of cargo model
- Status Codes:
  - 200: Success
  - 400: Bad Request (invalid cargo ID)
  - 500: Internal Server Error

## v1/cargo/{cargo_id} PUT
This endpoint allows updating an existing cargo booking
- Authorization: String authorization token
- Parameters:
  - cargo_id: Integer (path parameter)
- Request Body: JSON object
  ```json
  {
    "name": "string",
    "vehicle_type": "string",
    "pickup": {
      "latitude": float64,
      "longitude": float64
    },
    "dropoff": {
      "latitude": float64,
      "longitude": float64
    },
    "pickup_time": "ISO8601 datetime string"
  }
  ```
- Response: JSON object of updated cargo model
- Status Codes:
  - 201: Updated successfully
  - 400: Bad Request (invalid cargo ID or missing required fields)
  - 401: Unauthorized
  - 500: Internal Server Error

## v1/cargo/{cargo_id} DELETE
This endpoint allows deleting a cargo booking
- Authorization: None
- Parameters:
  - cargo_id: Integer (path parameter)
- Response: None
- Status Codes:
  - 200: Deleted successfully
  - 400: Bad Request (invalid cargo ID)
  - 500: Internal Server Error

## v1/cargo/cost/{cargo_id} GET
This endpoint calculates the cost for a specific cargo booking
- Authorization: None
- Parameters:
  - cargo_id: Integer (path parameter)
- Response: JSON object with cost
- Status Codes:
  - 200: Success
  - 400: Bad Request (invalid cargo ID)
  - 500: Internal Server Error

## v1/cargo/cost POST
This endpoint calculates the cost for a cargo booking based on provided model
- Authorization: None
- Request Body: JSON object
  ```json
  {
    "name": "string",
    "vehicle_type": "string",
    "pickup": {
      "latitude": float64,
      "longitude": float64
    },
    "dropoff": {
      "latitude": float64,
      "longitude": float64
    },
    "pickup_time": "ISO8601 datetime string"
  }
  ```
- Response: JSON object with cost
- Status Codes:
  - 200: Success
  - 400: Bad Request (missing required fields)
  - 500: Internal Server Error

## v1/cargo/bookings GET
This endpoint fetches all cargo bookings for the authenticated user
- Authorization: String authorization token
- Query Parameters:
  - sort_by: String (optional, "created_at_asc" or "created_at_desc")
- Response: JSON array of cargo models
- Status Codes:
  - 200: Success
  - 401: Unauthorized
  - 500: Internal Server Error

