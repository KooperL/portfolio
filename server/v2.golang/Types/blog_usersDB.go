package types

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
