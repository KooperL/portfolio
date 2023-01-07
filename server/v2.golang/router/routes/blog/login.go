package blog

import (
	"fmt"
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/controllers/database"
	"kooperlingohr/portfolio/lib"
	"kooperlingohr/portfolio/utils"
	"net/http"
	"os"
	"strings"
)

func Login(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		var accessTokenLife, refreshTokenLife int
		fmt.Sscan(os.Getenv("blog-access-token-life"), &accessTokenLife)
		fmt.Sscan(os.Getenv("blog-refresh-token-life"), &refreshTokenLife)

		header := strings.Split(r.Header.Get("Authorization"), " ")
		if header[0] != "Basic" {
			// fail
		}
		creds := strings.Split(utils.DecodeBase64(header[1]), ":")

		var body types.SessionId
		utils.ParseReqBody(r, &body)
		lib.TrackBlogFunctionsCalled(creds[0], body.SessionID, "login")

		userSearchQuery := "SELECT id, blog_password_hash, blog_password_salt, role_id FROM blog_usersDB where blog_username = ?"
		userSearchTraffic := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[database.BlogUsersDB](userSearchQuery, []any{creds[0]}))

		if len(userSearchTraffic) != 1 {
			// fail
		}

	} else if r.Method == http.MethodGet {
	}
}
