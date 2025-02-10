package main

import (
	"encoding/json"
	"haulassist_backend/internal/env"
	"haulassist_backend/internal/model"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var jwtSecret = []byte(env.GetString("JWT_SECRET", "SecretKey")) //later change in env file

type Claims struct {
	UserID int    `json:"user_id"`
	Email  string `json:"email"`
	jwt.RegisteredClaims
}

func (app *application) AuthRegisterHandler(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	json.NewDecoder(r.Body).Decode(&req)

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)

	user := &model.User{Name: req.Name, Email: req.Email, Password: string(hashedPassword)}
	ctx := r.Context() //context of the request
	err := app.store.Users.Create(ctx, user)
	if err != nil {
		http.Error(w, "Error creating user "+err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write([]byte("User Successfully Registered"))
	w.WriteHeader(http.StatusCreated)
}

func (app *application) AuthLoginHandler(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	json.NewDecoder(r.Body).Decode(&req)

	ctx := r.Context()
	user, err := app.store.Users.GetUserByEmail(ctx, req.Email)
	if err != nil {
		http.Error(w, "That email doesn't exist!"+err.Error(), http.StatusUnauthorized)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		http.Error(w, "Invalid password", http.StatusUnauthorized)
		return
	}

	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		UserID: int(user.ID),
		Email:  user.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		http.Error(w, "Could not create token", http.StatusInternalServerError)
		return
	}

	// Send the token in response
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Logged in Successfully",
		"token":   tokenString,
	})
}
