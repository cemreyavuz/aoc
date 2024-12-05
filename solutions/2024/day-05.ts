import { solve } from "../../helpers/solve.ts";

const parseInput = (
  lines: string[]
): [Record<string, number[]>, Record<string, number[]>, number[][]] => {
  const splitIndex = lines.findIndex((line) => line === "");
  const rulesForward = lines
    .slice(0, splitIndex)
    .map((line) => line.split("|").map((str) => parseInt(str)))
    .reduce((acc, cur) => {
      const [first, second] = cur;
      if (acc[first]) {
        acc[first].push(second);
      } else {
        acc[first] = [second];
      }
      return acc;
    }, {} as Record<string, number[]>);
  const rulesBackward = lines
    .slice(0, splitIndex)
    .map((line) => line.split("|").map((str) => parseInt(str)))
    .reduce((acc, cur) => {
      const [first, second] = cur;
      if (acc[second]) {
        acc[second].push(first);
      } else {
        acc[second] = [first];
      }
      return acc;
    }, {} as Record<string, number[]>);
  const updates = lines
    .slice(splitIndex + 1)
    .map((line) => line.split(",").map((str) => parseInt(str)));
  return [rulesForward, rulesBackward, updates];
};

const validateUpdates = (
  rulesForward: Record<string, number[]>,
  rulesBackward: Record<string, number[]>,
  updates: number[][]
): [number[], number[]] => {
  const correctIndexes: number[] = [];
  const incorrectIndexes: number[] = [];
  updates.forEach((update, index) => {
    const visited: Record<string, boolean> = {};
    const set = update.reduce((acc, cur) => {
      acc[cur] = true;
      return acc;
    }, {});
    const validUpdate = update.every((cur) => {
      const forward = rulesForward[cur] ?? [];
      const backward = rulesBackward[cur] ?? [];
      if (forward.some((f) => set[f] && visited[f])) {
        return false;
      }
      if (backward.some((b) => set[b] && !visited[b])) {
        return false;
      }
      visited[cur] = true;
      return true;
    });
    if (validUpdate) {
      correctIndexes.push(index);
    } else {
      incorrectIndexes.push(index);
    }
  });
  return [correctIndexes, incorrectIndexes];
};

const solvePart1 = solve("05", "2024", "actual", (lines) => {
  const [rulesForward, rulesBackward, updates] = parseInput(lines);

  const [correctIndexes] = validateUpdates(
    rulesForward,
    rulesBackward,
    updates
  );

  const sum = updates
    .filter((_, index) => {
      return correctIndexes.includes(index);
    })
    .map((update) => {
      const mid = Math.floor(update.length / 2);
      return update[mid];
    })
    .reduce((acc, cur) => acc + cur, 0);

  return sum;
});

solvePart1();
