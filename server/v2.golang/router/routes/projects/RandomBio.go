package projects

import (
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"math/rand"
	"net/http"
	"strconv"
	"strings"
	"time"
)

func RandomBio(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		params := r.URL.Query()
		randomType := utils.HandleErrorDeconstruct(strconv.ParseInt(params.Get("type"), 10, 16))
		randomLength := utils.HandleErrorDeconstruct(strconv.ParseInt(params.Get("length"), 10, 16))

		switch randomType {
		case (1):
			var data []types.Dna
			utils.OpenAndParseJSONFile("../data/dna.json", &data)

			rand.Seed(time.Now().Unix())
			arr := make([]string, randomLength)

			var i int64
			for i = 0; i < randomLength; i++ {
				randInd := rand.Intn(len(data))
				arr[i] = data[randInd].Symbol
			}
			responses.BuildSuccessResponse(w, strings.Join(arr, ""))
			return
		case (2):
			var data []types.Rna
			utils.OpenAndParseJSONFile("../data/rna.json", &data)

			rand.Seed(time.Now().Unix())
			arr := make([]string, randomLength)
			var i int64

			for i = 0; i < randomLength; i++ {
				randInd := rand.Intn(len(data))
				arr[i] = data[randInd].Symbol
			}
			responses.BuildSuccessResponse(w, strings.Join(arr, ""))
			return
			break
		case (3):
			aaFormat := utils.HandleErrorDeconstruct(strconv.ParseInt(params.Get("single"), 10, 16))

			var data []types.AminoAcids
			utils.OpenAndParseJSONFile("../data/aminoAcids.json", &data)

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
				responses.BuildSuccessResponse(w, strings.Join(arr, ""))
				return
			} else if aaFormat == 0 {
				for i = 0; i < randomLength; i++ {
					for {
						randInd := rand.Intn(len(data))
						chosenAA := data[randInd]
						if chosenAA.Symbol != "STOP" {
							arr[i] = data[randInd].ThreeLetterSymbol
							break
						}
					}
				}
				responses.BuildSuccessResponse(w, arr)
				return
			} else {
				responses.BuildBadResponse(w, "Bad syntax", 400)
				return
			}
			break
		default:
			responses.BuildBadResponse(w, "Bad syntax", 400)
			return

		}
	}
}
