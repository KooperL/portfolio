package blog

import (
	"fmt"
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/controllers/database"
	"kooperlingohr/portfolio/lib"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
)

func Index(w http.ResponseWriter, r *http.Request) {
	decodedToken := r.Context().Value("decodedToken").(types.JWTbody)
	// var jwtDecoded types.JWTbody

	// reader := strings.NewReader(decodedToken)
	// utils.HandleErrorVar(json.NewDecoder(reader).Decode(&jwtDecoded))

	// now := time.Now()
	// dt := now.Format(utils.GetTimeFormat())

	params := r.URL.Query()
	if params.Get("session_id") == "" {
		responses.BuildUnauthorised(w)
		return
	}

	lib.TrackBlogFunctionsCalled(decodedToken.Username, params.Get("session_id"), "index")
	if params.Get("Category") != "" {
		categoryQuery := "SELECT id from blog_post_categoryDB where name = ?;"
		categoryId := database.SimpleQuery[int64](categoryQuery, []interface{}{params.Get("category")})

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
		posts := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[types.BlogPostDB](categoryPostsQuery, []interface{}{categoryId}))
		fmt.Println(posts)
		// organisedPosts := make([]types.BlogPostResponse, len(posts))
		// for _, v := range posts {
		// 	pullBlogViewsQuery := "SELECT count(*) from blog_post_viewsDB where blog_post_id = ?;"
		// 	pullBlogViews := database.SimpleQuery[int64](pullBlogViewsQuery, []interface{}{v.ID})

		// 	post := types.BlogPostResponse{
		// 		ID:     v.ID,
		// 		Date:   v.Date,
		// 		Author: v.BlogUsername,
		// 		Title:  v.Title,
		// 		Body:   v.Body,
		// 		Views:  pullBlogViews,
		// 	}
		// 	organisedPosts = append(organisedPosts, post)
		// }
		// responses.BuildSuccessResponse(w, organisedPosts)
		return
	}

	if params.Get("search") != "" {
		generalQuery := `
			SELECT
				blog_postsDB.id as id,
				blog_postsDB.date as date,
				blog_usersDB.blog_username as blog_username,
				blog_postsDB.title as title,
				blog_postsDB.body as body,
				blog_post_categoryDB.name as name
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
		generalResults := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[types.BlogPostDB](generalQuery, []interface{}{params.Get("search"), params.Get("search"), params.Get("search"), params.Get("search")}))
		fmt.Println(generalResults)
		// organisedPosts := make([]types.BlogPostResponse, len(generalResults))
		// organisedPosts := map[string][]types.BlogPostResponse{}
		// for _, v := range generalResults {
		// 	pullBlogViewsQuery := "SELECT count(*) from blog_post_viewsDB where blog_post_id = ?;"
		// 	pullBlogViews := database.SimpleQuery[int64](pullBlogViewsQuery, []interface{}{v.ID})

		// 	post := types.BlogPostResponse{
		// 		ID:     v.ID,
		// 		Date:   v.Date,
		// 		Author: v.BlogUsername,
		// 		Title:  v.Title,
		// 		Body:   v.Body,
		// 		Views:  pullBlogViews,
		// 	}
		// 	if val, ok := organisedPosts[v.Category]; ok {
		// 		organisedPosts[v.Category] = append(val, post)
		// 	} else {
		// 		organisedPosts[v.Category] = []types.BlogPostResponse{post}
		// 	}
		// }
		// responses.BuildSuccessResponse(w, organisedPosts)
		return
	}

	categoryQuery := "SELECT id from blog_post_categoryDB limit 5;"
	categoryId := database.SimpleQuery[int64](categoryQuery, []interface{}{nil})

	categoryPostsQuery := `
		SELECT 
		blog_postsDB.id as id,
		blog_postsDB.date as date,
		blog_usersDB.blog_username as blog_username,
		blog_postsDB.title as title,
		blog_postsDB.body as body,
		blog_post_categoryDB.name as name
	from blog_postsDB
	inner join blog_usersDB on
		blog_usersDB.id = blog_postsDB.blog_user_id
	INNER JOIN blog_post_categoryDB
		on blog_post_categoryDB.id = blog_postsDB.category_id
	where
		visible = 1 and
		blog_postsDB.parent_blog_user_id = 0 and
		blog_postsDB.category_id = ?
	limit 5;
	`
	posts := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[types.BlogPostDB](categoryPostsQuery, []interface{}{categoryId}))

	organisedPosts := map[string][]types.BlogPostResponse{}
	for _, v := range posts {

		pullBlogViewsQuery := "SELECT count(*) from blog_post_viewsDB where blog_post_id = ?;"
		pullBlogViews := database.SimpleQuery[int64](pullBlogViewsQuery, []interface{}{v.ID})

		post := types.BlogPostResponse{
			ID:     v.ID,
			Date:   v.Date,
			Author: v.BlogUsername,
			Title:  v.Title,
			Body:   v.Body,
			Views:  pullBlogViews,
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
