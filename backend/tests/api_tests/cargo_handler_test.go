package api_test

import (
	"bytes"
	"context"

	// "errors"
	"haulassist_backend/cmd/api"
	"haulassist_backend/internal/model"
	"haulassist_backend/tests/mocks"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/go-chi/chi/v5"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestCreateCargoHandler(t *testing.T) {

	mockRepo := &mocks.MockRepository{}

	mockStore := mockRepo.GetMockStore()
	app := &api.Application{Store: mockStore}

	reqBody := `	{
						"name":"furniture",
						"vehicle_type":"large",
						"pickup":{
							"latitude": 29.6463212,
							"longitude": -82.34778159999999
						},
						"dropoff":{
							"latitude": 29.6205846,
							"longitude": -82.3763855
						},
						"user_id":3,
						"pickup_time":"2025-03-03T10:30:00Z"
					}
				`
	req := httptest.NewRequest("POST", "/addCargo", bytes.NewBufferString(reqBody))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	mockCargoStore := mockStore.Cargo.(*mocks.MockCargoRepository)

	mockCargoStore.On("Create", mock.Anything, mock.AnythingOfType("*model.Cargo")).Return(nil)
	app.CreateCargoHandler(w, req)

	resp := w.Result()
	defer resp.Body.Close()
	assert.Equal(t, http.StatusCreated, resp.StatusCode)
	// mockStore.AssertExpectations(t)
}

func TestUpdateCargoHandler(t *testing.T) {

	mockRepo := &mocks.MockRepository{}

	mockStore := mockRepo.GetMockStore()
	app := &api.Application{Store: mockStore}

	reqBody := `	{
						"name":"furniture",
						"vehicle_type":"large",
						"pickup":{
							"latitude": 29.6463212,
							"longitude": -82.34778159999999
						},
						"dropoff":{
							"latitude": 29.6205846,
							"longitude": -82.3763855
						},
						"user_id":3,
						"pickup_time":"2025-03-03T10:30:00Z"
					}
				`
	req := httptest.NewRequest("PUT", "/cargo", bytes.NewBufferString(reqBody))
	ctx := chi.NewRouteContext()
	ctx.URLParams.Add("cargo_id", "2")

	req = req.WithContext(context.WithValue(req.Context(), chi.RouteCtxKey, ctx))

	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	mockCargoStore := mockStore.Cargo.(*mocks.MockCargoRepository)

	mockCargoStore.On("UpdateCargo", mock.Anything, mock.AnythingOfType("*model.Cargo")).Return(nil)
	app.UpdateCargoHandler(w, req)

	resp := w.Result()
	defer resp.Body.Close()
	assert.Equal(t, http.StatusCreated, resp.StatusCode)
	// mockStore.AssertExpectations(t)
}

func TestGetCargoByIDHandler(t *testing.T) {

	mockRepo := &mocks.MockRepository{}

	mockStore := mockRepo.GetMockStore()
	app := &api.Application{Store: mockStore}

	req := httptest.NewRequest("GET", "/cargo", nil)
	ctx := chi.NewRouteContext()
	ctx.URLParams.Add("cargo_id", "2")

	req = req.WithContext(context.WithValue(req.Context(), chi.RouteCtxKey, ctx))

	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	mockCargoStore := mockStore.Cargo.(*mocks.MockCargoRepository)

	mockCargoStore.On("GetCargoByID", mock.Anything, mock.Anything).Return(&model.Cargo{}, nil)
	app.GetCargoByIDHandler(w, req)

	resp := w.Result()
	defer resp.Body.Close()
	assert.Equal(t, http.StatusOK, resp.StatusCode)
}

func TestDeleteCargoByIDHandler(t *testing.T) {

	mockRepo := &mocks.MockRepository{}

	mockStore := mockRepo.GetMockStore()
	app := &api.Application{Store: mockStore}

	req := httptest.NewRequest("GET", "/cargo", nil)
	ctx := chi.NewRouteContext()
	ctx.URLParams.Add("cargo_id", "2")

	req = req.WithContext(context.WithValue(req.Context(), chi.RouteCtxKey, ctx))

	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	mockCargoStore := mockStore.Cargo.(*mocks.MockCargoRepository)

	mockCargoStore.On("DeleteCargo", mock.Anything, mock.Anything).Return(nil)
	app.DeleteCargoByIDHandler(w, req)

	resp := w.Result()
	defer resp.Body.Close()
	assert.Equal(t, http.StatusOK, resp.StatusCode)
}
