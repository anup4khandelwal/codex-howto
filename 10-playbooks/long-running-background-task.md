# Long-Running Background Task

Use this playbook when Codex should work asynchronously on a task that may take time to inspect, implement, test, or iterate.

## Good fits

- multi-file refactors with clear boundaries
- issue-to-PR implementation work
- investigation followed by a proposed patch
- parallel tasks that do not touch the same files

## Workflow

1. split the work into one bounded task per run
2. name the files or ownership area
3. include setup and verification commands
4. require a concise progress and result summary
5. review the final diff before applying or merging

## Task brief

```md
Objective:
Ownership area:
Inputs:
Allowed changes:
Do not change:
Setup:
Verification:
Final response:
```

## Verification

Check that the task stayed inside its ownership area and that the reported verification matches commands or evidence you can rerun.

## Failure modes

- launching overlapping tasks that edit the same files
- giving a broad objective without a stop condition
- omitting setup steps for the background environment
- accepting a generated PR without reviewing the diff
