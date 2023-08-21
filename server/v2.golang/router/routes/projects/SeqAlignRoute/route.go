package ProjectsSeqalignRoute

import (
	"fmt"
	"kooperlingohr/portfolio/controllers"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
	"strconv"
	"strings"
)

type SeqAlignRes struct {
	DrawRes []string        `json:"draw_res"`
	Results []SeqAlignScore `json:"results"`
}

type SeqAlignScore struct {
	String1         string `json:"s1"`
	String2         string `json:"s2"`
	Score           int64  `json:"score"`
	BeginMatchIndex int64  `json:"begin"`
	LastMatchIndex  int64  `json:"end"`
}

func Route(w http.ResponseWriter, r *http.Request) {
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

		results := SeqAlignRes{
			DrawRes: []string{},
			Results: []SeqAlignScore{},
		}

		if len(s1) == len(s2) {
			matches := controllers.MatchScoreSimple(s1, s2, match, mismatch, extendingGap, beginningGap)
			draw := controllers.DrawComparison(s1, s2)
			results.DrawRes = append(results.DrawRes, fmt.Sprintf("%s\nScore=%.1f", draw, float32(matches)/float32(len(s1))*10))
			results.Results = append(results.Results, SeqAlignScore{
				String1:         s1,
				String2:         s2,
				Score:           matches,
				BeginMatchIndex: 0,
				LastMatchIndex:  int64(len(s1)),
			})
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
				results.DrawRes = append(results.DrawRes, fmt.Sprintf("%s\nScore=%.1f", draw, float32(matches)/float32(len(longerArr))*10))
				results.Results = append(results.Results, SeqAlignScore{
					String1:         shorterStr,
					String2:         longerStr,
					Score:           matches,
					BeginMatchIndex: 0,
					LastMatchIndex:  int64(len(s1)),
				})
			}

		}

		responses.BuildSuccessResponse(w, results)
	}
}
