package ForumPostRoute

import (
	"fmt"
	types "kooperlingohr/portfolio/Types"
  ForumRoute "kooperlingohr/portfolio/router/routes/forum"
	"kooperlingohr/portfolio/controllers/database"
	"kooperlingohr/portfolio/controllers/discord"
	"kooperlingohr/portfolio/lib"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
	"os"
	"time"
)

func Route(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		decodedToken := r.Context().Value("decodedToken").(ForumRoute.JWTbody)
		var body types.PostForum
		utils.ParseReqBody(r, &body)

		lib.TrackForumFunctionsCalled(decodedToken.Username, body.SessionID, "post")

		validatePermsQuery := "SELECT canPost from forum_role where id = ?;"
		canPost := database.SimpleQuery[int64](validatePermsQuery, []interface{}{decodedToken.Role})

		if canPost != 1 {
			responses.BuildUnauthorised(w)
		}
		now := time.Now()
		dt := now.Format(utils.GetTimeFormat())

		publishForumQuery := "INSERT INTO forum_posts VALUES (?, ?, ?, ?, ?, ?, ?, ?);"
		database.Insert(publishForumQuery, []interface{}{nil, dt, decodedToken.UserID, body.Data.ForumTitle, 1, body.Data.ForumBody, 1, 0})
		discord.SendDiscordMessage(os.Getenv("DISCORD_WEBHOOK_URL"), fmt.Sprintf("%s,\n%s", body.SessionID, body.Data.ForumTitle))

		publishedForumIdQuery := "SELECT id from forum_posts where forum_user_id = ? and title = ? and  body = ?;"
		publishedForumId := database.SimpleQuery[int64](publishedForumIdQuery, []interface{}{decodedToken.UserID, body.Data.ForumTitle, body.Data.ForumBody})

		responses.BuildSuccessResponse(w, struct {
			ForumPostId int64 `json:"forumPostId"`
		}{ForumPostId: publishedForumId})
		return
	} else if r.Method == http.MethodGet {
	}
}
