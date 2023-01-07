package middleware

import (
	"context"
	"kooperlingohr/portfolio/utils"
	"net/http"
	"os"
	"strings"
)

func TokenRequired(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		header := r.Header.Get("Authorization")
		token := strings.Split(header, " ")
		tokenDecoded, err := utils.DecodeJWT(token[1], os.Getenv("blog-register-hash-key"))

		if err == nil {
			ctx := context.WithValue(r.Context(), "decodedToken", tokenDecoded)
			r = r.WithContext(ctx)
			h(w, r)
		} else {
			BuildBadResponse(w, "Unauthorized", 401)
		}
		return
	}
}
