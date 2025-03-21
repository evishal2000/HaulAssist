package mocks

import (
	"haulassist_backend/internal/repository"
)

type MockRepository struct {
}

func (m *MockRepository) GetMockStore() repository.Storage {
	return repository.Storage{
		Users: &MockUserRepository{},
		Cargo: &MockCargoRepository{},
	}
}
