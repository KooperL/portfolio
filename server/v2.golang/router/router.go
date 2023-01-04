package router

import (
	"kooperlingohr/portfolio/router/middleware"
	routes "kooperlingohr/portfolio/router/routes/projects"
	"net/http"
)

func SetupRouter() *http.ServeMux {
	mux := http.NewServeMux()
	// mux.HandleFunc("/hello", middleware.CatchErrors(routes.Hello))
	mux.HandleFunc("/projects/seqalign", middleware.CatchErrors(routes.SeqAlign))
	mux.HandleFunc("/projects/randombio", middleware.CatchErrors(routes.RandomBio))
	mux.HandleFunc("/projects/secondary", middleware.CatchErrors(routes.Secondary))
	mux.HandleFunc("/projects/mrna", middleware.CatchErrors(routes.Mrna))
	return mux
}
