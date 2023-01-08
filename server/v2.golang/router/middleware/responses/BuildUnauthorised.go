package responses

import (
	"net/http"
)

func BuildUnauthorised(w http.ResponseWriter) {
	BuildBadResponse(w, "Unauthorized", 401)
}
