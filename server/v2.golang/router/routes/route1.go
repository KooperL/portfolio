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
	"fmt"
	"kooperlingohr/portfolio/utils"
	"math/rand"
	"net/http"
	"os"
	"time"
)

type KeyValuePair struct {
	Key   string
	Value int
}

func Hello(w http.ResponseWriter, r *http.Request) {
	// Open the JSON file
	file, err := os.Open("data/data.json")
	utils.HandleErrorVar(err)
	defer file.Close()

	// Decode the JSON file into a map
	var data map[string]int
	utils.HandleErrorVar(json.NewDecoder(file).Decode(&data))

	// Select a random key-value pair from the map
	rand.Seed(time.Now().Unix())
	i := rand.Intn(len(data))
	key := fmt.Sprintf("%v", i)
	value := data[key]

	// Encode the key-value pair as JSON and write it to the response
	pair := KeyValuePair{key, value}
	utils.HandleErrorVar(json.NewEncoder(w).Encode(pair))
}
