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

	mux.HandleFunc("/", middleware.CatchErrors(middleware.BuildPreflight(index.Home)))
	mux.HandleFunc("/about", middleware.CatchErrors(middleware.BuildPreflight(index.About)))
	mux.HandleFunc("/contact", middleware.CatchErrors(middleware.BuildPreflight(index.Contact)))
	mux.HandleFunc("/capture", middleware.CatchErrors(middleware.BuildPreflight(index.Capture)))

	mux.HandleFunc(fmt.Sprintf("/%s/", projectsRoute), middleware.CatchErrors(middleware.BuildPreflight(projects.Index)))
	mux.HandleFunc(fmt.Sprintf("/%s/fuelprices", projectsRoute), middleware.CatchErrors(middleware.BuildPreflight(projects.Fuelprices)))
	mux.HandleFunc(fmt.Sprintf("/%s/seqalign", projectsRoute), middleware.CatchErrors(middleware.BuildPreflight(projects.SeqAlign)))
	mux.HandleFunc(fmt.Sprintf("/%s/randombio", projectsRoute), middleware.CatchErrors(middleware.BuildPreflight(projects.RandomBio)))
	mux.HandleFunc(fmt.Sprintf("/%s/secondary", projectsRoute), middleware.CatchErrors(middleware.BuildPreflight(projects.Secondary)))
	mux.HandleFunc(fmt.Sprintf("/%s/mrna", projectsRoute), middleware.CatchErrors(middleware.BuildPreflight(projects.Mrna)))

	return mux
}
