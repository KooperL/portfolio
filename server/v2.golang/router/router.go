package router

import (
	"fmt"
	"kooperlingohr/portfolio/router/middleware"
	"kooperlingohr/portfolio/router/middleware/responses"
	index "kooperlingohr/portfolio/router/routes/index"
	projects "kooperlingohr/portfolio/router/routes/projects"
	"net/http"
)

func SetupRouter() *http.ServeMux {
	mux := http.NewServeMux()

	projectsRoute := "projects"

	mux.HandleFunc("/", middleware.CatchErrors(responses.BuildPreflight(index.Home)))
	mux.HandleFunc("/about", middleware.CatchErrors(responses.BuildPreflight(index.About)))
	mux.HandleFunc("/contact", middleware.CatchErrors(responses.BuildPreflight(index.Contact)))
	mux.HandleFunc("/capture", middleware.CatchErrors(responses.BuildPreflight(index.Capture)))

	mux.HandleFunc(fmt.Sprintf("/%s", projectsRoute), middleware.CatchErrors(responses.BuildPreflight(projects.Index)))
	mux.HandleFunc(fmt.Sprintf("/%s/fuelprices", projectsRoute), middleware.CatchErrors(responses.BuildPreflight(projects.Fuelprices)))
	mux.HandleFunc(fmt.Sprintf("/%s/seqalign", projectsRoute), middleware.CatchErrors(responses.BuildPreflight(projects.SeqAlign)))
	mux.HandleFunc(fmt.Sprintf("/%s/randombio", projectsRoute), middleware.CatchErrors(responses.BuildPreflight(projects.RandomBio)))
	mux.HandleFunc(fmt.Sprintf("/%s/secondary", projectsRoute), middleware.CatchErrors(responses.BuildPreflight(projects.Secondary)))
	mux.HandleFunc(fmt.Sprintf("/%s/mrna", projectsRoute), middleware.CatchErrors(responses.BuildPreflight(projects.Mrna)))

	return mux
}
