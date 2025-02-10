package repository

import (
	"context"
	"database/sql"
	"fmt"
	"haulassist_backend/internal/model"
)

// CargoRepository provides access to the cargo storage
type CargoRepository struct {
	db *sql.DB
}

// NewCargoRepository creates a new CargoRepository
func Create(db *sql.DB) *CargoRepository {
	return &CargoRepository{db: db}
}

func (u *CargoRepository) Create(ctx context.Context, cargo *model.Cargo) error {

	query := `
		INSERT INTO cargo (user_id, name, type, weight, length, width, height, cost_per_weight)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING cargo_id, created_at, updated_at
	`

	err := u.db.QueryRowContext(
		ctx,
		query,
		cargo.UserID,
		cargo.Name,
		cargo.Type,
		cargo.Weight,
		cargo.Length,
		cargo.Width,
		cargo.Height,
		cargo.CostPerWeight,
	).Scan(
		&cargo.CargoID,
		&cargo.CreatedAt,
		&cargo.UpdatedAt,
	)

	if err != nil {
		return err
	}

	return nil
}

// GetCargoByID retrieves a cargo by its ID
func (r *CargoRepository) GetCargoByID(ctx context.Context, id int64) (*model.Cargo, error) {
	query := "SELECT cargo_id, user_id, name, type, weight, length, width, height, cost_per_weight FROM cargo WHERE id = ?"
	row := r.db.QueryRowContext(ctx, query, id)

	var cargo model.Cargo
	if err := row.Scan(&cargo.CargoID, &cargo.Name, &cargo.Type, &cargo.Weight, &cargo.Length, &cargo.Width, &cargo.Height, &cargo.CostPerWeight); err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("cargo not found")
		}
		return nil, err
	}

	return &cargo, nil
}

// UpdateCargo updates an existing cargo in the database
func (r *CargoRepository) UpdateCargo(ctx context.Context, cargo *model.Cargo) error {
	query := "UPDATE cargo SET name = ?, type = ?, weight = ?, length = ?, width = ?, height = ?, cost_per_weight = ? WHERE cargo_id = ?"
	_, err := r.db.ExecContext(ctx, query, cargo.Name, cargo.Type, cargo.Weight, cargo.Length, cargo.Width, cargo.Height, cargo.CostPerWeight, cargo.CargoID)
	return err
}

// DeleteCargo deletes a cargo from the database
func (r *CargoRepository) DeleteCargo(ctx context.Context, id int64) error {
	query := "DELETE FROM cargo WHERE cargo_id = ?"
	_, err := r.db.ExecContext(ctx, query, id)
	return err
}
