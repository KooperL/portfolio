package index

import (
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
)

func About(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		var res []types.PagePopulateNode
		utils.OpenAndParseJSONFile("../data/responses/aboutPage.json", &res)
		responses.BuildSuccessResponse(w, res)
	}
}
