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

func SolveDay06Part2() {
	fmt.Println("Solving Part 2")

	lines, err := helpers.ReadLines("06", "2025", helpers.Actual)
	if err != nil {
		fmt.Println("Error reading lines:", err)
		return
	}
	fmt.Println("Read", len(lines), "lines")

	nums := []int{}
	operators := []string{}
	for i := 0; i < len(lines[0]); i += 1 {
		num := ""
		for j := 0; j < len(lines)-1; j += 1 {
			c := lines[j][i]
			if c == ' ' {
				continue
			} else {
				num += string(c)
			}
		}

		if num != "" {
			n, _ := strconv.Atoi(num)
			nums = append(nums, n)
		} else {
			nums = append(nums, -1)
		}

		if lines[len(lines)-1][i] != ' ' {
			operators = append(operators, string(lines[len(lines)-1][i]))
		}
	}

	c := 0
	result := 0
	for _, op := range operators {
		total := nums[c]
		c += 1
		for ; c < len(nums); c += 1 {
			if nums[c] == -1 {
				break
			}
			if op == "*" {
				total *= nums[c]
			} else if op == "+" {
				total += nums[c]
			}
		}
		c += 1
		result += total
	}

	fmt.Println("Result:", result)
}
