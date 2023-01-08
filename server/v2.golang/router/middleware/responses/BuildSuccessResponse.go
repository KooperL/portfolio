package responses

import (
	"encoding/json"
	"kooperlingohr/portfolio/utils"
	"net/http"
)

func BuildSuccessResponse(w http.ResponseWriter, arr interface{}) {
	w.Header().Set("Content-Type", "application/json")
	resp := make(map[string]any)
	resp["success"] = true
	resp["data"] = arr
	utils.HandleErrorVar(
		json.NewEncoder(w).Encode(resp),
	)
}
