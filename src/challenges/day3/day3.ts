import * as fs from "fs";
import * as path from "path";

export function part1(banks: string[]): number {
  // The largest possible joltage is the maximum value found in the banks
  // array, converted to a number. The maximum value is determined by
  // combining the two highest digits in sequential order. For example, in a
  // string "19372018431", the highest joltage is "98", which is obtained by
  // combining the "9" in the 2nd position, and the "8" in the 4th position.
  // Note that the order of digits cannot be changed.
  let joltage = 0;

  for (const bank of banks) {
    let maxDigit = 0;
    let secondMaxDigit = 0;



    joltage += Number(`${maxDigit}${secondMaxDigit}`);
  }

  return joltage;
}

export function part2(banks: string[]): number {
  let joltage = 0;

  return joltage;
}

export function run(): void {
  const inputPath = path.join(__dirname, "input.txt");
  const input = fs.readFileSync(inputPath, "utf-8").trim();

  // Parse input
  const banks = input.trim().split(/\n/).filter(Boolean);

  // Part 1
  const result1 = part1(banks);
  console.log("Part 1:", result1);

  // Part 2
  const result2 = part2(banks);
  console.log("Part 2:", result2);
}
