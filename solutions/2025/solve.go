package main

import (
	"fmt"
	"time"
)

func main() {
	start := time.Now()

	SolveDay05Part1()
	// SolveDay05Part2()

	duration := time.Since(start)
	fmt.Println("\nTotal execution time:", duration)
}
