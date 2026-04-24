# GitHub Comment to Cloud Task

## Scenario

A pull request is already open. You want a first-pass review in GitHub, then one bounded follow-up task without switching to a local session too early.

## Flow

1. request a GitHub-native review with `@codex review`
2. inspect the returned finding and decide whether it is technically correct
3. restate the accepted work as a bounded `@codex` task
4. inspect the resulting diff or task output
5. run the promised verification locally or confirm the matching CI signal
6. reply on the PR with what changed and what was verified

## Review comment

~~~text
@codex review for workflow regressions and missing validation steps
~~~

## Follow-up task comment

~~~text
@codex fix the workflow validation regression on this PR.

Scope:
- stay within the changed workflow and related docs
- do not refactor unrelated files

Verification:
- run the failing validation command first
- rerun the same command after the fix

Return:
- root cause
- files changed
- verification result
- anything still risky
~~~

## Local finish

- inspect the returned diff before merging
- verify the same command Codex claimed to run
- confirm the task stayed within the scope you gave it
- summarize the accepted fix in the PR thread
