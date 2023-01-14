package router

import (
	"fmt"
	"kooperlingohr/portfolio/router/middleware"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/router/routes/forum"
	index "kooperlingohr/portfolio/router/routes/index"
	projects "kooperlingohr/portfolio/router/routes/projects"
	"net/http"
)

func SetupRouter() *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("/", middleware.CatchErrors(responses.BuildPreflight(index.Home)))
	mux.HandleFunc("/about", middleware.CatchErrors(responses.BuildPreflight(index.About)))
	mux.HandleFunc("/contact", middleware.CatchErrors(responses.BuildPreflight(index.Contact)))
	mux.HandleFunc("/capture", middleware.CatchErrors(responses.BuildPreflight(index.Capture)))

	projectsRoute := "projects"
	mux.HandleFunc(fmt.Sprintf("/%s", projectsRoute), middleware.CatchErrors(responses.BuildPreflight(projects.Index)))
	mux.HandleFunc(fmt.Sprintf("/%s/fuelprices", projectsRoute), middleware.CatchErrors(responses.BuildPreflight(projects.Fuelprices)))
	mux.HandleFunc(fmt.Sprintf("/%s/seqalign", projectsRoute), middleware.CatchErrors(responses.BuildPreflight(projects.SeqAlign)))
	mux.HandleFunc(fmt.Sprintf("/%s/randombio", projectsRoute), middleware.CatchErrors(responses.BuildPreflight(projects.RandomBio)))
	mux.HandleFunc(fmt.Sprintf("/%s/secondary", projectsRoute), middleware.CatchErrors(responses.BuildPreflight(projects.Secondary)))
	mux.HandleFunc(fmt.Sprintf("/%s/mrna", projectsRoute), middleware.CatchErrors(responses.BuildPreflight(projects.Mrna)))

	forumRoute := "forum"
	mux.HandleFunc(fmt.Sprintf("/%s", forumRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.TokenRequired(forum.Index))))
	mux.HandleFunc(fmt.Sprintf("/%s/login", forumRoute), middleware.CatchErrors(responses.BuildPreflight(forum.Login)))
	mux.HandleFunc(fmt.Sprintf("/%s/register", forumRoute), middleware.CatchErrors(responses.BuildPreflight(forum.Register)))
	mux.HandleFunc(fmt.Sprintf("/%s/refresh", forumRoute), middleware.CatchErrors(responses.BuildPreflight(forum.Refresh)))
	mux.HandleFunc(fmt.Sprintf("/%s/post", forumRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.TokenRequired(forum.Post))))
	mux.HandleFunc(fmt.Sprintf("/%s/post/", forumRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.TokenRequired(forum.PostSearch))))
	mux.HandleFunc(fmt.Sprintf("/%s/user/", forumRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.TokenRequired(forum.User))))
	mux.HandleFunc(fmt.Sprintf("/%s/logout", forumRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.TokenRequired(forum.User))))

	return mux
}
