package main

import (
	"fmt"
	"time"
)

func main() {
	start := time.Now()

	SolveDay10Part1()
	// SolveDay10Part2()

	duration := time.Since(start)
	fmt.Println("\nTotal execution time:", duration)
}
