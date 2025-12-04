package main

import (
	"aoc/helpers"
	"fmt"
)

func SolveDay04Part1() {
	fmt.Println("Solving Part 1")
	rolls, _ := ConstructRollsMatrix()
	result := 0
	for i := 0; i < len(rolls); i++ {
		for j := 0; j < len(rolls[0]); j++ {
			if rolls[i][j] == 0 {
				continue
			}

			adjacentRolls := CountAdjacentRolls(rolls, i, j)
			if adjacentRolls < 4 {
				result += 1
			}
		}
	}

	fmt.Println("Result:", result)
}

func SolveDay04Part2() {
	fmt.Println("Solving Part 2")
	rolls, _ := ConstructRollsMatrix()
	result := 0

	for {
		nextRolls := rolls

		count := 0
		for i := 0; i < len(rolls); i++ {
			for j := 0; j < len(rolls[0]); j++ {
				if rolls[i][j] == 0 {
					continue
				}

				adjacentRolls := CountAdjacentRolls(rolls, i, j)
				if adjacentRolls < 4 {
					count += 1
					nextRolls[i][j] = 0
				}
			}
		}

		if count == 0 {
			break
		}

		rolls = nextRolls
		result += count
	}

	fmt.Println("Result:", result)
}

func ConstructRollsMatrix() ([][]int, error) {
	lines, err := helpers.ReadLines("04", "2025", helpers.Actual)
	if err != nil {
		fmt.Println("Error reading lines:", err)
		return nil, err
	}
	fmt.Println("Read", len(lines), "lines")

	rows := len(lines)
	cols := len(lines[0])

	rolls := make([][]int, rows)
	for i := 0; i < rows; i++ {
		rolls[i] = make([]int, cols)
		for j := 0; j < cols; j++ {
			if lines[i][j] == '@' {
				rolls[i][j] = 1
			} else {
				rolls[i][j] = 0
			}
		}
	}

	return rolls, nil
}

func CountAdjacentRolls(rolls [][]int, row int, col int) int {
	count := 0
	directions := [8][2]int{
		{-1, -1}, {-1, 0}, {-1, 1},
		{0, -1}, {0, 1},
		{1, -1}, {1, 0}, {1, 1},
	}

	for _, d := range directions {
		if IsThereRoll(rolls, row+d[0], col+d[1]) {
			count += 1
		}
	}

	return count
}

func IsThereRoll(rolls [][]int, row int, col int) bool {
	if row < 0 || row >= len(rolls) || col < 0 || col >= len(rolls[0]) {
		return false
	}

	return rolls[row][col] == 1
}

func TransformFuncToPrintMatrix(item int) string {
	if item == 1 {
		return "@"
	}
	return "."
}
