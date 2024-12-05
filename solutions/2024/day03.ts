import { readLines } from "../../helpers/read-lines.ts";
import { solve } from "../../helpers/solve.ts";

enum ExpectedState {
  Opening,
  Comma,
  Closing,
}

const sanitizeProgram = (
  program: string,
  startIndex = 0,
  endIndex = program.length
) => {
  let sum = 0;
  let state: ExpectedState = ExpectedState.Opening;
  let marker = -1;
  let firstNumber = 0;
  let secondNumber = 0;
  for (let i = startIndex; i <= endIndex; i += 1) {
    const char = program.charAt(i);
    switch (state) {
      case ExpectedState.Opening:
        if (i >= endIndex - 4) {
          break;
        }
        if (program.substring(i, i + 4) === "mul(") {
          state = ExpectedState.Comma;
          i += 3;
          marker = i + 1;
          continue;
        } else {
          continue;
        }
      case ExpectedState.Comma:
        if (marker === i && char === ",") {
          state = ExpectedState.Opening;
          continue;
        } else if (char === ",") {
          firstNumber = parseInt(program.substring(marker, i));
          state = ExpectedState.Closing;
          marker = i + 1;
          continue;
        } else if (Number.isNaN(parseInt(char))) {
          state = ExpectedState.Opening;
          continue;
        } else {
          continue;
        }
      case ExpectedState.Closing:
        if (marker === i && char === ")") {
          state = ExpectedState.Opening;
          continue;
        } else if (char === ")") {
          secondNumber = parseInt(program.substring(marker, i));
          sum += firstNumber * secondNumber;
          state = ExpectedState.Opening;
          continue;
        } else if (Number.isNaN(parseInt(char))) {
          state = ExpectedState.Opening;
          continue;
        } else {
          continue;
        }
      default:
        throw new Error("unknown state");
    }
  }
  return sum;
};

const solvePart1 = solve("03", "2024", "actual", (lines) => {
  const sum = lines.reduce((acc, cur) => acc + sanitizeProgram(cur), 0);
  return sum;
});

const findNextDoInstruction = (program: string, startIndex: number) => {
  for (let i = startIndex; i < program.length; i += 1) {
    if (i > program.length - 4) {
      return -1;
    }
    if (program.substring(i, i + 4) === "do()") {
      return i + 4;
    }
  }
  return -1;
};

const findNextDontInstruction = (program: string, startIndex: number) => {
  for (let i = startIndex; i < program.length; i += 1) {
    if (i > program.length - 7) {
      return -1;
    }
    if (program.substring(i, i + 7) === "don't()") {
      return i + 7;
    }
  }
  return -1;
};

const getEnabledRanges = (program: string): number[][] => {
  let isEnabled = true;
  let prev = 0;
  const ranges: number[][] = [];
  for (let i = 0; i < program.length; ) {
    if (isEnabled) {
      const nextIndex = findNextDontInstruction(program, i);
      if (nextIndex === -1) {
        ranges.push([prev, program.length - 1]);
        break;
      } else {
        ranges.push([prev, nextIndex - 7]);
        i = nextIndex;
        isEnabled = false;
      }
    } else {
      const nextIndex = findNextDoInstruction(program, i);
      if (nextIndex === -1) {
        break;
      } else {
        prev = nextIndex;
        i = nextIndex;
        isEnabled = true;
      }
    }
  }
  return ranges;
};

const solvePart2 = solve("03", "2024", "actual", (lines) => {
  const sum = [lines.join("")].reduce((acc, cur) => {
    const enabledRanges = getEnabledRanges(cur);
    return (
      acc +
      enabledRanges.reduce(
        (innerAcc, range) =>
          innerAcc + sanitizeProgram(cur, range[0], range[1]),
        0
      )
    );
  }, 0);
  return sum;
});

solvePart1();
solvePart2();
