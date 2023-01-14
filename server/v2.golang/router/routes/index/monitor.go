package index

import (
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/controllers/database"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
	"time"
)

func Monitor(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		var body types.MonitorPayload
		datetime := time.Now().Format("2006-01-02 15:04:05.000000")
		utils.ParseReqParams(r.URL.Query(), &body)
		insertStatement := "INSERT INTO monitor VALUES (?, ?, ?, ?, ?);"
		data := append([]interface{}{nil, datetime}, utils.MapStructToSlice(body)...)
		database.Insert(insertStatement, data)
		responses.BuildSuccessResponse(w, body)

	} else {
		// 405
	}
}
