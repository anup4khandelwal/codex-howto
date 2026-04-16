# Codex How To Catalog

This page is the fastest way to scan what the repository contains.

## Core Guides

- [README.md](README.md): landing page and quick start
- [LEARNING-PATH.md](LEARNING-PATH.md): guided reading order
- [CATALOG.md](CATALOG.md): this index

## Modules

- [01-getting-started/README.md](01-getting-started/README.md)
  - first session
  - environment mental model
  - switching notes
- [02-working-in-a-repo/README.md](02-working-in-a-repo/README.md)
  - repo inspection
  - planning
  - safe editing
  - verification
- [03-skills/README.md](03-skills/README.md)
  - choosing skills
  - brainstorming to planning
  - debugging discipline
- [04-subagents/README.md](04-subagents/README.md)
  - when to delegate
  - task design
  - review of worker results
- [05-github-workflows/README.md](05-github-workflows/README.md)
  - PR review
  - review comments
  - CI fixes
  - publishing
- [06-connectors-and-tools/README.md](06-connectors-and-tools/README.md)
  - MCP workflow
  - Slack and Linear handoff
  - external context checklist
- [07-openai-adjacent/README.md](07-openai-adjacent/README.md)
  - related official OpenAI context
  - Codex surfaces
  - configuration and customization
- [08-examples/README.md](08-examples/README.md)
  - end-to-end workflows
- [09-automation/README.md](09-automation/README.md)
  - GitHub Action workflow
  - non-interactive workflow
  - SDK workflow

## Templates

- [templates/spec-template.md](templates/spec-template.md)
- [templates/implementation-plan-template.md](templates/implementation-plan-template.md)
- [templates/code-review-checklist.md](templates/code-review-checklist.md)
- [templates/bugfix-checklist.md](templates/bugfix-checklist.md)
- [templates/pr-summary-template.md](templates/pr-summary-template.md)
- [templates/repo-orientation-prompt.md](templates/repo-orientation-prompt.md)
- [templates/verification-checklist.md](templates/verification-checklist.md)

## Starter Kit

- [AGENTS.md](AGENTS.md): persistent repo instructions for Codex
- [.codex/skills/issue-to-plan/SKILL.md](.codex/skills/issue-to-plan/SKILL.md): turn an issue into a bounded plan
- [.codex/skills/fix-ci/SKILL.md](.codex/skills/fix-ci/SKILL.md): CI debugging workflow
- [.codex/skills/review-pr/SKILL.md](.codex/skills/review-pr/SKILL.md): findings-first review workflow
- [.codex/skills/small-feature/SKILL.md](.codex/skills/small-feature/SKILL.md): bounded feature implementation workflow
- [.github/prompts/issue-to-plan.md](.github/prompts/issue-to-plan.md): reviewable prompt contract for issue planning
- [.github/workflows/codex-issue-plan.yml](.github/workflows/codex-issue-plan.yml): label-triggered issue-to-plan automation

## End-to-End Examples

- [08-examples/bugfix-from-orientation-to-verification.md](08-examples/bugfix-from-orientation-to-verification.md)
- [08-examples/review-response-workflow.md](08-examples/review-response-workflow.md)
- [08-examples/docs-update-with-validation.md](08-examples/docs-update-with-validation.md)
- [08-examples/linear-to-local-finish.md](08-examples/linear-to-local-finish.md)
- [08-examples/github-action-pr-review.md](08-examples/github-action-pr-review.md)
- [08-examples/mcp-frontend-context.md](08-examples/mcp-frontend-context.md)

## Scripts

- `npm test`: run validation unit tests
- `npm run validate`: validate required files and headings
- `npm run check`: run both test and validation
