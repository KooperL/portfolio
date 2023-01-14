package projects

import (
	"kooperlingohr/portfolio/controllers/database"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
)

func Fuelprices(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		res := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[database.Fuelprices]("SELECT * FROM fuelprices ORDER BY id DESC LIMIT ?", []any{200}))

		responses.BuildSuccessResponse(w, res)
	}
}
