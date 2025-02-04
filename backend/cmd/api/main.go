package main

import (
	"log"

	"haulassist_backend/internal/env"

	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	config := config{
		addr: env.GetString("ADDR", ":8080"),
	}

	app := &application{
		config: config,
	}

	mux := app.mount()
	log.Fatal(app.run(mux))
}
