package types

type CMSPage struct {
	ID       string      `json:"id"`
	Title    string      `json:"title"`
	Sections []CMSSection `json:"sections"`
}

type CMSSection struct {
	ID         string          `json:"id"`
	Title      string          `json:"title"`
	Components []CMSComponent `json:"components"`
}

type CMSComponent struct {
	ID      string                 `json:"id"`
	Type    string                 `json:"type"`
	Data    map[string]interface{} `json:"data"`
}
