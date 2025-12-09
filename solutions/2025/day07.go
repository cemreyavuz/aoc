package main

import (
	"aoc/helpers"
	"fmt"
	"strings"
)

func SolveDay07Part1() {
	fmt.Println("Solving Part 1")

	lines, err := helpers.ReadLines("07", "2025", helpers.Actual)
	if err != nil {
		fmt.Println("Error reading lines:", err)
		return
	}
	fmt.Println("Read", len(lines), "lines")

	result := 0

	prevLine := strings.Split(lines[0], "")

	for i := 1; i < len(lines); i += 1 {
		for j := 0; j < len(lines[i]); j += 1 {
			prev := prevLine[j]
			cur := lines[i][j]
			if prev == "S" || prev == "|" {
				if cur == '^' {
					result += 1
					prevLine[j-1] = "|"
					prevLine[j+1] = "|"
					prevLine[j] = "^"
				} else {
					prevLine[j] = "|"
				}
			}
		}
	}
	fmt.Println("Result:", result)
}
