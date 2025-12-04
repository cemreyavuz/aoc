package main

import (
	"fmt"
	"time"
)

func main() {
	start := time.Now()

	SolveDay03Part1()
	SolveDay03Part2()

	duration := time.Since(start)
	fmt.Println("\nTotal execution time:", duration)
}
