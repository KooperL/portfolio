package database

type Fuelprices struct {
	ID             int64   `json:"id"`
	Date           string  `json:"date"`
	Minprice       float64 `json:"minprice"`
	Maxnprice      float64 `json:"maxprice"`
	Averageprice   float64 `json:"averageprice"`
	Wholesaleprice float64 `json:"wholesaleprice"`
}
