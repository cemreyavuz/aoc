import { readLines } from "../../helpers/read-lines.ts";

const DIRECTIONS = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

const isValidCoordinate = (
  matrix: string[][],
  i: number,
  j: number
): boolean => {
  return i >= 0 && j >= 0 && i < matrix.length && j < matrix[0].length;
};

const isExpectedChar = (
  matrix: string[][],
  i: number,
  j: number,
  char: string,
  direction: number[]
): boolean => {
  const curI = i + direction[0];
  const curJ = j + direction[1];
  if (!isValidCoordinate(matrix, curI, curJ)) {
    return false;
  }
  return matrix[curI][curJ] === char;
};

const multiplyDirection = (direction: number[], factor: number): number[] => {
  return direction.map((item) => item * factor);
};

const searchXmas = (matrix: string[][], i: number, j: number): number => {
  if (matrix[i][j] !== "X") {
    return 0;
  }

  const count = DIRECTIONS.reduce((acc, cur) => {
    if (!isExpectedChar(matrix, i, j, "M", cur)) {
      return acc;
    }
    if (!isExpectedChar(matrix, i, j, "A", multiplyDirection(cur, 2))) {
      return acc;
    }
    if (!isExpectedChar(matrix, i, j, "S", multiplyDirection(cur, 3))) {
      return acc;
    }
    return acc + 1;
  }, 0);

  return count;
};

const countOccurrence = (matrix: string[][]): number => {
  let count = 0;
  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix[0].length; j += 1) {
      if (matrix[i][j] === "X") {
        count += searchXmas(matrix, i, j);
      }
    }
  }
  return count;
};

const solvePart1 = () => {
  const lines = readLines("04", "2024", "actual");
  const matrix = lines.map((line) => line.split(""));
  const count = countOccurrence(matrix);
  console.log(count);
};

solvePart1();
