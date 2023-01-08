package database

type BlogUsersDB struct {
	ID               int64  `json:"id"`
	BlogPasswordHash []byte `json:"blog_password_hash"`
	BlogPasswordSalt string `json:"blog_password_salt"`
	RoleID           int64  `json:"role_id"`
}
