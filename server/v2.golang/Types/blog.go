package types

type BlogIndex struct {
	SessionId
	Category string `json:"category"`
	Search   string `json:"search"`
}

type BlogPostDB struct {
	ID           int64  `json:"id"`
	Date         string `json:"date"`
	BlogUsername string `json:"blog_username"`
	Title        string `json:"title"`
	Body         string `json:"body"`
	Category     string `json:"category"`
}

type BlogPostResponse struct {
	ID     int64  `json:"id"`
	Date   string `json:"date"`
	Author string `json:"author"`
	Title  string `json:"title"`
	Body   string `json:"body"`
	Views  int64  `json:"views"`
}
