package main

import (
	"log"
	"net/http"
	"kooperlingohr/portfolio/router"
)

func main() {
	mux := router.SetupRouter()
	log.Println("Listening on port 8000...")
	log.Fatal(http.ListenAndServe(":8000", mux))
}

