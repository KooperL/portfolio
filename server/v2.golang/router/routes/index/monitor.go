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
		headerColumns := []interface{}{nil, datetime}

		insertStatement := "INSERT INTO monitor VALUES (?, ?, ?, ?, ?);"
		data := append(headerColumns, body.Uuid, body.SessionID, body.Page)
		database.Insert(insertStatement, data)

		if body.PrevPage != "NULL" {
			insertStatement = "INSERT INTO route_track VALUES (?, ?, ?, ?, ?);"
			data = append(headerColumns, body.SessionID, body.PrevPage, body.Page)
			database.Insert(insertStatement, data)
		}
		responses.BuildPlainSuccess(w, 200)

	} else {
		// 405
	}
}
