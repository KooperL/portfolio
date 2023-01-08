package responses

import (
	"net/http"
)

func BuildTooManyRequests(w http.ResponseWriter) {
	BuildBadResponse(w, "too many requests", 429)
}
