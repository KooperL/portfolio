package utils

import (
	"net/http"
)

func HandleErrorAsResponse(w http.ResponseWriter, err error) {
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		panic(err)
	}
}

// func HandleErrorDeconstruct[T any](data T, err error) T {
// 	if err != nil {
// 		// handle the error
// 		HandleErrorVar(err)
// 		return nil
// 	}
// 	return data
// }

func HandleErrorVar(err error) {
	if err != nil {
		// panic(fmt.Errorf("error message"))
		panic(err)
	}
}
