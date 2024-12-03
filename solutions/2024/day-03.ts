import { readLines } from "../../helpers/read-lines.ts";

enum ExpectedState {
  Opening,
  Comma,
  Closing,
}

const sanitizeProgram = (program: string) => {
  let sum = 0;
  let state: ExpectedState = ExpectedState.Opening;
  let marker = -1;
  let firstNumber = 0;
  let secondNumber = 0;
  for (let i = 0; i < program.length; i += 1) {
    const char = program.charAt(i);
    switch (state) {
      case ExpectedState.Opening:
        if (i > program.length - 4) {
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

const solvePart1 = () => {
  const lines = readLines("03", "2024", "actual");
  const sum = lines.reduce((acc, cur) => acc + sanitizeProgram(cur), 0);
  console.log(sum);
};

solvePart1();
