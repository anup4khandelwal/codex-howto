# Codex How To

A practical, workflow-first guide and starter kit for using Codex well in a real repository.

This repo is for three kinds of users at once:

- people who are new to Codex
- people switching from Claude Code or Cursor
- people who already use agentic tools and want sharper Codex workflows

## What This Repo Is

- A Codex-native guide organized around real work, not around renamed feature lists.
- A set of copy-paste templates, checklists, and examples you can reuse in your own repos.
- A small Codex-ready starter kit with `AGENTS.md`, reusable skills, and a GitHub workflow.
- A learning path that starts small and scales up to planning, delegation, review, and shipping.

## What This Repo Is Not

- It is not a replacement for official product documentation.
- It is not a Claude guide with superficial word substitution.
- It is not a bag of generic prompts with no operational discipline behind them.

## Starter Kit

- [AGENTS.md](AGENTS.md): persistent repo instructions for Codex
- [.codex/skills/](.codex/skills/): starter workflow pack for planning, PR review, CI fixes, and small features
- [.github/prompts/issue-to-plan.md](.github/prompts/issue-to-plan.md): reviewable prompt contract for issue planning
- [.github/workflows/codex-issue-plan.yml](.github/workflows/codex-issue-plan.yml): label-triggered automation that turns an issue into a Codex plan comment

## 15-Minute Quick Start

1. Read [01-getting-started/first-15-minutes.md](01-getting-started/first-15-minutes.md).
2. Copy [AGENTS.md](AGENTS.md) and the pieces you want from [.codex/skills/](.codex/skills/) into your own repo.
3. Copy [templates/repo-orientation-prompt.md](templates/repo-orientation-prompt.md) into your first real Codex session.
4. Keep [02-working-in-a-repo/verify-before-completion.md](02-working-in-a-repo/verify-before-completion.md) open while you work.
5. Pick the next section that matches your experience level.

## Choose Your Path

### New to Codex

Start with [01-getting-started/README.md](01-getting-started/README.md), then move into [02-working-in-a-repo/README.md](02-working-in-a-repo/README.md).

### Switching From Claude Code or Cursor

Read [01-getting-started/switching-from-claude-or-cursor.md](01-getting-started/switching-from-claude-or-cursor.md), then go straight to [03-skills/README.md](03-skills/README.md) and [04-subagents/README.md](04-subagents/README.md).

### Already Comfortable With Agentic Tools

Start with [05-github-workflows/README.md](05-github-workflows/README.md), then skim [templates/](templates/) and the workflows in [08-examples/README.md](08-examples/README.md).

## What You Will Learn

- how to start a session with enough context to avoid low-signal thrashing
- how to inspect a codebase before you edit anything
- how to plan work before implementation
- how to use skills for disciplined workflows instead of ad hoc prompting
- how to delegate bounded work when parallelism actually helps
- how to choose between CLI, IDE, cloud, GitHub, and integration-backed workflows
- how to use MCP and automation without losing review discipline
- how to review, verify, and ship changes without skipping evidence

## Repository Map

- [LEARNING-PATH.md](LEARNING-PATH.md): guided order by audience
- [CATALOG.md](CATALOG.md): quick inventory of everything in the repo
- [01-getting-started/](01-getting-started/): first session and mental model
- [02-working-in-a-repo/](02-working-in-a-repo/): safe repo work
- [03-skills/](03-skills/): skill-driven workflows
- [04-subagents/](04-subagents/): explicit delegation patterns
- [05-github-workflows/](05-github-workflows/): review, CI, and publishing
- [06-connectors-and-tools/](06-connectors-and-tools/): MCP and connector-backed workflows
- [07-openai-adjacent/](07-openai-adjacent/): Codex surfaces and configuration boundaries
- [08-examples/](08-examples/): full workflows from start to finish
- [09-automation/](09-automation/): GitHub Action, SDK, and non-interactive workflows
- [templates/](templates/): prompts, checklists, and handoff artifacts
- [AGENTS.md](AGENTS.md): persistent repo contract example
- [.codex/skills/](.codex/skills/): reusable starter skill pack
- [.github/workflows/](.github/workflows/): sample Codex automation

## Working Principles

- Prefer Codex-native workflows over feature-parity comparisons.
- Start with repository context before proposing edits.
- Keep templates opinionated and practical.
- Verify outcomes before claiming success.
- Use delegation deliberately, not by reflex.
