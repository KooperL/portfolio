package middleware

import (
	"net/http"
)

func CatchErrors(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				// http.Error(w, err.(error).Error(), http.StatusInternalServerError)
				BuildBadResponse(w, err.(error).Error(), http.StatusInternalServerError)
			}
		}()

		h(w, r)
	}
}
