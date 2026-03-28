import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateRepository } from "./lib/validate-docs.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const scriptDir = path.dirname(scriptPath);
const rootDir = path.resolve(scriptDir, "..");
const errors = validateRepository(rootDir);

if (errors.length > 0) {
  console.error("Documentation validation failed:");

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log("Documentation structure looks good.");
