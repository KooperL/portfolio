package cms

import (
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
)

func ProjectsPage(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		var res CMSPage
		utils.OpenAndParseJSONFile("../data/responses/projectsPage.json", &res)
		responses.BuildSuccessResponse(w, res)
	}
}
