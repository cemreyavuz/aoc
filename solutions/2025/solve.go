package main

import (
	"fmt"
	"time"
)

func main() {
	start := time.Now()

	SolveDay12Part1()
	// SolveDay12Part2()

	duration := time.Since(start)
	fmt.Println("\nTotal execution time:", duration)
}
