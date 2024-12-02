import { readLines } from "../../helpers/read-lines.ts";

const getReports = (): number[][] => {
  const lines = readLines("02", "2024", "actual");
  const reports = lines.map((line) =>
    line.split(" ").map((str) => parseInt(str))
  );
  return reports;
};

const isSafeReport = (
  report: number[],
  safeCheckFn?: (report: number[], index: number) => boolean
) => {
  const direction = report[1] - report[0] > 0 ? 1 : -1;
  for (let i = 0; i < report.length - 1; i += 1) {
    const cur = report[i];
    const next = report[i + 1];
    const diff = (next - cur) * direction;
    if (diff > 3 || diff < 1) {
      return safeCheckFn?.(report, i) ?? false;
    }
  }
  return true;
};

const isToleratedSafeReport = (report: number[]) => {
  return isSafeReport(report, (item, index) => {
    return (
      isSafeReport([...report.slice(0, index), ...report.slice(index + 1)]) ||
      isSafeReport([...report.slice(0, index + 1), ...report.slice(index + 2)]) ||
      isSafeReport([...report.slice(0, index - 1), ...report.slice(index)])
    );
  })
};

const solve = (solveFn: (report: number[]) => boolean): number => {
  const reports = getReports();
  const sum = reports.reduce((acc, cur) => {
    if (solveFn(cur)) {
      return acc + 1;
    }
    return acc;
  }, 0);
  return sum;
}

const solvePart1 = () => {
  const sum = solve(isSafeReport);
  console.log(sum);
};

const solvePart2 = () => {
  const sum = solve(isToleratedSafeReport);
  console.log(sum);
};

solvePart1();
solvePart2();
