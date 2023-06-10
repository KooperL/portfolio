package cms 

import (
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
)

func PropertyPage(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		var res types.CMSPage
		utils.OpenAndParseJSONFile("../data/responses/propertyPage.json", &res)
		responses.BuildSuccessResponse(w, res)
	}
}
