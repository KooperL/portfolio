package blog

import (
	"fmt"
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/controllers/database"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
	"os"
	"time"
)

func Refresh(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {

		var accessTokenLife int
		fmt.Sscan(os.Getenv("blog-access-token-life"), &accessTokenLife)

		refresh_token := utils.HandleErrorDeconstruct(r.Cookie("refresh_token"))
		refresh_token_decoded, err := utils.DecodeJWTRefresh[types.RefreshToken](refresh_token.Value, os.Getenv("blog-jwt-refresh-token"))

		var body types.SessionId
		utils.ParseReqBody(r, &body)
		// lib.TrackBlogFunctionsCalled(_______, body.SessionID, "login")

		refreshTokenSearchQuery := "SELECT count(*) FROM blog_refresh_tokensDB where blog_refresh_token = ?"
		tokenRows := database.SimpleQuery[int64](refreshTokenSearchQuery, []any{refresh_token.Value})

		if tokenRows != 1 {
			responses.BuildUnauthorised(w)
			return
		}

		if err != nil {
			responses.BuildUnauthorised(w)
			return
		}

		userSearchQuery := "SELECT blog_username, role_id FROM blog_usersDB where id = ?"
		userSearchTraffic := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[database.BlogUsersSimpleDB](userSearchQuery, []any{refresh_token_decoded.UserID}))

		if len(userSearchTraffic) != 1 {
			responses.BuildUnauthorised(w)
			return
		}

		now := time.Now()
		// dt := now.Format(utils.GetTimeFormat())

		jwtAccessPayload := types.JWTbody{
			UserID:   refresh_token_decoded.UserID,
			Iat:      now.Unix(),
			Role:     userSearchTraffic[0].RoleID,
			Username: userSearchTraffic[0].Username,
			Exp:      fmt.Sprintf("%d", utils.TimeOffset(now, accessTokenLife)),
		}
		jwtAccess := utils.GenerateJWT(jwtAccessPayload, os.Getenv("blog-jwt-auth-token"))

		w.Header().Set("Access-Control-Allow-Credentials", "true")

		// database.Insert("DELETE from blog_refresh_tokensDB where blog_user_id = ?;", []interface{}{userSearchTraffic[0].ID})
		// database.Insert("INSERT INTO blog_refresh_tokensDB VALUES (?, ?, ?, ?);", []interface{}{nil, dt, userSearchTraffic[0].ID, jwtRefresh})

		responses.BuildBearerResp(w, jwtAccess, int(utils.TimeOffset(now, accessTokenLife)))
		return
	} else if r.Method == http.MethodGet {
	}
}
