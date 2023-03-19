package index

import (
	"fmt"
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/controllers/database"
	"kooperlingohr/portfolio/controllers/discord"
	"kooperlingohr/portfolio/router/middleware/responses"
	"kooperlingohr/portfolio/utils"
	"net/http"
	"os"
	"time"
)

func Contact(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		var res []types.PagePopulateNode
		utils.OpenAndParseJSONFile("../data/responses/contactPage.json", &res)
		// res := []types.PagePopulateNode{
		// 	{
		// 		Data: []string{"😵‍💫"},
		// 		Type: "emoji",
		// 	},
		// 	{
		// 		Data: []string{"Aw, snap! Something went wrong..."},
		// 		Type: "subheader",
		// 	},
		// 	{
		// 		Data: []string{"You should probably contact me to let me know you found this error. My preferred method of contact is LinkedIn:"},
		// 		Type: "body",
		// 	},
		// 	{
		// 		Data: []string{"https://www.linkedin.com/in/kooper/"},
		// 		Text: "LinkedIn",
		// 		Type: "button",
		// 	},
		// 	{
		// 		Data: []string{"Alternatively, leave an anonymous message. If you're expecting a reply though, be sure to include your email too."},
		// 		Type: "body",
		// 	},
		// }

		responses.BuildSuccessResponse(w, res)
	} else if r.Method == http.MethodPost {

		var body types.ContactPayload
		utils.ParseReqBody(r, &body)
		discord.SendDiscordMessage(os.Getenv("DISCORD_WEBHOOK_URL"), fmt.Sprintf("%s,\n%s", body.SessionID, body.Message))
		insertStatement := "INSERT INTO contact_messages VALUES (?, ?, ?, ?);"
		database.Insert(insertStatement, []interface{}{nil, time.Now().String(), body.SessionID, body.Message})
		responses.BuildSuccessResponse(w, body)

	} else {
		// 429
	}
}
