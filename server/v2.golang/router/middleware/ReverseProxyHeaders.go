package middleware

import (
	"fmt"
	"net/http"
)

func ReverseProxyHeaders(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		xff := r.Header.Get("X-Forwarded-For")
		if xff != "" {
			fmt.Println("X-Forwarded-For:", xff)
		}

		xfp := r.Header.Get("X-Forwarded-Proto")
		if xfp != "" {
			fmt.Println("X-Forwarded-Proto:", xfp)
		}

		xfh := r.Header.Get("X-Forwarded-Host")
		if xfh != "" {
			fmt.Println("X-Forwarded-Host:", xfh)
		}

		xfpx := r.Header.Get("X-Forwarded-Prefix")
		if xfpx != "" {
			fmt.Println("X-Forwarded-Prefix:", xfpx)
		}

		h(w, r)
	}
}
