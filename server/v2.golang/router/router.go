package router

import (
	"fmt"
	"kooperlingohr/portfolio/router/middleware"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/router/routes/cms"
	ForumRoute "kooperlingohr/portfolio/router/routes/forum/IndexRoute"
	ForumLoginRoute "kooperlingohr/portfolio/router/routes/forum/LoginRoute"
	ForumLogoutRoute "kooperlingohr/portfolio/router/routes/forum/LogoutRoute"
	ForumPostRoute "kooperlingohr/portfolio/router/routes/forum/PostRoute"
	ForumPostSearchRoute "kooperlingohr/portfolio/router/routes/forum/PostSearchRoute"
	ForumRefreshRoute "kooperlingohr/portfolio/router/routes/forum/RefreshRoute"
	ForumRegisterRoute "kooperlingohr/portfolio/router/routes/forum/RegisterRoute"
	ForumUserRoute "kooperlingohr/portfolio/router/routes/forum/UserRoute"
	"kooperlingohr/portfolio/router/routes/index/CaptureRoute"
	"kooperlingohr/portfolio/router/routes/index/ContactRoute"
	"kooperlingohr/portfolio/router/routes/index/MonitorRoute"
	ProjectsFuelpricesRoute "kooperlingohr/portfolio/router/routes/projects/FuelpricesRoute"
	ProjectsMrnaRoute "kooperlingohr/portfolio/router/routes/projects/MrnaRoute"
	ProjectsPropertyRoute "kooperlingohr/portfolio/router/routes/projects/PropertyRoute"
	ProjectsRandombioRoute "kooperlingohr/portfolio/router/routes/projects/RandomBioRoute"
	ProjectsSecondaryRoute "kooperlingohr/portfolio/router/routes/projects/SecondaryRoute"
	ProjectsSeqalignRoute "kooperlingohr/portfolio/router/routes/projects/SeqAlignRoute"
	ProjectsSiteanalysisRoute "kooperlingohr/portfolio/router/routes/projects/SiteAnalysisRoute"
	"net/http"
)

func SetupRouter() *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("/contact", middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(ContactRoute.Route))))
	mux.HandleFunc("/capture", middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(CaptureRoute.Route))))
	mux.HandleFunc("/monitor", middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(MonitorRoute.Route))))

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

	ProjectsRoute := "projects"
	mux.HandleFunc(fmt.Sprintf("/%s/property", ProjectsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(ProjectsPropertyRoute.Route))))
	mux.HandleFunc(fmt.Sprintf("/%s/fuelprices", ProjectsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(ProjectsFuelpricesRoute.Route))))
	mux.HandleFunc(fmt.Sprintf("/%s/seqalign", ProjectsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(ProjectsSeqalignRoute.Route))))
	mux.HandleFunc(fmt.Sprintf("/%s/randombio", ProjectsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(ProjectsRandombioRoute.Route))))
	mux.HandleFunc(fmt.Sprintf("/%s/secondary", ProjectsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(ProjectsSecondaryRoute.Route))))
	mux.HandleFunc(fmt.Sprintf("/%s/mrna", ProjectsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(ProjectsMrnaRoute.Route))))
	mux.HandleFunc(fmt.Sprintf("/%s/siteanalysis", ProjectsRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(ProjectsSiteanalysisRoute.Route))))

	forumRoute := "forum"
	mux.HandleFunc(fmt.Sprintf("/%s", forumRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(middleware.TokenRequired(ForumRoute.Route)))))
	mux.HandleFunc(fmt.Sprintf("/%s/login", forumRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(ForumLoginRoute.Route))))
	mux.HandleFunc(fmt.Sprintf("/%s/register", forumRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(ForumRegisterRoute.Route))))
	mux.HandleFunc(fmt.Sprintf("/%s/refresh", forumRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(ForumRefreshRoute.Route))))
	mux.HandleFunc(fmt.Sprintf("/%s/post", forumRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(middleware.TokenRequired(ForumPostRoute.Route)))))
	mux.HandleFunc(fmt.Sprintf("/%s/post/", forumRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(middleware.TokenRequired(ForumPostSearchRoute.Route)))))
	mux.HandleFunc(fmt.Sprintf("/%s/user/", forumRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(middleware.TokenRequired(ForumUserRoute.Route)))))
	mux.HandleFunc(fmt.Sprintf("/%s/logout", forumRoute), middleware.CatchErrors(responses.BuildPreflight(middleware.RateLimit(middleware.TokenRequired(ForumLogoutRoute.Route)))))

	return mux
}
