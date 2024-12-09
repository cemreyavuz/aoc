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

const solvePart2 = solve("09", "2024", "actual", (lines) => {
  let decoded = lines[0].split("").reduce((acc, cur, index) => {
    const char = index % 2 === 0 ? `${index / 2}` : ".";
    return acc.concat({
      char,
      count: parseInt(cur),
    });
  }, [] as { char: string; count: number }[]);

  let rightIndex = decoded.length - 1;
  while (rightIndex >= 0) {
    if (decoded[rightIndex].char === ".") {
      rightIndex -= 1;
      continue;
    }
    let leftIndex = 0;
    while (leftIndex <= rightIndex) {
      const right = decoded[rightIndex];
      const left = decoded[leftIndex];
      if (left.char !== ".") {
        leftIndex += 1;
        continue;
      }
      if (left.count === right.count) {
        left.char = right.char;
        right.char = ".";
        break;
      } else if (left.count > right.count) {
        decoded = [
          ...decoded.slice(0, leftIndex),
          { ...right },
          {
            char: ".",
            count: left.count - right.count,
          },
          ...decoded.slice(leftIndex + 1),
        ];
        right.char = ".";
        rightIndex += 1;
        break;
      } else {
        leftIndex += 1;
        continue;
      }
    }
    rightIndex -= 1;
  }

  let itemCount = 0;
  let sum: bigint = 0n;
  for (let i = 0; i < decoded.length; i += 1) {
    const item = decoded[i];
    if (item.char === ".") {
      itemCount += item.count;
      continue;
    }
    for (let c = 0; c < item.count; c += 1) {
      const realIndex = itemCount + c;
      sum = sum + BigInt(item.char) * BigInt(realIndex);
    }
    itemCount += item.count;
  }

  return sum;
});

solvePart1();
solvePart2();
