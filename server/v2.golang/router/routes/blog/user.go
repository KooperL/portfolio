package blog

import (
	"fmt"
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/controllers/database"
	"kooperlingohr/portfolio/lib"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
	"regexp"
	"strings"
)

func User(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		// Rest of this is done, thing is called with {{blogPath}}/user/{{blog_test_username}}?session_id={{test_session_id}}
		// Need a way to parse the username from the url or otherwise refactor TS code to send as payload
		// return

		re := regexp.MustCompile(`.*/([^/?]+)`)
		matches := re.FindStringSubmatch(r.URL.Path)

		// fmt.Println(routeVar)
		if len(matches) < 1 {
			// fail
		}

		userSearched := matches[1]

		decodedToken := r.Context().Value("decodedToken").(types.JWTbody)
		params := r.URL.Query()
		if params.Get("session_id") == "" {
			responses.BuildUnauthorised(w)
			return
		}

		lib.TrackBlogFunctionsCalled(decodedToken.Username, params.Get("session_id"), fmt.Sprintf("/post/%s", userSearched))

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
		lower(blog_usersDB.blog_username) = ? and
		(blog_postsDB.visible = 1 or blog_postsDB.blog_user_id = ? or ? = true);`
		postRaw := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[types.BlogPostVerbose](pullBlogQuery, []interface{}{strings.ToLower(userSearched), decodedToken.UserID, (decodedToken.Role == 999)}))
		fmt.Println(postRaw)
		var posts []types.BlogPostResponseVerbose

		if len(postRaw) != 1 {
			// fail special, 206
		}
		fmt.Println("matches")

		for _, v := range postRaw {
			pullBlogViewsQuery := "SELECT count(*) from blog_post_viewsDB where blog_post_id = ?;"
			pullBlogViews := database.SimpleQuery[int64](pullBlogViewsQuery, []interface{}{v.ID})

			resp := types.BlogPostResponseVerbose{
				Views: pullBlogViews + 1,
				BlogPostVerbose: types.BlogPostVerbose{
					ID:       v.ID,
					Date:     v.Date,
					Author:   v.Author,
					Title:    v.Title,
					Body:     v.Body,
					AuthorID: v.AuthorID,
					Category: v.Category,
				},
			}
			posts = append(posts, resp)
		}

		responses.BuildSuccessResponse(w, posts)

		return
	} else if r.Method == http.MethodPost {
	}
}
