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
  position: Position,
  directionIndex: number
): Position => {
  const direction = DIRECTIONS[directionIndex];
  return [position[0] + direction[0], position[1] + direction[1]];
};

type Position = [number, number];
type Visited = Record<`${number}-${number}`, number[]>;

const getVisitedPositions = (
  startPosition: Position,
  matrix: string[][]
): { status: 0 | 1; visited: Visited } => {
  const visited: Visited = {};

  let [i, j] = startPosition;
  let directionIndex = 0;
  while (true) {
    if (visited[`${i}-${j}`]?.includes(directionIndex)) {
      return { status: 1, visited };
    }

    if (visited[`${i}-${j}`]) {
      visited[`${i}-${j}`].push(directionIndex);
    } else {
      visited[`${i}-${j}`] = [directionIndex];
    }
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

  return { status: 0, visited };
};

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
  const { visited } = getVisitedPositions(startPosition, matrix);
  const count = Object.keys(visited).length;

  return count;
});

const solvePart2 = solve("06", "2024", "actual", (lines) => {
  const matrix = lines.map((line) => line.split(""));
  let startPosition: Position = [-1, -1];
  for (let i = 0; i < matrix.length && startPosition[0] === -1; i += 1) {
    for (let j = 0; j < matrix[0].length && startPosition[0] === -1; j += 1) {
      if (matrix[i][j] === "^") {
        startPosition = [i, j];
      }
    }
  }
  const { visited } = getVisitedPositions(startPosition, matrix);
  const positions = Object.keys(visited).map((key) =>
    key.split("-").map((str) => parseInt(str))
  ) as Position[];

  let count = 0;
  for (let i = 0; i < positions.length; i += 1) {
    const p = positions[i];
    matrix[p[0]][p[1]] = "#";
    const { status } = getVisitedPositions(startPosition, matrix);
    if (status !== 0) {
      count += 1;
    }
    matrix[p[0]][p[1]] = ".";
  }

  return count;
});

solvePart1();
solvePart2();
