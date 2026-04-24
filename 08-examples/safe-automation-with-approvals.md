# Safe Automation with Approvals

## Scenario

You want a repeatable `codex exec` workflow for a bounded repository task, but you do not want to normalize broad write access or full bypass flags.

## Flow

1. start with a read-only run for dry-run summaries or review output
2. move to `workspace-write` only when the task truly needs edits
3. keep approvals on `untrusted` for the first write-capable version of the workflow
4. add repo-local rules for destructive or release commands
5. add hooks only for deterministic guardrails
6. run the exact verification command inside the automation contract
7. inspect the resulting diff before commit or PR creation

## Starter assets

- [../.codex/config.example.toml](../.codex/config.example.toml)
- [../.codex/rules/default.rules.example](../.codex/rules/default.rules.example)
- [../.codex/hooks.json.example](../.codex/hooks.json.example)
- [../.codex/hooks/README.md](../.codex/hooks/README.md)

## Prompt shape

~~~text
Goal: repair the smallest docs contract drift.
Allowed changes: docs and validation files only.
Do not change: package manager files, CI, or unrelated examples.
Verification: npm run test && npm run validate.
Return: files changed, root cause, verification result, and remaining risk.
~~~

## Command shape

Start read-only:

~~~bash
codex exec \
  --sandbox read-only \
  --ask-for-approval never \
  "summarize the docs contract drift and tell me the smallest safe fix"
~~~

Move to bounded writes only after the task shape is clear:

~~~bash
codex exec \
  --sandbox workspace-write \
  --ask-for-approval untrusted \
  "repair the docs contract drift and run npm run test && npm run validate"
~~~

## Review step

- inspect the final diff yourself
- confirm the rule or hook configuration did not hide side effects
- verify the same command the automation claimed to run
- publish only after the bounded write path is stable
