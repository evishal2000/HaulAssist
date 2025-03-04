package api_test

import (
	"bytes"
	"errors"

	// "errors"
	"haulassist_backend/cmd/api"
	"haulassist_backend/internal/model"
	"haulassist_backend/internal/repository"
	"haulassist_backend/tests/mocks"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"golang.org/x/crypto/bcrypt"
)

func TestLoginHandler(t *testing.T) {

	mockUserStore := &mocks.MockUserRepository{}
	mockCargoStore := &mocks.MockCargoRepository{}

	mockStore := repository.Storage{
		Users: mockUserStore,
		Cargo: mockCargoStore,
	}
	app := &api.Application{Store: mockStore}

	reqBody := `{"email":"john@example.com","password":"password123"}`
	req := httptest.NewRequest("POST", "/register", bytes.NewBufferString(reqBody))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte("password123"), bcrypt.DefaultCost)
	if err != nil {
		t.Fatalf("failed to hash password: %v", err)
	}

	mockUserStore.On("GetUserByEmail", mock.Anything, mock.Anything).Return(&model.User{Password: string(hashedPassword)}, nil)
	app.AuthLoginHandler(w, req)

	resp := w.Result()
	defer resp.Body.Close()
	assert.Equal(t, http.StatusOK, resp.StatusCode)
	// mockStore.AssertExpectations(t)
}

func TestLoginHandlerFail(t *testing.T) {

	mockUserStore := &mocks.MockUserRepository{}
	mockCargoStore := &mocks.MockCargoRepository{}

	mockStore := repository.Storage{
		Users: mockUserStore,
		Cargo: mockCargoStore,
	}
	app := &api.Application{Store: mockStore}

	reqBody := `{"email":"john@example.com","password":"password123"}`
	req := httptest.NewRequest("POST", "/register", bytes.NewBufferString(reqBody))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte("password123"), bcrypt.DefaultCost)
	if err != nil {
		t.Fatalf("failed to hash password: %v", err)
	}

	mockUserStore.On("GetUserByEmail", mock.Anything, mock.Anything).Return(&model.User{Password: string(hashedPassword)}, errors.New("Error fetching user"))
	app.AuthRegisterHandler(w, req)

	resp := w.Result()
	defer resp.Body.Close()
	assert.Equal(t, http.StatusInternalServerError, resp.StatusCode)
	// mockStore.AssertExpectations(t)
}
