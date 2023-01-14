package database

type BlogUsersDB struct {
	ID               int64  `json:"id"`
	BlogPasswordHash []byte `json:"forum_password_hash"`
	BlogPasswordSalt string `json:"forum_password_salt"`
	RoleID           int64  `json:"role_id"`
}

type BlogUsersSimpleDB struct {
	Username string `json:"username"`
	RoleID   int64  `json:"role_id"`
}
