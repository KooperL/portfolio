package responses

import (
	"encoding/json"
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/utils"
	"net/http"
)

func BuildBearerResp(w http.ResponseWriter, jwt string, expires int) {
	w.Header().Set("Content-Type", "application/json")
	resp := types.BearerResp{
		Success:     true,
		Type:        "Bearer",
		AccessToken: jwt,
		Expires:     expires,
	}
	utils.HandleErrorVar(
		json.NewEncoder(w).Encode(resp),
	)
}
