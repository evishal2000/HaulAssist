package repository

import (
	"context"
	"database/sql"
	"haulassist_backend/internal/model"
)

type UserInterface interface {
	Create(context.Context, *model.User) error
	GetUserByEmail(context.Context, string) (*model.User, error)
}

type CargoInterface interface {
	Create(context.Context, *model.Cargo) error
	GetCargoByID(context.Context, int64) (*model.Cargo, error)
	UpdateCargo(context.Context, *model.Cargo) error
	DeleteCargo(context.Context, int64) error
}

type Storage struct {
	Users UserInterface
	Cargo CargoInterface
}

func NewStorage(db *sql.DB) Storage {
	return Storage{
		Users: &UserRepository{db},
		Cargo: &CargoRepository{db},
	}
}
