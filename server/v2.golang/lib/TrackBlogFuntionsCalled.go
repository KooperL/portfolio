package lib

import (
	"kooperlingohr/portfolio/controllers/database"
	"time"
)

func TrackBlogFunctionsCalled(blogUsername, session_id, funct string) {
	datetime := time.Now().Format("2006-01-02 15:04:05.000000")
	insert := `INSERT INTO blog_user_trackingDB VALUES (
    ?, ?, ?, ?, ?
  );`
	database.Insert(insert, []interface{}{nil, datetime, blogUsername, session_id, funct})

}
