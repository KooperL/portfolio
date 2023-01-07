package utils

import (
	"encoding/base64"
)

func DecodeBase64(encoded string) string {
	decoded := HandleErrorDeconstruct(base64.StdEncoding.DecodeString(encoded))
	return string(decoded)
}

func EncodeBase64(str string) string {
	base64String := base64.StdEncoding.EncodeToString([]byte(str))
	return base64String
}
