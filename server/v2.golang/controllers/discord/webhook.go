package discord

import (
	"bytes"
	"encoding/json"
	"kooperlingohr/portfolio/utils"
	"net/http"
)

type requestBody struct {
	Content string `json:"content"`
}

func SendDiscordMessage(url, message string) {
	messageBody := requestBody{
		Content: message,
	}
	buf := utils.HandleErrorDeconstruct(json.Marshal(messageBody))

	req := utils.HandleErrorDeconstruct(http.NewRequest(http.MethodPost, url, bytes.NewBuffer(buf)))
	req.Header.Set("Content-Type", "application/json")
	utils.HandleErrorDeconstruct(http.DefaultClient.Do(req))
}
