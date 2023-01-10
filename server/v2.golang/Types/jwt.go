package types

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
