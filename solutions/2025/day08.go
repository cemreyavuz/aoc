package main

import (
	"aoc/helpers"
	"fmt"
	"math"
)

func SolveDay08Part1() {
	fmt.Println("Solving Part 1")

	const IterationCount = 1000
	const MultiplyCount = 3

	lines, err := helpers.ReadLines("08", "2025", helpers.Actual)
	if err != nil {
		fmt.Println("Error reading lines:", err)
		return
	}
	fmt.Println("Read", len(lines), "lines")

	coordinates := ParseCoordinates(lines)
	distances := CalculateDistances(coordinates)
	connections := InitConnections(len(coordinates))

	for t := 0; t < IterationCount; t += 1 {
		smallestDistance := math.MaxFloat64
		smallestI := -1
		smallestJ := -1

		for i := 0; i < len(distances); i += 1 {
			for j := 0; j < len(distances); j += 1 {
				if i != j && distances[i][j] < smallestDistance {
					smallestDistance = distances[i][j]
					smallestI = i
					smallestJ = j
				}
			}
		}

		distances[smallestI][smallestJ] = math.MaxFloat64
		distances[smallestJ][smallestI] = math.MaxFloat64

		connections[smallestI][smallestJ] = true
		connections[smallestJ][smallestI] = true
	}

	circuits := GetCircuits(connections)

	result := 1
	for t := 0; t < MultiplyCount; t += 1 {
		max := 0
		maxIndex := -1
		for index, circuit := range circuits {
			if len(circuit) > max {
				max = len(circuit)
				maxIndex = index
			}
		}

		result *= max
		circuits = append(circuits[:maxIndex], circuits[maxIndex+1:]...)
	}

	fmt.Println("Result:", result)
}

func ParseCoordinates(lines []string) [][3]int {
	coordinates := make([][3]int, len(lines))
	for i := 0; i < len(lines); i += 1 {
		var x, y, z int
		fmt.Sscanf(lines[i], "%d,%d,%d", &x, &y, &z)
		coordinates[i] = [3]int{x, y, z}
	}

	return coordinates
}

func CalculateDistances(coordinates [][3]int) [][]float64 {
	distances := make([][]float64, len(coordinates))

	for i := 0; i < len(coordinates); i += 1 {
		distances[i] = make([]float64, len(coordinates))
		for j := 0; j < len(coordinates); j += 1 {
			if i > j {
				distances[i][j] = distances[j][i]
			} else if i == j {
				distances[i][j] = 0
			} else {
				dx := coordinates[i][0] - coordinates[j][0]
				dy := coordinates[i][1] - coordinates[j][1]
				dz := coordinates[i][2] - coordinates[j][2]
				distance := math.Sqrt(float64(dx*dx + dy*dy + dz*dz))
				distances[i][j] = distance
			}
		}
	}

	return distances
}

func InitConnections(size int) []map[int]bool {
	connections := make([]map[int]bool, size)
	for i := 0; i < size; i += 1 {
		connections[i] = make(map[int]bool)
	}

	return connections
}

func GetCircuits(connections []map[int]bool) []map[int]bool {
	visited := make(map[int]bool)
	circuits := []map[int]bool{}

	var getCircuit func(node int, acc map[int]bool) map[int]bool
	getCircuit = func(node int, acc map[int]bool) map[int]bool {
		if visited[node] {
			return acc
		}

		visited[node] = true
		acc[node] = true

		for neighbor := range connections[node] {
			acc = getCircuit(neighbor, acc)
		}

		return acc
	}

	for i := 0; i < len(connections); i += 1 {
		if visited[i] {
			continue
		}

		circuit := getCircuit(i, make(map[int]bool))
		circuits = append(circuits, circuit)
	}

	return circuits
}
