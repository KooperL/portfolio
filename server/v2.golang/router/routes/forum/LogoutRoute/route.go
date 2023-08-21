package ForumLogoutRoute

import (
	"fmt"
	"kooperlingohr/portfolio/controllers/database"
	"kooperlingohr/portfolio/router/middleware/responses"
	ForumRoute "kooperlingohr/portfolio/router/routes/forum"
	"kooperlingohr/portfolio/utils"
	"net/http"
	"os"
)

func Route(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {

		var accessTokenLife int
		fmt.Sscan(os.Getenv("forum-access-token-life"), &accessTokenLife)

		refresh_token := utils.HandleErrorDeconstruct(r.Cookie("refresh_token"))
		refresh_token_decoded, err := utils.DecodeJWTRefresh[ForumRoute.RefreshToken](refresh_token.Value, os.Getenv("forum-jwt-refresh-token"))

		fmt.Println(refresh_token.Value, refresh_token_decoded, err)

		if err != nil {
			responses.BuildUnauthorised(w)
			return
		}

		refreshTokenSearchQuery := "SELECT count(*) FROM forum_refresh_tokens where forum_refresh_token = ?"
		tokenRows := database.SimpleQuery[int64](refreshTokenSearchQuery, []any{refresh_token.Value})

		fmt.Println(tokenRows)

		if tokenRows != 1 {
			responses.BuildUnauthorised(w)
			return
		}

		userSearchQuery := "DELETE from forum_refresh_tokens where forum_user_id = ?;"
		userSearchTraffic := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[ForumRoute.ForumUsersSimpleDB](userSearchQuery, []any{refresh_token_decoded.UserID}))

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
