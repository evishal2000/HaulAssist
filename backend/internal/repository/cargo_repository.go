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
		INSERT INTO cargo (user_id, name, vehicle_type, pickup, dropoff, pickup_time, cost)
		VALUES ($1, $2, $3, ST_GeogFromText($4), ST_GeogFromText($5), $6, $7) RETURNING cargo_id, created_at, updated_at
	`

	pickup := fmt.Sprintf("SRID=4326;POINT(%f %f)", cargo.Pickup.Longitude, cargo.Pickup.Latitude)
	dropoff := fmt.Sprintf("SRID=4326;POINT(%f %f)", cargo.Dropoff.Longitude, cargo.Dropoff.Latitude)

	err := u.db.QueryRowContext(
		ctx,
		query,
		cargo.UserID,
		cargo.Name,
		cargo.VehicleType,
		pickup,
		dropoff,
		cargo.PickupTime,
		cargo.Cost,
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
	query := "SELECT cargo_id, user_id, name, vehicle_type, ST_X(pickup::geometry), ST_Y(pickup::geometry), ST_X(dropoff::geometry), ST_Y(dropoff::geometry), pickup_time, created_at, updated_at, cost FROM cargo WHERE cargo_id = $1"
	row := r.db.QueryRowContext(ctx, query, id)

	var cargo model.Cargo
	if err := row.Scan(&cargo.CargoID, &cargo.UserID, &cargo.Name, &cargo.VehicleType, &cargo.Pickup.Longitude, &cargo.Pickup.Latitude, &cargo.Dropoff.Longitude, &cargo.Dropoff.Latitude, &cargo.PickupTime, &cargo.CreatedAt, &cargo.UpdatedAt, &cargo.Cost); err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("cargo not found")
		}
		return nil, err
	}

	return &cargo, nil
}

// UpdateCargo updates an existing cargo in the database
func (r *CargoRepository) UpdateCargo(ctx context.Context, cargo *model.Cargo) error {
	query := "UPDATE cargo SET name = $1, vehicle_type = $2, pickup = ST_GeogFromText($3), dropoff = ST_GeogFromText($4), pickup_time = $5, cost = $6 WHERE cargo_id = $7 RETURNING cargo_id"

	pickup := fmt.Sprintf("SRID=4326;POINT(%f %f)", cargo.Pickup.Longitude, cargo.Pickup.Latitude)
	dropoff := fmt.Sprintf("SRID=4326;POINT(%f %f)", cargo.Dropoff.Longitude, cargo.Dropoff.Latitude)

	row := r.db.QueryRowContext(ctx, query, cargo.Name, cargo.VehicleType, pickup, dropoff, cargo.PickupTime, cargo.Cost, cargo.CargoID)
	var updatedCargo model.Cargo
	if err := row.Scan(&updatedCargo.CargoID); err != nil {
		if err == sql.ErrNoRows {
			return fmt.Errorf("cargo not found")
		}
		return err
	}

	return nil
}

// DeleteCargo deletes a cargo from the database
func (r *CargoRepository) DeleteCargo(ctx context.Context, id int64) error {
	query := "DELETE FROM cargo WHERE cargo_id = $1"
	_, err := r.db.ExecContext(ctx, query, id)
	return err
}

// GetBookings retrieves all cargo entries for a user
func (r *CargoRepository) GetBookings(ctx context.Context, userID int64, sortBy string) ([]*model.Cargo, error) {
	query := "SELECT cargo_id, user_id, name, vehicle_type, ST_X(pickup::geometry), ST_Y(pickup::geometry), ST_X(dropoff::geometry), ST_Y(dropoff::geometry), pickup_time, created_at, updated_at, cost FROM cargo WHERE user_id = $1"
	if sortBy == "created_at_asc" {
		query += " ORDER BY pickup_time ASC"
	} else if sortBy == "created_at_desc" {
		query += " ORDER BY pickup_time DESC"
	}

	rows, err := r.db.QueryContext(ctx, query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var cargos []*model.Cargo
	for rows.Next() {
		var cargo model.Cargo
		if err := rows.Scan(&cargo.CargoID, &cargo.UserID, &cargo.Name, &cargo.VehicleType, &cargo.Pickup.Longitude, &cargo.Pickup.Latitude, &cargo.Dropoff.Longitude, &cargo.Dropoff.Latitude, &cargo.PickupTime, &cargo.CreatedAt, &cargo.UpdatedAt, &cargo.Cost); err != nil {
			return nil, err
		}
		cargos = append(cargos, &cargo)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return cargos, nil
}
