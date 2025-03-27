package model

import "time"

type Location struct {
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
}

type Cargo struct {
	CargoID       int64     `json:"id"`
	Name          string    `json:"name"` //check if we need this
	Type          string    `json:"type"` //change to vehicle type, small|medium|large
	Weight        int       `json:"weight"`
	Pickup        Location  `json:"pickup"`
	Dropoff       Location  `json:"dropoff"`
	Length        int       `json:"length"`          //remove
	Width         int       `json:"width"`           //remove
	Height        int       `json:"height"`          //remove
	CostPerWeight int       `json:"cost_per_weight"` //remove
	UserID        int64     `json:"user_id"`
	PickupTime    time.Time `json:"pickup_time"`
	CreatedAt     string    `json:"created_at"`
	UpdatedAt     string    `json:"updated_at"`
}
