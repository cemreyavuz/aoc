package main

import (
	"aoc/helpers"
	"fmt"
	"slices"
	"strconv"
	"strings"
)

func SolveDay06Part1() {
	fmt.Println("Solving Part 1")

	lines, err := helpers.ReadLines("06", "2025", helpers.Actual)
	if err != nil {
		fmt.Println("Error reading lines:", err)
		return
	}
	fmt.Println("Read", len(lines), "lines")

	operators := []string{}
	nums := [][]int{}
	for i, line := range lines {
		seq := func(yield func(string) bool) {
			parts := strings.Split(line, " ")
			for _, part := range parts {
				if part == "" {
					continue
				}
				if !yield(part) {
					return
				}
			}
		}
		split := slices.Collect(seq)

		if i == len(lines)-1 {
			operators = split
		} else {
			mapToInt := func(yield func(int) bool) {
				for _, s := range split {
					num, _ := strconv.Atoi(s)
					if !yield(num) {
						return
					}
				}
			}
			nums = append(nums, slices.Collect(mapToInt))
		}
	}

	result := 0
	for i := 0; i < len(operators); i += 1 {
		total := nums[0][i]
		op := operators[i]
		for n := 1; n < len(nums); n += 1 {
			num := nums[n][i]
			if op == "+" {
				total += num
			} else if op == "*" {
				total *= num
			}
		}
		result += total
	}

	fmt.Println("Result:", result)
}
