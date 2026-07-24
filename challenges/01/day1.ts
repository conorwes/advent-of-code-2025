const fs = require("fs");
const path = require("path");

function part_1(lines: string[]): number {
  let start = 50;
  
  for (const line of lines) {
    const [direction, valueStr] = [line.substring(0, 1), line.substring(2)];
    
    if (valueStr == undefined) {
      throw new Error(`Invalid line: ${line}`);
    }

    const delta = (direction === "L" ? -1 : 1) * parseInt(valueStr, 10);

    start += delta;


  }

  return start;
}

function main(): void {
  const inputPath = path.join(__dirname, "input.txt");
  const input = fs.readFileSync(inputPath, "utf-8").trim();

  // Parse input
  const lines = input.split("\n");

  // Part 1
  const result1 = part_1(lines);
  console.log("Result:", result1);

  console.log("Result:", 0);
}

main();
