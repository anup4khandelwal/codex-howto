# GitHub Action Workflow

Use a Codex GitHub Action when a repeatable repository event should ask Codex to inspect, review, or propose a change.

## Good fits

- PR review assistance
- release-note draft checks
- recurring maintenance tasks
- issue triage that produces a bounded proposal

## Workflow shape

1. choose the event trigger
2. pass only the context Codex needs
3. state the expected output format
4. require verification evidence
5. keep a human review step before merge or publish

## Prompt contract

~~~text
Review this pull request for behavioral risks.

Prioritize bugs, regressions, missing tests, and unsafe assumptions.
Return severity-ordered findings with file references.
Do not comment on style unless it affects correctness.
Include any checks you ran or could not run.
~~~

## Avoid

- auto-merging Codex changes without review
- asking for broad refactors from a generic CI trigger
- hiding failures in action logs that nobody reads
