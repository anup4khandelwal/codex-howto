# GitHub Action PR Review

This workflow uses Codex automation for repeatable PR review assistance.

## Flow

1. trigger Codex from a pull request event or manual workflow
2. ask for severity-ordered findings only
3. require file references and verification notes
4. review the output before acting on it
5. turn accepted findings into focused fixes

## Review prompt

~~~text
Review this pull request for correctness.

Prioritize:
- behavioral regressions
- missing or weak tests
- unsafe assumptions
- deployment or compatibility risk

Return findings first, ordered by severity.
Include file references.
Keep summaries secondary.
~~~

## Human review

Do not treat the automation result as the final review. Use it as a structured first pass, then inspect the diff and tests yourself.
