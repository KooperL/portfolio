package types

type JWTbody struct {
	UserId   int64  `json:"userId"`
	Iat      int64  `json:"iat"`
	Role     int64  `json:"role"`
	Username string `json:"username"`
	Exp      int64  `json:"exp"`
}

type JWTheader struct {
	Header struct {
		Alg string `json:"alg"`
		Typ string `json:"typ"`
	} `json:"header"`
}

type JWT struct {
	JWTheader
	JWTbody
	Signature string
}

type RefreshToken struct {
	UserID int64 `json:"userId"`
	Iat    int64 `json:"iat"`
}
