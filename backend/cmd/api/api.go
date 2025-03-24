package api

import (
	"haulassist_backend/internal/repository"
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

type Application struct {
	Config Config
	Store  repository.Storage
}

type Config struct {
	Addr string
	Db   DbConfig
}

type DbConfig struct {
	Addr         string
	MaxOpenConns int
	MaxIdleConns int
	MaxIdleTime  string
}

func (app *Application) Mount() http.Handler {
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
		r.Get("/location", GetCoordinatesHandler)

		r.Route("/user", func(r chi.Router) {
			r.Use(AuthMiddleware)
			r.Get("/profile", app.GetProfileHandler)
		})

		r.Route("/cargo", func(r chi.Router) {
			r.Post("/addCargo", app.CreateCargoHandler)
			r.Get("/{cargo_id}", app.GetCargoByIDHandler)
			r.Put("/{cargo_id}", app.UpdateCargoHandler)
			r.Delete("/{cargo_id}", app.DeleteCargoByIDHandler)
		})
	})

	return r
}

func (app *Application) Run(mux http.Handler) error {

	server := &http.Server{
		Addr:    app.Config.Addr,
		Handler: mux,
	}

	log.Printf("server has started at port %s", app.Config.Addr)

	return server.ListenAndServe()
}
