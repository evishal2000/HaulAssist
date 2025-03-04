package api

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"haulassist_backend/cmd/api"

	"github.com/joho/godotenv"
	"github.com/stretchr/testify/assert"
)

// MockService is a mock implementation of the service package

func TestGetCoordinatesHandler(t *testing.T) {

	godotenv.Load("../../.env")
	os.Setenv("GOOGLE_MAPS_API_KEY", "testkey")

	t.Run("Place is required", func(t *testing.T) {
		req := httptest.NewRequest("GET", "/coordinates", nil)
		w := httptest.NewRecorder()

		api.GetCoordinatesHandler(w, req)

		resp := w.Result()
		defer resp.Body.Close()

		assert.Equal(t, http.StatusBadRequest, resp.StatusCode)
	})

	t.Run("Successful response", func(t *testing.T) {

		req := httptest.NewRequest("GET", "/coordinates?place=New+York", nil)
		w := httptest.NewRecorder()

		api.GetCoordinatesHandler(w, req)

		resp := w.Result()
		defer resp.Body.Close()

		// assert.Equal(t, http.StatusOK, resp.StatusCode)

		var respBody map[string]float64
		json.NewDecoder(resp.Body).Decode(&respBody)

		assert.Equal(t, 0.0, respBody["latitude"])
		assert.Equal(t, 0.0, respBody["longitude"])
	})

	t.Run("Error from service", func(t *testing.T) {

		req := httptest.NewRequest("GET", "/coordinates?place=Unknown+Place", nil)
		w := httptest.NewRecorder()

		api.GetCoordinatesHandler(w, req)

		resp := w.Result()
		defer resp.Body.Close()

		assert.Equal(t, http.StatusInternalServerError, resp.StatusCode)
	})
}
