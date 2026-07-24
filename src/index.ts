
interface DayModule {
  run: () => void;
}

async function main(): Promise<void> {
  const dayArg = process.argv[2];
  const day = Number(dayArg);

  if (!dayArg || !Number.isInteger(day) || day <= 0) {
    console.error("Usage: npm run dev -- <day>");
    process.exitCode = 1;
    return;
  }

  let dayModule: DayModule;
  try {
    dayModule = await import(`./challenges/day${day}/day${day}`);
  } catch (error) {
    console.error(`Day ${day} not implemented yet.`);
    process.exitCode = 1;
    return;
  }

  dayModule.run();
}

main();
