package projects

import (
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/controllers/database"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
)

func SiteAnalysis(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		params := r.URL.Query()
		if params.Get("uuid") == "" {
			responses.BuildUnauthorised(w)
			return
		}
		uuid := params.Get("uuid")

		query := "SELECT source, destination, COUNT(*) FROM route_track GROUP BY source, destination;"
		siteTrafic := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[types.SiteAnalysisRoutes](query, []any{}))

		query = "SELECT uuid, canvas_hash, platform, browser, actualHeight, actualWidth, ip FROM fingerprint where uuid = ? limit 1;"
		fingerprint := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[types.SiteAnalysisFingerprint](query, []any{uuid}))

		query = "SELECT COUNT(session_id) FROM monitor WHERE uuid = ? GROUP BY session_id;"
		uniqueVisits := database.SimpleQuery[int64](query, []any{uuid})

		query = "SELECT page, COUNT(*) as count FROM monitor WHERE uuid = ? GROUP BY page;"
		pages := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[types.SiteAnalysisPages](query, []any{uuid}))

		responses.BuildSuccessResponse(w, types.SiteAnalysisResp{
			SiteTraffic:  siteTrafic,
			Fingerprint:  fingerprint[0],
			UniqueVisits: uniqueVisits,
			Pages:        pages,
		})
		return
	}
}
