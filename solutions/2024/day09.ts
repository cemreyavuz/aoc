import { solve } from "../../helpers/solve.ts";

const solvePart1 = solve("09", "2024", "actual", (lines) => {
  const decoded = lines[0].split("").reduce((acc, cur, index) => {
    const char = index % 2 === 0 ? `${index / 2}` : ".";
    return acc.concat(Array(parseInt(cur)).fill(char));
  }, [] as string[]);

  let leftIndex = 0;
  let rightIndex = decoded.length - 1;
  while (true) {
    while (true) {
      if (decoded[leftIndex] === ".") {
        break;
      }
      leftIndex += 1;
    }

    while (true) {
      if (decoded[rightIndex] !== ".") {
        break;
      }
      rightIndex -= 1;
    }

    if (rightIndex <= leftIndex) {
      break;
    }
    decoded[leftIndex] = decoded[rightIndex];
    decoded[rightIndex] = ".";
  }

  const trimmed = decoded.slice(0, leftIndex);
  const result = trimmed.reduce((acc, cur, index) => {
    return acc + BigInt(cur) * BigInt(index);
  }, BigInt(0));

  return result;
});

solvePart1();
