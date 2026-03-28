import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import {
  REQUIRED_FILES,
  REQUIRED_HEADINGS,
  validateFile,
  validateRepository,
} from "./lib/validate-docs.mjs";

function makeTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "codex-howto-"));
}

function cleanupTempDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

const testDir = path.dirname(fileURLToPath(import.meta.url));
const scriptSourcePath = path.join(testDir, "validate-docs.mjs");
const libSourcePath = path.join(testDir, "lib", "validate-docs.mjs");

const EXPECTED_REQUIRED_FILES = [
  "README.md",
  "LEARNING-PATH.md",
  "CATALOG.md",
  "01-getting-started/README.md",
  "01-getting-started/first-15-minutes.md",
  "01-getting-started/mental-model.md",
  "01-getting-started/switching-from-claude-or-cursor.md",
  "01-getting-started/session-starter.md",
  "02-working-in-a-repo/README.md",
  "02-working-in-a-repo/orient-a-repo.md",
  "02-working-in-a-repo/plan-a-change.md",
  "02-working-in-a-repo/verify-before-completion.md",
  "02-working-in-a-repo/safe-editing-checklist.md",
  "03-skills/README.md",
  "03-skills/choosing-the-right-skill.md",
  "03-skills/brainstorming-to-plan.md",
  "03-skills/systematic-debugging.md",
  "03-skills/skill-usage-mistakes.md",
  "04-subagents/README.md",
  "04-subagents/when-to-delegate.md",
  "04-subagents/task-design.md",
  "04-subagents/reviewing-worker-results.md",
  "04-subagents/delegation-anti-patterns.md",
  "05-github-workflows/README.md",
  "05-github-workflows/review-a-pr.md",
  "05-github-workflows/address-review-comments.md",
  "05-github-workflows/fix-ci.md",
  "05-github-workflows/publish-changes.md",
  "06-connectors-and-tools/README.md",
  "07-openai-adjacent/README.md",
  "08-examples/README.md",
  "08-examples/bugfix-from-orientation-to-verification.md",
  "08-examples/review-response-workflow.md",
  "08-examples/docs-update-with-validation.md",
  "templates/spec-template.md",
  "templates/implementation-plan-template.md",
  "templates/code-review-checklist.md",
  "templates/bugfix-checklist.md",
  "templates/pr-summary-template.md",
  "templates/repo-orientation-prompt.md",
  "templates/verification-checklist.md",
  "assets/workflow-map.mmd",
  "assets/github-review-loop.mmd",
];

const EXPECTED_REQUIRED_HEADINGS = {
  "README.md": ["What This Repo Is", "15-Minute Quick Start", "Choose Your Path"],
  "LEARNING-PATH.md": [
    "Path 1: Beginner",
    "Path 2: Switching From Claude Code or Cursor",
    "Path 3: Power User",
    "Recommended Module Order",
  ],
  "CATALOG.md": ["Core Guides", "Modules", "Templates", "End-to-End Examples"],
  "01-getting-started/README.md": [
    "Why this matters",
    "Core concepts",
    "Copy-paste assets",
    "Common mistakes",
  ],
  "02-working-in-a-repo/README.md": [
    "Why this matters",
    "Core concepts",
    "Copy-paste assets",
    "Common mistakes",
  ],
  "03-skills/README.md": [
    "Why this matters",
    "Core concepts",
    "Copy-paste assets",
    "Common mistakes",
  ],
  "04-subagents/README.md": [
    "Why this matters",
    "Core concepts",
    "Copy-paste assets",
    "Common mistakes",
  ],
  "05-github-workflows/README.md": [
    "Why this matters",
    "Core concepts",
    "Copy-paste assets",
    "Common mistakes",
  ],
  "08-examples/README.md": ["What These Examples Show", "Recommended Order"],
};

function writeFile(rootDir, relativePath, content) {
  const absolutePath = path.join(rootDir, relativePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, content);
}

function makeValidRepository(rootDir) {
  for (const relativePath of EXPECTED_REQUIRED_FILES) {
    const headings = EXPECTED_REQUIRED_HEADINGS[relativePath] ?? [];
    const content =
      headings.length > 0
        ? ["# Placeholder", "", ...headings.map((heading) => `## ${heading}`)].join("\n")
        : "# Placeholder\n";
    writeFile(rootDir, relativePath, content);
  }
}

test("reports a missing file", () => {
  const errors = validateFile({
    relativePath: "README.md",
    text: null,
    headings: ["What This Repo Is"],
  });

  assert.deepEqual(errors, ["README.md: file is missing"]);
});

test("pins the exported repository contract", () => {
  assert.deepEqual(REQUIRED_FILES, EXPECTED_REQUIRED_FILES);
  assert.deepEqual(REQUIRED_HEADINGS, EXPECTED_REQUIRED_HEADINGS);
});

test("reports a missing heading", () => {
  const errors = validateFile({
    relativePath: "README.md",
    text: "# Codex How To\n\n## What This Repo Is\n",
    headings: ["What This Repo Is", "15-Minute Quick Start"],
  });

  assert.deepEqual(errors, ['README.md: missing heading "15-Minute Quick Start"']);
});

test("accepts a file when all headings are present", () => {
  const errors = validateFile({
    relativePath: "README.md",
    text: ["# Codex How To", "", "## What This Repo Is", "", "## 15-Minute Quick Start"].join(
      "\n",
    ),
    headings: ["What This Repo Is", "15-Minute Quick Start"],
  });

  assert.deepEqual(errors, []);
});

test("validateRepository accepts a complete repository and reports a precise heading error", () => {
  const rootDir = makeTempDir();
  try {
    makeValidRepository(rootDir);

    assert.deepEqual(validateRepository(rootDir), []);

    writeFile(
      rootDir,
      "README.md",
      ["# Placeholder", "", "## What This Repo Is", "", "## 15-Minute Quick Start"].join("\n"),
    );

    assert.deepEqual(validateRepository(rootDir), ['README.md: missing heading "Choose Your Path"']);
  } finally {
    cleanupTempDir(rootDir);
  }
});

test("CLI wrapper resolves the repository root from the script location", () => {
  const tempRoot = makeTempDir();
  const outsideCwd = makeTempDir();
  const tempScriptsDir = path.join(tempRoot, "scripts");
  const tempLibDir = path.join(tempScriptsDir, "lib");
  fs.mkdirSync(tempLibDir, { recursive: true });

  try {
    fs.copyFileSync(scriptSourcePath, path.join(tempScriptsDir, "validate-docs.mjs"));
    fs.copyFileSync(libSourcePath, path.join(tempLibDir, "validate-docs.mjs"));

    makeValidRepository(tempRoot);

    const result = spawnSync(process.execPath, [path.join(tempScriptsDir, "validate-docs.mjs")], {
      cwd: outsideCwd,
      encoding: "utf8",
    });

    assert.equal(result.status, 0);
    assert.equal(result.stderr, "");
    assert.equal(result.stdout, "Documentation structure looks good.\n");
  } finally {
    cleanupTempDir(tempRoot);
    cleanupTempDir(outsideCwd);
  }
});

test("CLI wrapper reports failures with a nonzero exit code", () => {
  const tempRoot = makeTempDir();
  const outsideCwd = makeTempDir();
  const tempScriptsDir = path.join(tempRoot, "scripts");
  const tempLibDir = path.join(tempScriptsDir, "lib");
  fs.mkdirSync(tempLibDir, { recursive: true });

  try {
    fs.copyFileSync(scriptSourcePath, path.join(tempScriptsDir, "validate-docs.mjs"));
    fs.copyFileSync(libSourcePath, path.join(tempLibDir, "validate-docs.mjs"));

    writeFile(tempRoot, "README.md", "# Placeholder\n");

    const result = spawnSync(process.execPath, [path.join(tempScriptsDir, "validate-docs.mjs")], {
      cwd: outsideCwd,
      encoding: "utf8",
    });

    assert.equal(result.status, 1);
    assert.match(result.stderr, /Documentation validation failed:/);
    assert.match(result.stderr, /LEARNING-PATH\.md: file is missing/);
    assert.equal(result.stdout, "");
  } finally {
    cleanupTempDir(tempRoot);
    cleanupTempDir(outsideCwd);
  }
});
