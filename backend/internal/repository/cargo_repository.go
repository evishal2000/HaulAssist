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
		INSERT INTO cargo (user_id, name, type, weight, pickup, dropoff, length, width, height, pickup_time)
		VALUES ($1, $2, $3, $4, ST_GeogFromText($5), ST_GeogFromText($6), $7, $8, $9, $10) RETURNING cargo_id, created_at, updated_at
	`

	pickup := fmt.Sprintf("SRID=4326;POINT(%f %f)", cargo.Pickup.Longitude, cargo.Pickup.Latitude)
	dropoff := fmt.Sprintf("SRID=4326;POINT(%f %f)", cargo.Dropoff.Longitude, cargo.Dropoff.Latitude)

	err := u.db.QueryRowContext(
		ctx,
		query,
		cargo.UserID,
		cargo.Name,
		cargo.Type,
		cargo.Weight,
		pickup,
		dropoff,
		cargo.Length,
		cargo.Width,
		cargo.Height,
		cargo.PickupTime,
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
	query := "SELECT cargo_id, user_id, name, type, weight, ST_X(pickup::geometry), ST_Y(pickup::geometry), ST_X(dropoff::geometry), ST_Y(dropoff::geometry), length, width, height, pickup_time, created_at, updated_at FROM cargo WHERE cargo_id = $1"
	row := r.db.QueryRowContext(ctx, query, id)

	var cargo model.Cargo
	if err := row.Scan(&cargo.CargoID, &cargo.UserID, &cargo.Name, &cargo.Type, &cargo.Weight, &cargo.Pickup.Longitude, &cargo.Pickup.Latitude, &cargo.Dropoff.Longitude, &cargo.Dropoff.Latitude, &cargo.Length, &cargo.Width, &cargo.Height, &cargo.PickupTime, &cargo.CreatedAt, &cargo.UpdatedAt); err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("cargo not found")
		}
		return nil, err
	}

	return &cargo, nil
}

// UpdateCargo updates an existing cargo in the database
func (r *CargoRepository) UpdateCargo(ctx context.Context, cargo *model.Cargo) error {
	query := "UPDATE cargo SET name = $1, type = $2, weight = $3, pickup = ST_GeogFromText($4), dropoff = ST_GeogFromText($5), length = $6, width = $7, height = $8, pickup_time = $9 WHERE cargo_id = $10 RETURNING cargo_id"

	pickup := fmt.Sprintf("SRID=4326;POINT(%f %f)", cargo.Pickup.Longitude, cargo.Pickup.Latitude)
	dropoff := fmt.Sprintf("SRID=4326;POINT(%f %f)", cargo.Dropoff.Longitude, cargo.Dropoff.Latitude)

	row := r.db.QueryRowContext(ctx, query, cargo.Name, cargo.Type, cargo.Weight, pickup, dropoff, cargo.Length, cargo.Width, cargo.Height, cargo.PickupTime, cargo.CargoID)
	var updatedCargo model.Cargo
	if err := row.Scan(&updatedCargo.CargoID); err != nil {
		if err == sql.ErrNoRows {
			return fmt.Errorf("cargo not found")
		}
		return err
	}

	return nil
	// _, err := r.db.ExecContext(ctx, query, cargo.Name, cargo.Type, cargo.Weight, cargo.Length, cargo.Width, cargo.Height, cargo.CostPerWeight, cargo.CargoID)
	// return err
}

// DeleteCargo deletes a cargo from the database
func (r *CargoRepository) DeleteCargo(ctx context.Context, id int64) error {
	query := "DELETE FROM cargo WHERE cargo_id = $1"
	_, err := r.db.ExecContext(ctx, query, id)
	return err
}
