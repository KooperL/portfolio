package middleware

import (
	"fmt"
	"kooperlingohr/portfolio/controllers/database"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
	"os"
	"time"
)

func RateLimit(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ip := utils.HandleErrorDeconstruct(utils.GetIP(r))
		var RATE_LIMIT_REQUESTS_GENERAL, RATE_LIMIT_WINDOW, RATE_LIMIT_REQUESTS_LIMITED int
		fmt.Sscan(os.Getenv("RATE_LIMIT_REQUESTS_GENERAL"), &RATE_LIMIT_REQUESTS_GENERAL)
		fmt.Sscan(os.Getenv("RATE_LIMIT_REQUESTS_LIMITED"), &RATE_LIMIT_REQUESTS_LIMITED)
		fmt.Sscan(os.Getenv("RATE_LIMIT_WINDOW"), &RATE_LIMIT_WINDOW)
		pullRequest := "SELECT date FROM requests WHERE ip_address = ? ORDER BY id DESC LIMIT ?;"
		pullRequestTraffic := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[[]string](pullRequest, []any{ip, RATE_LIMIT_REQUESTS_GENERAL}))
		now := time.Now()
		dt := now.Format(utils.GetTimeFormat())
		eventCount := 0

		var bottleneck int
		if bolleneckAddr := &bottleneck; r.Method == http.MethodGet {
			*bolleneckAddr = RATE_LIMIT_REQUESTS_GENERAL
		} else {
			*bolleneckAddr = RATE_LIMIT_REQUESTS_LIMITED

		}

		if len(pullRequestTraffic) < bottleneck {
			insert := "INSERT INTO requests VALUES (?, ?, ?);"
			database.Insert(insert, []interface{}{nil, dt, ip})
			h(w, r)
			return
		}

		for _, v := range pullRequestTraffic {
			timeParsed := utils.HandleErrorDeconstruct(time.Parse(utils.GetTimeFormat(), v[0]))
			timeDiff := now.Sub(timeParsed)
			// if int(timeDiff.Minutes()) < (RATE_LIMIT_WINDOW * int(time.Minute)) {
			if int(timeDiff.Minutes()) < RATE_LIMIT_WINDOW {
				eventCount++
			}
		}

		w.Header().Set("X-RateLimit-Limit", fmt.Sprintf("%d", bottleneck))
		w.Header().Set("X-RateLimit-Remaining", fmt.Sprintf("%d", bottleneck-eventCount))
		if eventCount <= bottleneck {
			h(w, r)
		} else {
			responses.BuildTooManyRequests(w)
		}
		return
	}
}
