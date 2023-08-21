package cms

import (
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
)

func SecondaryPage(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		var res CMSPage
		utils.OpenAndParseJSONFile("../data/responses/secondaryPage.json", &res)
		responses.BuildSuccessResponse(w, res)
	}
}
