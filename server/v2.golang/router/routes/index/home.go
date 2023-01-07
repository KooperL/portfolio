package index

import (
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/router/middleware"
	"net/http"
)

func Home(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		res := []types.PagePopulateNode{
			{
				Data: []string{"Hi 👋 I'm Kooper, welcome to my website."},
				Type: "header",
			},
			{
				Data: []string{"/projects"},
				Text: "/projects",
				Type: "button",
			},
			{
				Data: []string{"/contact"},
				Text: "/contact",
				Type: "button",
			},
			{
				Data: []string{"/about"},
				Text: "/about",
				Type: "button",
			},
			{
				Data: []string{"/blog"},
				Text: "/blog",
				Type: "button",
			},
		}

		middleware.BuildSuccessResponse(w, res)
	}
}
