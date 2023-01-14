package forum

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
		// Rest of this is done, thing is called with {{forumPath}}/user/{{forum_test_username}}?session_id={{test_session_id}}
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
		lower(forum_users.forum_username) = ? and
		(forum_posts.visible = 1 or forum_posts.forum_user_id = ? or ? = true);`
		postRaw := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[types.BlogPostVerbose](pullBlogQuery, []interface{}{strings.ToLower(userSearched), decodedToken.UserID, (decodedToken.Role == 999)}))
		var posts []types.BlogPostResponseVerbose

		if len(postRaw) != 1 {
			// fail special, 206
		}

		for _, v := range postRaw {
			pullBlogViewsQuery := "SELECT count(*) from forum_post_views where forum_post_id = ?;"
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
