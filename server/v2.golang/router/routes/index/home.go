package index

import (
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
)

func Home(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		var res []types.PagePopulateNode
		utils.OpenAndParseJSONFile("../data/responses/homePage.json", &res)
		// res := []types.PagePopulateNode{
		// 	{
		// 		Data: []string{"Hi 👋 I'm Kooper, welcome to my website."},
		// 		Type: "header",
		// 	},
		// 	{
		// 		Data: []string{"/projects"},
		// 		Text: "/projects",
		// 		Type: "button",
		// 	},
		// 	{
		// 		Data: []string{"/contact"},
		// 		Text: "/contact",
		// 		Type: "button",
		// 	},
		// 	{
		// 		Data: []string{"/about"},
		// 		Text: "/about",
		// 		Type: "button",
		// 	},
		// 	{
		// 		Data: []string{"/forum"},
		// 		Text: "/forum",
		// 		Type: "button",
		// 	},
		// }

		responses.BuildSuccessResponse(w, res)
	}
}
