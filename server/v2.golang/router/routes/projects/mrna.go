package routes

import (
	"bytes"
	"fmt"
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/router/middleware"
	"kooperlingohr/portfolio/utils"
	"net/http"
	"strings"
)

func Mrna(w http.ResponseWriter, r *http.Request) {
	dnaSourceRaw := r.URL.Query().Get("dna_field_id")
	dnaSource := strings.Split(dnaSourceRaw, "")
	sourceSize := len(dnaSource)

	var dnaDict []types.Dna
	utils.OpenAndParseJSONFile("data/dna.json", &dnaDict)
	fmt.Println(dnaDict)
	var rnaDict []types.Rna
	utils.OpenAndParseJSONFile("data/rna.json", &rnaDict)

	var aaDict []types.AminoAcids
	utils.OpenAndParseJSONFile("data/aminoAcids.json", &aaDict)

	sourceAsBytes := []byte(strings.Join(dnaSource, ""))

	count := make(map[string]int)
	for _, v := range dnaDict {
		count[v.Symbol] = bytes.Count(sourceAsBytes, []byte(v.Symbol))
	}

	gcContent := float64(count["g"]+count["c"]) / float64(sourceSize)

	compliment := make([]string, sourceSize)
	molWeight := 0.0
	mrnaCompliment := make([]string, sourceSize)

	for i, base := range dnaSource {
		for _, potMatch := range dnaDict {
			if string(base) == potMatch.Symbol {
				compliment[i] = potMatch.ComplimentaryNucleotide.Value
				molWeight = molWeight + 660
				// 	potMatch.MolecularMass.Value + (func() float64 {
				// 	for _, mwLookup := range dnaDict {
				// 		if mwLookup.Symbol == potMatch.ComplimentaryNucleotide.Value {
				// 			return mwLookup.MolecularMass.Value
				// 		}
				// 	}
				// 	return 0.0
				// })()
			}
		}
		for _, potMatch := range rnaDict {
			if base == potMatch.DnaMap.Value {
				mrnaCompliment[sourceSize-1-i] = potMatch.ComplimentaryNucleotide.Value
			}
		}
	}

	aminoAcidDecode := map[string][]string{
		"single":  []string{},
		"partial": []string{},
	}
	for i := 2; i < sourceSize; i += 3 {
		key := fmt.Sprintf("%s%s%s", mrnaCompliment[i-2], mrnaCompliment[i-1], mrnaCompliment[i])
		for _, potMatch := range aaDict {
			if utils.Includes(potMatch.Nucleotides, key) {
				aminoAcidDecode["single"] = append(aminoAcidDecode["single"], potMatch.Symbol)
				aminoAcidDecode["partial"] = append(aminoAcidDecode["partial"], potMatch.ThreeLetterSymbol)
			}
		}
	}

	var tm float64
	if sourceSize < 13 {
		tm = float64(4*(count["g"]+count["c"]) + 4*(count["a"]+count["t"]))
	} else {
		tm = 64.9 + 41*(float64(count["g"]+count["c"])-16.4)/float64(sourceSize)
	}

	response := types.Mrna{
		DNAField:    fmt.Sprintf("5' - %s - 3'", dnaSourceRaw),
		MRNAField:   fmt.Sprintf("3' - %s - 5'", strings.Join(mrnaCompliment, "")),
		RDNAField:   fmt.Sprintf("5' - %s - 3'", strings.Join(compliment, "")),
		SimpleCount: count,
		GCContent:   gcContent,
		AA:          aminoAcidDecode["partial"],
		AAS:         strings.Join(aminoAcidDecode["single"], ""),
		MolWeight:   molWeight,
		TM:          tm,
	}
	middleware.BuildSuccessResponse(w, response)

}
