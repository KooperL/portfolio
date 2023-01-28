package main

import (
	"fmt"
	"kooperlingohr/portfolio/controllers/database"
	"kooperlingohr/portfolio/mylog"
	"kooperlingohr/portfolio/router"
	"kooperlingohr/portfolio/utils"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

var logger *mylog.Logger

func init() {
	var err error
	logger, err = mylog.NewLogger("app.log")
	if err != nil {
		log.Fatal(err)
	}
	defer logger.Close()
}

func main() {
	utils.HandleErrorVar(database.InitDB())
	defer database.CloseDB()
	mux := router.SetupRouter()
	utils.HandleErrorVar(godotenv.Load("../.env"))
	log.Printf("Listening on port %v...", os.Getenv("DEV_PORT"))
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", os.Getenv("DEV_PORT")), mux))
}
