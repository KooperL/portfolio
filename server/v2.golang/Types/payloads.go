package types

type SessionId struct {
	SessionID string `json:"session_id"`
}

type ContactPayload struct {
	SessionId
	Message string `json:"message"`
}

type CapturePayload struct {
	Uuid          interface{} `json:"uuid"`
	CanvasHash    interface{} `json:"canvas_hash"`
	Version       interface{} `json:"version"`
	Platform      interface{} `json:"platform"`
	Browser       interface{} `json:"browser"`
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
	// SessionId
	SessionID string `json:"session_id"`
	Uuid      string `json:"uuid"`
	Page      string `json:"page"`
	PrevPage  string `json:"prevPage"`
}

type PostForum struct {
	SessionId
	Data struct {
		ForumTitle string `json:"forum_title"`
		ForumBody  string `json:"forum_body"`
	} `json:"data"`
}
