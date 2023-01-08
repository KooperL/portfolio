package index

import (
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/controllers/database"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
	"time"
)

func Capture(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		var body types.CapturePayload
		datetime := time.Now().Format("2006-01-02 15:04:05.000000")
		utils.ParseReqParams(r.URL.Query(), &body)
		insertStatement := `INSERT INTO fingerprintDB VALUES (
		  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
		);`
		data := append([]interface{}{nil, datetime}, utils.MapStructToSlice(body)...)
		data = append(data, utils.HandleErrorDeconstruct(utils.GetIP(r)))
		database.Insert(insertStatement, data)
		responses.BuildSuccessResponse(w, body)

	} else {
		responses.BuildBadResponse(w, "Method not allowed", 405)

	}
}
