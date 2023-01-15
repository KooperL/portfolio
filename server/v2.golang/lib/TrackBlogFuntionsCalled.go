package lib

import (
	"kooperlingohr/portfolio/controllers/database"
	"time"
)

func TrackForumFunctionsCalled(forumUsername, session_id, funct string) {
	datetime := time.Now().Format("2006-01-02 15:04:05.000000")
	insert := `INSERT INTO forum_user_tracking VALUES (
    ?, ?, ?, ?, ?
  );`
	database.Insert(insert, []interface{}{nil, datetime, forumUsername, session_id, funct})

}
