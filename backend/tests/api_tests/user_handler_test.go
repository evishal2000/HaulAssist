package api

import (
	"haulassist_backend/cmd/api"
	"haulassist_backend/internal/repository"
	"haulassist_backend/tests/mocks"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

type ContextKey string

const UserContextKey ContextKey = "user"

func TestGetProfileHandler(t *testing.T) {
	mockUserStore := &mocks.MockUserRepository{}
	mockCargoStore := &mocks.MockCargoRepository{}

	mockStore := repository.Storage{
		Users: mockUserStore,
		Cargo: mockCargoStore,
	}
	app := &api.Application{Store: mockStore}

	t.Run("Unauthorized", func(t *testing.T) {
		req, _ := http.NewRequest(http.MethodGet, "/profile", nil)
		rr := httptest.NewRecorder()

		handler := http.HandlerFunc(app.GetProfileHandler)
		handler.ServeHTTP(rr, req)

		assert.Equal(t, http.StatusUnauthorized, rr.Code)
	})
}
