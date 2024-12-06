import { solve } from "../../helpers/solve.ts";

const DIRECTIONS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const getNextDirection = (directionIndex: number) => {
  return (directionIndex + 1) % 4;
};

const getNextPosition = (
  position: [number, number],
  directionIndex: number
): [number, number] => {
  const direction = DIRECTIONS[directionIndex];
  return [position[0] + direction[0], position[1] + direction[1]];
};

type Position = [number, number];

const solvePart1 = solve("06", "2024", "actual", (lines) => {
  const matrix = lines.map((line) => line.split(""));
  let startPosition: Position = [-1, -1];
  for (let i = 0; i < matrix.length && startPosition[0] === -1; i += 1) {
    for (let j = 0; j < matrix[0].length && startPosition[0] === -1; j += 1) {
      if (matrix[i][j] === "^") {
        startPosition = [i, j];
      }
    }
  }

  const visited: Record<`${number}-${number}`, boolean> = {};

  let [i, j] = startPosition;
  let directionIndex = 0;
  while (true) {
    visited[`${i}-${j}`] = true;
    const [nextI, nextJ] = getNextPosition([i, j], directionIndex);

    if (
      nextI < 0 ||
      nextI >= matrix.length ||
      nextJ < 0 ||
      nextJ >= matrix[0].length
    ) {
      break;
    }

    if (matrix[nextI][nextJ] === "#") {
      directionIndex = getNextDirection(directionIndex);
    } else {
      i = nextI;
      j = nextJ;
    }
  }
  const count = Object.keys(visited).length;

  return count;
});

solvePart1();
