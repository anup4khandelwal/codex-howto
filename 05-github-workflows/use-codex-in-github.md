# Use Codex in GitHub

GitHub-native Codex is useful when the pull request is already the source of truth and the task does not depend on your local uncommitted state.

## Good fits

- first-pass review directly in the PR thread
- one focused follow-up task on an open PR
- a bounded fix request for one accepted review finding
- repo-specific review behavior driven by `AGENTS.md`

## Setup

1. connect the repository to Codex cloud
2. enable Code review for the repository in Codex settings
3. optionally enable Automatic reviews if every PR should get a first pass
4. add `AGENTS.md` review guidance when the repository has non-obvious risks

## Review from GitHub

- use `@codex review` for a general PR review
- use `@codex review for security regressions` for a one-off focus
- treat no findings as a useful signal, not as merge approval
- remember that GitHub-native reviews surface only the highest-severity issues unless your repo guidance says otherwise

## Ask for a PR task

When you need more than a review, mention `@codex` with a bounded task and a verification contract.

~~~text
@codex fix the CI failures on this PR.

Scope:
- stay within the test and build failures already shown on this PR
- do not refactor unrelated code

Verification:
- run the narrow failing command first
- rerun the relevant passing command after the fix

Return:
- files changed
- root cause
- verification result
- any remaining risk
~~~

## Review guidance in AGENTS.md

Use `AGENTS.md` when your repository needs review rules that do not show up clearly in the diff.

~~~md
## Review guidelines

- treat broken commands and wrong file paths in docs as P1
- verify that changed workflows still name the right validation command
- flag missing verification steps as a correctness issue
~~~

Place broad guidance at the repository root. Add deeper `AGENTS.md` files only when one subtree has different risks than the rest of the repo.

## Verification path

1. inspect the Codex review or task output in GitHub
2. inspect the diff yourself
3. run the promised checks locally or confirm the relevant CI signal
4. merge only after a human agrees the change is correct

## Avoid

- asking for broad refactors from a PR comment
- using GitHub-native Codex when the task depends on local uncommitted changes
- treating a Codex review as the final approval
- asking for "fix this" without scope, exclusions, and verification
