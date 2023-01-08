package responses

import (
	"net/http"
)

func BuildBadRequest(w http.ResponseWriter) {
	BuildBadResponse(w, "invalid syntax", 400)
}
