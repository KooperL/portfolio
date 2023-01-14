package types

type ContactPayload struct {
	SessionId
	Message string `json:"message"`
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
	SessionId
	Uuid     string `json:"uuid"`
	Page     string `json:"page"`
	PrevPage string `json:"prevPage"`
}

type SessionId struct {
	SessionID string `json:"session_id"`
}

type PostBlog struct {
	SessionId
	Data struct {
		BlogTitle string `json:"forum_title"`
		BlogBody  string `json:"forum_body"`
	} `json:"data"`
}
