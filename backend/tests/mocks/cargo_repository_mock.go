package mocks

import (
	"context"
	"haulassist_backend/internal/model"

	"github.com/stretchr/testify/mock"
)

type MockCargoRepository struct {
	mock.Mock
}

func (m *MockCargoRepository) Create(ctx context.Context, cargo *model.Cargo) error {
	args := m.Called(ctx, cargo)
	return args.Error(0)
}

func (m *MockCargoRepository) GetCargoByID(ctx context.Context, cargoId int64) (*model.Cargo, error) {
	args := m.Called(ctx, cargoId)
	return args.Get(0).(*model.Cargo), args.Error(1)
}

func (m *MockCargoRepository) UpdateCargo(ctx context.Context, cargo *model.Cargo) error {
	args := m.Called(ctx, cargo)
	return args.Error(0)
}

func (m *MockCargoRepository) DeleteCargo(ctx context.Context, cargoId int64) error {
	args := m.Called(ctx, cargoId)
	return args.Error(0)
}

func (m *MockCargoRepository) GetBookings(ctx context.Context, userID int64, sortBy string) ([]*model.Cargo, error) {
	args := m.Called(ctx, userID, sortBy)
	return args.Get(0).([]*model.Cargo), args.Error(1)
}
