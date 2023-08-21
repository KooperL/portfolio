package middleware

import (
	"context"
	"fmt"
	"kooperlingohr/portfolio/router/middleware/responses"
	ForumRoute "kooperlingohr/portfolio/router/routes/forum"
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

		tokenDecoded, err := utils.DecodeJWT[ForumRoute.JWTbody](token[1], os.Getenv("forum-jwt-auth-token"))
		fmt.Println(tokenDecoded, err)
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
