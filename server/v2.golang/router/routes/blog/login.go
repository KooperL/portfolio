package blog

import (
	"bytes"
	"fmt"
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/controllers/database"
	"kooperlingohr/portfolio/lib"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
	"os"
	"strings"
	"time"
)

func Login(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		var accessTokenLife, refreshTokenLife int
		fmt.Sscan(os.Getenv("blog-access-token-life"), &accessTokenLife)
		fmt.Sscan(os.Getenv("blog-refresh-token-life"), &refreshTokenLife)

		header := strings.Split(r.Header.Get("Authorization"), " ")
		if header[0] != "Basic" {
			responses.BuildUnauthorised(w)
			return
		}
		creds := strings.Split(utils.DecodeBase64(header[1]), ":")

		var body types.SessionId
		utils.ParseReqBody(r, &body)
		lib.TrackBlogFunctionsCalled(creds[0], body.SessionID, "login")

		userSearchQuery := "SELECT id, blog_password_hash, blog_password_salt, role_id FROM blog_usersDB where blog_username = ?"
		userSearchTraffic := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[database.BlogUsersDB](userSearchQuery, []any{strings.ToLower(creds[0])}))

		if len(userSearchTraffic) != 1 {
			responses.BuildUnauthorised(w)
			return
		}

		externalHash := utils.PBKDF2(creds[1], userSearchTraffic[0].BlogPasswordSalt, 1000, 32)

		res := bytes.Compare(externalHash, userSearchTraffic[0].BlogPasswordHash)

		if res != 0 {
			responses.BuildUnauthorised(w)
			return
		}

		now := time.Now()
		dt := now.Format(utils.GetTimeFormat())

		jwtAccessPayload := types.JWTbody{
			UserID:   userSearchTraffic[0].ID,
			Iat:      now.Unix(),
			Role:     userSearchTraffic[0].RoleID,
			Username: creds[0],
			Exp:      fmt.Sprintf("%d", utils.TimeOffset(now, accessTokenLife)),
		}
		jwtAccess := utils.GenerateJWT(jwtAccessPayload, os.Getenv("blog-jwt-auth-token"))

		jwtRefreshPayload := types.RefreshToken{
			UserID: userSearchTraffic[0].ID,
			Exp:    fmt.Sprintf("%d", utils.TimeOffset(now, refreshTokenLife)),
		}

		jwtRefresh := utils.GenerateJWT(jwtRefreshPayload, os.Getenv("blog-jwt-refresh-token"))

		cookie := &http.Cookie{
			Name:     "refresh_token",
			Value:    jwtRefresh,
			Path:     "/",
			MaxAge:   int(utils.TimeOffset(now, refreshTokenLife)),
			HttpOnly: true,
		}
		http.SetCookie(w, cookie)
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		database.Insert("DELETE from blog_refresh_tokensDB where blog_user_id = ?;", []interface{}{userSearchTraffic[0].ID})
		database.Insert("INSERT INTO blog_refresh_tokensDB VALUES (?, ?, ?, ?);", []interface{}{nil, dt, userSearchTraffic[0].ID, jwtRefresh})

		responses.BuildBearerResp(w, jwtAccess, int(utils.TimeOffset(now, accessTokenLife)))
		return
	} else if r.Method == http.MethodGet {
	}
}
