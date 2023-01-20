package types

type Fuelprices struct {
	ID             int64   `json:"id"`
	Date           any     `json:"date"`
	Minprice       float64 `json:"minprice"`
	Maxprice       float64 `json:"maxprice"`
	Averageprice   float64 `json:"averageprice"`
	Wholesaleprice float64 `json:"wholesaleprice"`
}
