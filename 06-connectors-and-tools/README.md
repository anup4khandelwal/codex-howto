# 06 Connectors and Tools

Connectors and tools matter when the work depends on context outside the checkout.

## Why this matters

Codex can work with local files, connected services, MCP servers, and external workflow systems. The important decision is not "can I connect it?" It is whether the task needs that outside truth.

## Core concepts

- stay local when the repo contains enough evidence
- use MCP when a tool or knowledge source must be queried during the task
- use Slack, Linear, and GitHub integrations when the work starts outside the terminal
- treat connector output as evidence, not as a substitute for verification

## Copy-paste assets

- [mcp-workflow.md](mcp-workflow.md)
- [external-context-checklist.md](external-context-checklist.md)

## Common mistakes

- guessing at external state when a connector can read it
- connecting broad tools when one narrow source is enough
- forgetting to summarize what external evidence changed the plan
- using an integration trigger without a clear definition of done

## Read next

- [mcp-workflow.md](mcp-workflow.md)
- [slack-linear-handoff.md](slack-linear-handoff.md)
- [external-context-checklist.md](external-context-checklist.md)
