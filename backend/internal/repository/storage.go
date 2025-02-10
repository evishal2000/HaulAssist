package repository

import (
	"context"
	"database/sql"
	"haulassist_backend/internal/model"
)

type Storage struct {
	Users interface {
		Create(context.Context, *model.User) error
		GetUserByEmail(context.Context, string) (*model.User, error)
	}
	Cargo interface {
		Create(context.Context, *model.Cargo) error
		GetCargoByID(context.Context, int64) (*model.Cargo, error)
	}
}

func NewStorage(db *sql.DB) Storage {
	return Storage{
		Users: &UserRepository{db},
		Cargo: &CargoRepository{db},
	}
}
