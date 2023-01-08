package responses

import (
	"net/http"
)

func BuildUnauthenticated(w http.ResponseWriter) {
	BuildBadResponse(w, "unauthenticated", 403)
}
