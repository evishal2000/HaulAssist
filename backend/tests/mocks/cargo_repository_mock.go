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
	return nil
}

func (m *MockCargoRepository) GetCargoByID(ctx context.Context, cargoId int64) (*model.Cargo, error) {
	args := m.Called(ctx, cargoId)
	return args.Get(0).(*model.Cargo), args.Error(1)
}

func (m *MockCargoRepository) UpdateCargo(ctx context.Context, cargo *model.Cargo) error {
	return nil
}

func (m *MockCargoRepository) DeleteCargo(ctx context.Context, cargoId int64) error {
	return nil
}
