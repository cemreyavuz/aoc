package main

import (
	"aoc/helpers"
	"fmt"
)

func main() {
	SolvePart1()
}

func SolvePart1() {
	fmt.Println("Solving Part 1")

	lines, err := helpers.ReadLines("03", "2025", helpers.Actual)
	if err != nil {
		fmt.Println("Error reading lines:", err)
		return
	}
	fmt.Println("Read", len(lines), "lines")

	result := 0
	for i := 0; i < len(lines); i++ {
		line := lines[i]

		biggestFirstDigit := -1
		biggestSecondDigit := -1
		for j := 0; j < len(line)-1; j++ {
			curDigit := int(line[j] - '0')
			nextDigit := int(line[j+1] - '0')
			if curDigit > biggestFirstDigit {
				biggestFirstDigit = curDigit
				biggestSecondDigit = nextDigit
			} else if curDigit > biggestSecondDigit {
				biggestSecondDigit = curDigit
			}
		}

		lastDigit := int(line[len(line)-1] - '0')
		biggestSecondDigit = max(biggestSecondDigit, lastDigit)

		num := biggestFirstDigit*10 + biggestSecondDigit
		result += num
	}

	fmt.Println("Result:", result)
}
