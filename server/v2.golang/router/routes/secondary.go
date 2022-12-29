// package routes

// import (
// 	"fmt"
// 	"net/http"
// )

// func Hello(w http.ResponseWriter, r *http.Request) {
// 	word := r.URL.Query().Get("word")
// 	if word == "banana" {
// 		fmt.Fprintln(w, "Match found")
// 	} else {
// 		panic(fmt.Errorf("error message"))
// 	}
// }

package routes

import (
	"encoding/json"
	"io/ioutil"
	"kooperlingohr/portfolio/utils"
	"net/http"
)

func Secondary(w http.ResponseWriter, r *http.Request) {
	content, err := ioutil.ReadFile("./config.json")
	utils.HandleErrorVar(err)

	var payload AminoAcids
	utils.HandleErrorVar(json.Unmarshal(content, &payload))
}
