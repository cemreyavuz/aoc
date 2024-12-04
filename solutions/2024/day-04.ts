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

const search = (
  matrix: string[][],
  i: number,
  j: number,
  searchTerm: string
): number => {
  if (matrix[i][j] !== searchTerm.charAt(0)) {
    return 0;
  }

  const count = DIRECTIONS.reduce((acc, cur) => {
    for (let s = 1; s < searchTerm.length; s += 1) {
      if (
        !isExpectedChar(
          matrix,
          i,
          j,
          searchTerm.charAt(s),
          multiplyDirection(cur, s)
        )
      ) {
        return acc;
      }
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
        count += search(matrix, i, j, "XMAS");
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
