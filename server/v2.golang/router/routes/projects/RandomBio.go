package routes

import (
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/router/middleware"
	"kooperlingohr/portfolio/utils"
	"math/rand"
	"net/http"
	"strconv"
	"time"
)

func RandomBio(w http.ResponseWriter, r *http.Request) {
	randomType := utils.HandleErrorDeconstruct(strconv.ParseInt(r.URL.Query().Get("type"), 10, 16))
	randomLength := utils.HandleErrorDeconstruct(strconv.ParseInt(r.URL.Query().Get("length"), 10, 16))

	switch randomType {
	case (1):
		var data []types.Dna
		utils.OpenAndParseJSONFile("data/dna.json", &data)

		rand.Seed(time.Now().Unix())
		arr := make([]string, randomLength)

		var i int64
		for i = 0; i < randomLength; i++ {
			randInd := rand.Intn(len(data))
			arr[i] = data[randInd].Symbol
		}
		middleware.BuildSuccessResponse(w, arr)
		return
		break
	case (2):
		var data []types.Rna
		utils.OpenAndParseJSONFile("data/rna.json", &data)

		rand.Seed(time.Now().Unix())
		arr := make([]string, randomLength)
		var i int64

		for i = 0; i < randomLength; i++ {
			randInd := rand.Intn(len(data))
			arr[i] = data[randInd].Symbol
		}
		middleware.BuildSuccessResponse(w, arr)
		return
		break
	case (3):
		aaFormat := utils.HandleErrorDeconstruct(strconv.ParseInt(r.URL.Query().Get("single"), 10, 16))

		var data []types.AminoAcids
		utils.OpenAndParseJSONFile("data/aminoAcids.json", &data)

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
			middleware.BuildSuccessResponse(w, arr)
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
			middleware.BuildSuccessResponse(w, arr)
			return
		} else {
			middleware.BuildBadResponse(w, "Bad syntax", 400)
			return
		}
		break
	default:
		middleware.BuildBadResponse(w, "Bad syntax", 400)
		return

	}
}
