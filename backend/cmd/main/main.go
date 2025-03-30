package main

import (
	"haulassist_backend/cmd/api"
	"haulassist_backend/internal/db"
	"haulassist_backend/internal/env"
	"haulassist_backend/internal/repository"
	"log"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func main() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file:  %v", err)
	}

	// Configure the application
	config := api.Config{
		Addr: env.GetString("HOST_ADDRESS", ":8080"),
		Db: api.DbConfig{
			Addr:         env.GetString("DATABASE_URL", ""),
			MaxOpenConns: env.GetInt("DB_MAX_OPEN_CONNS", 30),
			MaxIdleConns: env.GetInt("DB_MAX_IDLE_CONNS", 30),
			MaxIdleTime:  env.GetString("DB_MAX_IDLE_TIME", "15m"),
		},
	}

	// Initialize database connection
	db, err := db.New(
		config.Db.Addr,
		config.Db.MaxOpenConns,
		config.Db.MaxIdleConns,
		config.Db.MaxIdleTime,
	)
	if err != nil {
		log.Panic(err)
	}

	// Create repository store
	store := repository.NewStorage(db)

	// Initialize application
	app := &api.Application{
		Config: config,
		Store:  store,
	}

	// Mount routes
	mux := app.Mount()

	// Enable CORS
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, // Change to frontend URL in production
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}).Handler(mux)

	// Start the server with CORS enabled
	log.Printf("Server running on %s", config.Addr)
	log.Fatal(http.ListenAndServe(config.Addr, corsHandler))
}
