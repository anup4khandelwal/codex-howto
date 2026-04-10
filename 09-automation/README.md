# 09 Automation

Automation is useful when a Codex workflow should run repeatably without a fully interactive local session.

## Why this matters

Some tasks start in CI, GitHub, scripts, or internal tools. Those workflows need stronger boundaries than a chat session because nobody is there to correct drift in real time.

## Core concepts

- automate narrow workflows before broad ones
- include repository setup and verification in the automation contract
- make outputs reviewable by a human
- prefer repeatable prompts over hidden assumptions

## Copy-paste assets

- [github-action-workflow.md](github-action-workflow.md)
- [non-interactive-workflow.md](non-interactive-workflow.md)

## Common mistakes

- using automation for ambiguous product decisions
- skipping diff review because the task was automated
- omitting the verification command from the prompt
- letting automation write across unrelated areas

## Read next

- [github-action-workflow.md](github-action-workflow.md)
- [non-interactive-workflow.md](non-interactive-workflow.md)
- [sdk-workflow.md](sdk-workflow.md)
