package main

import (
	"aoc/helpers"
	"fmt"
	"sort"
	"strconv"
	"strings"
)

func SolveDay05Part1() {
	fmt.Println("Solving Part 1")

	lines, err := helpers.ReadLines("05", "2025", helpers.Actual)
	if err != nil {
		fmt.Println("Error reading lines:", err)
		return
	}
	fmt.Println("Read", len(lines), "lines")

	mode := 0
	ranges := [][]int{}
	ingredients := []int{}
	for i := 0; i < len(lines); i++ {
		line := lines[i]
		if line == "" {
			mode = 1
			continue
		}

		switch mode {
		case 0:
			arr := strings.Split(line, "-")
			first, _ := strconv.Atoi(arr[0])
			second, _ := strconv.Atoi(arr[1])
			ranges = append(ranges, []int{first, second})
		case 1:
			id, _ := strconv.Atoi(line)
			ingredients = append(ingredients, id)
		default:
			fmt.Printf("Unknown mode %d", mode)
		}
	}

	sort.Slice(ranges, func(i, j int) bool {
		return ranges[i][0] < ranges[j][0]
	})

	merged := [][]int{ranges[0]}
	for i := 1; i < len(ranges); i += 1 {
		cur := ranges[i]
		prev := merged[len(merged)-1]

		if cur[0] > prev[1] {
			merged = append(merged, cur)
			continue
		}

		prev[1] = max(prev[1], cur[1])
	}

	result := 0
	for _, ingredient := range ingredients {
		isValid := false
		for _, r := range merged {
			if ingredient >= r[0] && ingredient <= r[1] {
				isValid = true
				break
			}
		}

		if isValid {
			result += 1
		}
	}

	fmt.Println("Result:", result)
}
