package main

import (
	"haulassist_backend/internal/repository"
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

type application struct {
	config config
	store  repository.Storage
}

type config struct {
	addr string
	db   dbConfig
}

type dbConfig struct {
	addr         string
	maxOpenConns int
	maxIdleConns int
	maxIdleTime  string
}

func (app *application) mount() http.Handler {
	r := chi.NewRouter()

	// A good base middleware stack
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// Set a timeout value on the request context (ctx), that will signal
	// through ctx.Done() that the request has timed out and further
	// processing should be stopped.
	r.Use(middleware.Timeout(60 * time.Second))

	r.Route("/v1", func(r chi.Router) {
		r.Get("/health", app.healthCheckHandler)
		r.Post("/register", app.AuthRegisterHandler)
		r.Post("/login", app.AuthLoginHandler)

		r.Route("/user", func(r chi.Router) {
			r.Use(AuthMiddleware)
			r.Get("/profile", app.GetProfileHandler)
		})
	})

	return r
}

func (app *application) run(mux http.Handler) error {

	server := &http.Server{
		Addr:    app.config.addr,
		Handler: mux,
	}

	log.Printf("server has started at port %s", app.config.addr)

	return server.ListenAndServe()
}
