package responses

import (
	"encoding/json"
	"kooperlingohr/portfolio/utils"
	"net/http"
)

func BuildPlainSuccess(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
	resp := make(map[string]bool)
	resp["success"] = true
	utils.HandleErrorVar(
		json.NewEncoder(w).Encode(resp),
	)
}
