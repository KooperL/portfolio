package middleware

import (
	"kooperlingohr/portfolio/router/middleware/responses"
	"net/http"
)

func CatchErrors(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				// If dev
				errMsg := err.(error).Error()
				responses.BuildBadResponse(w, errMsg, http.StatusInternalServerError)
			}
		}()

		h(w, r)
	}
}
