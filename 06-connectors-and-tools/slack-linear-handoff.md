# Slack and Linear Handoff

Use Slack and Linear integrations when the work begins in conversation or a tracked issue and needs to become a bounded Codex task.

## Before delegating

- identify the repository
- identify the expected change
- link the source thread or issue
- name the verification command or acceptance check
- separate product intent from implementation guesses

## Good handoff shape

~~~text
Use the linked Linear issue as context.

Goal: one sentence outcome.
Scope: files or subsystem likely involved.
Do not change: explicit exclusions.
Verification: exact command or manual check.
Return: summary, changed files, verification result, and open questions.
~~~

## After Codex responds

- compare the result to the issue or thread
- inspect the diff before merging
- run the promised verification locally or in CI
- reply with what changed and any remaining risk
