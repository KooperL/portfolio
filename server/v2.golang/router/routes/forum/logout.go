package forum

import (
	"fmt"
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/controllers/database"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
	"os"
)

func Logout(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {

		var accessTokenLife int
		fmt.Sscan(os.Getenv("forum-access-token-life"), &accessTokenLife)

		refresh_token := utils.HandleErrorDeconstruct(r.Cookie("refresh_token"))
		refresh_token_decoded, err := utils.DecodeJWTRefresh[types.RefreshToken](refresh_token.Value, os.Getenv("forum-jwt-refresh-token"))

		if err != nil {
			responses.BuildUnauthorised(w)
		}

		refreshTokenSearchQuery := "SELECT count(*) FROM forum_refresh_tokens where forum_refresh_token = ?"
		tokenRows := database.SimpleQuery[int64](refreshTokenSearchQuery, []any{refresh_token.Value})

		if tokenRows != 1 {
			responses.BuildUnauthorised(w)
			return
		}

		userSearchQuery := "DELETE from forum_refresh_tokens where forum_user_id = ?;"
		userSearchTraffic := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[database.ForumUsersSimpleDB](userSearchQuery, []any{refresh_token_decoded.UserID}))

		if len(userSearchTraffic) != 1 {
			responses.BuildUnauthorised(w)
			return
		}

		cookie := &http.Cookie{
			Name:     "refresh_token",
			Value:    "",
			Path:     "/",
			MaxAge:   0,
			HttpOnly: true,
		}
		http.SetCookie(w, cookie)
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		responses.BuildPlainSuccess(w, 200)
		return
	} else if r.Method == http.MethodGet {
	}
}
