package model

type Payment struct {
	PaymentID             int64   `json:"payment_id"`
	CargoID               int64   `json:"cargo_id"`
	Amount                float64 `json:"amount"`                   // Amount in cents
	Status                string  `json:"status"`                   // e.g., "succeeded", "pending", "failed"
	StripePaymentIntentId string  `json:"stripe_payment_intent_id"` // ID from Stripe
	CreatedAt             string  `json:"created_at"`               // Timestamp of payment creation
	UpdatedAt             string  `json:"updated_at"`               // Timestamp of last update
}
