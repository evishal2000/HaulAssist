package main

import (
	"log"

	"haulassist_backend/cmd/api"
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

	config := api.Config{
		Addr: env.GetString("HOST_ADDRESS", ":8080"),
		Db: api.DbConfig{
			Addr:         env.GetString("DATABASE_URL", ""),
			MaxOpenConns: env.GetInt("DB_MAX_OPEN_CONNS", 30),
			MaxIdleConns: env.GetInt("DB_MAX_IDLE_CONNS", 30),
			MaxIdleTime:  env.GetString("DB_MAX_IDLE_TIME", "15m"),
		},
	}

	db, err := db.New(
		config.Db.Addr,
		config.Db.MaxOpenConns,
		config.Db.MaxIdleConns,
		config.Db.MaxIdleTime,
	)
	if err != nil {
		log.Panic(err)
	}

	store := repository.NewStorage(db)

	app := &api.Application{
		Config: config,
		Store:  store,
	}

	mux := app.Mount()
	log.Fatal(app.Run(mux))
}
