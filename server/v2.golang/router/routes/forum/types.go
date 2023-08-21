package forum

import (
	types "kooperlingohr/portfolio/Types"
	"time"
)

type ForumUsersDB struct {
	ID                int64  `json:"id"`
	ForumPasswordHash []byte `json:"forum_password_hash"`
	ForumPasswordSalt string `json:"forum_password_salt"`
	RoleID            int64  `json:"role_id"`
}

type ForumUsersSimpleDB struct {
	Username string `json:"username"`
	RoleID   int64  `json:"role_id"`
}
type ForumIndex struct {
	types.SessionId
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

type JWTbody struct {
	UserID   int64  `json:"userId"`
	Iat      int64  `json:"iat"`
	Role     int64  `json:"role"`
	Username string `json:"username"`
	Exp      string `json:"exp"`
}

type JWTheader struct {
	Alg string `json:"alg"`
	Typ string `json:"typ"`
}

// type JWTpreSig struct {
// 	JWTheader
// 	JWTbody
// }

// type JWT struct {
// 	JWTpreSig
// 	Signature string
// }

type RefreshToken struct {
	UserID int64  `json:"userId"`
	Exp    string `json:"exp"`
}
