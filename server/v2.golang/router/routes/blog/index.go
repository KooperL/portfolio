package blog

import (
	"encoding/json"
	"kooperlingohr/portfolio/utils"
	"net/http"
	"strings"
)

func Index(w http.ResponseWriter, r *http.Request) {
	decodedToken := r.Context().Value("decodedToken").(string)
	var jwtDecoded utils.JWTbody
	reader := strings.NewReader(decodedToken)
	utils.HandleErrorVar(json.NewDecoder(reader).Decode(&jwtDecoded))
}
