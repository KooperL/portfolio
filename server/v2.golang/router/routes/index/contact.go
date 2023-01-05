package index

import (
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/router/middleware"
	"net/http"
)

func Contact(w http.ResponseWriter, r *http.Request) {

	res := []types.PagePopulateNode{
		{
			Data: []string{"😵‍💫"},
			Type: "emoji",
		},
		{
			Data: []string{"Aw, snap! Something went wrong..."},
			Type: "subheader",
		},
		{
			Data: []string{"You should probably contact me to let me know you found this error. My preferred method of contact is LinkedIn:"},
			Type: "body",
		},
		{
			Data: []string{"https://www.linkedin.com/in/kooper/"},
			Text: "LinkedIn",
			Type: "button",
		},
		{
			Data: []string{"Alternatively, leave an anonymous message. If you're expecting a reply though, be sure to include your email too."},
			Type: "body",
		},
	}

	middleware.BuildSuccessResponse(w, res)
}
