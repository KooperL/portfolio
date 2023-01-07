package utils

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"net"
	"net/http"
	"strings"
	"time"

	"golang.org/x/crypto/pbkdf2"
)

func GetIP(r *http.Request) (string, error) {
	// //Get IP from the X-REAL-IP header
	// ip := r.Header.Get("X-REAL-IP")
	// netIP := net.ParseIP(ip)
	// if netIP != nil {
	// 	return ip, nil
	// }

	// //Get IP from X-FORWARDED-FOR header
	// ips := r.Header.Get("X-FORWARDED-FOR")
	// splitIps := strings.Split(ips, ",")
	// for _, ip := range splitIps {
	// 	netIP := net.ParseIP(ip)
	// 	if netIP != nil {
	// 		return ip, nil
	// 	}
	// }

	//Get IP from RemoteAddr
	ip, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return "", err
	}
	return ip, nil
	// netIP := net.ParseIP(ip)
	// if netIP != nil {
	// 	return ip, nil
	// }
	// return "", fmt.Errorf("No valid ip found")
}

func HMAC(message string, secret string) string {
	h := hmac.New(sha256.New, []byte(secret))
	io.WriteString(h, message)
	return hex.EncodeToString(h.Sum(nil))
}

func PBKDF2(password string, salt string, iterations int, keyLen int) []byte {
	derivedKey := pbkdf2.Key([]byte(password), []byte(salt), iterations, keyLen, sha256.New)
	return derivedKey
}

func DecodeJWT(jwt, secret string) (JWTbody, error) {
	jwtSlice := strings.Split(jwt, ".")
	externalSignature := jwtSlice[2]

	var jwtDecoded JWTbody
	jwtEncoded := jwtSlice[1]

	reader := strings.NewReader(DecodeBase64(jwtEncoded))
	HandleErrorVar(json.NewDecoder(reader).Decode(&jwtDecoded))
	tokenExp := jwtDecoded.Exp

	// exp := time.Unix(HandleErrorDeconstruct(strconv.ParseInt(tokenExp, 10, 64)), 0)
	// exp := time.Unix(tokenExp, 0).

	if tokenExp > time.Now().Unix() {
		return jwtDecoded, fmt.Errorf("Expired token")
	}

	internalSignature := EncodeBase64(HMAC(
		strings.Join(jwtSlice[:1], "."),
		secret,
	))

	if internalSignature != externalSignature {
		return jwtDecoded, fmt.Errorf("Invalid signature")
	}

	return jwtDecoded, nil
}
