package controllers

import (
	"kooperlingohr/portfolio/router/routes"
	"kooperlingohr/portfolio/utils"
)

func FindNucleationRegion(arr []int, threshold int, sliding_window int) []int {
	returnArrLength := len(arr) - (sliding_window - 1)
	nucleationRegions := make([]int, returnArrLength)

	start := 0
	end := sliding_window

	for end <= len(arr) {
		slice := arr[start:sliding_window]
		nucleationRegions[start] = utils.Sum(slice)
		start += 1
		end += 1
	}
	return nucleationRegions
}

type aaMemo struct {
	AlphaHelix map[string]float64 `json:"alpha-helix"`
	BetaStrand map[string]float64 `json:"beta-strand"`
}

func PopulatePropensitiesFromSymbol(symbol string, memo *aaMemo, key string, dict []routes.AminoAcids) float64 {
	var m map[string]float64
	if key == "alpha-helix" {
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
