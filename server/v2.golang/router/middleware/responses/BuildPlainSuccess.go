package responses

import (
	"encoding/json"
	"kooperlingohr/portfolio/utils"
	"net/http"
)

func BuildPlainSuccess(w http.ResponseWriter, code int) {
	w.Header().Set("Content-Type", "application/json")
	resp := map[string]bool{"success": true}
	w.WriteHeader(code)
	utils.HandleErrorVar(
		json.NewEncoder(w).Encode(resp),
	)
}
