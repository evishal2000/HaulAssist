package api

import (
	"context"
	"encoding/json"
	"errors"
	"haulassist_backend/cmd/api"
	"haulassist_backend/internal/model"
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

	t.Run("User not found", func(t *testing.T) {
		req, _ := http.NewRequest(http.MethodGet, "/profile", nil)
		rr := httptest.NewRecorder()

		claims := &api.Claims{Email: "test@example.com"}
		ctx := context.WithValue(req.Context(), UserContextKey, claims)
		req = req.WithContext(ctx)

		mockUserStore.On("GetUserByEmail", ctx, "test@example.com").Return(nil, errors.New("User not found"))

		handler := http.HandlerFunc(app.GetProfileHandler)
		handler.ServeHTTP(rr, req)

		assert.Equal(t, http.StatusNotFound, rr.Code)
	})

	t.Run("Success", func(t *testing.T) {
		req, _ := http.NewRequest(http.MethodGet, "/profile", nil)
		rr := httptest.NewRecorder()

		claims := &api.Claims{Email: "test@example.com"}
		ctx := context.WithValue(req.Context(), UserContextKey, claims)
		req = req.WithContext(ctx)

		user := &model.User{Email: "test@example.com", Name: "Test User"}
		mockUserStore.On("GetUserByEmail", ctx, "test@example.com").Return(user, nil)

		handler := http.HandlerFunc(app.GetProfileHandler)
		handler.ServeHTTP(rr, req)

		assert.Equal(t, http.StatusOK, rr.Code)

		var responseUser model.User
		json.NewDecoder(rr.Body).Decode(&responseUser)
		assert.Equal(t, user, &responseUser)
	})
}
