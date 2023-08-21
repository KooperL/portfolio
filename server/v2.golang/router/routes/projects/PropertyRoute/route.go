package ProjectsPropertyRoute

import (
	"kooperlingohr/portfolio/router/middleware/responses"
	"net/http"
)

type HighestMap struct {
		Count        int     `json:"count"`
		Desirability float64 `json:"desirability"`
		Distcc       int     `json:"distcc"`
		MeanGradient int     `json:"meanGradient"`
		MeanMeans    int     `json:"meanMeans"`
		Suburb       string  `json:"suburb"`
	}

type StatsMap struct {
		IQR    int `json:"IQR"`
		Max    int `json:"Max"`
		Min    int `json:"Min"`
		Q1     int `json:"Q1"`
		Q3     int `json:"Q3"`
		Median int `json:"median"`
	}

type PropertyRes struct {
	Highest []HighestMap `json:"highest"`
	Stats StatsMap `json:"stats"`
}

func Route(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
    data := PropertyRes{
      Highest: []HighestMap{
        HighestMap {
          Count:        2,
		    	Desirability: 26.456,
		    	Distcc:       394855,
		    	MeanGradient: -150,
		    	MeanMeans:    14925,
		    	Suburb:       "chinkapook",
		    },
		    HighestMap {
		    	Count:        4,
		    	Desirability: 15.065,
		    	Distcc:       375049,
		    	MeanGradient: -3349,
		    	MeanMeans:    24895,
		    	Suburb:       "lascelles",
		    },
		    HighestMap {
		    	Count:        2,
		    	Desirability: 8.091,
		    	Distcc:       396476,
		    	MeanGradient: -32000,
		    	MeanMeans:    49000,
		    	Suburb:       "netherby",
		    },
		    HighestMap {
		    	Count:        5,
		    	Desirability: 6.428,
		    	Distcc:       478826,
		    	MeanGradient: -1747,
		    	MeanMeans:    74495,
		    	Suburb:       "underbool",
		    },
		    HighestMap {
		    	Count:        13,
		    	Desirability: 6.225,
		    	Distcc:       404246,
		    	MeanGradient: 285,
		    	MeanMeans:    64939,
		    	Suburb:       "rainbow",
		    },
      },
      Stats: StatsMap{
	    	IQR:    451005,
	    	Max:    65000000,
	    	Min:    10900,
	    	Q1:     398750,
	    	Q3:     849755,
	    	Median: 593723,
	    },
    }
		responses.BuildSuccessResponse(w, data)
	}
}
