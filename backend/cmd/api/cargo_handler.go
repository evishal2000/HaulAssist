package api

import (
	"encoding/json"
	"haulassist_backend/internal/model"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
)

func (app *Application) CreateCargoHandler(w http.ResponseWriter, r *http.Request) {
	// claims, ok := r.Context().Value(UserContextKey).(*Claims)
	// if !ok {
	// 	http.Error(w, "Unauthorized", http.StatusUnauthorized)
	// 	return
	// }

	var req struct {
		Name          string `json:"name"`
		Type          string `json:"type"`
		Weight        int    `json:"weight"`
		Length        int    `json:"length"`
		Width         int    `json:"width"`
		Height        int    `json:"height"`
		CostPerWeight int    `json:"cost_per_weight"`
		UserID        int64  `json:"user_id"`
	}

	json.NewDecoder(r.Body).Decode(&req)

	cargo := &model.Cargo{
		Name:          req.Name,
		Type:          req.Type,
		Weight:        req.Weight,
		Length:        req.Length,
		Width:         req.Width,
		Height:        req.Height,
		CostPerWeight: req.CostPerWeight,
		UserID:        req.UserID,
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
		CargoID       int64  `json:"id"`
		Name          string `json:"name"`
		Type          string `json:"type"`
		Weight        int    `json:"weight"`
		Length        int    `json:"length"`
		Width         int    `json:"width"`
		Height        int    `json:"height"`
		CostPerWeight int    `json:"cost_per_weight"`
		UserID        int64  `json:"user_id"`
	}

	json.NewDecoder(r.Body).Decode(&req)
	cargoIDStr := chi.URLParam(r, "cargo_id")
	cargoID, err := strconv.ParseInt(cargoIDStr, 10, 64)

	if err != nil {
		http.Error(w, "Invalid cargo ID", http.StatusBadRequest)
		return
	}

	cargo := &model.Cargo{
		CargoID:       cargoID,
		Name:          req.Name,
		Type:          req.Type,
		Weight:        req.Weight,
		Length:        req.Length,
		Width:         req.Width,
		Height:        req.Height,
		CostPerWeight: req.CostPerWeight,
		UserID:        req.UserID,
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
