package main

import (
	"fmt"
	"kooperlingohr/portfolio/router"
	"kooperlingohr/portfolio/utils"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	mux := router.SetupRouter()
	utils.HandleErrorVar(godotenv.Load("../.env"))
	log.Printf("Listening on port %v...", os.Getenv("DEV_PORT"))
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", os.Getenv("DEV_PORT")), mux))
}
