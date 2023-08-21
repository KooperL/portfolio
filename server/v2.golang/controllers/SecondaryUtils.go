package controllers

import (
	ProjectsRoute "kooperlingohr/portfolio/router/routes/projects"
	"kooperlingohr/portfolio/utils"
)

func FindNucleationRegion(arr []float64, threshold float64, sliding_window int, contiguous int, sError int) []bool {
	returnArrLength := len(arr) - (sliding_window - 1)
	nucleationRegions := make([]bool, returnArrLength)
	validNucleationLength := 0

	start := 0
	end := sliding_window

	for end < returnArrLength {
		slice := arr[start:end]
		sum := utils.Sum(slice)
		isValid := sum > (float64(contiguous) * threshold)
		if isValid {
			validNucleationLength++
		} else {
			validNucleationLength--
		}

		if validNucleationLength > contiguous {
			validNucleationLength--
			for i := start; i < end; i++ {
				nucleationRegions[i] = true
			}
		} else {
			if validNucleationLength > sError {
				nucleationRegions[start] = true
			} else {
				nucleationRegions[start] = false
			}
		}
		start++
		end++

	}
	return nucleationRegions
}

func PopulatePropensitiesFromSymbol(symbol string, memo *ProjectsRoute.AaMemo, key string, dict []ProjectsRoute.AminoAcids) float64 {
	var m map[string]float64
	if key == "alpha_helix" {
		m = memo.AlphaHelix
	} else {
		m = memo.BetaStrand
	}
	if val, ok := m[symbol]; ok {
		return val
	} else {
		for _, elem := range dict {
			if elem.Symbol == symbol {
				m[symbol] = elem.Propensities[key]
				return elem.Propensities[key]
			}
		}
	}
	return 0.0
}
