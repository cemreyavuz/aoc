package main

import (
	"aoc/helpers"
	"fmt"
	"strconv"
	"strings"
)

// This solution takes advantage of the specific input provided for the example.
// A more general solution would require a more complex approach.
func SolveDay12Part1() {
	fmt.Println("Solving Part 1")

	lines, err := helpers.ReadLines("12", "2025", helpers.Actual)
	if err != nil {
		fmt.Println("Error reading lines:", err)
		return
	}
	fmt.Println("Read", len(lines), "lines")

	areas := make(map[int]int)
	curIndex := -1
	result := 0
	for _, line := range lines {
		if strings.Contains(line, "x") {
			lineSplit := strings.Split(line, ": ")

			rawRegion := lineSplit[0]
			regionSplit := strings.Split(rawRegion, "x")
			x, _ := strconv.Atoi(regionSplit[0])
			y, _ := strconv.Atoi(regionSplit[1])
			area := x * y

			rawCounts := lineSplit[1]
			countsSplit := strings.Split(rawCounts, " ")
			requiredArea := 0
			for cI, countStr := range countsSplit {
				count, _ := strconv.Atoi(countStr)
				requiredArea += count * areas[cI]
			}

			if area >= requiredArea {
				result += 1
			}
		} else if strings.Contains(line, ":") {
			index, _ := strconv.Atoi(strings.Split(line, ":")[0])
			areas[index] = 0
			curIndex = index
		} else if strings.Contains(line, "#") {
			areas[curIndex] += strings.Count(line, "#")
		}
	}

	fmt.Println("Result:", result)
}
