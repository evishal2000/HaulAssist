package api

import (
	"encoding/json"
	"haulassist_backend/internal/helper"
	"haulassist_backend/internal/model"
	"net/http"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"
)

func (app *Application) CreateCargoHandler(w http.ResponseWriter, r *http.Request) {
	// claims, ok := r.Context().Value(UserContextKey).(*Claims)
	// if !ok {
	// 	http.Error(w, "Unauthorized", http.StatusUnauthorized)
	// 	return
	// }

	var req struct {
		Name       string         `json:"name"`
		Type       string         `json:"type"`
		Weight     int            `json:"weight"`
		Pickup     model.Location `json:"pickup"`
		Dropoff    model.Location `json:"dropoff"`
		Length     int            `json:"length"`
		Width      int            `json:"width"`
		Height     int            `json:"height"`
		PickupTime time.Time      `json:"pickup_time"`
		UserID     int64          `json:"user_id"`
	}

	json.NewDecoder(r.Body).Decode(&req)

	// Check if Pickup & Dropoff locations are present
	if req.Pickup.Latitude == 0 && req.Pickup.Longitude == 0 {
		http.Error(w, "Pickup location is required", http.StatusBadRequest)
		return
	}
	if req.Dropoff.Latitude == 0 && req.Dropoff.Longitude == 0 {
		http.Error(w, "Dropoff location is required", http.StatusBadRequest)
		return
	}

	// Check if Pickup Time is valid (not zero value)
	if req.PickupTime.IsZero() {
		http.Error(w, "Pickup time is required", http.StatusBadRequest)
		return
	}

	cargo := &model.Cargo{
		Name:       req.Name,
		Type:       req.Type,
		Weight:     req.Weight,
		Pickup:     req.Pickup,
		Dropoff:    req.Dropoff,
		Length:     req.Length,
		Width:      req.Width,
		Height:     req.Height,
		UserID:     req.UserID,
		PickupTime: req.PickupTime,
		// UserID:        claims.UserID, //taking user id from claims for now
	}

	ctx := r.Context()
	err := app.Store.Cargo.Create(ctx, cargo)

	if err != nil {
		http.Error(w, "Error creating cargo "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(cargo)
}

func (app *Application) UpdateCargoHandler(w http.ResponseWriter, r *http.Request) {
	var req struct {
		CargoID    int64          `json:"id"`
		Name       string         `json:"name"`
		Type       string         `json:"type"`
		Weight     int            `json:"weight"`
		Pickup     model.Location `json:"pickup"`
		Dropoff    model.Location `json:"dropoff"`
		Length     int            `json:"length"`
		Width      int            `json:"width"`
		Height     int            `json:"height"`
		PickupTime time.Time      `json:"pickup_time"`
		UserID     int64          `json:"user_id"`
	}

	json.NewDecoder(r.Body).Decode(&req)
	cargoIDStr := chi.URLParam(r, "cargo_id")
	cargoID, err := strconv.ParseInt(cargoIDStr, 10, 64)

	if err != nil {
		http.Error(w, "Invalid cargo ID", http.StatusBadRequest)
		return
	}

	// Check if Pickup & Dropoff locations are present
	if req.Pickup.Latitude == 0 && req.Pickup.Longitude == 0 {
		http.Error(w, "Pickup location is required", http.StatusBadRequest)
		return
	}
	if req.Dropoff.Latitude == 0 && req.Dropoff.Longitude == 0 {
		http.Error(w, "Dropoff location is required", http.StatusBadRequest)
		return
	}

	// Check if Pickup Time is valid (not zero value)
	if req.PickupTime.IsZero() {
		http.Error(w, "Pickup time is required", http.StatusBadRequest)
		return
	}

	cargo := &model.Cargo{
		CargoID:    cargoID,
		Name:       req.Name,
		Type:       req.Type,
		Weight:     req.Weight,
		Pickup:     req.Pickup,
		Dropoff:    req.Dropoff,
		Length:     req.Length,
		Width:      req.Width,
		Height:     req.Height,
		UserID:     req.UserID,
		PickupTime: req.PickupTime,
		// UserID:        claims.UserID, //taking user id from claims for now
	}

	ctx := r.Context()
	err = app.Store.Cargo.UpdateCargo(ctx, cargo)

	if err != nil {
		http.Error(w, "Error creating cargo "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(cargo)
}

func (app *Application) GetCargoByIDHandler(w http.ResponseWriter, r *http.Request) {
	// claims, ok := r.Context().Value(UserContextKey).(*Claims)
	// if !ok {
	// 	http.Error(w, "Unauthorized", http.StatusUnauthorized)
	// 	return
	// }

	cargoIDStr := chi.URLParam(r, "cargo_id")
	cargoID, err := strconv.ParseInt(cargoIDStr, 10, 64)

	if err != nil {
		http.Error(w, "Invalid cargo ID", http.StatusBadRequest)
		return
	}

	ctx := r.Context()
	cargo, err := app.Store.Cargo.GetCargoByID(ctx, cargoID)

	if err != nil {
		http.Error(w, "Error fetching cargo "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(cargo)
}

func (app *Application) DeleteCargoByIDHandler(w http.ResponseWriter, r *http.Request) {

	cargoIDStr := chi.URLParam(r, "cargo_id")
	cargoID, err := strconv.ParseInt(cargoIDStr, 10, 64)

	if err != nil {
		http.Error(w, "Invalid cargo ID", http.StatusBadRequest)
		return
	}

	ctx := r.Context()
	err = app.Store.Cargo.DeleteCargo(ctx, cargoID)

	if err != nil {
		http.Error(w, "Error fetching cargo "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (app *Application) GetCargoCostHandler(w http.ResponseWriter, r *http.Request) {
	// claims, ok := r.Context().Value(UserContextKey).(*Claims)
	// if !ok {
	// 	http.Error(w, "Unauthorized", http.StatusUnauthorized)
	// 	return
	// }

	cargoIDStr := chi.URLParam(r, "cargo_id")
	cargoID, err := strconv.ParseInt(cargoIDStr, 10, 64)

	if err != nil {
		http.Error(w, "Invalid cargo ID", http.StatusBadRequest)
		return
	}

	ctx := r.Context()
	cargo, err := app.Store.Cargo.GetCargoByID(ctx, cargoID)

	if err != nil {
		http.Error(w, "Error fetching cargo "+err.Error(), http.StatusInternalServerError)
		return
	}

	cost := helper.CalculateCost(cargo)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(cost)
}
