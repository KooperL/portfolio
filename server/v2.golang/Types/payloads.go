package types

type ContactPayload struct {
	SessionID string `json:"session_id"`
	Message   string `json:"message"`
}

type CapturePayload struct {
	Uuid          string      `json:"uuid"`
	CanvasHash    string      `json:"canvas_hash"`
	Version       string      `json:"version"`
	Platform      string      `json:"platform"`
	Browser       string      `json:"browser"`
	UserAgent     string      `json:"User-Agent"`
	DarkMode      interface{} `json:"darkMode"`
	CookieEnabled interface{} `json:"cookieEnabled"`
	ActualHeight  interface{} `json:"actualHeight"`
	ActualWidth   interface{} `json:"actualWidth"`
	PixelDepth    interface{} `json:"pixelDepth"`
	InnerHeight   interface{} `json:"innerHeight"`
	OuterHeight   interface{} `json:"outerHeight"`
	InnerWidth    interface{} `json:"innerWidth"`
	OuterWidth    interface{} `json:"outerWidth"`
}

type MonitorPayload struct {
	Uuid      string `json:"uuid"`
	SessionID string `json:"session_id"`
	Page      string `json:"page"`
	PrevPage  string `json:"prevPage"`
}
