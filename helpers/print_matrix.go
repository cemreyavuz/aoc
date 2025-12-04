package helpers

import (
	"fmt"
	"strings"
)

// PrintMatrix prints a 2D matrix of any type
// transformFunc is optional - if provided, it will be called on each item before printing
// separator is optional - if provided, it will be used to separate items in a row
func PrintMatrix[T any](matrix [][]T, transformFunc func(T) string, separator string) {
	for _, row := range matrix {
		var items []string
		for _, item := range row {
			if transformFunc != nil {
				items = append(items, transformFunc(item))
			} else {
				items = append(items, fmt.Sprint(item))
			}
		}
		fmt.Println(strings.Join(items, separator))
	}
}
