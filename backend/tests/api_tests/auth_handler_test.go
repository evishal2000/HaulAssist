package api_test

import (
	"bytes"
	"errors"

	// "errors"
	"haulassist_backend/cmd/api"
	"haulassist_backend/tests/mocks"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestAuthRegisterHandler(t *testing.T) {

	mockRepo := &mocks.MockRepository{}

	mockStore := mockRepo.GetMockStore()
	app := &api.Application{Store: mockStore}

	reqBody := `{"name":"John Doe","email":"john@example.com","password":"password123"}`
	req := httptest.NewRequest("POST", "/register", bytes.NewBufferString(reqBody))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	mockUserStore := mockStore.Users.(*mocks.MockUserRepository)

	mockUserStore.On("Create", mock.Anything, mock.AnythingOfType("*model.User")).Return(nil)
	app.AuthRegisterHandler(w, req)

	resp := w.Result()
	defer resp.Body.Close()
	assert.Equal(t, http.StatusCreated, resp.StatusCode)
	// mockStore.AssertExpectations(t)
}

func TestAuthRegisterHandlerFail(t *testing.T) {

	mockRepo := &mocks.MockRepository{}

	mockStore := mockRepo.GetMockStore()
	app := &api.Application{Store: mockStore}

	reqBody := `{"name":"John Doe","email":"john@example.com","password":"password123"}`
	req := httptest.NewRequest("POST", "/register", bytes.NewBufferString(reqBody))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	mockUserStore := mockStore.Users.(*mocks.MockUserRepository)

	mockUserStore.On("Create", mock.Anything, mock.Anything).Return(errors.New("Error creating user"))
	app.AuthRegisterHandler(w, req)

	resp := w.Result()
	defer resp.Body.Close()
	assert.Equal(t, http.StatusInternalServerError, resp.StatusCode)
	// mockStore.AssertExpectations(t)
}
