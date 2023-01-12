package blog

import (
	"fmt"
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/controllers/database"
	"kooperlingohr/portfolio/controllers/discord"
	"kooperlingohr/portfolio/lib"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
	"os"
	"time"
)

func Post(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		decodedToken := r.Context().Value("decodedToken").(types.JWTbody)
		var body types.PostBlog
		utils.ParseReqBody(r, &body)

		lib.TrackBlogFunctionsCalled(decodedToken.Username, body.SessionID, "post")

		validatePermsQuery := "SELECT canPost from blog_roleDB where id = ?;"
		canPost := database.SimpleQuery[int64](validatePermsQuery, []interface{}{decodedToken.Role})

		if canPost != 1 {
			// fail
		}
		now := time.Now()
		dt := now.Format(utils.GetTimeFormat())

		publishBlogQuery := "INSERT INTO blog_postsDB VALUES (?, ?, ?, ?, ?, ?, ?, ?);"
		database.Insert(publishBlogQuery, []interface{}{nil, dt, decodedToken.UserID, body.Data.BlogTitle, 1, body.Data.BlogBody, 1, 0})
		discord.SendDiscordMessage(os.Getenv("DISCORD_WEBHOOK_URL"), fmt.Sprintf("%s,\n%s", body.SessionID, body.Data.BlogTitle))

		publishedBlogIdQuery := "SELECT id from blog_postsDB where blog_user_id = ? and title = ? and  body = ?;"
		publishedBlogId := database.SimpleQuery[int64](publishedBlogIdQuery, []interface{}{decodedToken.UserID, body.Data.BlogTitle, body.Data.BlogBody})

		responses.BuildSuccessResponse(w, struct {
			BlogPostId int64 `json:"blogPostId"`
		}{BlogPostId: publishedBlogId})
		return
	} else if r.Method == http.MethodGet {
	}
}
