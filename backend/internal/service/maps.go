package service

import (
	"encoding/json"
	"fmt"
	"haulassist_backend/internal/env"
	"net/http"
	"net/url"
)

const googleMapsAPI = "https://maps.googleapis.com/maps/api/geocode/json"

// GeocodeResponse represents the response structure from Google Maps API
type GeocodeResponse struct {
	Results []struct {
		Geometry struct {
			Location struct {
				Lat float64 `json:"lat"`
				Lng float64 `json:"lng"`
			} `json:"location"`
		} `json:"geometry"`
	} `json:"results"`
	Status string `json:"status"`
}

// GetCoordinates fetches the latitude and longitude for a given place
func GetCoordinates(place string) (float64, float64, error) {
	apiKey := env.GetString("GOOGLE_MAPS_API_KEY", "")
	if apiKey == "" {
		return 0, 0, fmt.Errorf("google maps API key is missing")
	}

	endpoint := fmt.Sprintf("%s?address=%s&key=%s", googleMapsAPI, url.QueryEscape(place), apiKey)
	resp, err := http.Get(endpoint)
	if err != nil {
		return 0, 0, err
	}
	defer resp.Body.Close()

	var result GeocodeResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return 0, 0, err
	}

	if result.Status != "OK" || len(result.Results) == 0 {
		return 0, 0, fmt.Errorf("no results found for place: %s", place)
	}

	lat := result.Results[0].Geometry.Location.Lat
	lng := result.Results[0].Geometry.Location.Lng
	return lat, lng, nil
}
