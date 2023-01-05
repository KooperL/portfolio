package projects

import (
	"kooperlingohr/portfolio/controllers/database"
	"kooperlingohr/portfolio/router/middleware"
	"kooperlingohr/portfolio/utils"
	"net/http"
)

func Fuelprices(w http.ResponseWriter, r *http.Request) {
	res := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[database.Fuelprices]("SELECT * FROM fuelpricesDB ORDER BY id DESC LIMIT ?", []any{200}))

	middleware.BuildSuccessResponse(w, res)
}
