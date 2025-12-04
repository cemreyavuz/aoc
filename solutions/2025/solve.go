package main

import (
	"fmt"
	"time"
)

func main() {
	start := time.Now()

	SolveDay04Part1()
	SolveDay04Part2()

	duration := time.Since(start)
	fmt.Println("\nTotal execution time:", duration)
}
