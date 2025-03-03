package api

import (
	"encoding/json"
	"haulassist_backend/internal/service"
	"net/http"
)

// GetCoordinatesHandler handles the request to get coordinates of a place
func GetCoordinatesHandler(w http.ResponseWriter, r *http.Request) {
	place := r.URL.Query().Get("place")
	if place == "" {
		http.Error(w, "Place is required", http.StatusBadRequest)
		return
	}

	lat, lng, err := service.GetCoordinates(place)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := map[string]float64{"latitude": lat, "longitude": lng}
	json.NewEncoder(w).Encode(response)
}
