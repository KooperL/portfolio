package forum

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

	lib.TrackForumFunctionsCalled(decodedToken.Username, params.Get("session_id"), "index")
	if params.Get("Category") != "" {
		categoryQuery := "SELECT id from forum_post_category where name = ?;"
		categoryId := database.SimpleQuery[int64](categoryQuery, []interface{}{params.Get("category")})

		categoryPostsQuery := `
			SELECT 
				forum_posts.id,
				forum_posts.date,
				forum_users.forum_username,
				forum_posts.title,
				forum_posts.body
			from forum_posts
			inner join forum_users on
				forum_users.id = forum_posts.forum_user_id
			where
				visible = 1 and
				forum_posts.parent_forum_user_id = 0 and
				forum_posts.category_id = ?
		`
		posts := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[types.ForumPostDB](categoryPostsQuery, []interface{}{categoryId}))
		fmt.Println(posts)
		// organisedPosts := make([]types.ForumPostResponse, len(posts))
		// for _, v := range posts {
		// 	pullForumViewsQuery := "SELECT count(*) from forum_post_views where forum_post_id = ?;"
		// 	pullForumViews := database.SimpleQuery[int64](pullForumViewsQuery, []interface{}{v.ID})

		// 	post := types.ForumPostResponse{
		// 		ID:     v.ID,
		// 		Date:   v.Date,
		// 		Author: v.ForumUsername,
		// 		Title:  v.Title,
		// 		Body:   v.Body,
		// 		Views:  pullForumViews,
		// 	}
		// 	organisedPosts = append(organisedPosts, post)
		// }
		// responses.BuildSuccessResponse(w, organisedPosts)
		return
	}

	if params.Get("search") != "" {
		generalQuery := `
			SELECT
				forum_posts.id as id,
				forum_posts.date as date,
				forum_users.forum_username as forum_username,
				forum_posts.title as title,
				forum_posts.body as body,
				forum_post_category.name as name
			from forum_posts
			inner join forum_users on
				forum_users.id = forum_posts.forum_user_id
			INNER JOIN forum_post_category
				on forum_post_category.id = forum_posts.category_id
			where
				visible = 1 and
				forum_post_category.name like ? or 
				forum_users.forum_username like ? or 
				forum_posts.title like ? or 
				forum_posts.body like ? 
		`
		generalResults := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[types.ForumPostDB](generalQuery, []interface{}{params.Get("search"), params.Get("search"), params.Get("search"), params.Get("search")}))
		fmt.Println(generalResults)
		// organisedPosts := make([]types.ForumPostResponse, len(generalResults))
		// organisedPosts := map[string][]types.ForumPostResponse{}
		// for _, v := range generalResults {
		// 	pullForumViewsQuery := "SELECT count(*) from forum_post_views where forum_post_id = ?;"
		// 	pullForumViews := database.SimpleQuery[int64](pullForumViewsQuery, []interface{}{v.ID})

		// 	post := types.ForumPostResponse{
		// 		ID:     v.ID,
		// 		Date:   v.Date,
		// 		Author: v.ForumUsername,
		// 		Title:  v.Title,
		// 		Body:   v.Body,
		// 		Views:  pullForumViews,
		// 	}
		// 	if val, ok := organisedPosts[v.Category]; ok {
		// 		organisedPosts[v.Category] = append(val, post)
		// 	} else {
		// 		organisedPosts[v.Category] = []types.ForumPostResponse{post}
		// 	}
		// }
		// responses.BuildSuccessResponse(w, organisedPosts)
		return
	}

	categoryQuery := "SELECT id from forum_post_category limit 5;"
	categoryId := database.SimpleQuery[int64](categoryQuery, []interface{}{nil})

	categoryPostsQuery := `
		SELECT 
		forum_posts.id as id,
		forum_posts.date as date,
		forum_users.forum_username as forum_username,
		forum_posts.title as title,
		forum_posts.body as body,
		forum_post_category.name as name
	from forum_posts
	inner join forum_users on
		forum_users.id = forum_posts.forum_user_id
	INNER JOIN forum_post_category
		on forum_post_category.id = forum_posts.category_id
	where
		visible = 1 and
		forum_posts.parent_forum_user_id = 0 and
		forum_posts.category_id = ?
	limit 5;
	`
	posts := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[types.ForumPostDB](categoryPostsQuery, []interface{}{categoryId}))

	organisedPosts := map[string][]types.ForumPostResponse{}
	for _, v := range posts {

		pullForumViewsQuery := "SELECT count(*) from forum_post_views where forum_post_id = ?;"
		pullForumViews := database.SimpleQuery[int64](pullForumViewsQuery, []interface{}{v.ID})

		post := types.ForumPostResponse{
			ID:     v.ID,
			Date:   v.Date,
			Author: v.ForumUsername,
			Title:  v.Title,
			Body:   v.Body,
			Views:  pullForumViews,
		}
		if val, ok := organisedPosts[v.Category]; ok {
			organisedPosts[v.Category] = append(val, post)
		} else {
			organisedPosts[v.Category] = []types.ForumPostResponse{post}
		}
	}
	responses.BuildSuccessResponse(w, organisedPosts)
	return

}
