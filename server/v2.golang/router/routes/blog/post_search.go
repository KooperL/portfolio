package blog

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

		lib.TrackBlogFunctionsCalled(decodedToken.Username, body.SessionID, fmt.Sprintf("/post/%d", postId))

		pullBlogQuery := `
		SELECT 
			blog_postsDB.id as id,
			blog_postsDB.date as date,
			blog_usersDB.blog_username as author,
			blog_postsDB.title as title,
			blog_postsDB.body as body,
			blog_postsDB.blog_user_id as author_id,
			blog_post_categoryDB.name as category
		from blog_postsDB
		INNER JOIN blog_post_categoryDB
			on blog_post_categoryDB.id = blog_postsDB.category_id
		INNER JOIN blog_usersDB
			on blog_usersDB.id = blog_postsDB.blog_user_id
		where
			blog_postsDB.id = ? and
			(blog_postsDB.visible = 1 or blog_postsDB.blog_user_id = ? or ? = true);`
		postRaw := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[types.BlogPostVerbose](pullBlogQuery, []interface{}{postId, decodedToken.UserID, (decodedToken.Role == 999)}))

		if len(postRaw) != 1 {
			// fail special, 206
		}

		pullBlogViewsQuery := "SELECT count(*) from blog_post_viewsDB where blog_post_id = ?;"
		pullBlogViews := database.SimpleQuery[int64](pullBlogViewsQuery, []interface{}{postId})

		resp := types.BlogPostResponseVerbose{
			Views: pullBlogViews + 1,
			BlogPostVerbose: types.BlogPostVerbose{
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

		addBlogViewQuery := `INSERT INTO blog_post_viewsDB VALUES (?, ?, ?, ?);`
		database.Insert(addBlogViewQuery, []interface{}{nil, dt, decodedToken.UserID, postId})

		return
	} else if r.Method == http.MethodGet {
	}
}
