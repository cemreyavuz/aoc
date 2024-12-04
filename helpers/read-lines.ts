// @ts-types="npm:@types/node"
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

const DIRNAME = new URL(".", import.meta.url).pathname;
const INPUTS_DIRNAME = "inputs";

export type InputType = "example" | "actual";

export const readLines = (
  day: string,
  year: string,
  type: InputType
): string[] => {
  const filePath = path.resolve(
    DIRNAME,
    "..",
    INPUTS_DIRNAME,
    year,
    `day${day}-${type}.txt`
  );
  const file = fs.readFileSync(filePath, { encoding: "utf-8" });
  const splitted = file.split(os.EOL);
  const t1 = performance.now();
  return splitted;
};
