package helpers

import (
	"bufio"
	"os"
	"path"
)

type InputType string

const (
	Example InputType = "example"
	Actual  InputType = "actual"
)

func ReadLines(day string, year string, inputType InputType) ([]string, error) {
	// TODO(cemreyavuz): construct the file path better
	filename := "day" + day + "-" + string(inputType) + ".txt"

	filepath := path.Join("inputs", year, filename)

	file, err := os.Open(filepath)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var lines []string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}

	if err := scanner.Err(); err != nil {
		return nil, err
	}

	return lines, nil
}
