package main

import (
	"fmt"
	"time"
)

func main() {
	start := time.Now()

	SolveDay06Part1()
	SolveDay06Part2()

	duration := time.Since(start)
	fmt.Println("\nTotal execution time:", duration)
}
