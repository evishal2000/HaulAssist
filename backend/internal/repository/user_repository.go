package repository

import (
	"context"
	"database/sql"
	"haulassist_backend/internal/model"
)

type UserRepository struct {
	DB *sql.DB
}

func (u *UserRepository) Create(ctx context.Context, user *model.User) error {

	query := `
		INSERT INTO users (name, email, password)
		VALUES ($1, $2, $3) RETURNING id, created_at, updated_at
	`

	err := u.DB.QueryRowContext(
		ctx,
		query,
		user.Name,
		user.Email,
		user.Password,
	).Scan(
		&user.UserID,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		return err
	}

	return nil
}

func (u *UserRepository) GetUserByEmail(ctx context.Context, email string) (*model.User, error) {
	user := &model.User{}
	query := `SELECT id, name, email, password, created_at, updated_at FROM users WHERE email=$1`

	err := u.DB.QueryRowContext(
		ctx,
		query,
		email,
	).Scan(
		&user.UserID,
		&user.Name,
		&user.Email,
		&user.Password,
		&user.CreatedAt,
		&user.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	return user, nil
}
