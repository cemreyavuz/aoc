import { InputType, readLines } from "./read-lines.ts";

export const solve = (
  day: string,
  year: string,
  type: InputType,
  callback: (lines: string[]) => unknown
): (() => void) => {
  return () => {
    console.log(`Solving ${year}/${day} (${type})`);
    const t0 = performance.now();
    const lines = readLines(day, year, type);
    const t1 = performance.now();
    console.log(`Took ${(t1 - t0).toFixed(3)} ms to read the input`);
    const result = callback(lines);
    console.log(`Result ${result}`);
    const t2 = performance.now();
    console.log(`Took ${(t2 - t1).toFixed(3)} ms to solve`);
    console.log("");
  };
};
