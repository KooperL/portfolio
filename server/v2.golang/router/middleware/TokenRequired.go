package middleware

import (
	"context"
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"

	"net/http"
	"os"
	"strings"
)

func TokenRequired(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		header := r.Header.Get("Authorization")
		token := strings.Split(header, " ")

		// var jwt types.JWT
		// utils.HandleErrorVar(json.Unmarshal([]byte(token[1]), &jwt))

		tokenDecoded, err := utils.DecodeJWT[types.JWTbody](token[1], os.Getenv("blog-jwt-auth-token"))

		if err == nil {
			ctx := context.WithValue(r.Context(), "decodedToken", tokenDecoded)
			r = r.WithContext(ctx)
			// w.Header().Set("Access-Control-Allow-Credentials", "true")
			h(w, r)
		} else {
			responses.BuildUnauthorised(w)
		}
		return
	}
}
