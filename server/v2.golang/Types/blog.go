package types

import "time"

type ForumIndex struct {
	SessionId
	Category string `json:"category"`
	Search   string `json:"search"`
}

type ForumPostDB struct {
	ID            int64     `json:"id"`
	Date          time.Time `json:"date"`
	ForumUsername string    `json:"forum_username"`
	Title         string    `json:"title"`
	Body          string    `json:"body"`
	Category      string    `json:"name"`
}

type ForumPostResponse struct {
	ID     int64     `json:"id"`
	Date   time.Time `json:"date"`
	Author string    `json:"author"`
	Title  string    `json:"title"`
	Body   string    `json:"body"`
	Views  int64     `json:"views"`
}

type ForumPostVerbose struct {
	ID       int64     `json:"id"`
	Date     time.Time `json:"date"`
	Author   string    `json:"author"`
	Title    string    `json:"title"`
	Body     string    `json:"body"`
	AuthorID string    `json:"author_id"`
	Category string    `json:"category"`
}

// TODO forum_postsDB.forum_user_id should be int

type ForumPostResponseVerbose struct {
	ForumPostVerbose
	Views int64 `json:"views"`
}
