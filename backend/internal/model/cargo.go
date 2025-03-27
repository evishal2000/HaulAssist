package model

import "time"

type Location struct {
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
}

type Cargo struct {
	CargoID     int64     `json:"id"`
	Name        string    `json:"name"`         //check if we need this
	VehicleType string    `json:"vehicle_type"` //change to vehicle type, small|medium|large
	Pickup      Location  `json:"pickup"`
	Dropoff     Location  `json:"dropoff"`
	UserID      int64     `json:"user_id"`
	PickupTime  time.Time `json:"pickup_time"`
	CreatedAt   string    `json:"created_at"`
	UpdatedAt   string    `json:"updated_at"`
}
