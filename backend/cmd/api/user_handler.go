package main

import (
	"encoding/json"
	"net/http"
)

func (app *application) GetProfileHandler(w http.ResponseWriter, r *http.Request) {
	claims, ok := r.Context().Value(UserContextKey).(*Claims)
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	user, err := app.store.Users.GetUserByEmail(r.Context(), claims.Email)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(user)
}
