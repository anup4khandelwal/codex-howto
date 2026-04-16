# Fix CI

Use this skill when a pull request or branch is failing CI and the task is to identify and fix the root cause.

## Workflow

1. Read the failing check and logs before proposing a fix.
2. Map the failure to the specific file, dependency, or environment assumption involved.
3. Reproduce the narrowest failing command locally when possible.
4. Fix the smallest root cause instead of broad cleanup.
5. Re-run the targeted check and any nearby safety checks.

## Output contract

Return:

- the failing check or symptom
- the root cause
- the fix applied
- the verification performed
- any residual risk if the full CI matrix was not rerun

## Avoid

- guessing from the error title alone
- mixing unrelated refactors into a CI fix
- claiming success without rerunning evidence
