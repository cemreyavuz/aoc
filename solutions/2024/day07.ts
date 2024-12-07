import { solve } from "../../helpers/solve.ts";

const parseInput = (lines: string[]): [number, number[]][] => {
  return lines.map(
    (line) =>
      line.split(": ").map((item, index) => {
        return index === 0
          ? parseInt(item)
          : item.split(" ").map((str) => parseInt(str));
      }) as [number, number[]]
  );
};

const isPossible = (
  target: number,
  nums: number[],
  current: number
): boolean => {
  if (current === 0) {
    return isPossible(target, nums.slice(1), nums[0]);
  }

  if (current > target) {
    return false;
  }

  if (nums.length === 0) {
    return target === current;
  }

  return (
    isPossible(target, nums.slice(1), current + nums[0]) ||
    isPossible(target, nums.slice(1), current * nums[0])
  );
};

const isPossibleExtended = (
  target: number,
  nums: number[],
  current: number
): boolean => {
  if (current === 0) {
    return isPossibleExtended(target, nums.slice(1), nums[0]);
  }

  if (current > target) {
    return false;
  }

  if (nums.length === 0) {
    return target === current;
  }

  return (
    isPossibleExtended(target, nums.slice(1), current + nums[0]) ||
    isPossibleExtended(target, nums.slice(1), current * nums[0]) ||
    isPossibleExtended(target, nums.slice(1), parseInt(`${current}${nums[0]}`))
  );
};

const solvePart1 = solve("07", "2024", "example", (lines) => {
  const parsed = parseInput(lines);
  const sum = parsed.reduce((acc, [target, nums]) => {
    const possible = isPossible(target, nums, 0);
    return possible ? acc + target : acc;
  }, 0);

  return sum;
});

const solvePart2 = solve("07", "2024", "actual", (lines) => {
  const parsed = parseInput(lines);
  const sum = parsed.reduce((acc, [target, nums]) => {
    const possible = isPossibleExtended(target, nums, 0);
    return possible ? acc + target : acc;
  }, 0);

  return sum;
});

solvePart1();
solvePart2();
