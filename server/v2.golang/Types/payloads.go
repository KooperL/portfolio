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
	Data interface{} `json:"data"`
	Type string      `json:"type"`
}
