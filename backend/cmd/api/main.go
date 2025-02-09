package main

import (
	"log"

	"haulassist_backend/internal/db"
	"haulassist_backend/internal/env"
	"haulassist_backend/internal/repository"

	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	config := config{
		addr: env.GetString("HOST_ADDRESS", ":8080"),
		db: dbConfig{
			addr:         env.GetString("DATABASE_URL", ""),
			maxOpenConns: env.GetInt("DB_MAX_OPEN_CONNS", 30),
			maxIdleConns: env.GetInt("DB_MAX_IDLE_CONNS", 30),
			maxIdleTime:  env.GetString("DB_MAX_IDLE_TIME", "15m"),
		},
	}

	db, err := db.New(
		config.db.addr,
		config.db.maxOpenConns,
		config.db.maxIdleConns,
		config.db.maxIdleTime,
	)
	if err != nil {
		log.Panic(err)
	}

	store := repository.NewStorage(db)

	app := &application{
		config: config,
		store:  store,
	}

	mux := app.mount()
	log.Fatal(app.run(mux))
}
