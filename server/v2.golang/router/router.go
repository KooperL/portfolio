package router

import (
	"fmt"
	"kooperlingohr/portfolio/router/middleware"
	index "kooperlingohr/portfolio/router/routes/index"
	projects "kooperlingohr/portfolio/router/routes/projects"
	"net/http"
)

func SetupRouter() *http.ServeMux {
	mux := http.NewServeMux()

	projectsRoute := "projects"

	mux.HandleFunc("/", middleware.CatchErrors(index.Home))
	mux.HandleFunc("/contact", middleware.CatchErrors(index.Contact))

	mux.HandleFunc(fmt.Sprintf("/%s/", projectsRoute), middleware.CatchErrors(projects.Index))
	mux.HandleFunc(fmt.Sprintf("/%s/fuelprices", projectsRoute), middleware.CatchErrors(projects.Fuelprices))
	mux.HandleFunc(fmt.Sprintf("/%s/seqalign", projectsRoute), middleware.CatchErrors(projects.SeqAlign))
	mux.HandleFunc(fmt.Sprintf("/%s/randombio", projectsRoute), middleware.CatchErrors(projects.RandomBio))
	mux.HandleFunc(fmt.Sprintf("/%s/secondary", projectsRoute), middleware.CatchErrors(projects.Secondary))
	mux.HandleFunc(fmt.Sprintf("/%s/mrna", projectsRoute), middleware.CatchErrors(projects.Mrna))

	return mux
}
