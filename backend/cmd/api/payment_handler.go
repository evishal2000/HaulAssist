package api

import (
	"encoding/json"
	"haulassist_backend/internal/env"
	"haulassist_backend/internal/model"
	"net/http"
	"strconv"

	"github.com/stripe/stripe-go/v78"
	"github.com/stripe/stripe-go/v78/paymentintent"
)

type PaymentRequest struct {
	CargoId int64   `json:"cargo_id"`
	Amount  float64 `json:"amount"`
}

func (app *Application) CreatePaymentRequestIntentHandler(w http.ResponseWriter, r *http.Request) {
	var req PaymentRequest
	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		http.Error(w, "invalid payment request", http.StatusBadRequest)
		return
	}

	stripe.Key = env.GetString("STRIPE_SECRET_KEY", "")
	stripe_params := &stripe.PaymentIntentParams{
		Amount:   stripe.Int64(int64(req.Amount * 100)), //converted into cents
		Currency: stripe.String(string(stripe.CurrencyUSD)),
		Metadata: map[string]string{
			"cargo_id": strconv.FormatInt(req.CargoId, 10),
		},
	}

	intent, err := paymentintent.New(stripe_params)
	if err != nil {
		http.Error(w, "Payment Creation Failed", http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"client_secrect": intent.ClientSecret,
		"payment_id":     intent.ID,
	})
}

func (app *Application) RecordSuccessfulPayment(w http.ResponseWriter, r *http.Request) {
	var req struct {
		CargoID               int64   `json:"cargo_id"`
		Amount                float64 `json:"amount"`
		StripePaymentIntentId string  `json:"payment_intent_id"`
		Status                string  `json:"status"` // e.g., "succeeded", "pending", "failed"'
	}

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid payment data", http.StatusBadRequest)
		return
	}

	payment := &model.Payment{
		CargoID:               req.CargoID,
		Amount:                req.Amount,
		StripePaymentIntentId: req.StripePaymentIntentId,
		Status:                req.Status,
	}

	ctx := r.Context()
	err = app.Store.Payments.Create(ctx, payment)

	if err != nil {
		http.Error(w, "Error creating payment "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(payment)

	// Insert into payments table in your DB with status = "paid"
}
