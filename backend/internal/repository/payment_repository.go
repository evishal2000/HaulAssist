package repository

import (
	"context"
	"database/sql"
	"haulassist_backend/internal/model"
)

type PaymentRepository struct {
	db *sql.DB
}

func (u *PaymentRepository) Create(ctx context.Context, payment *model.Payment) error {

	query := `
		INSERT INTO payments (cargo_id, amount, status, stripe_payment_intent_id)
		VALUES ($1, $2, $3, $4) RETURNING payment_id, created_at, updated_at
	`

	err := u.db.QueryRowContext(
		ctx,
		query,
		payment.CargoID,
		payment.Amount,
		payment.Status,
		payment.StripePaymentIntentId,
	).Scan(
		&payment.PaymentID,
		&payment.CreatedAt,
		&payment.UpdatedAt,
	)

	if err != nil {
		return err
	}

	return nil
}
