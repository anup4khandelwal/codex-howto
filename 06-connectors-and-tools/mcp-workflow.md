# MCP Workflow

Use MCP when the task needs a live tool, service, or structured knowledge source that is not already in the repo.

## Good MCP fits

- official documentation lookup for fast-moving APIs
- issue, PR, or design context from connected systems
- browser, database, analytics, or product tools that answer a specific question
- internal knowledge sources that should not be pasted manually into a prompt

## Workflow

1. state what external truth is needed
2. choose the narrowest MCP server or connector that can answer it
3. fetch only the evidence needed for the current task
4. summarize the evidence before editing
5. verify the local result with repo checks

## Avoid

- using MCP for facts already available in the checkout
- pulling broad context before defining the question
- treating tool output as automatically current without checking timestamps or source boundaries
- mixing multiple external systems in one task unless the workflow genuinely spans them
