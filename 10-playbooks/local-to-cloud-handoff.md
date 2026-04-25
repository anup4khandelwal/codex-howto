# Local to Cloud Handoff

Use this playbook when local exploration finds a task that Codex can finish in the background.

## Good fits

- independent bugfixes after local reproduction
- documentation updates with clear acceptance criteria
- repo-wide investigation that does not need local-only files
- implementation tasks that can run in an isolated environment

## Workflow

1. inspect locally until the task boundary is clear
2. commit, stash, or describe any local state the cloud task needs
3. write a task brief with files, constraints, and verification
4. start the cloud task from the appropriate surface
5. review the returned diff locally before publishing

## Task brief

```md
Use this repository and branch:
Implement:
Context already learned locally:
Files likely involved:
Constraints:
Verification command:
Return:
```

## Verification

Run the named checks locally after applying the returned diff. If the cloud task changed setup, dependencies, or generated files, inspect those separately before merging.

## Failure modes

- unstaged local changes are assumed to be visible in cloud
- cloud output is merged without rerunning local checks
- the handoff omits the reason behind a constraint discovered locally
- the task is too broad for one isolated run
