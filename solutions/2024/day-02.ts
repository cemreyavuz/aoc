import { readLines } from "../../helpers/read-lines.ts";

const isSafeReport = (report: number[]) => {
  if (report[0] === report[1]) {
    return false;
  }
  const direction = report[1] - report[0] > 0 ? 1 : -1;
  for (let i = 1; i < report.length; i += 1) {
    const cur = report[i];
    const prev = report[i - 1];
    const diff = (cur - prev) * direction;
    if (diff > 3 || diff < 1) {
      return false;
    }
  }
  return true;
};

const solvePart1 = () => {
  const lines = readLines("02", "2024", "actual");
  const reports = lines.map((line) =>
    line.split(" ").map((str) => parseInt(str))
  );
  const sum = reports.reduce((acc, cur) => {
    if (isSafeReport(cur)) {
      return acc + 1;
    }
    return acc;
  }, 0);
  console.log(sum);
};

solvePart1();
