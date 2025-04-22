# Haul Assist

**Haul Assist** is a web platform that helps users book a vehicle to move cargo from one location to another. Users can register, log in, and create cargo bookings that include vehicle type, pickup/dropoff locations, and timing. The platform calculates the cost based on vehicle type and distance using a custom pricing algorithm.

---

## Features

- **JWT-based Authentication**
- **User Registration and Login**
- **Cargo Management** (Create, Read, Update, Delete)
- **Vehicle Booking**
- **Cost Estimation** based on distance and vehicle type
- **Protected APIs** (Require access token)
- **Comprehensive Unit Tests** for models, handlers, and repositories

---

## Tech Stack

| Layer        | Technology        |
|--------------|-------------------|
| Backend      | Go (Chi router)   |
| Frontend     | React             |
| Database     | Supabase (PostgreSQL) |
| Auth         | JWT               |
| Dev Tools    | Air (Go Live Reload) |
| Testing      | Go + Testify ,Cypress    |

---

## Getting Started

### Prerequisites

- Go 1.20+
- Node.js & npm
- [Air](https://github.com/cosmtrek/air) for live reload (install via `go install github.com/cosmtrek/air@latest`)

---

### Run the Project

Run **frontend** and **backend** in two separate terminals.

#### 1 Start the Backend (Go)

```bash
# In your backend project directory
air
```

This starts the Go server (on port 8080 by default) with live reloading.

#### 2️ Start the Frontend (React)

```bash
cd frontend
npm install
npm start
```

This runs the React app on `http://localhost:3000`.

---

## Authentication

- On successful login, the backend returns an **access token** (JWT).
- This token must be included in the `Authorization` header for all protected endpoints:

```http
Authorization: Bearer <your-token>
```

---

## Cargo Booking Flow

1. **Register or Login** to receive an access token.
2. Use this token to:
   - Create cargo (specify vehicle type, pickup/dropoff locations, pickup time)
   - Get a cost estimate
   - View and manage existing bookings

Cost is calculated using a custom algorithm based on vehicle type and distance.

---

## Running Tests

Run unit tests for backend components:

```bash
go test ./...
```

Tests cover:
- API Handlers
- Models
- Repository Functions
- App bootstrapping logic

---

Run unit tests for frontend components:
```bash
npx cypress open 
```
or

```bash
npx cypress run 
```

## Project Structure
Backend:
```
/backend
   /cmd/api            # Server startup & routing (handlers)
   /internal
     /models           # Struct definitions
     /repository       # DB logic
     /env              # Env config
   /tests              # Unit tests
/frontend           # React frontend
```

Frontend:

| Path                        | Purpose/Contents                                 |
|-----------------------------|--------------------------------------------------|
| backend/                    | Backend/server-side code                         |
| frontend/                   | React frontend application                       |
| ├─ cypress/                 | Cypress E2E tests                                |
| ├─ public/                  | Static assets                                    |
| ├─ src/                     | Main source code                                 |
| │  ├─ Animations/           | Animation utilities/components                   |
| │  ├─ Components/           | Reusable UI components                           |
| │  ├─ Config/               | Configuration files/constants                    |
| │  ├─ Features/             | Feature-based modules                            |
| │  ├─ Images/               | Image assets                                     |
| │  ├─ Utils/                | Helper functions                                 |
| │  ├─ App.js, etc.          | Entry and core files                             |
| .env                        | Environment variables                            |
| .gitignore                  | Git ignore rules                                 |
| cypress.config.js           | Cypress test config                              |
| package.json                | Project dependencies/scripts                     |
| README.md                   | Project documentation                            |

---
---


## Example API Flow

```http
POST /register
POST /login -> returns JWT

GET /cargoCost/:id        (requires token)
POST /cargo           (requires token)
PUT /cargo/:id        (requires token)
DELETE /cargo/:id     (requires token)
GET /cargo/bookings    (requires token)
```

---

## Example env file

```
HOST_ADDRESS=:8080

DATABASE_URL=postgresql://postgres:haulassist@db.tovjqupbecldpjmkfskx.supabase.co:5432/postgres
DB_MAX_OPEN_CONNS=30
DB_MAX_IDLE_CONNS=30
DB_MAX_IDLE_TIME=15m

JWT_SECRET=<insert jwt token>
GOOGLE_MAPS_API_KEY=<insert your Google Maps API key>
STRIPE_SECRET_KEY=<insert your Stripe api>
```
