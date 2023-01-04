package controllers

import (
	"fmt"
	"math/rand"
	"sort"
	"strings"
)

func MatchScoreSimple(s1, s2 string, match, mismatch, beginningGap, extendingGap int64) int64 {
	var score int64
	score = 0
	penaltyCount := 0

	for i := 0; i < len(s1); i++ {
		if s1[i] == s2[i] {
			score += match
			penaltyCount = 0
		} else {
			score -= mismatch
			if penaltyCount == 0 {
				score -= beginningGap
			} else {
				score -= extendingGap
			}
			penaltyCount++
		}
	}
	return score
}

func InsertBlank[T any](s string) string {
	// Generate a random position in the string
	pos := rand.Intn(len(s) + 1)
	fmt.Println(pos)
	return s[:pos] + "-" + s[pos:]
}

func DrawComparison(s1, s2 string) string {
	matchChar := []byte("|")[0]
	mismatchChar := []byte(" ")[0]

	var b strings.Builder
	for i := 0; i < len(s1); i++ {
		b.WriteByte(s1[i])
	}
	b.WriteByte('\n')
	for i := 0; i < len(s1); i++ {
		if s1[i] == s2[i] {
			b.WriteByte(matchChar)
		} else {
			b.WriteByte(mismatchChar)
		}
	}
	b.WriteByte('\n')
	for i := 0; i < len(s2); i++ {
		b.WriteByte(s2[i])
	}

	return b.String()
}

func matchScoreCombine(s1, s2 string) []float64 {
	score := 0.0
	s1Len, s2Len := len(s1), len(s2)
	s1Idx, s2Idx := 0, 0

	// Constants for score calculations
	const match = 10
	const mismatch = -1
	const subsequentMismatchPenalty = -0.5
	const firstMismatchPenalty = -2

	// Keep track of whether the last characters matched or not
	lastMatch := false

	// Compare characters until one of the strings is exhausted
	for s1Idx < s1Len && s2Idx < s2Len {
		// Check if the characters match
		if s1[s1Idx] == s2[s2Idx] {
			score += match
			lastMatch = true
		} else {
			// Characters do not match
			if lastMatch {
				// This is the first mismatch after a match
				score += firstMismatchPenalty
				lastMatch = false
			} else {
				// This is a subsequent mismatch
				score += subsequentMismatchPenalty
			}
		}
		s1Idx++
		s2Idx++
	}

	// Add dummy characters to the shorter string and compare again
	// to find the top three scoring combinations
	topScores := make([]float64, 0, 3)
	for i := 0; i < 3; i++ {
		// Calculate the score for this combination
		score = 0
		s1Idx, s2Idx = 0, 0
		lastMatch = false
		for s1Idx < s1Len && s2Idx < s2Len {
			if s1Idx < s1Len && s2Idx < s2Len {
				if s1[s1Idx] == s2[s2Idx] {
					score += match
					lastMatch = true
				} else {
					if lastMatch {
						score += firstMismatchPenalty
						lastMatch = false
					} else {
						score += subsequentMismatchPenalty
					}
				}
				s1Idx++
				s2Idx++
			} else if s1Idx < s1Len {
				// Add a dummy character to s2
				s1Idx++
				s2Idx++
				score += subsequentMismatchPenalty
			} else if s2Idx < s2Len {
				// Add a dummy character to s1
				s1Idx++
				s2Idx++
				score += subsequentMismatchPenalty
			}
		}

		// Add the score to the top scores slice
		topScores = append(topScores, score)

		// Sort the top scores slice in descending order
		sort.Slice(topScores, func(i, j int) bool {
			return topScores[i] > topScores[j]
		})

		// Trim the slice to only contain the top three scores
		// if len(topScores) > 3 {
		// 	topScores = topScores[:3]
		// }
	}

	return topScores
}
