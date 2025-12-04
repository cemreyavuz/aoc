package main

import (
	"aoc/helpers"
	"fmt"
	"math"
)

func SolveDay03Part1() {
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

func SolveDay03Part2() {
	fmt.Println("Solving Part 2")

	lines, err := helpers.ReadLines("03", "2025", helpers.Actual)
	if err != nil {
		fmt.Println("Error reading lines:", err)
		return
	}
	fmt.Println("Read", len(lines), "lines")

	result := float64(0)

	for i := 0; i < len(lines); i++ {
		line := lines[i]

		num := float64(0)
		nextStartIndex := 0
		for d := 0; d < 12; d++ {
			curBiggestDigit := float64(-1)
			curBiggestDigitIndex := -1
			for j := nextStartIndex; j < len(line)-12+d+1; j++ {
				curDigit := float64(line[j] - '0')
				if curDigit > curBiggestDigit {
					curBiggestDigit = curDigit
					curBiggestDigitIndex = j
				}
			}

			nextStartIndex = curBiggestDigitIndex + 1
			num += curBiggestDigit * math.Pow10(12-d-1)
		}

		result += num
	}

	fmt.Printf("Result: %.0f\n", result)
}
