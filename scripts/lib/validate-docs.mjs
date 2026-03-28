import fs from "node:fs";
import path from "node:path";

export const REQUIRED_FILES = [
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

export const REQUIRED_HEADINGS = {
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

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasHeading(text, heading) {
  const pattern = new RegExp(`^#{1,6}\\s+${escapeRegExp(heading)}\\s*$`, "m");
  return pattern.test(text);
}

export function validateFile({ relativePath, text, headings = [] }) {
  if (text === null) {
    return [`${relativePath}: file is missing`];
  }

  const errors = [];

  for (const heading of headings) {
    if (!hasHeading(text, heading)) {
      errors.push(`${relativePath}: missing heading "${heading}"`);
    }
  }

  return errors;
}

export function validateRepository(rootDir) {
  const errors = [];

  for (const relativePath of REQUIRED_FILES) {
    const absolutePath = path.join(rootDir, relativePath);

    if (!fs.existsSync(absolutePath)) {
      errors.push(`${relativePath}: file is missing`);
      continue;
    }

    const headings = REQUIRED_HEADINGS[relativePath] ?? [];

    if (headings.length === 0) {
      continue;
    }

    const text = fs.readFileSync(absolutePath, "utf8");
    errors.push(...validateFile({ relativePath, text, headings }));
  }

  return errors.sort();
}
