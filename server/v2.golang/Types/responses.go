package types

type AppError struct {
	Error   error
	Message string
	Code    int
}

type Mrna struct {
	DNAField    string         `json:"dna_field"`
	MRNAField   string         `json:"mrna_field"`
	RDNAField   string         `json:"rdna_field"`
	SimpleCount map[string]int `json:"simplecount"`
	GCContent   float64        `json:"gccontent"`
	AA          []string       `json:"aa"`
	AAS         string         `json:"aa_s"`
	MolWeight   float64        `json:"molweight"`
	TM          float64        `json:"tm"`
}

type PagePopulateNode struct {
	Data []string `json:"data"`
	Text string   `json:"text"`
	Type string   `json:"type"`
}

type PagePopulate struct {
	Data any    `json:"data"` // PagePopulateData
	Type string `json:"type"`
}

type PagePopulateData struct {
	s []string
	p PagePopulateNode
}

type BearerResp struct {
	Success     bool   `json:"success"`
	Type        string `json:"type"`
	AccessToken string `json:"accessToken"`
	Expires     int    `json:"expires"`
}

type FuelPriceStats struct {
	Average       float64 `json:"average"`
	RelativePrice float64 `json:"relativePrice"`
	Gradient      float64 `json:"gradient"`
	Decision      bool    `json:"decision"`
}

type XYSet struct {
	X any     `json:"x"`
	Y float64 `json:"y"`
}

type FuelPricesResp struct {
	FuelPrices map[string][]XYSet `json:"fuelprices"`
	Stats      FuelPriceStats     `json:"stats"`
}

type SiteAnalysisResp struct {
	SiteTraffic  []SiteAnalysisRoutes    `json:"siteTraffic"`
	Fingerprint  SiteAnalysisFingerprint `json:"fingerprint"`
	UniqueVisits int64                   `json:"uniqueVisits"`
	Pages        []SiteAnalysisPages     `json:"pages"`
}
