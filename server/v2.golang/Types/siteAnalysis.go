package types

type SiteAnalysisRoutes struct {
	Source      string `json:"source"`
	Destination string `json:"destination"`
	Count       int64  `json:"count"`
}

type SiteAnalysisFingerprint struct {
	Uuid         string `json:"uuid"`
	CanvasHash   string `json:"CanvasHash"`
	Platform     string `json:"platform"`
	Browser      string `json:"browser"`
	ActualHeight int64  `json:"actualHeight"`
	ActualWidth  int64  `json:"actualWidth"`
	IP           string `json:"ip"`
}

type SiteAnalysisPages struct {
	Page  string `json:"page"`
	Count int64  `json:"count"`
}
