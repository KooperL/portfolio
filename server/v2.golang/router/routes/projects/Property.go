package projects

import (
	"kooperlingohr/portfolio/router/middleware/responses"
	"net/http"
)

func Property(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		data := `{"data":{"highest":[{"count":2,"desirability":26.456,"distcc":394855,"meanGradient":-150,"meanMeans":14925,"suburb":"chinkapook"},{"count":4,"desirability":15.065,"distcc":375049,"meanGradient":-3349,"meanMeans":24895,"suburb":"lascelles"},{"count":2,"desirability":8.091,"distcc":396476,"meanGradient":-32000,"meanMeans":49000,"suburb":"netherby"},{"count":5,"desirability":6.428,"distcc":478826,"meanGradient":-1747,"meanMeans":74495,"suburb":"underbool"},{"count":13,"desirability":6.225,"distcc":404246,"meanGradient":285,"meanMeans":64939,"suburb":"rainbow"}],"stats":{"IQR":451005,"Max":65000000,"Min":10900,"Q1":398750,"Q3":849755,"median":593723}},"success":true}
		`
		responses.BuildSuccessResponse(w, data)
	}
}
