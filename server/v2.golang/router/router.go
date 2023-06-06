package router

import (
	"fmt"
	"kooperlingohr/portfolio/router/middleware"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/router/routes/cms"
	"kooperlingohr/portfolio/router/routes/forum"
	index "kooperlingohr/portfolio/router/routes/index"
	projects "kooperlingohr/portfolio/router/routes/projects"
	"net/http"
)

func SetupRouter() *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("/contact", middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(index.Contact))))
	mux.HandleFunc("/capture", middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(index.Capture))))
	mux.HandleFunc("/monitor", middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(index.Monitor))))

  cmsRoute := "cms"
	mux.HandleFunc(fmt.Sprintf("/%s/about", cmsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(cms.AboutPage))))
	mux.HandleFunc(fmt.Sprintf("/%s/contact", cmsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(cms.ContactPage))))
	mux.HandleFunc(fmt.Sprintf("/%s/fuelprices", cmsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(cms.FuelpricesPage))))
	mux.HandleFunc(fmt.Sprintf("/%s/home", cmsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(cms.HomePage))))
	mux.HandleFunc(fmt.Sprintf("/%s/jssimulator", cmsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(cms.JssimulatorPage))))
	mux.HandleFunc(fmt.Sprintf("/%s/minesweeper", cmsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(cms.MinesweeperPage))))
	mux.HandleFunc(fmt.Sprintf("/%s/mrna", cmsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(cms.MrnaPage))))
	mux.HandleFunc(fmt.Sprintf("/%s/projects", cmsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(cms.ProjectsPage))))
	mux.HandleFunc(fmt.Sprintf("/%s/property", cmsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(cms.PropertyPage))))
	mux.HandleFunc(fmt.Sprintf("/%s/randombio", cmsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(cms.RandombioPage))))
	mux.HandleFunc(fmt.Sprintf("/%s/secondary", cmsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(cms.SecondaryPage))))
	mux.HandleFunc(fmt.Sprintf("/%s/seqalign", cmsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(cms.SeqalignPage))))
	mux.HandleFunc(fmt.Sprintf("/%s/tictactoe", cmsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(cms.TictactoePage))))

	projectsRoute := "projects"
	mux.HandleFunc(fmt.Sprintf("/%s/property", projectsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(projects.Property))))
	mux.HandleFunc(fmt.Sprintf("/%s/fuelprices", projectsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(projects.Fuelprices))))
	mux.HandleFunc(fmt.Sprintf("/%s/seqalign", projectsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(projects.SeqAlign))))
	mux.HandleFunc(fmt.Sprintf("/%s/randombio", projectsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(projects.RandomBio))))
	mux.HandleFunc(fmt.Sprintf("/%s/secondary", projectsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(projects.Secondary))))
	mux.HandleFunc(fmt.Sprintf("/%s/mrna", projectsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(projects.Mrna))))
	mux.HandleFunc(fmt.Sprintf("/%s/siteanalysis", projectsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(projects.SiteAnalysis))))

	forumRoute := "forum"
	mux.HandleFunc(fmt.Sprintf("/%s", forumRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(middleware.TokenRequired(forum.Index)))))
	mux.HandleFunc(fmt.Sprintf("/%s/login", forumRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(forum.Login))))
	mux.HandleFunc(fmt.Sprintf("/%s/register", forumRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(forum.Register))))
	mux.HandleFunc(fmt.Sprintf("/%s/refresh", forumRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(forum.Refresh))))
	mux.HandleFunc(fmt.Sprintf("/%s/post", forumRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(middleware.TokenRequired(forum.Post)))))
	mux.HandleFunc(fmt.Sprintf("/%s/post/", forumRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(middleware.TokenRequired(forum.PostSearch)))))
	mux.HandleFunc(fmt.Sprintf("/%s/user/", forumRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(middleware.TokenRequired(forum.User)))))
	mux.HandleFunc(fmt.Sprintf("/%s/logout", forumRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(middleware.TokenRequired(forum.Logout)))))

	return mux
}
