import { readLines } from "../../helpers/read-lines.ts";

const solvePart1 = () => {
  const lines = readLines("01", "2024", "actual");
  const ids = lines.map((line) =>
    line.split("   ").map((str) => parseInt(str))
  );
  const [leftArr, rightArr] = ids.reduce(
    (acc, cur) => {
      acc[0].push(cur[0]);
      acc[1].push(cur[1]);
      return acc;
    },
    [[] as number[], [] as number[]]
  );
  leftArr.sort();
  rightArr.sort();
  const distances = leftArr.map((left, index) =>
    Math.abs(left - rightArr[index])
  );
  const sum = distances.reduce((acc, cur) => acc + cur, 0);
  console.log(sum);
};

solvePart1();
