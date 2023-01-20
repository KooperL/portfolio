package projects

import (
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/controllers/database"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
)

func Fuelprices(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		res := utils.HandleErrorDeconstruct(database.ExecuteSQLiteQuery[types.Fuelprices]("SELECT * FROM fuelprices ORDER BY id DESC LIMIT ?", []any{200}))

		rgood := ((res[0].Minprice + res[0].Maxprice) / 2) / res[0].Averageprice
		m := (res[0].Averageprice - res[2].Averageprice) / (3 - 1)

		var appeal bool
		if rgood > 1 && m < 0 {
			appeal = true
		} else {
			appeal = false
		}

		temp := map[string][]types.XYSet{}

		temp["wholesale"] = make([]types.XYSet, len(res))
		temp["min"] = make([]types.XYSet, len(res))
		temp["max"] = make([]types.XYSet, len(res))
		temp["average"] = make([]types.XYSet, len(res))

		for i, v := range res {
			temp["wholesale"][i] = types.XYSet{
				X: v.Date,
				Y: v.Wholesaleprice,
			}
			temp["min"][i] = types.XYSet{
				X: v.Date,
				Y: v.Minprice,
			}
			temp["max"][i] = types.XYSet{
				X: v.Date,
				Y: v.Maxprice,
			}
			temp["average"][i] = types.XYSet{
				X: v.Date,
				Y: v.Averageprice,
			}
		}
		resp := types.FuelPricesResp{
			FuelPrices: temp,
			Stats: types.FuelPriceStats{
				Average:       res[0].Averageprice,
				RelativePrice: rgood,
				Gradient:      m,
				Decision:      appeal,
			},
		}

		responses.BuildSuccessResponse(w, resp)
	}
}
