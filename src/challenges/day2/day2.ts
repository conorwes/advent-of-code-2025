import * as fs from "fs";
import * as path from "path";

const len = (num: number) => num.toString().length;
const range = (min: number, max: number) => [...Array(max - min + 1)].map((_, i) => i + min);
const sum = (a: number, b: number) => a + b;
const nplicate = (a: number, times: number) => Number(String(a).repeat(times));

// This function calculates the sum of invalid numbers contained within
// the specified ranges. Each range is expected to be in the format "min-max".
// Invalid numbers are those which comprise solely of repeated sequences of
// digits (e.g. 123123, 11851185, 55, etc).
export function part1(pairs: number[][]): number {
  return pairs
    .flatMap(([min, max]) => {
      if (min === undefined || max === undefined) return [];
      return range(Math.ceil(len(min) / 2), Math.floor(len(max) / 2)).flatMap(
        (halfLength) => {
          const results: number[] = [];
          for (
            let part = Math.floor(min / 10 ** halfLength);
            nplicate(part, 2) <= max;
            part++
          )
            if (nplicate(part, 2) >= min)
              results.push(nplicate(part, 2));
          return results;
        }
      )
    }
    ).reduce(sum);
}

// This function does the same as part1, but the definition of invalid numbers
// has changed. In part2, invalid numbers are those which comprise solely of
// repeated sequences of digits, but the sequences can be of any length greater
// than one digit.
export function part2(pairs: number[][]): number {
  return pairs
    .flatMap(([min, max]) => {
      if (min === undefined || max === undefined) return [];
      const results = new Set<number>();
      range(len(min), len(max)).forEach((seqLength) => {
        range(1, Math.floor(seqLength / 2)).forEach((partLength) => {
          range(
            Math.max(2, Math.ceil(len(min) / partLength)),
            Math.floor(len(max) / partLength)
          ).forEach((numParts) => {
            for (
              let part = 10 ** (partLength - 1);
              len(part) == partLength && nplicate(part, numParts) <= max;
              part++
            ) {
              if (nplicate(part, numParts) >= min)
                results.add(nplicate(part, numParts));
            }
          });
        });
      });
      return Array.from(results);
    })
    .reduce(sum);
}

export function run(): void {
  const inputPath = path.join(__dirname, "input.txt");
  const input = fs.readFileSync(inputPath, "utf-8").trim();

  // Parse input
  const pairs = input.trim().split(/[,\n]/).filter(Boolean).map((range => range.split("-").map(Number)));

  // Part 1
  const result1 = part1(pairs);
  console.log("Part 1:", result1);

  // Part 2
  const result2 = part2(pairs);
  console.log("Part 2:", result2);
}
