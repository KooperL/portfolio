package cms 

import (
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
)

func MinesweeperPage(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		var res []types.PagePopulateNode
		utils.OpenAndParseJSONFile("../data/responses/minesweeperPage.json", &res)
		responses.BuildSuccessResponse(w, res)
	}
}
