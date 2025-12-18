package main

import (
	"aoc/helpers"
	"fmt"
	"math"
	"strconv"
	"strings"
)

func SolveDay10Part1() {
	fmt.Println("Solving Part 1")

	lines, err := helpers.ReadLines("10", "2025", helpers.Actual)
	if err != nil {
		fmt.Println("Error reading lines:", err)
		return
	}
	fmt.Println("Read", len(lines), "lines")

	result := float64(0)
	for _, line := range lines {
		split := strings.Split(line, " ")
		diagram := ParseDiagram(split[0])
		bws := ParseButtonWritingSchematics(strings.Join(split[1:len(split)-1], " "))

		emptyState := strings.Repeat(".", len(diagram))
		targetState := strings.Join(diagram, "")

		var dfs func(i int, c int, state string) float64
		dfs = func(i int, c int, state string) float64 {
			if state == targetState {
				return float64(c)
			}

			if i == len(bws) {
				return float64(len(state))
			}

			nextStateIfPressed := PressButton(state, bws[i])
			l := math.Min(dfs(i+1, c, state), dfs(i+1, c+1, nextStateIfPressed))
			return l
		}

		min := dfs(0, 0, emptyState)
		result += min
	}

	fmt.Println("Result:", result)
}

func ParseDiagram(raw string) []string {
	return strings.Split(raw, "")[1 : len(raw)-1]
}

func ParseButtonWritingSchematics(raw string) [][]int {
	split := strings.Split(raw, " ")
	arr := make([][]int, len(split))
	for si, s := range split {
		ls := strings.Split(strings.TrimSuffix(strings.TrimPrefix(s, "("), ")"), ",")
		nums := make([]int, len(ls))
		for li, l := range ls {
			num, _ := strconv.Atoi(l)
			nums[li] = num
		}
		arr[si] = nums
	}

	return arr
}

func ParseJoltageRequirements(raw string) []int {
	split := strings.Split(strings.TrimSuffix(strings.TrimPrefix(raw, "{"), "}"), ",")
	nums := make([]int, len(split))
	for i, s := range split {
		num, _ := strconv.Atoi(s)
		nums[i] = num
	}

	return nums
}

func PressButton(state string, schematic []int) string {
	split := strings.Split(state, "")
	for _, b := range schematic {
		if split[b] == "." {
			split[b] = "#"
		} else if split[b] == "#" {
			split[b] = "."
		} else {
			panic("Invalid button state")
		}
	}
	return strings.Join(split, "")
}
