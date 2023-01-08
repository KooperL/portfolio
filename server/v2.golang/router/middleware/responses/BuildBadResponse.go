package responses

import (
	"encoding/json"
	"kooperlingohr/portfolio/utils"
	"net/http"
)

func BuildBadResponse(w http.ResponseWriter, err interface{}, code int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	resp := make(map[string]any)
	resp["success"] = false
	resp["error"] = err
	utils.HandleErrorVar(
		json.NewEncoder(w).Encode(resp),
	)
}
