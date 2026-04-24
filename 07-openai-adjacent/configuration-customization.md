# Configuration and Customization

Codex customization should make good behavior repeatable without hiding task-specific judgment.

Use these pages when you need operational defaults instead of one-off advice:

- [approvals-and-sandboxing.md](approvals-and-sandboxing.md)
- [rules-and-hooks.md](rules-and-hooks.md)

## AGENTS.md and project instructions

Use project instructions for stable repo behavior:

- build and test commands
- coding conventions
- generated-file boundaries
- security or privacy constraints
- review and verification expectations

Keep task-specific requirements in the task prompt, not in persistent instructions.

Use `AGENTS.override.md` when one subtree needs stricter local behavior than the repository root. If your repo already uses another instructions filename, add it to `project_doc_fallback_filenames` instead of duplicating guidance manually.

## MCP configuration

Add MCP only when it gives Codex a real tool or knowledge source. Prefer narrow, named tools over broad access when a task only needs one system.

Document:

- what the server is for
- what tasks should use it
- what data should not be requested
- how to verify tool-backed work

## Hooks

Treat hooks as advanced automation. They are useful when a repeated action should happen around a Codex event, such as checking prompts, saving session notes, or running validation.

Avoid hooks that:

- mutate files without an explicit workflow reason
- hide failures from the user
- run expensive checks for every small interaction
- replace normal final verification

## Skills and plugins

Use skills for workflow discipline and specialized procedures. Use plugins when you need reusable packaged behavior. Do not create either for a one-off instruction that belongs in the current task.
