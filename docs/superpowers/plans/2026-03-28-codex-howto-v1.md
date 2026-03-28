# Codex How To V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first working release of a Codex-native documentation repo with a landing page, learning path, catalog, five core modules, light connector context, reusable templates, end-to-end examples, and validation tooling.

**Architecture:** The repository is documentation-first. Markdown files carry the teaching content, Mermaid files provide a small amount of reusable visual structure, and a zero-dependency Node validation script keeps the repo honest by checking that required files and headings stay present. The content is organized by workflows rather than by superficial Claude feature parity.

**Tech Stack:** Markdown, Mermaid, Node.js 20+ ESM, Node built-in test runner

---

## File Structure

### Root documents

- `README.md`
  - Landing page with positioning, audience split, quick start, and repo map.
- `LEARNING-PATH.md`
  - Progressive path for beginner, switcher, and power-user readers.
- `CATALOG.md`
  - Fast index of modules, templates, examples, and support scripts.

### Core modules

- `01-getting-started/README.md`
  - Entry point for first-time Codex users.
- `01-getting-started/first-15-minutes.md`
  - Smallest useful first session.
- `01-getting-started/mental-model.md`
  - Core environment and workflow concepts.
- `01-getting-started/switching-from-claude-or-cursor.md`
  - Migration notes for users bringing prior assumptions.
- `01-getting-started/session-starter.md`
  - Copy-paste opening prompt for a new Codex session.
- `02-working-in-a-repo/README.md`
  - Safe repository work overview.
- `02-working-in-a-repo/orient-a-repo.md`
  - How to inspect a codebase before acting.
- `02-working-in-a-repo/plan-a-change.md`
  - How to define scope before implementation.
- `02-working-in-a-repo/verify-before-completion.md`
  - Practical verification habits.
- `02-working-in-a-repo/safe-editing-checklist.md`
  - Copy-paste checklist for edits in a shared worktree.
- `03-skills/README.md`
  - Skills overview and why they matter in this environment.
- `03-skills/choosing-the-right-skill.md`
  - How to select the smallest skill set that fits.
- `03-skills/brainstorming-to-plan.md`
  - Path from design to implementation plan.
- `03-skills/systematic-debugging.md`
  - Debugging workflow discipline.
- `03-skills/skill-usage-mistakes.md`
  - Common anti-patterns and recoveries.
- `04-subagents/README.md`
  - Delegation overview.
- `04-subagents/when-to-delegate.md`
  - When parallel work helps and when it slows you down.
- `04-subagents/task-design.md`
  - How to design bounded delegated tasks.
- `04-subagents/reviewing-worker-results.md`
  - How to integrate returned work safely.
- `04-subagents/delegation-anti-patterns.md`
  - Mistakes to avoid when splitting work.
- `05-github-workflows/README.md`
  - GitHub-oriented Codex workflows.
- `05-github-workflows/review-a-pr.md`
  - Review mindset and workflow.
- `05-github-workflows/address-review-comments.md`
  - How to handle actionable review feedback.
- `05-github-workflows/fix-ci.md`
  - Triage and fix failing CI checks.
- `05-github-workflows/publish-changes.md`
  - Publishing and PR preparation workflow.

### Supporting sections

- `06-connectors-and-tools/README.md`
  - Light guidance on connectors and when to use them.
- `07-openai-adjacent/README.md`
  - Narrow orientation on related OpenAI tooling and official docs.
- `08-examples/README.md`
  - Overview of full workflows.
- `08-examples/bugfix-from-orientation-to-verification.md`
  - Example bugfix workflow.
- `08-examples/review-response-workflow.md`
  - Example PR comment response workflow.
- `08-examples/docs-update-with-validation.md`
  - Example docs update workflow.

### Reusable assets

- `templates/spec-template.md`
  - Short design-spec template.
- `templates/implementation-plan-template.md`
  - Plan template aligned with superpowers expectations.
- `templates/code-review-checklist.md`
  - Review checklist emphasizing bugs, risks, and tests.
- `templates/bugfix-checklist.md`
  - Reproduce-isolate-fix-verify checklist.
- `templates/pr-summary-template.md`
  - Pull request summary structure.
- `templates/repo-orientation-prompt.md`
  - Reusable initial repo-inspection prompt.
- `templates/verification-checklist.md`
  - Final validation checklist.
- `assets/workflow-map.mmd`
  - Mermaid diagram of the core Codex workflow loop.
- `assets/github-review-loop.mmd`
  - Mermaid diagram of a GitHub review loop.

### Tooling

- `package.json`
  - Local scripts for test and validation.
- `scripts/lib/validate-docs.mjs`
  - Validation logic for required files and headings.
- `scripts/validate-docs.mjs`
  - CLI wrapper for repo validation.
- `scripts/validate-docs.test.mjs`
  - Unit tests for validation logic.

## Task 1: Scaffold Validation Tooling

**Files:**
- Create: `package.json`
- Create: `scripts/lib/validate-docs.mjs`
- Create: `scripts/validate-docs.mjs`
- Create: `scripts/validate-docs.test.mjs`
- Test: `scripts/validate-docs.test.mjs`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "codex-howto",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "node --test scripts/validate-docs.test.mjs",
    "validate": "node scripts/validate-docs.mjs",
    "check": "npm run test && npm run validate"
  }
}
```

- [ ] **Step 2: Write the failing test**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { validateFile } from "./lib/validate-docs.mjs";

test("reports a missing file", () => {
  const errors = validateFile({
    relativePath: "README.md",
    text: null,
    headings: ["What This Repo Is"],
  });

  assert.deepEqual(errors, ['README.md: file is missing']);
});

test("reports a missing heading", () => {
  const errors = validateFile({
    relativePath: "README.md",
    text: "# Codex How To\n\n## What This Repo Is\n",
    headings: ["What This Repo Is", "15-Minute Quick Start"],
  });

  assert.deepEqual(errors, [
    'README.md: missing heading "15-Minute Quick Start"',
  ]);
});

test("accepts a file when all headings are present", () => {
  const errors = validateFile({
    relativePath: "README.md",
    text: [
      "# Codex How To",
      "",
      "## What This Repo Is",
      "",
      "## 15-Minute Quick Start",
    ].join("\n"),
    headings: ["What This Repo Is", "15-Minute Quick Start"],
  });

  assert.deepEqual(errors, []);
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `node --test scripts/validate-docs.test.mjs`

Expected: FAIL with an `ERR_MODULE_NOT_FOUND` error for `scripts/lib/validate-docs.mjs`

- [ ] **Step 4: Write the minimal implementation**

`scripts/lib/validate-docs.mjs`

```js
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
  "README.md": [
    "What This Repo Is",
    "15-Minute Quick Start",
    "Choose Your Path",
  ],
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
```

`scripts/validate-docs.mjs`

```js
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
```

- [ ] **Step 5: Run the test suite to verify it passes**

Run: `npm test`

Expected:

```text
> test
> node --test scripts/validate-docs.test.mjs

ok 1 - reports a missing file
ok 2 - reports a missing heading
ok 3 - accepts a file when all headings are present
```

- [ ] **Step 6: Commit**

```bash
git add package.json scripts/lib/validate-docs.mjs scripts/validate-docs.mjs scripts/validate-docs.test.mjs
git commit -m "chore: add docs validation tooling"
```

## Task 2: Create the Landing Page

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write `README.md`**

```md
# Codex How To

A practical, workflow-first guide for using Codex well in a real repository.

This repo is for three kinds of users at once:

- people who are new to Codex
- people switching from Claude Code or Cursor
- people who already use agentic tools and want sharper Codex workflows

## What This Repo Is

- A Codex-native guide organized around real work, not around renamed feature lists.
- A set of copy-paste templates, checklists, and examples you can reuse in your own repos.
- A learning path that starts small and scales up to planning, delegation, review, and shipping.

## What This Repo Is Not

- It is not a replacement for official product documentation.
- It is not a Claude guide with superficial word substitution.
- It is not a bag of generic prompts with no operational discipline behind them.

## 15-Minute Quick Start

1. Read [01-getting-started/first-15-minutes.md](01-getting-started/first-15-minutes.md).
2. Copy [templates/repo-orientation-prompt.md](templates/repo-orientation-prompt.md) into your first real Codex session.
3. Keep [02-working-in-a-repo/verify-before-completion.md](02-working-in-a-repo/verify-before-completion.md) open while you work.
4. Pick the next section that matches your experience level.

## Choose Your Path

### New to Codex

Start with [01-getting-started/README.md](01-getting-started/README.md), then move into [02-working-in-a-repo/README.md](02-working-in-a-repo/README.md).

### Switching From Claude Code or Cursor

Read [01-getting-started/switching-from-claude-or-cursor.md](01-getting-started/switching-from-claude-or-cursor.md), then go straight to [03-skills/README.md](03-skills/README.md) and [04-subagents/README.md](04-subagents/README.md).

### Already Comfortable With Agentic Tools

Start with [05-github-workflows/README.md](05-github-workflows/README.md), then skim [templates/](templates/) and the workflows in [08-examples/README.md](08-examples/README.md).

## What You Will Learn

- how to start a session with enough context to avoid low-signal thrashing
- how to inspect a codebase before you edit anything
- how to plan work before implementation
- how to use skills for disciplined workflows instead of ad hoc prompting
- how to delegate bounded work when parallelism actually helps
- how to review, verify, and ship changes without skipping evidence

## Repository Map

- [LEARNING-PATH.md](LEARNING-PATH.md): guided order by audience
- [CATALOG.md](CATALOG.md): quick inventory of everything in the repo
- [01-getting-started/](01-getting-started/): first session and mental model
- [02-working-in-a-repo/](02-working-in-a-repo/): safe repo work
- [03-skills/](03-skills/): skill-driven workflows
- [04-subagents/](04-subagents/): explicit delegation patterns
- [05-github-workflows/](05-github-workflows/): review, CI, and publishing
- [06-connectors-and-tools/](06-connectors-and-tools/): connector usage boundaries
- [07-openai-adjacent/](07-openai-adjacent/): related official OpenAI context
- [08-examples/](08-examples/): full workflows from start to finish
- [templates/](templates/): prompts, checklists, and handoff artifacts

## Working Principles

- Prefer Codex-native workflows over feature-parity comparisons.
- Start with repository context before proposing edits.
- Keep templates opinionated and practical.
- Verify outcomes before claiming success.
- Use delegation deliberately, not by reflex.
```

- [ ] **Step 2: Verify the required headings are present**

Run: `rg -n "^## (What This Repo Is|15-Minute Quick Start|Choose Your Path)$" README.md`

Expected:

```text
## What This Repo Is
## 15-Minute Quick Start
## Choose Your Path
```

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: add codex-howto landing page"
```

## Task 3: Add the Learning Path and Catalog

**Files:**
- Create: `LEARNING-PATH.md`
- Create: `CATALOG.md`

- [ ] **Step 1: Write `LEARNING-PATH.md`**

```md
# Codex How To Learning Path

Use this roadmap when you want a recommended order instead of browsing the repo manually.

## Path 1: Beginner

Start here if you are new to Codex and want the shortest path to a useful first session.

1. [01-getting-started/README.md](01-getting-started/README.md)
2. [01-getting-started/first-15-minutes.md](01-getting-started/first-15-minutes.md)
3. [02-working-in-a-repo/README.md](02-working-in-a-repo/README.md)
4. [02-working-in-a-repo/verify-before-completion.md](02-working-in-a-repo/verify-before-completion.md)
5. [08-examples/bugfix-from-orientation-to-verification.md](08-examples/bugfix-from-orientation-to-verification.md)

Estimated time: 60 to 90 minutes

## Path 2: Switching From Claude Code or Cursor

Start here if you already know agentic tooling but need the right mental model for this environment.

1. [01-getting-started/switching-from-claude-or-cursor.md](01-getting-started/switching-from-claude-or-cursor.md)
2. [03-skills/README.md](03-skills/README.md)
3. [04-subagents/README.md](04-subagents/README.md)
4. [05-github-workflows/README.md](05-github-workflows/README.md)
5. [08-examples/review-response-workflow.md](08-examples/review-response-workflow.md)

Estimated time: 75 to 105 minutes

## Path 3: Power User

Start here if you want disciplined planning, review, delegation, and GitHub execution patterns.

1. [02-working-in-a-repo/plan-a-change.md](02-working-in-a-repo/plan-a-change.md)
2. [03-skills/brainstorming-to-plan.md](03-skills/brainstorming-to-plan.md)
3. [04-subagents/task-design.md](04-subagents/task-design.md)
4. [05-github-workflows/fix-ci.md](05-github-workflows/fix-ci.md)
5. [08-examples/docs-update-with-validation.md](08-examples/docs-update-with-validation.md)

Estimated time: 90 to 120 minutes

## Recommended Module Order

1. [01-getting-started](01-getting-started/)
2. [02-working-in-a-repo](02-working-in-a-repo/)
3. [03-skills](03-skills/)
4. [04-subagents](04-subagents/)
5. [05-github-workflows](05-github-workflows/)
6. [06-connectors-and-tools](06-connectors-and-tools/)
7. [07-openai-adjacent](07-openai-adjacent/)
8. [08-examples](08-examples/)

## How to Use This Path

- Read a module overview first.
- Copy one asset or checklist immediately.
- Apply the workflow in a real repo before moving on.
- Use the examples to see how the pieces connect.
```

- [ ] **Step 2: Write `CATALOG.md`**

```md
# Codex How To Catalog

This page is the fastest way to scan what the repository contains.

## Core Guides

- [README.md](README.md): landing page and quick start
- [LEARNING-PATH.md](LEARNING-PATH.md): guided reading order
- [CATALOG.md](CATALOG.md): this index

## Modules

- [01-getting-started/README.md](01-getting-started/README.md)
  - first session
  - environment mental model
  - switching notes
- [02-working-in-a-repo/README.md](02-working-in-a-repo/README.md)
  - repo inspection
  - planning
  - safe editing
  - verification
- [03-skills/README.md](03-skills/README.md)
  - choosing skills
  - brainstorming to planning
  - debugging discipline
- [04-subagents/README.md](04-subagents/README.md)
  - when to delegate
  - task design
  - review of worker results
- [05-github-workflows/README.md](05-github-workflows/README.md)
  - PR review
  - review comments
  - CI fixes
  - publishing
- [06-connectors-and-tools/README.md](06-connectors-and-tools/README.md)
  - light connector guidance
- [07-openai-adjacent/README.md](07-openai-adjacent/README.md)
  - related official OpenAI context
- [08-examples/README.md](08-examples/README.md)
  - end-to-end workflows

## Templates

- [templates/spec-template.md](templates/spec-template.md)
- [templates/implementation-plan-template.md](templates/implementation-plan-template.md)
- [templates/code-review-checklist.md](templates/code-review-checklist.md)
- [templates/bugfix-checklist.md](templates/bugfix-checklist.md)
- [templates/pr-summary-template.md](templates/pr-summary-template.md)
- [templates/repo-orientation-prompt.md](templates/repo-orientation-prompt.md)
- [templates/verification-checklist.md](templates/verification-checklist.md)

## End-to-End Examples

- [08-examples/bugfix-from-orientation-to-verification.md](08-examples/bugfix-from-orientation-to-verification.md)
- [08-examples/review-response-workflow.md](08-examples/review-response-workflow.md)
- [08-examples/docs-update-with-validation.md](08-examples/docs-update-with-validation.md)

## Scripts

- `npm test`: run validation unit tests
- `npm run validate`: validate required files and headings
- `npm run check`: run both test and validation
```

- [ ] **Step 3: Verify the required headings are present**

Run: `rg -n "^## (Path 1: Beginner|Path 2: Switching From Claude Code or Cursor|Path 3: Power User|Recommended Module Order)$" LEARNING-PATH.md && rg -n "^## (Core Guides|Modules|Templates|End-to-End Examples)$" CATALOG.md`

Expected:

```text
## Path 1: Beginner
## Path 2: Switching From Claude Code or Cursor
## Path 3: Power User
## Recommended Module Order
## Core Guides
## Modules
## Templates
## End-to-End Examples
```

- [ ] **Step 4: Commit**

```bash
git add LEARNING-PATH.md CATALOG.md
git commit -m "docs: add learning path and catalog"
```

## Task 4: Build `01-getting-started`

**Files:**
- Create: `01-getting-started/README.md`
- Create: `01-getting-started/first-15-minutes.md`
- Create: `01-getting-started/mental-model.md`
- Create: `01-getting-started/switching-from-claude-or-cursor.md`
- Create: `01-getting-started/session-starter.md`

- [ ] **Step 1: Write the overview and first-session guide**

`01-getting-started/README.md`

```md
# 01 Getting Started

## Why this matters

Codex is most useful when you treat it like a disciplined collaborator inside a real workspace, not like a blank chat box. The first win is not a flashy demo. It is a small, correct, well-verified task in a codebase you care about.

## Core concepts

- Codex shares your workspace, so repository context matters immediately.
- The best first step is inspection, not implementation.
- A good opening prompt narrows the task and reduces avoidable thrashing.

## Copy-paste assets

- [session-starter.md](session-starter.md)
- [../templates/repo-orientation-prompt.md](../templates/repo-orientation-prompt.md)

## Common mistakes

- asking for a solution before the repo has been inspected
- assuming old tool habits transfer cleanly
- skipping verification because the change looks small

## Read next

- [first-15-minutes.md](first-15-minutes.md)
- [mental-model.md](mental-model.md)
- [switching-from-claude-or-cursor.md](switching-from-claude-or-cursor.md)
```

`01-getting-started/first-15-minutes.md`

```md
# First 15 Minutes

Use this when you want the smallest useful Codex workflow.

## Step 1: Define one small outcome

Pick a task with a clear finish line:

- explain one confusing module
- rename one symbol safely
- fix one failing test
- tighten one README section

## Step 2: Start with orientation

Paste the prompt from [session-starter.md](session-starter.md) or [../templates/repo-orientation-prompt.md](../templates/repo-orientation-prompt.md).

## Step 3: Confirm the plan before editing

Ask Codex for:

- relevant files
- likely risks
- the smallest safe first change
- how to verify the result

## Step 4: Make the change

Keep the scope small enough that you can still describe the expected result in one sentence.

## Step 5: Verify before you stop

Use [../02-working-in-a-repo/verify-before-completion.md](../02-working-in-a-repo/verify-before-completion.md) as the exit checklist.
```

- [ ] **Step 2: Write the mental model, switching guide, and session starter**

`01-getting-started/mental-model.md`

```md
# Codex Mental Model

Codex is strongest when you use it as a repository-aware engineering agent.

## Think in loops

The core loop is:

1. inspect the current state
2. narrow the task
3. make the smallest justified change
4. verify with evidence
5. summarize the result

## Think in artifacts

Useful artifacts in this environment include:

- specs
- implementation plans
- checklists
- test commands
- review summaries

## Think in boundaries

Codex works better when file boundaries, task scope, and success criteria are explicit.
```

`01-getting-started/switching-from-claude-or-cursor.md`

```md
# Switching From Claude Code or Cursor

If you are coming from another agentic tool, keep the useful instincts and drop the wrong assumptions.

## What carries over

- context matters more than clever wording
- bounded tasks beat vague ambition
- review and verification still dominate raw generation

## What changes

- this environment is explicit about tool boundaries and sandboxing
- skills are first-class workflow discipline, not optional decoration
- delegated work should be intentional and bounded

## What to stop assuming

- that feature names map one-to-one
- that every task should use parallel agents
- that a polished answer implies verified work
```

`01-getting-started/session-starter.md`

```md
# Session Starter

Paste this when you want Codex to orient in a repository before proposing edits.

~~~text
Inspect this repository before suggesting changes.

Please:
1. identify the files and directories most relevant to my goal
2. summarize the current structure in plain language
3. call out any obvious risks, constraints, or missing context
4. propose the smallest safe next step
5. tell me how you would verify the result before claiming success
~~~
```

- [ ] **Step 3: Verify the module headings**

Run: `rg -n "^## (Why this matters|Core concepts|Copy-paste assets|Common mistakes)$" 01-getting-started/README.md && rg -n "^# " 01-getting-started/*.md`

Expected: the README shows all four required headings, and each file begins with a single H1.

- [ ] **Step 4: Commit**

```bash
git add 01-getting-started
git commit -m "docs: add getting started module"
```

## Task 5: Build `02-working-in-a-repo`

**Files:**
- Create: `02-working-in-a-repo/README.md`
- Create: `02-working-in-a-repo/orient-a-repo.md`
- Create: `02-working-in-a-repo/plan-a-change.md`
- Create: `02-working-in-a-repo/verify-before-completion.md`
- Create: `02-working-in-a-repo/safe-editing-checklist.md`

- [ ] **Step 1: Write the overview and repo-orientation guide**

`02-working-in-a-repo/README.md`

```md
# 02 Working in a Repo

## Why this matters

Most Codex failures are not model failures. They are workflow failures: acting too early, editing too broadly, or declaring success without evidence.

## Core concepts

- inspect before editing
- plan before broad changes
- verify before completion

## Copy-paste assets

- [safe-editing-checklist.md](safe-editing-checklist.md)
- [../templates/verification-checklist.md](../templates/verification-checklist.md)

## Common mistakes

- reading too little before changing code
- mixing unrelated changes in one task
- treating intuition as verification

## Read next

- [orient-a-repo.md](orient-a-repo.md)
- [plan-a-change.md](plan-a-change.md)
- [verify-before-completion.md](verify-before-completion.md)
```

`02-working-in-a-repo/orient-a-repo.md`

```md
# Orient a Repo

Before you ask for changes, ask for structure.

## What to gather

- entry points
- relevant modules
- tests and verification commands
- uncommitted work that might affect the task

## Good outputs from Codex

- a small map of the code path you care about
- the likely edit surface
- one or two hidden risks
- the next safe action

## Bad outputs from Codex

- immediate implementation without context
- generic architecture talk disconnected from the repo
- verification advice that never mentions actual commands
```

- [ ] **Step 2: Write the planning guide, verification guide, and editing checklist**

`02-working-in-a-repo/plan-a-change.md`

```md
# Plan a Change

Plan before implementation when:

- the task changes behavior
- multiple files are involved
- the repository has unclear boundaries
- the user asked for design or trade-offs

## A useful plan answers

- what changes
- what does not change
- which files are in scope
- what evidence will prove the work is done

## A bad plan

- uses vague verbs such as "improve" or "refactor" with no boundary
- skips test or verification strategy
- assumes the codebase is cleaner than it is
```

`02-working-in-a-repo/verify-before-completion.md`

```md
# Verify Before Completion

Never stop at "the code looks right."

## Minimum verification loop

1. run the most relevant focused test or command
2. run any broader check that would catch integration mistakes
3. inspect the changed files one more time
4. summarize exactly what was verified and what was not

## Good completion language

- "I ran `npm test -- widget` and it passed."
- "I could not run the browser flow in this environment."
- "I changed `src/a.ts` and `tests/a.test.ts` only."

## Bad completion language

- "should be fixed now"
- "looks good"
- "done" with no evidence
```

`02-working-in-a-repo/safe-editing-checklist.md`

```md
# Safe Editing Checklist

- confirm the exact goal in one sentence
- inspect relevant files before editing
- check for unrelated dirty worktree changes
- keep the diff narrow
- run the smallest relevant verification command first
- run a broader check if the change touches shared behavior
- report what you could not verify
```

- [ ] **Step 3: Verify the module headings**

Run: `rg -n "^## (Why this matters|Core concepts|Copy-paste assets|Common mistakes)$" 02-working-in-a-repo/README.md && rg -n "^# " 02-working-in-a-repo/*.md`

Expected: the README shows all four required headings, and each file begins with a single H1.

- [ ] **Step 4: Commit**

```bash
git add 02-working-in-a-repo
git commit -m "docs: add working in a repo module"
```

## Task 6: Build `03-skills`

**Files:**
- Create: `03-skills/README.md`
- Create: `03-skills/choosing-the-right-skill.md`
- Create: `03-skills/brainstorming-to-plan.md`
- Create: `03-skills/systematic-debugging.md`
- Create: `03-skills/skill-usage-mistakes.md`

- [ ] **Step 1: Write the overview and skill-selection guide**

`03-skills/README.md`

```md
# 03 Skills

## Why this matters

Skills are how this environment enforces disciplined workflows. They are not decoration. They change how work gets approached.

## Core concepts

- process skills shape how you work
- implementation skills narrow execution
- the smallest applicable skill set is usually best

## Copy-paste assets

- [../templates/spec-template.md](../templates/spec-template.md)
- [../templates/implementation-plan-template.md](../templates/implementation-plan-template.md)

## Common mistakes

- skipping a required skill because the task feels small
- using too many skills at once
- treating skill guidance as optional style advice

## Read next

- [choosing-the-right-skill.md](choosing-the-right-skill.md)
- [brainstorming-to-plan.md](brainstorming-to-plan.md)
- [systematic-debugging.md](systematic-debugging.md)
```

`03-skills/choosing-the-right-skill.md`

```md
# Choosing the Right Skill

Use the smallest set of skills that makes the workflow safe and coherent.

## Start with process

Examples:

- ideation or new functionality: start with brainstorming
- bugs or failing tests: start with systematic debugging
- multi-step build work after design: use writing-plans

## Then add execution help

Only add implementation-specific skills after the process is clear.

## Practical rule

If a skill obviously applies, use it before improvising.
```

- [ ] **Step 2: Write the design-to-plan guide, debugging guide, and anti-pattern guide**

`03-skills/brainstorming-to-plan.md`

```md
# Brainstorming to Plan

The clean path for multi-step work is:

1. understand the current repo
2. clarify the goal
3. compare approaches
4. write a design spec
5. convert the spec into an implementation plan
6. execute against the plan

This repo uses that progression because it reduces thrash and makes handoff cleaner.
```

`03-skills/systematic-debugging.md`

```md
# Systematic Debugging

When behavior is wrong, do not jump to the first plausible fix.

## Strong debugging loop

1. reproduce the issue
2. isolate where the behavior diverges
3. write or run the smallest failing check
4. make the smallest fix that explains the failure
5. run a regression check

## Weak debugging loop

- guess
- patch
- hope
```

`03-skills/skill-usage-mistakes.md`

```md
# Skill Usage Mistakes

## Mistake 1: Skipping the skill check

This usually turns into premature implementation.

## Mistake 2: Stacking skills without a reason

Too many skills at once can blur responsibility and make the workflow hard to follow.

## Mistake 3: Treating the skill as prose

A process skill is supposed to change the order of operations, not just the wording of the answer.
```

- [ ] **Step 3: Verify the module headings**

Run: `rg -n "^## (Why this matters|Core concepts|Copy-paste assets|Common mistakes)$" 03-skills/README.md && rg -n "^# " 03-skills/*.md`

Expected: the README shows all four required headings, and each file begins with a single H1.

- [ ] **Step 4: Commit**

```bash
git add 03-skills
git commit -m "docs: add skills module"
```

## Task 7: Build `04-subagents`

**Files:**
- Create: `04-subagents/README.md`
- Create: `04-subagents/when-to-delegate.md`
- Create: `04-subagents/task-design.md`
- Create: `04-subagents/reviewing-worker-results.md`
- Create: `04-subagents/delegation-anti-patterns.md`

- [ ] **Step 1: Write the overview and delegation decision guide**

`04-subagents/README.md`

```md
# 04 Subagents

## Why this matters

Delegation is powerful when the work is parallel and bounded. It is harmful when it fragments the critical path or duplicates effort.

## Core concepts

- delegate sidecar work, not immediate blockers
- assign clear ownership
- review returned work before integration

## Copy-paste assets

- [task-design.md](task-design.md)
- [reviewing-worker-results.md](reviewing-worker-results.md)

## Common mistakes

- delegating the next blocking step
- assigning vague tasks
- waiting on agents by reflex

## Read next

- [when-to-delegate.md](when-to-delegate.md)
- [task-design.md](task-design.md)
- [delegation-anti-patterns.md](delegation-anti-patterns.md)
```

`04-subagents/when-to-delegate.md`

```md
# When to Delegate

Delegate when all three are true:

- the task is concrete
- it is not the immediate blocker for your next local step
- its result will materially advance the main task

Do not delegate when:

- the next action depends on the answer
- the subtask is tightly coupled to local reasoning
- the write scope overlaps heavily with other active work
```

- [ ] **Step 2: Write the task-design guide, review guide, and anti-pattern guide**

`04-subagents/task-design.md`

```md
# Task Design for Subagents

A good delegated task includes:

- exact goal
- owned files or responsibility
- what not to change
- what output to return

## Example shape

- "Own `src/api/auth.ts` and `tests/auth.test.ts`."
- "Do not revert unrelated edits."
- "Return the files changed and any follow-up risks."
```

`04-subagents/reviewing-worker-results.md`

```md
# Reviewing Worker Results

When a worker returns:

1. scan the summary
2. inspect the changed files
3. verify the claimed result
4. integrate or refine without redoing the task blindly

Trust the worker enough to move fast, but not enough to skip review.
```

`04-subagents/delegation-anti-patterns.md`

```md
# Delegation Anti-Patterns

## Delegating the critical path

If you are blocked on the answer right now, keep that work local.

## Delegating fuzzy exploration

Ask bounded questions instead of "look around and tell me what matters."

## Delegating overlapping write scopes

Two agents editing the same file without coordination is a merge problem disguised as parallelism.
```

- [ ] **Step 3: Verify the module headings**

Run: `rg -n "^## (Why this matters|Core concepts|Copy-paste assets|Common mistakes)$" 04-subagents/README.md && rg -n "^# " 04-subagents/*.md`

Expected: the README shows all four required headings, and each file begins with a single H1.

- [ ] **Step 4: Commit**

```bash
git add 04-subagents
git commit -m "docs: add subagents module"
```

## Task 8: Build `05-github-workflows`

**Files:**
- Create: `05-github-workflows/README.md`
- Create: `05-github-workflows/review-a-pr.md`
- Create: `05-github-workflows/address-review-comments.md`
- Create: `05-github-workflows/fix-ci.md`
- Create: `05-github-workflows/publish-changes.md`

- [ ] **Step 1: Write the overview and PR review guide**

`05-github-workflows/README.md`

```md
# 05 GitHub Workflows

## Why this matters

Much of Codex's practical value shows up in review, CI triage, and shipping. These workflows benefit from clear evidence, careful scope, and the right GitHub context.

## Core concepts

- review for bugs and risks first
- treat CI failures as debugging tasks, not vibes
- publish intentionally with a clean summary

## Copy-paste assets

- [../templates/code-review-checklist.md](../templates/code-review-checklist.md)
- [../templates/pr-summary-template.md](../templates/pr-summary-template.md)

## Common mistakes

- leading with summaries instead of findings
- guessing at CI failures without reading logs
- publishing changes before verification is complete

## Read next

- [review-a-pr.md](review-a-pr.md)
- [address-review-comments.md](address-review-comments.md)
- [fix-ci.md](fix-ci.md)
- [publish-changes.md](publish-changes.md)
```

`05-github-workflows/review-a-pr.md`

```md
# Review a PR

Start with findings, not compliments.

## Review order

1. understand the change surface
2. look for behavioral regressions
3. look for missing tests
4. look for ambiguous or unsafe assumptions
5. summarize only after the findings are clear

## Strong review output

- severity-ordered findings
- file references
- concrete explanation of risk
```

- [ ] **Step 2: Write the review-comment, CI, and publishing guides**

`05-github-workflows/address-review-comments.md`

```md
# Address Review Comments

Treat review comments as input to evaluate, not instructions to obey blindly.

## Strong response loop

1. read the comment carefully
2. confirm the technical claim
3. implement the smallest justified fix
4. verify the result
5. reply with what changed and what was validated
```

`05-github-workflows/fix-ci.md`

```md
# Fix CI

A failing check is a debugging problem with better logs.

## Useful sequence

1. identify the failing job
2. read the failing step output
3. reproduce locally if possible
4. isolate the smallest fix
5. rerun the most relevant verification

## Avoid

- changing code before understanding the failure
- bundling unrelated cleanups into the fix
```

`05-github-workflows/publish-changes.md`

```md
# Publish Changes

Publishing should be the end of a verified workflow, not the start of one.

## Before publishing

- confirm the diff is in scope
- confirm verification is complete
- write a crisp summary of what changed
- note any remaining risks

## Good PR summary structure

- summary
- validation
- known limitations
```

- [ ] **Step 3: Verify the module headings**

Run: `rg -n "^## (Why this matters|Core concepts|Copy-paste assets|Common mistakes)$" 05-github-workflows/README.md && rg -n "^# " 05-github-workflows/*.md`

Expected: the README shows all four required headings, and each file begins with a single H1.

- [ ] **Step 4: Commit**

```bash
git add 05-github-workflows
git commit -m "docs: add github workflows module"
```

## Task 9: Add Connector Context and Mermaid Assets

**Files:**
- Create: `06-connectors-and-tools/README.md`
- Create: `07-openai-adjacent/README.md`
- Create: `assets/workflow-map.mmd`
- Create: `assets/github-review-loop.mmd`

- [ ] **Step 1: Write the supporting readmes**

`06-connectors-and-tools/README.md`

```md
# 06 Connectors and Tools

This section stays intentionally light in v1.

Use connector-backed context when the answer depends on external state such as:

- GitHub PR metadata or review threads
- Gmail threads
- Calendar events and availability

Stay local when the repository already contains what you need.

The rule of thumb is simple: if the truth lives outside the checkout, use the relevant connected tool instead of guessing.
```

`07-openai-adjacent/README.md`

```md
# 07 OpenAI Adjacent

This repo is about Codex first.

When a task depends on broader OpenAI product guidance, prefer official documentation over folklore.

Useful boundaries:

- use this repo for Codex workflows
- use official OpenAI docs for platform APIs and product-specific setup
- keep comparisons narrow and factual
```

- [ ] **Step 2: Write the Mermaid assets**

`assets/workflow-map.mmd`

```text
flowchart LR
  A[Inspect the repo] --> B[Clarify the goal]
  B --> C[Choose the right workflow]
  C --> D[Make the smallest justified change]
  D --> E[Verify with evidence]
  E --> F[Summarize or ship]
```

`assets/github-review-loop.mmd`

```text
flowchart TD
  A[Read the PR diff] --> B[Find bugs and risks]
  B --> C[Check tests and CI]
  C --> D[Verify locally when needed]
  D --> E[Write clear findings or fixes]
  E --> F[Publish verified results]
```

- [ ] **Step 3: Verify the files exist**

Run: `test -f 06-connectors-and-tools/README.md && test -f 07-openai-adjacent/README.md && test -f assets/workflow-map.mmd && test -f assets/github-review-loop.mmd`

Expected: command exits with status `0`

- [ ] **Step 4: Commit**

```bash
git add 06-connectors-and-tools 07-openai-adjacent assets
git commit -m "docs: add supporting sections and diagrams"
```

## Task 10: Add Reusable Templates

**Files:**
- Create: `templates/spec-template.md`
- Create: `templates/implementation-plan-template.md`
- Create: `templates/code-review-checklist.md`
- Create: `templates/bugfix-checklist.md`
- Create: `templates/pr-summary-template.md`
- Create: `templates/repo-orientation-prompt.md`
- Create: `templates/verification-checklist.md`

- [ ] **Step 1: Write the spec and implementation-plan templates**

`templates/spec-template.md`

```md
# [Feature Name] Design

Date: YYYY-MM-DD

## Summary

One paragraph describing the problem and the intended change.

## Goals

- goal 1
- goal 2

## Non-Goals

- non-goal 1
- non-goal 2

## Key Decisions

- decision 1
- decision 2

## File or Workflow Impact

- file path or workflow area
- file path or workflow area

## Validation

- focused checks
- broader checks

## Risks

- risk 1
- risk 2
```

`templates/implementation-plan-template.md`

```md
# [Feature Name] Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** One sentence describing the build outcome.

**Architecture:** Two or three sentences about the approach.

**Tech Stack:** Languages, tools, frameworks, and test runners involved.

---

## File Structure

- `path/to/file`: responsibility

## Task 1: Name

**Files:**
- Create: `path/to/file`
- Modify: `path/to/existing-file`
- Test: `path/to/test`

- [ ] **Step 1: Write the failing test**

~~~text
Show the exact test or command here.
~~~

- [ ] **Step 2: Run it to confirm the failure**

Run: `exact command`

Expected: exact failure

- [ ] **Step 3: Write the minimal implementation**

~~~text
Show the exact code here.
~~~

- [ ] **Step 4: Run the verification**

Run: `exact command`

Expected: exact passing result

- [ ] **Step 5: Commit**

~~~bash
git add path/to/file path/to/test
git commit -m "type: short description"
~~~
```

- [ ] **Step 2: Write the checklists, prompt template, and PR summary template**

`templates/code-review-checklist.md`

```md
# Code Review Checklist

- identify the changed behavior first
- look for bugs before style issues
- check for missing tests or weak assertions
- verify any risky assumptions against the code
- cite files when raising findings
- keep summaries secondary to findings
```

`templates/bugfix-checklist.md`

```md
# Bugfix Checklist

- reproduce the issue
- isolate the failing path
- write or run the smallest failing check
- make the smallest fix that explains the failure
- run a regression check
- summarize what changed and how it was verified
```

`templates/pr-summary-template.md`

```md
# PR Summary

## Summary

- change 1
- change 2

## Validation

- command and result
- command and result

## Risks

- remaining limitation
- follow-up item
```

`templates/repo-orientation-prompt.md`

```md
# Repo Orientation Prompt

~~~text
Inspect this repository before proposing changes.

Please return:
1. the files and directories most relevant to my task
2. a short explanation of the current structure
3. the smallest safe next step
4. the commands or checks you would use to verify the result
5. any risks or unknowns that could change the plan
~~~
```

`templates/verification-checklist.md`

```md
# Verification Checklist

- run the smallest focused check
- run the broader integration check if relevant
- inspect the final diff
- confirm documentation or examples still match behavior
- report any verification you could not perform
```

- [ ] **Step 3: Verify the template files exist**

Run: `test -f templates/spec-template.md && test -f templates/implementation-plan-template.md && test -f templates/code-review-checklist.md && test -f templates/bugfix-checklist.md && test -f templates/pr-summary-template.md && test -f templates/repo-orientation-prompt.md && test -f templates/verification-checklist.md`

Expected: command exits with status `0`

- [ ] **Step 4: Commit**

```bash
git add templates
git commit -m "docs: add reusable codex templates"
```

## Task 11: Add End-to-End Examples

**Files:**
- Create: `08-examples/README.md`
- Create: `08-examples/bugfix-from-orientation-to-verification.md`
- Create: `08-examples/review-response-workflow.md`
- Create: `08-examples/docs-update-with-validation.md`

- [ ] **Step 1: Write the examples overview and bugfix workflow**

`08-examples/README.md`

```md
# 08 Examples

## What These Examples Show

These examples connect the earlier modules into complete workflows instead of isolated tips.

## Recommended Order

1. bugfix from orientation to verification
2. review response workflow
3. docs update with validation

## How to Use Them

- read the example once
- copy one checklist or prompt
- apply it to a real repository task
```

`08-examples/bugfix-from-orientation-to-verification.md`

```md
# Bugfix From Orientation to Verification

## Scenario

You have a small bug report but do not yet know the relevant files.

## Workflow

1. start with [../templates/repo-orientation-prompt.md](../templates/repo-orientation-prompt.md)
2. inspect the files Codex identifies
3. use [../templates/bugfix-checklist.md](../templates/bugfix-checklist.md)
4. keep [../templates/verification-checklist.md](../templates/verification-checklist.md) for the exit pass

## Why this works

It forces context, scope, and verification into the workflow before the fix is called done.
```

- [ ] **Step 2: Write the review-response and docs-validation examples**

`08-examples/review-response-workflow.md`

```md
# Review Response Workflow

## Scenario

You need to address actionable PR feedback without implementing bad suggestions blindly.

## Workflow

1. read [../05-github-workflows/address-review-comments.md](../05-github-workflows/address-review-comments.md)
2. inspect the exact file context
3. validate the technical claim behind the comment
4. make the narrowest justified change
5. respond with what changed and how it was verified

## Useful assets

- [../templates/code-review-checklist.md](../templates/code-review-checklist.md)
- [../templates/pr-summary-template.md](../templates/pr-summary-template.md)
```

`08-examples/docs-update-with-validation.md`

```md
# Docs Update With Validation

## Scenario

You want to update repository docs without letting the structure drift.

## Workflow

1. update the content files
2. run `npm test`
3. run `npm run validate`
4. scan for unresolved placeholder language
5. summarize what changed and what was checked

## Why this works

The validation script keeps the top-level structure and required headings from quietly decaying over time.
```

- [ ] **Step 3: Verify the example headings**

Run: `rg -n "^## (What These Examples Show|Recommended Order)$" 08-examples/README.md && rg -n "^# " 08-examples/*.md`

Expected: the README shows both required headings, and each file begins with a single H1.

- [ ] **Step 4: Commit**

```bash
git add 08-examples
git commit -m "docs: add end-to-end workflow examples"
```

## Task 12: Final Validation Pass

**Files:**
- Modify: all created content if validation or self-review finds issues

- [ ] **Step 1: Run the full check suite**

Run: `npm run check`

Expected:

```text
> test
> node --test scripts/validate-docs.test.mjs

ok 1 - reports a missing file
ok 2 - reports a missing heading
ok 3 - accepts a file when all headings are present

> validate
> node scripts/validate-docs.mjs

Documentation structure looks good.
```

- [ ] **Step 2: Scan the docs for placeholder language**

Run: `rg -n "TODO|TBD|lorem ipsum|fill in later" README.md LEARNING-PATH.md CATALOG.md 01-getting-started 02-working-in-a-repo 03-skills 04-subagents 05-github-workflows 06-connectors-and-tools 07-openai-adjacent 08-examples templates`

Expected: no matches

- [ ] **Step 3: Inspect the worktree**

Run: `git status --short`

Expected: no output

- [ ] **Step 4: Commit only if validation required edits**

```bash
git add README.md LEARNING-PATH.md CATALOG.md 01-getting-started 02-working-in-a-repo 03-skills 04-subagents 05-github-workflows 06-connectors-and-tools 07-openai-adjacent 08-examples templates assets package.json scripts
git commit -m "docs: tighten final validation pass"
```
