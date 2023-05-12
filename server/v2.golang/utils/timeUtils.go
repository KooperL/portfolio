package utils

import (
	"time"
)

func GetTimeFormat() string {
	return "2006-01-02 15:04:05.000000"
}

// UnixTimestampForMinutes returns the Unix timestamp for x minutes from now
func TimeOffset(dt time.Time, offset int) int64 {
	future := dt.Add(time.Duration(offset) * time.Minute)
	return future.Unix()
}

func CorrectSqliteParse(t time.Time) time.Time {
	offset := -660
	return t.Add(time.Duration(offset) * time.Minute)
}
