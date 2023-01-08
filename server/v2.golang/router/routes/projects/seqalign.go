package projects

import (
	"fmt"
	"kooperlingohr/portfolio/controllers"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
	"strconv"
	"strings"
)

func SeqAlign(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		params := r.URL.Query()
		s1 := params.Get("sampletxt")
		s1Arr := strings.Split(s1, "")
		s2 := params.Get("referencetxt")
		s2Arr := strings.Split(s2, "")
		match, _ := strconv.ParseInt(params.Get("identical"), 10, 8)
		mismatch, _ := strconv.ParseInt(params.Get("mismatch"), 10, 8)
		extendingGap, _ := strconv.ParseInt(params.Get("extgaps"), 10, 8)
		beginningGap, _ := strconv.ParseInt(params.Get("gaps"), 10, 8)

		results := map[string]any{
			"draw_res": []string{},
			"results":  []any{},
		}

		if len(s1) == len(s2) {
			matches := controllers.MatchScoreSimple(s1, s2, match, mismatch, extendingGap, beginningGap)
			draw := controllers.DrawComparison(s1, s2)
			results["draw_res"] = append(results["draw_res"].([]string), fmt.Sprintf("%s\nScore=%.1f", draw, float32(matches)/float32(len(s1))*10))
			results["results"] = append(results["results"].([]any), []any{s1, s2, matches, 0, len(s1)})
		} else {
			for i := 0; i < 3; i++ {
				shorterArr, longerArr := utils.ShortestArray(s1Arr, s2Arr)
				shorterStr, longerStr := strings.Join(shorterArr, ""), strings.Join(longerArr, "")
				var diff = len(longerArr) - len(shorterArr)
				for diff > 0 {
					shorterStr = controllers.InsertBlank[string](shorterStr)
					diff--
				}
				matches := controllers.MatchScoreSimple(shorterStr, longerStr, match, mismatch, extendingGap, beginningGap)
				draw := controllers.DrawComparison(shorterStr, longerStr)
				results["draw_res"] = append(results["draw_res"].([]string), fmt.Sprintf("%s\nScore=%.1f", draw, float32(matches)/float32(len(longerArr))*10))
				results["results"] = append(results["results"].([]any), []any{shorterStr, longerStr, matches, 0, len(s1)})
			}

		}

		responses.BuildSuccessResponse(w, results)
	}
}
