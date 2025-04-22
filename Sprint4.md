

# Backend Sprint 4 status
-Implemented a payments API with Stripe for managing cargo shipping payments.
-The payment API creates a stripe payment intent and returns a client secret and a payment_id.
-The client secret and the payment_id can be used to make a payment using stripe.
-Added an API to record successful payment into the database.
-Reworked cargo model to store cost internally as opposed to DB, and rewrote unit tests to match new functionality


# Backend Unit Tests
- TestAuthRegisterHandler : Tests the new user registration functionality of HaulAssist
- TestAuthRegisterHandlerFail : Tests the failure case for new user registration
- TestLoginHandler : Tests Login functionality of HaulAssist
- TestLoginHandlerFail : Tests the failure case for login
- TestGetProfileHandler : Tests fetching user profile
- TestGetCoordinatesHandler : Success, Missing Attribute and Internal Server Error Test cases
- TestCreateCargoHandler : Tests the cargo creation functionality of HaulAssist
- TestUpdateCargoHandler : Tests updating an existing cargo's details
- TestGetCargoByIDHandler : Tests fetching a specific cargo by its ID
- TestDeleteCargoByIDHandler : Tests deleting an existing cargo by its ID
- TestGetBookingsHandler : Tests fetching all bookings for a user and sorting/filtering them

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
    "cost": float64
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
    "pickup_time": "ISO8601 datetime string",
    "cost": float64
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
    "pickup_time": "ISO8601 datetime string",
    "cost": float64
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
