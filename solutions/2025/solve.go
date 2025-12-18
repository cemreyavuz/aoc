package main

import (
	"fmt"
	"time"
)

func main() {
	start := time.Now()

	// SolveDay11Part1()
	SolveDay11Part2()

	duration := time.Since(start)
	fmt.Println("\nTotal execution time:", duration)
}
