import * as fs from "fs";
import * as path from "path";

// This function calculates the number of times the position reaches 0 
// after moving left or right based on the input lines. Each line contains
// a direction ('L' or 'R') and a number of steps. The position is tracked
// modulo 100.
export function part1(lines: string[]): number {
  let count = 0;

  lines.reduce((acc, line) => {
    if (line[0] === 'L') {
      acc -= Number(line.substring(1)) % 100;
    } else {
      acc += Number(line.substring(1)) % 100;
    }
    acc = (acc + 100) % 100;
    if (acc === 0) {
      count++;
    }
    return acc;
  }, 50); // Start with 50 as the initial value

  return count;
}

// This function calculates the number of times the position crosses the 0
// boundary when moving left or right based on the input lines. Each line
// contains a direction ('L' or 'R') and a number of steps. The position is
// tracked modulo 100, and large movements are counted appropriately.
export function part2(lines: string[]): number {
  let count = 0;

  lines.reduce((acc, line) => {
    const steps = Number(line.substring(1));
    if (acc === 0 && line[0] === 'L') {
      acc += 100;
    }
    if (line[0] === 'L') {
      acc -= steps % 100;
    } else {
      acc += steps % 100;
    }
    count += Math.floor(steps / 100);
    if (acc <= 0 || acc >= 100) {
      count++;
      acc = (acc + 100) % 100;
    }
    return acc;
  }, 50); // Start with 50 as the initial value

  return count;
}

export function run(): void {
  const inputPath = path.join(__dirname, "input.txt");
  const input = fs.readFileSync(inputPath, "utf-8").trim();

  // Parse input
  const lines = input.split(/\n/).filter(Boolean);

  // Part 1
  const result1 = part1(lines);
  console.log("Part 1:", result1);

  // Part 2
  const result2 = part2(lines);
  console.log("Part 2:", result2);
}
