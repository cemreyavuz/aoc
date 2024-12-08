import { solve } from "../../helpers/solve.ts";

type Position = [number, number];
type Map = string[][];

const isValidPosition = (p: Position, m: Map): boolean => {
  return p[0] >= 0 && p[0] < m.length && p[1] >= 0 && p[1] < m[0].length;
};

const getAntinodesBasic = (
  s: Position,
  t: Position,
  map: string[][]
): Position[] => {
  const nextI = t[0] * 2 - s[0];
  const nextJ = t[1] * 2 - s[1];
  const nextPos: Position = [nextI, nextJ];
  return isValidPosition(nextPos, map) ? [nextPos] : [];
};

const getAntinodesExtended = (
  s: Position,
  t: Position,
  map: string[][]
): Position[] => {
  const positions: Position[] = [];
  let i = 0;
  while (true) {
    const nextI = t[0] * (i + 1) - s[0] * i;
    const nextJ = t[1] * (i + 1) - s[1] * i;
    const nextPos: Position = [nextI, nextJ];
    if (isValidPosition(nextPos, map)) {
      positions.push(nextPos);
      i += 1;
    } else {
      break;
    }
  }
  return positions;
};

const getAntennas = (map: string[][]): Record<string, Position[]> => {
  return map.reduce((acc, cur, i) => {
    cur.forEach((char, j) => {
      if (char !== ".") {
        acc[char] = acc[char] ? acc[char].concat([[i, j]]) : [[i, j]];
      }
    });
    return acc;
  }, {} as Record<string, Position[]>);
};

const getAntinodes = (
  map: string[][],
  antennas: Record<string, Position[]>,
  getAntinodes: (s: Position, t: Position, map: string[][]) => Position[]
): Record<string, boolean> => {
  const antinodes: Record<string, boolean> = {};
  Object.entries(antennas).forEach(([_, positions]) => {
    for (let i = 0; i < positions.length; i += 1) {
      for (let j = 0; j < positions.length; j += 1) {
        if (i === j) {
          continue;
        }
        const localAntionodes = getAntinodes(positions[i], positions[j], map);
        localAntionodes.forEach((a) => {
          antinodes[a.join("-")] = true;
        });
      }
    }
  });
  return antinodes;
};

const solvePart1 = solve("08", "2024", "actual", (lines) => {
  const map = lines.map((line) => line.split(""));
  const antennas = getAntennas(map);
  const antinodes = getAntinodes(map, antennas, getAntinodesBasic);

  return Object.keys(antinodes).length;
});

const solvePart2 = solve("08", "2024", "actual", (lines) => {
  const map = lines.map((line) => line.split(""));
  const antennas = getAntennas(map);
  const antinodes = getAntinodes(map, antennas, getAntinodesExtended);

  return Object.keys(antinodes).length;
});

solvePart1();
solvePart2();
