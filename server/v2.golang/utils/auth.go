package utils

import (
	"crypto/hmac"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"fmt"
	types "kooperlingohr/portfolio/Types"
	"net"
	"net/http"
	"strconv"
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
	// io.WriteString(h, message)
	h.Write([]byte(message))
	return hex.EncodeToString(h.Sum(nil))
}

func PBKDF2(password string, salt string, iterations int, keyLen int) []byte {
	derivedKey := pbkdf2.Key([]byte(password), []byte(salt), iterations, keyLen, sha256.New)
	return derivedKey
}

func GenerateSalt(x int64) string {
	// Generate a random byte slice of size x
	b := make([]byte, x)
	HandleErrorDeconstruct(rand.Read(b))

	// Encode the byte slice as a base64 string
	salt := base64.RawURLEncoding.EncodeToString(b)

	// Return the salt
	return salt
}

type test interface {
	types.JWTbody | types.RefreshToken
}

func DecodeJWT[T test](jwt, secret string) (types.JWTbody, error) {
	jwtSlice := strings.Split(jwt, ".")
	header := jwtSlice[0]
	body := jwtSlice[1]
	externalSignature := jwtSlice[2]

	var jwtDecoded types.JWTbody
	reader := strings.NewReader(DecodeBase64Raw(body))
	HandleErrorVar(json.NewDecoder(reader).Decode(&jwtDecoded))

	parsedExp := HandleErrorDeconstruct(strconv.ParseInt(jwtDecoded.Exp, 10, 64))

	if time.Now().Unix() > parsedExp {
		return jwtDecoded, fmt.Errorf("Expired token")
	}

	bundle := fmt.Sprintf(
		"%s.%s",
		strings.TrimRight(header, "="),
		strings.TrimRight(body, "="),
	)

	internalSignature := generateJWTSignature(bundle, secret)

	if internalSignature != externalSignature {
		return jwtDecoded, fmt.Errorf("Invalid signature")
	}

	return jwtDecoded, nil
}

// Fuck this shitty language
func DecodeJWTRefresh[T test](jwt, secret string) (types.RefreshToken, error) {
	jwtSlice := strings.Split(jwt, ".")
	header := jwtSlice[0]
	body := jwtSlice[1]
	externalSignature := jwtSlice[2]

	var jwtDecoded types.RefreshToken
	reader := strings.NewReader(DecodeBase64Raw(body))
	HandleErrorVar(json.NewDecoder(reader).Decode(&jwtDecoded))

	parsedExp := HandleErrorDeconstruct(strconv.ParseInt(jwtDecoded.Exp, 10, 64))

	if time.Now().Unix() > parsedExp {
		return jwtDecoded, fmt.Errorf("Expired token")
	}

	bundle := fmt.Sprintf(
		"%s.%s",
		strings.TrimRight(header, "="),
		strings.TrimRight(body, "="),
	)

	internalSignature := generateJWTSignature(bundle, secret)

	if internalSignature != externalSignature {
		return jwtDecoded, fmt.Errorf("Invalid signature")
	}

	return jwtDecoded, nil
}

func generateJWTHeader() types.JWTheader {
	jsonStr := `{"alg":"HS256","typ":"JWT"}`
	var header types.JWTheader
	HandleErrorVar(json.Unmarshal([]byte(jsonStr), &header))

	return header
}

func generateJWTSignature(preSig string, secret string) string {
	signature := strings.TrimRight(EncodeBase64(HMAC(preSig, secret)), "=")
	return signature
}

func generateJWTPreSig[T types.JWTbody | types.RefreshToken](header types.JWTheader, payload T) string {
	headerStr := string(HandleErrorDeconstruct(json.Marshal(generateJWTHeader())))
	bodyStr := string(HandleErrorDeconstruct(json.Marshal(payload)))
	bundle := fmt.Sprintf(
		"%s.%s",
		strings.TrimRight(EncodeBase64(headerStr), "="),
		strings.TrimRight(EncodeBase64(bodyStr), "="),
	)
	return bundle
}

func GenerateJWT[T types.JWTbody | types.RefreshToken](payload T, secret string) string {
	bundle := generateJWTPreSig(generateJWTHeader(), payload)
	signature := generateJWTSignature(bundle, secret)
	return fmt.Sprintf("%s.%s", bundle, signature)
}
