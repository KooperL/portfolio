package types

type Base struct {
	Name                    string `json:"name"`
	Symbol                  string `json:"symbol"`
	ComplimentaryNucleotide struct {
		Reference string `json:"reference"`
		Value     string `json:"value"`
	} `json:"complimentary_nucleotide"`
}

type Rna struct {
	Base
	DnaMap struct {
		Reference string `json:"reference"`
		Value     string `json:"value"`
	} `json:"dna_map"`
}

type Dna struct {
	Base
	MolecularMass struct {
		Value float64 `json:"value"`
		Unit  string  `json:"unit"`
	} `json:"molecular_mass"`
	Density struct {
		Value float64 `json:"value"`
		Unit  string  `json:"unit"`
	} `json:"density"`
	MeltingPoint struct {
		From float64 `json:"from"`
		To   float64 `json:"to"`
		Unit string  `json:"unit"`
	} `json:"melting_point"`
	BoilingPoint struct {
		From float64 `json:"from"`
		Unit string  `json:"unit"`
	} `json:"boiling_point"`

	Solubility struct {
		Value float64 `json:"value"`
		Unit  string  `json:"unit"`
	} `json:"solubility"`
	PH float64 `json:"ph"`
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

type AaMemo struct {
	AlphaHelix map[string]float64 `json:"alpha-helix"`
	BetaStrand map[string]float64 `json:"beta-strand"`
}
