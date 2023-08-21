package ProjectsSiteanalysisRoute

import (
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/controllers/database"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
)

func Route(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		params := r.URL.Query()
		if params.Get("uuid") == "" {
			responses.BuildUnauthorised(w)
			return
		}
		uuid := params.Get("uuid")

		query := "SELECT source, destination, COUNT(*) as count FROM route_track GROUP BY source, destination LIMIT ?;"
		siteTraffic := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[types.SiteAnalysisRoutes](query, []any{20}))

		var max int64 = 0
		for _, v := range siteTraffic {
			if v.Count > max {
				max = v.Count
			}
		}

		for i, v := range siteTraffic {
			siteTraffic[i].Count = int64((float64(v.Count) / float64(max)) * 100.0)
		}

		query = "SELECT uuid, canvas_hash, platform, browser, actualHeight, actualWidth, ip FROM fingerprint where uuid = ? limit 1;"
		fingerprint := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[types.SiteAnalysisFingerprint](query, []any{uuid}))

		query = "SELECT COUNT(session_id) FROM monitor WHERE uuid = ? GROUP BY session_id;"
		uniqueVisits := database.SimpleQuery[int64](query, []any{uuid})

		query = "SELECT page, COUNT(*) as count FROM monitor WHERE uuid = ? GROUP BY page; LIMIT 5"
		pages := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[types.SiteAnalysisPages](query, []any{uuid}))

		responses.BuildSuccessResponse(w, types.SiteAnalysisResp{
			SiteTraffic:  siteTraffic,
			Fingerprint:  fingerprint[0],
			UniqueVisits: uniqueVisits,
			Pages:        pages,
		})
		return
	}
}
