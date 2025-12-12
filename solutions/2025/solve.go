package main

import (
	"fmt"
	"time"
)

func main() {
	start := time.Now()

	SolveDay08Part1()
	// SolveDay08Part2()

	duration := time.Since(start)
	fmt.Println("\nTotal execution time:", duration)
}
