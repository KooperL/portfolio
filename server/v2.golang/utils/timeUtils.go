package utils

import (
	"time"
)

func GetTimeFormat() string {
	return "2006-01-02 15:04:05.000000"
}

// UnixTimestampForMinutes returns the Unix timestamp for x minutes from now
func TimeOffset(dt time.Time, offset int) int64 {
	// Add x minutes to the current time
	future := dt.Add(time.Duration(offset) * time.Minute)

	// Return the Unix timestamp for the future time
	return future.Unix()
}
