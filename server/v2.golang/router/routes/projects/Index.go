package projects

import (
	"fmt"
	types "kooperlingohr/portfolio/Types"
	"kooperlingohr/portfolio/router/middleware/responses"
	"net/http"
)

func Index(w http.ResponseWriter, r *http.Request) {
	fmt.Println("err>")
	if r.Method == http.MethodGet {
		res := []types.PagePopulate{
			{
				Data: []string{"React apps"},
				Type: "subheader",
			},
			{
				Data: []types.PagePopulateNode{
					{
						Data: []string{"/projects/tictactoe"},
						Text: "Tictactoe",
						Type: "button",
					},
					{
						Data: []string{"/projects/minesweeper"},
						Text: "Minesweeper",
						Type: "button",
					},
					{
						Data: []string{"/projects/jssimulator"},
						Text: "Front-end dev simulator",
						Type: "button",
					},
				},
				Type: "buttonArr",
			},
			{
				Data: []string{"Data Storage and Analysis"},
				Type: "subheader",
			},
			{
				Data: []types.PagePopulateNode{
					{
						Data: []string{"/projects/fuelprices"},
						Text: "UL91 Fuel Price trends",
						Type: "button",
					},
					{
						Data: []string{"/projects/property"},
						Text: "Real estate data interface",
						Type: "button",
					},
				},
				Type: "buttonArr",
			},
			{
				Data: []string{"Bioinformatics"},
				Type: "subheader",
			},
			{
				Data: []types.PagePopulateNode{
					{
						Data: []string{"/projects/mrna"},
						Text: "DNA:mRNA decoder",
						Type: "button",
					},
					{
						Data: []string{"/projects/secondary"},
						Text: "Protein 2° Structure",
						Type: "button",
					},
					{
						Data: []string{"/projects/seqalign"},
						Text: "Pairwise sequence alignment",
						Type: "button",
					},
					{
						Data: []string{"/projects/randombio"},
						Text: "DNA sequence generator",
						Type: "button",
					},
				},
				Type: "buttonArr",
			},
			{
				Data: []string{"Repos"},
				Type: "subheader",
			},
			{
				Data: []types.PagePopulateNode{
					{
						Data: []string{"https://github.com/KooperL/portfolio"},
						Text: "This Website",
						Type: "button",
					},
					{
						Data: []string{"https://github.com/KooperL/trafficCounter"},
						Text: "AI Traffic Counter",
						Type: "button",
					},
					{
						Data: []string{"https://github.com/KooperL/tkinter3dengine"},
						Text: "Python/Tkinter 3d Engine",
						Type: "button",
					},
					{
						Data: []string{"https://github.com/KooperL/tkinterAstar"},
						Text: "A* Path finder py",
						Type: "button",
					},
				},
				Type: "buttonArr",
			},
		}

		responses.BuildSuccessResponse(w, res)
	}
}
