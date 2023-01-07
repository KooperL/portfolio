package database

type BlogUsersDB struct {
	ID               string `json:"id"`
	BlogPasswordHash string `json:"blog_password_hash"`
	BlogPasswordSalt string `json:"blog_password_salt"`
	RoleID           string `json:"role_id"`
}
