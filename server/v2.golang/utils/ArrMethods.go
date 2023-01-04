package utils

func Sum[T int | float64](array []T) T {
	var result T
	result = 0
	for _, v := range array {
		result += v
	}
	return result
}

func Includes[T string](arr []T, target T) bool {
	for _, val := range arr {
		// if val, ok := arr[symbol]; ok {
		if val == target {
			return true
		}
	}
	return false
}

func ShortestArray[T any](arr1, arr2 []T) ([]T, []T) {
	if len(arr1) < len(arr2) {
		return arr1, arr2
	}
	return arr2, arr1
}
