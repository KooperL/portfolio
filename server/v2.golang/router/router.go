package router

import (
	"kooperlingohr/portfolio/router/middleware"
	routes "kooperlingohr/portfolio/router/routes/projects"
	"net/http"
)

func SetupRouter() *http.ServeMux {
	mux := http.NewServeMux()
	// mux.HandleFunc("/hello", middleware.CatchErrors(routes.Hello))
	mux.HandleFunc("/projects/randombio", middleware.CatchErrors(routes.RandomBio))
	mux.HandleFunc("/project/secondary", middleware.CatchErrors(routes.Secondary))
	return mux
}
