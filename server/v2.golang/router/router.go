package router

import (
	"kooperlingohr/portfolio/router/middleware"
	"kooperlingohr/portfolio/router/routes"
	"net/http"
)

func SetupRouter() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("/hello", middleware.CatchErrors(routes.Hello))
	mux.HandleFunc("/randombio", middleware.CatchErrors(routes.RandomBio))
	mux.HandleFunc("/secondary", middleware.CatchErrors(routes.Secondary))
	return mux
}
