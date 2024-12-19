import { solve } from "../../helpers/solve.ts";

const solvePart1 = solve("19", "2024", "actual", (lines) => {
  const patterns = lines[0].split(", ").reduce((acc, cur) => {
    acc[cur] = true;
    return acc;
  }, {});

  const designs = lines.slice(2);
  const dp: Record<string, boolean> = {};

  const isPossible = (design: string) => {
    if (dp[design] !== undefined) {
      return dp[design];
    }

    let result = false;
    if (design.length === 0) {
      result = true;
    } else {
      result = Array(design.length)
        .fill(0)
        .some((_, index) => {
          const left = design.slice(0, index + 1);
          const right = design.slice(index + 1);
          if (patterns[left]) {
            return isPossible(right);
          }
          return false;
        });
    }
    dp[design] = result;
    return result;
  };

  const sum = designs.reduce((acc, design) => {
    const possible = isPossible(design);
    return acc + (possible ? 1 : 0);
  }, 0);

  return sum;
});

const solvePart2 = solve("19", "2024", "actual", (lines) => {
  const patterns = lines[0].split(", ").reduce((acc, cur) => {
    acc[cur] = true;
    return acc;
  }, {});

  const designs = lines.slice(2);
  const dp: Record<string, number> = {};

  const getPossibleCount = (design: string) => {
    if (dp[design] !== undefined) {
      return dp[design];
    }

    let result = 0;
    if (design.length === 0) {
      result = 1;
    } else {
      result = Array(design.length)
        .fill(0)
        .reduce((acc, _, index) => {
          const left = design.slice(0, index + 1);
          const right = design.slice(index + 1);
          if (patterns[left]) {
            return acc + getPossibleCount(right);
          }
          return acc;
        }, 0);
    }
    dp[design] = result;
    return result;
  };

  const sum = designs.reduce((acc, design) => {
    const count = getPossibleCount(design);
    return acc + count;
  }, 0);

  return sum;
});

solvePart1();
solvePart2();
