package projects

import (
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/controllers"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"math"
	"net/http"
	"strings"
)

func Secondary(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		var data []types.AminoAcids
		utils.OpenAndParseJSONFile("../data/aminoAcids.json", &data)

		aa_list := strings.Split(r.URL.Query().Get("aa_field_id"), "")

		if len(aa_list) < 16 {
			responses.BuildBadResponse(w, "Bad syntax", 400)
			return
		}

		var memo types.AaMemo
		memo.AlphaHelix = map[string]float64{}
		memo.BetaStrand = map[string]float64{}

		alpha_helix_threshold := 1.03
		alpha_helix_sliding_window := 6
		alpha_helix_contiguous_window := 4
		alpha_helix_error := 6
		beta_sheet_threshold := 1.0
		beta_sheet_sliding_window := 5
		beta_sheet_contiguous_window := 3
		beta_sheet_error := 4

		hPropensities := make([]float64, len(aa_list))
		for i, v := range aa_list {
			hPropensities[i] = controllers.PopulatePropensitiesFromSymbol(v, &memo, "alpha_helix", data)
		}
		hNucleationRegions := controllers.FindNucleationRegion(
			hPropensities,
			alpha_helix_threshold,
			alpha_helix_sliding_window,
			alpha_helix_contiguous_window,
			alpha_helix_error,
		)

		ePropensities := make([]float64, len(aa_list))
		for i, v := range aa_list {
			ePropensities[i] = controllers.PopulatePropensitiesFromSymbol(v, &memo, "beta_strand", data)
		}
		eNucleationRegions := controllers.FindNucleationRegion(
			ePropensities,
			beta_sheet_threshold,
			beta_sheet_sliding_window,
			beta_sheet_contiguous_window,
			beta_sheet_error,
		)

		length := int(math.Min(float64(len(eNucleationRegions)), float64(len(hNucleationRegions))))
		result := make([]string, length)
		stalemateSlice := []int{}
		for i := 0; i < length; i++ {
			if hNucleationRegions[i] && !eNucleationRegions[i] {
				result[i] = "h"
				if len(stalemateSlice) > 0 {
					for _, v := range stalemateSlice {
						result[v] = "h"
					}
					stalemateSlice = []int{}
				}
			} else if eNucleationRegions[i] && !hNucleationRegions[i] {
				result[i] = "e"
				if len(stalemateSlice) > 0 {
					for _, v := range stalemateSlice {
						result[v] = "e"
					}
					stalemateSlice = []int{}
				}

			} else if !eNucleationRegions[i] && !hNucleationRegions[i] {
				result[i] = "c"

			} else {
				// stalemate
				result[i] = "_"
				stalemateSlice = append(stalemateSlice, i)
			}

		}
		responses.BuildSuccessResponse(w, strings.Join(result, ""))
	}
}
