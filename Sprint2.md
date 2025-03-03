# Backend API Documentation

## Overview
This text provides documentation of the backend API for the HaulAssist project. The API allows clients to interact with the system to manage hauling operations.

## Base URL
```
http://api.haulassist.com/v1
```

## Endpoints

### 1. Get All Hauls
Retrieve a list of all hauls.

**URL:** `/hauls`

**Method:** `GET`

**Headers:**
```
Authorization: Bearer YOUR_API_KEY
```

**Response:**
```json
[
    {
        "id": "haul1",
        "origin": "Location A",
        "destination": "Location B",
        "status": "in-progress"
    },
    ...
]
```

### 2. Create a New Haul
Create a new haul.

**URL:** `/hauls`

**Method:** `POST`

**Headers:**
```
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

**Body:**
```json
{
    "origin": "Location A",
    "destination": "Location B",
    "details": "Additional details about the haul"
}
```

**Response:**
```json
{
    "id": "haul2",
    "origin": "Location A",
    "destination": "Location B",
    "status": "pending"
}
```

### 3. Get Haul Details
Retrieve details of a specific haul.

**URL:** `/hauls/{id}`

**Method:** `GET`

**Headers:**
```
Authorization: Bearer YOUR_API_KEY
```

**Response:**
```json
{
    "id": "haul1",
    "origin": "Location A",
    "destination": "Location B",
    "status": "in-progress",
    "details": "Additional details about the haul"
}
```

### 4. Update Haul Status
Update the status of a specific haul.

**URL:** `/hauls/{id}/status`

**Method:** `PATCH`

**Headers:**
```
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

**Body:**
```json
{
    "status": "completed"
}
```

**Response:**
```json
{
    "id": "haul1",
    "status": "completed"
}
```

### 5. Delete a Haul
Delete a specific haul.

**URL:** `/hauls/{id}`

**Method:** `DELETE`

**Headers:**
```
Authorization: Bearer YOUR_API_KEY
```

**Response:**
```json
{
    "message": "Haul deleted successfully"
}
```

## Error Handling
All error responses follow the format below:

**Response:**
```json
{
    "error": "Error message"
}
```

## Contact
For any questions or issues, please contact the API support team at support@haulassist.com.
