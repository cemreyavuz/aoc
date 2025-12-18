package main

import (
	"aoc/helpers"
	"fmt"
	"strings"
)

func SolveDay11Part1() {
	fmt.Println("Solving Part 1")

	lines, err := helpers.ReadLines("11", "2025", helpers.Actual)
	if err != nil {
		fmt.Println("Error reading lines:", err)
		return
	}
	fmt.Println("Read", len(lines), "lines")

	g := make(map[string]map[string]bool)

	for _, line := range lines {
		split := strings.Split(line, ": ")
		origin := split[0]
		target := strings.Split(split[1], " ")

		targets := make(map[string]bool)
		for _, t := range target {
			targets[t] = true
		}
		g[origin] = targets
	}

	var dfs func(node string) int
	dfs = func(node string) int {
		if node == "out" {
			return 1
		}

		count := 0

		for neighbor := range g[node] {
			count += dfs(neighbor)
		}

		return count
	}

	result := dfs("you")

	fmt.Println("Result:", result)
}
