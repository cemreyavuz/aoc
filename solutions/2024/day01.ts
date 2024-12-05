import { readLines } from "../../helpers/read-lines.ts";

const getIds = (): [number[], number[]] => {
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
  return [leftArr, rightArr];
};

const solvePart1 = () => {
  const [leftArr, rightArr] = getIds();
  leftArr.sort();
  rightArr.sort();
  const distances = leftArr.map((left, index) =>
    Math.abs(left - rightArr[index])
  );
  const sum = distances.reduce((acc, cur) => acc + cur, 0);
  console.log(sum);
};

const solvePart2 = () => {
  const [leftArr, rightArr] = getIds();
  const occurrenceMap = rightArr.reduce((acc, cur) => {
    if (acc[cur]) {
      acc[cur] += 1;
    } else {
      acc[cur] = 1;
    }
    return acc;
  }, {} as Record<string, number>);
  const sum = leftArr.reduce((acc, cur) => {
    if (occurrenceMap[cur]) {
      return acc + cur * occurrenceMap[cur];
    }
    return acc;
  }, 0);
  console.log(sum);
};

solvePart1();
solvePart2();
