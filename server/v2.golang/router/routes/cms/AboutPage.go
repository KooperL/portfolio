package cms 

import (
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
)

func AboutPage(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		var res types.CMSPage
		utils.OpenAndParseJSONFile("../data/responses/aboutPage.json", &res)
		responses.BuildSuccessResponse(w, res)
	}
}
