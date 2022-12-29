// package routes

// import (
// 	"fmt"
// 	"net/http"
// )

// func Hello(w http.ResponseWriter, r *http.Request) {
// 	word := r.URL.Query().Get("word")
// 	if word == "banana" {
// 		fmt.Fprintln(w, "Match found")
// 	} else {
// 		panic(fmt.Errorf("error message"))
// 	}
// }

package routes

import (
	"encoding/json"
	"kooperlingohr/portfolio/router/middleware"
	"kooperlingohr/portfolio/utils"
	"math/rand"
	"net/http"
	"os"
	"strconv"
	"time"
)

type Base struct {
	Name                    string
	Symbol                  string
	ComplimentaryNucleotide struct {
		Reference string
		Value     string
	}
}

type Dna struct {
	Base
	MolecularMass struct {
		Value float64
		Unit  string
	}
	Density struct {
		Value float64
		Unit  string
	}
	MeltingPoint struct {
		From float64
		To   float64
		Unit string
	}
	BoilingPoint struct {
		From float64
		Unit string
	}

	Solubility struct {
		Value float64
		Unit  string
	}
	PH float64
}

type AminoAcids struct {
	Name              string             `json:"name"`
	ThreeLetterSymbol string             `json:"three_letter_symbol"`
	Symbol            string             `json:"symbol"`
	SideChain         map[string]string  `json:"side_chain"`
	Nucleotides       []string           `json:"nucleotides"`
	HydropathyIndex   float64            `json:"hydropathy_index"`
	MolecularWeight   float64            `json:"molecular_weight"`
	Propensities      map[string]float64 `json:"propensities"`
}

func RandomBio(w http.ResponseWriter, r *http.Request) {
	randomType, err := strconv.ParseInt(r.URL.Query().Get("type"), 10, 16)
	utils.HandleErrorVar(err)
	randomLength, err := strconv.ParseInt(r.URL.Query().Get("length"), 10, 16)
	utils.HandleErrorVar(err)

	switch randomType {
	case (1):
		file, err := os.Open("data/dna.json")
		utils.HandleErrorVar(err)
		defer file.Close()

		var data []Dna
		utils.HandleErrorVar(json.NewDecoder(file).Decode(&data))
		rand.Seed(time.Now().Unix())
		arr := make([]string, randomLength)
		var i int64

		for i = 0; i < randomLength; i++ {
			randInd := rand.Intn(len(data))
			arr[i] = data[randInd].Symbol
		}
		middleware.BuildSuccessResponse(w, arr)
		break
	case (2):
		file, err := os.Open("data/rna.json")
		utils.HandleErrorVar(err)
		defer file.Close()

		var data []Base
		utils.HandleErrorVar(json.NewDecoder(file).Decode(&data))
		rand.Seed(time.Now().Unix())
		arr := make([]string, randomLength)
		var i int64

		for i = 0; i < randomLength; i++ {
			randInd := rand.Intn(len(data))
			arr[i] = data[randInd].Symbol
		}
		middleware.BuildSuccessResponse(w, arr)
		break
	case (3):
		aaFormat, err := strconv.ParseInt(r.URL.Query().Get("single"), 10, 16)
		utils.HandleErrorVar(err)

		file, err := os.Open("data/aminoAcids.json")
		utils.HandleErrorVar(err)
		defer file.Close()

		var data []AminoAcids
		utils.HandleErrorVar(json.NewDecoder(file).Decode(&data))
		rand.Seed(time.Now().Unix())
		arr := make([]string, randomLength)
		var i int64

		if aaFormat == 1 {
			for i = 0; i < randomLength; i++ {
				for true {
					randInd := rand.Intn(len(data))
					chosenAA := data[randInd]
					if chosenAA.Symbol != "STOP" {
						arr[i] = data[randInd].Symbol
						break
					}
				}
			}
		} else {
			for i = 0; i < randomLength; i++ {
				for true {
					randInd := rand.Intn(len(data))
					chosenAA := data[randInd]
					if chosenAA.Symbol != "STOP" {
						arr[i] = data[randInd].ThreeLetterSymbol
						break
					}
				}
			}
		}
		middleware.BuildSuccessResponse(w, arr)
		break
	}
	middleware.BuildBadResponse(w, "Bad syntax", 400)
}
