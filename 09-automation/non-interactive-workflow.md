# Non-Interactive Workflow

Use non-interactive Codex runs for scripted tasks with clear inputs, outputs, and verification.

## Good fits

- documentation linting and repair
- dependency update summaries
- generated review notes
- bounded codemods with strong tests

## Task shape

~~~text
Goal: exact outcome.
Inputs: files, branch, or artifact paths.
Allowed changes: explicit paths or subsystems.
Do not change: explicit exclusions.
Verification: exact command.
Output: summary, files changed, and verification result.
~~~

## Guardrails

- run from a clean or intentionally prepared worktree
- scope writable paths narrowly
- make the command fail on validation failure
- inspect the resulting diff before committing
