package blog

import (
	"encoding/json"
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/controllers/database"
	"kooperlingohr/portfolio/lib"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
	"strings"
)

func Index(w http.ResponseWriter, r *http.Request) {
	decodedToken := r.Context().Value("decodedToken").(string)
	var jwtDecoded types.JWTbody
	reader := strings.NewReader(decodedToken)
	utils.HandleErrorVar(json.NewDecoder(reader).Decode(&jwtDecoded))

	// now := time.Now()
	// dt := now.Format(utils.GetTimeFormat())

	params := types.BlogIndex{}
	utils.ParseReqParams(r.URL.Query(), &params)
	if params.SessionID == "" {
		responses.BuildUnauthorised(w)
		return
	}

	lib.TrackBlogFunctionsCalled(jwtDecoded.Username, params.SessionID, "register")

	if params.Category != "" {
		categoryQuery := "SELECT id from blog_post_categoryDB where name = ?;"
		categoryId := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[int64](categoryQuery, []interface{}{params.Category}))

		categoryPostsQuery := `
			SELECT 
				blog_postsDB.id,
				blog_postsDB.date,
				blog_usersDB.blog_username,
				blog_postsDB.title,
				blog_postsDB.body
			from blog_postsDB
			inner join blog_usersDB on
				blog_usersDB.id = blog_postsDB.blog_user_id
			where
				visible = 1 and
				blog_postsDB.parent_blog_user_id = 0 and
				blog_postsDB.category_id = ?
		`
		posts := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[types.BlogPostDB](categoryPostsQuery, []interface{}{categoryId[0]}))

		organisedPosts := make([]types.BlogPostResponse, len(posts))
		for _, v := range posts {
			pullBlogViewsQuery := "SELECT count(*) from blog_post_viewsDB where blog_post_id = ?;"
			pullBlogViews := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[int64](pullBlogViewsQuery, []interface{}{v.ID}))

			post := types.BlogPostResponse{
				ID:     v.ID,
				Date:   v.Date,
				Author: v.BlogUsername,
				Title:  v.Title,
				Body:   v.Body,
				Views:  pullBlogViews[0],
			}
			organisedPosts = append(organisedPosts, post)
		}
		responses.BuildSuccessResponse(w, organisedPosts)
		return
	}

	if params.Search != "" {
		generalQuery := `
			SELECT
				blog_postsDB.id,
				blog_postsDB.date,
				blog_usersDB.blog_username,
				blog_postsDB.title,
				blog_postsDB.body,
				blog_post_categoryDB.name
			from blog_postsDB
			inner join blog_usersDB on
				blog_usersDB.id = blog_postsDB.blog_user_id
			INNER JOIN blog_post_categoryDB
				on blog_post_categoryDB.id = blog_postsDB.category_id
			where
				visible = 1 and
				blog_post_categoryDB.name like ? or 
				blog_usersDB.blog_username like ? or 
				blog_postsDB.title like ? or 
				blog_postsDB.body like ? 
		`
		generalResults := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[types.BlogPostDB](generalQuery, []interface{}{params.Search, params.Search, params.Search, params.Search}))

		// organisedPosts := make([]types.BlogPostResponse, len(generalResults))
		organisedPosts := map[string][]types.BlogPostResponse{}
		for _, v := range generalResults {
			pullBlogViewsQuery := "SELECT count(*) from blog_post_viewsDB where blog_post_id = ?;"
			pullBlogViews := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[int64](pullBlogViewsQuery, []interface{}{v.ID}))

			post := types.BlogPostResponse{
				ID:     v.ID,
				Date:   v.Date,
				Author: v.BlogUsername,
				Title:  v.Title,
				Body:   v.Body,
				Views:  pullBlogViews[0],
			}
			if val, ok := organisedPosts[v.Category]; ok {
				organisedPosts[v.Category] = append(val, post)
			} else {
				organisedPosts[v.Category] = []types.BlogPostResponse{post}
			}
		}
		responses.BuildSuccessResponse(w, organisedPosts)
		return
	}

	categoryQuery := "SELECT id, name from blog_post_categoryDB limit 5;"
	categoryId := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[int64](categoryQuery, []interface{}{}))

	categoryPostsQuery := `
		SELECT 
		blog_postsDB.id,
		blog_postsDB.date,
		blog_usersDB.blog_username,
		blog_postsDB.title,
		blog_postsDB.body
	from blog_postsDB
	inner join blog_usersDB on
		blog_usersDB.id = blog_postsDB.blog_user_id
	where
		visible = 1 and
		blog_postsDB.parent_blog_user_id = 0 and
		blog_postsDB.category_id = ?
	limit 5;
	`
	posts := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[types.BlogPostDB](categoryPostsQuery, []interface{}{categoryId[0]}))

	organisedPosts := map[string][]types.BlogPostResponse{}
	for _, v := range posts {
		pullBlogViewsQuery := "SELECT count(*) from blog_post_viewsDB where blog_post_id = ?;"
		pullBlogViews := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[int64](pullBlogViewsQuery, []interface{}{v.ID}))

		post := types.BlogPostResponse{
			ID:     v.ID,
			Date:   v.Date,
			Author: v.BlogUsername,
			Title:  v.Title,
			Body:   v.Body,
			Views:  pullBlogViews[0],
		}
		if val, ok := organisedPosts[v.Category]; ok {
			organisedPosts[v.Category] = append(val, post)
		} else {
			organisedPosts[v.Category] = []types.BlogPostResponse{post}
		}
	}
	responses.BuildSuccessResponse(w, organisedPosts)
	return

}
