package middleware

import (
	"net/http"
)

func BuildPreflight(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers for the response
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", `
			Access-Control-Allow-Credentials,
    	Access-Control-Allow-Method,
    	Access-Control-Allow-Headers,
    	authorization,
    	Origin,
    	Accept,
    	X-Requested-With,
    	Content-Type,
    	Access-Control-Request-Method,
    	Access-Control-Request-Headers,
    	access-control-request-credentials,
    	cachecontrol`,
		)

		// If the request method is OPTIONS, return without calling the handler function
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		} else {
			h(w, r)
		}
	}
}
