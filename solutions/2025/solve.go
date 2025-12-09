package main

import (
	"fmt"
	"time"
)

func main() {
	start := time.Now()

	SolveDay07Part1()
	// SolveDay07Part2()

	duration := time.Since(start)
	fmt.Println("\nTotal execution time:", duration)
}
