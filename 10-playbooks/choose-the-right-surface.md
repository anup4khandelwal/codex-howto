# Choose the Right Surface

Use this playbook before starting work when the same task could happen in the CLI, IDE, web/cloud, GitHub, or automation.

## Decision guide

- use CLI for local state, fast inspection, tests, and direct edits
- use IDE when the work is centered on files already open in your editor
- use web/cloud when the task is independent, longer running, or parallelizable
- use GitHub when the source of truth is an issue, PR, comment, or failing check
- use automation when the trigger and verification are repeatable
- use MCP or connectors when the task needs live external truth

## Task brief

```md
Goal:
Surface:
Repository state:
External context:
Allowed changes:
Do not change:
Verification:
Expected output:
```

## Verification

Before completion, confirm that the chosen surface had the context it needed and that the result was reviewed in the right place: local diff, PR, generated artifact, or automation log.

## Failure modes

- the task depends on files that only exist locally, but was sent to cloud
- the task needs current docs, but no source lookup was requested
- the task is ambiguous enough to need product judgment, but was automated
- the task produces a diff, but no test or review path is named
