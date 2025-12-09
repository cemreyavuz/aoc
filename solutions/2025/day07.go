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

func SolveDay07Part2() {
	fmt.Println("Solving Part 2")

	lines, err := helpers.ReadLines("07", "2025", helpers.Actual)
	if err != nil {
		fmt.Println("Error reading lines:", err)
		return
	}
	fmt.Println("Read", len(lines), "lines")

	prevLine := strings.Split(lines[0], "")
	prevCount := make([]int, len(prevLine))
	for i := 0; i < len(prevLine); i += 1 {
		prevCount[i] = 0
	}

	for i := 1; i < len(lines); i += 1 {
		nextLine := make([]string, len(prevLine))
		copy(nextLine, prevLine)
		nextCount := make([]int, len(prevLine))
		for i := 0; i < len(prevLine); i += 1 {
			nextCount[i] = 0
		}
		for j := 0; j < len(lines[i]); j += 1 {
			prev := prevLine[j]
			cur := lines[i][j]
			if prev == "S" {
				nextCount[j] = 1
				nextLine[j] = "|"
			} else if prev == "|" {
				if cur == '^' {
					nextLine[j-1] = "|"
					nextLine[j+1] = "|"
					nextLine[j] = "^"
					nextCount[j-1] += prevCount[j]
					nextCount[j+1] += prevCount[j]
				} else {
					nextLine[j] = "|"
					nextCount[j] += prevCount[j]
				}
			}
		}
		prevCount = nextCount
		prevLine = nextLine
	}

	result := 0
	for i := 0; i < len(prevCount); i += 1 {
		result += prevCount[i]
	}

	fmt.Println("Result:", result)
}
