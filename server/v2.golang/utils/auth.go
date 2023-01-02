package utils

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"io"

	"golang.org/x/crypto/pbkdf2"
)

func HMAC(message string, secret string) string {
	h := hmac.New(sha256.New, []byte(secret))
	io.WriteString(h, message)
	return hex.EncodeToString(h.Sum(nil))
}

func PBKDF2(password string, salt string, iterations int, keyLen int) []byte {
	derivedKey := pbkdf2.Key([]byte(password), []byte(salt), iterations, keyLen, sha256.New)
	return derivedKey
}
