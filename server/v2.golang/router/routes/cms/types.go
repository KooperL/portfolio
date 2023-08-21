
package cms 

type CMSPage struct {
	ID       string      `json:"id"`
	Title    string      `json:"title"`
	Slug    string      `json:"slug"`
	Sections []CMSSection `json:"sections"`
}

type CMSSection struct {
	ID         string          `json:"id"`
	Title      string          `json:"title"`
	Components []CMSComponent `json:"components"`
}

type CMSComponent struct {
	Type    string                 `json:"type"`
	Content    map[string]interface{} `json:"content"`
}
