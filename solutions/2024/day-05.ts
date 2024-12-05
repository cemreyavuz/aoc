import { solve } from "../../helpers/solve.ts";

const parseInput = (
  lines: string[]
): [Record<string, number[]>, Record<string, number[]>, number[][]] => {
  const splitIndex = lines.findIndex((line) => line === "");
  const { forward, backward } = lines
    .slice(0, splitIndex)
    .map((line) => line.split("|").map((str) => parseInt(str)))
    .reduce(
      (acc, cur) => {
        const [first, second] = cur;
        acc.forward[first] = acc.forward[first]
          ? acc.forward[first].concat(second)
          : [second];
        acc.backward[second] = acc.backward[second]
          ? acc.backward[second].concat(first)
          : [first];
        return acc;
      },
      { forward: {}, backward: {} } as {
        forward: Record<string, number[]>;
        backward: Record<string, number[]>;
      }
    );
  const updates = lines
    .slice(splitIndex + 1)
    .map((line) => line.split(",").map((str) => parseInt(str)));
  return [forward, backward, updates];
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
      visited[cur] = true;
      return (
        !rulesForward[cur]?.some((f) => set[f] && visited[f]) &&
        !rulesBackward[cur]?.some((b) => set[b] && !visited[b])
      );
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

const solvePart2 = solve("05", "2024", "actual", (lines) => {
  const [rulesForward, rulesBackward, updates] = parseInput(lines);
  const [_, incorrectIndexes] = validateUpdates(
    rulesForward,
    rulesBackward,
    updates
  );
  const sum = updates
    .filter((_, index) => incorrectIndexes.includes(index))
    .map((update) => {
      const toBeSorted = [...update];
      const sorted = toBeSorted.sort((a, b) => {
        const forward = rulesForward[a] ?? [];
        if (forward.includes(b)) {
          return -1;
        }
        const backward = rulesBackward[b] ?? [];
        if (backward.includes(b)) {
          return 1;
        }
        return 0;
      });
      return sorted;
    })
    .map((update) => {
      const mid = Math.floor(update.length / 2);
      return update[mid];
    })
    .reduce((acc, cur) => acc + cur, 0);
  return sum;
});

solvePart1();
solvePart2();
