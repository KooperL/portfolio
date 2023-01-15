package forum

import (
	"fmt"
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/controllers/database"
	"kooperlingohr/portfolio/lib"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
	"strconv"
	"strings"
	"time"
)

func PostSearch(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		urlComponents := strings.Split(r.URL.Path, "/")
		matches := urlComponents[(len(urlComponents))-1]
		fmt.Println("test")
		// re := regexp.MustCompile(`^.*\/([0-9]+)$`)
		// matches := re.FindStringSubmatch(r.URL.Path)
		// fmt.Println(matches)
		fmt.Println("test")

		// fmt.Println(routeVar)
		if len(matches) < 1 {
			// fail
		}

		postId := utils.HandleErrorDeconstruct(strconv.ParseInt(matches, 10, 16))

		decodedToken := r.Context().Value("decodedToken").(types.JWTbody)
		var body types.SessionId
		utils.ParseReqBody(r, &body)

		lib.TrackForumFunctionsCalled(decodedToken.Username, body.SessionID, fmt.Sprintf("/post/%d", postId))

		pullForumQuery := `
		SELECT 
			forum_posts.id as id,
			forum_posts.date as date,
			forum_users.forum_username as author,
			forum_posts.title as title,
			forum_posts.body as body,
			forum_posts.forum_user_id as author_id,
			forum_post_category.name as category
		from forum_posts
		INNER JOIN forum_post_category
			on forum_post_category.id = forum_posts.category_id
		INNER JOIN forum_users
			on forum_users.id = forum_posts.forum_user_id
		where
			forum_posts.id = ? and
			(forum_posts.visible = 1 or forum_posts.forum_user_id = ? or ? = true);`
		postRaw := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[types.ForumPostVerbose](pullForumQuery, []interface{}{postId, decodedToken.UserID, (decodedToken.Role == 999)}))

		if len(postRaw) != 1 {
			// fail special, 206
		}

		pullForumViewsQuery := "SELECT count(*) from forum_post_views where forum_post_id = ?;"
		pullForumViews := database.SimpleQuery[int64](pullForumViewsQuery, []interface{}{postId})

		resp := types.ForumPostResponseVerbose{
			Views: pullForumViews + 1,
			ForumPostVerbose: types.ForumPostVerbose{
				ID:       postRaw[0].ID,
				Date:     postRaw[0].Date,
				Author:   postRaw[0].Author,
				Title:    postRaw[0].Title,
				Body:     postRaw[0].Body,
				AuthorID: postRaw[0].AuthorID,
				Category: postRaw[0].Category,
			},
		}
		responses.BuildSuccessResponse(w, resp)

		now := time.Now()
		dt := now.Format(utils.GetTimeFormat())

		addForumViewQuery := `INSERT INTO forum_post_views VALUES (?, ?, ?, ?);`
		database.Insert(addForumViewQuery, []interface{}{nil, dt, decodedToken.UserID, postId})

		return
	} else if r.Method == http.MethodGet {
	}
}
