package blog

import (
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/controllers/database"
	"kooperlingohr/portfolio/lib"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
)

func Register(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		now := time.Now()
		dt := now.Format(utils.GetTimeFormat())

		header := strings.Split(r.Header.Get("Authorization"), " ")
		if header[0] != "Basic" {
			responses.BuildUnauthorised(w)
			return
		}
		creds := strings.Split(utils.DecodeBase64(header[1]), ":")

		var body types.SessionId
		utils.ParseReqBody(r, &body)
		lib.TrackBlogFunctionsCalled(creds[0], body.SessionID, "register")

		blogUserExistsQuery := `
      SELECT 
        count(*)
      from blog_usersDB
      where
        lower(blog_username) = lower(?)
      limit 5;
    `

		// userSearchExists := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[int64](blogUserExistsQuery, []any{creds[0]}))
		userSearchExists := database.SimpleQuery[int64](blogUserExistsQuery, []any{creds[0]})
		if userSearchExists != 0 {
			responses.BuildUnauthorised(w)
			return
		}

		salt := utils.GenerateSalt(utils.HandleErrorDeconstruct(strconv.ParseInt(os.Getenv("blog-register-salt-length"), 10, 32)))
		hash := utils.PBKDF2(creds[1], salt, 1000, 32)

		insertBlogUserQuery := "INSERT INTO blog_usersDB VALUES (?, ?, ?, ?, ?, ?, ?, ?);"
		database.Insert(insertBlogUserQuery, []interface{}{nil, dt, strings.ToLower(creds[0]), hash, salt, 1, 1, 1})

		responses.BuildPlainSuccess(w)
		return
	} else {
	}
}
