# Rules and Hooks

Use `AGENTS.md`, rules, and hooks for different jobs.

- `AGENTS.md` sets persistent workflow expectations
- rules control which commands can run outside the sandbox
- hooks run deterministic scripts at specific Codex lifecycle events

## AGENTS.md first

Start with `AGENTS.md` for stable repo behavior such as:

- build and test commands
- review standards
- generated-file boundaries
- security or release constraints

Use `AGENTS.override.md` when one subtree needs different behavior than the repository root. If your repository already uses another instructions filename, configure it with `project_doc_fallback_filenames`.

## Rules for outside-sandbox commands

Rules are the right tool when you want reviewable policy for commands that would run outside the sandbox.

Useful decisions:

- `allow`: let the command run without prompting
- `prompt`: ask every time
- `forbidden`: block the command

Use rules for command prefixes, not for broad workflow guidance.

See [../.codex/rules/default.rules.example](../.codex/rules/default.rules.example) for a starter file that:

- prompts before `gh pr view`
- forbids `git reset --hard`
- forbids destructive `git clean`
- prompts before `npm publish`

Test a rule file before trusting it:

~~~bash
codex execpolicy check --pretty \
  --rules ./.codex/rules/default.rules \
  -- gh pr view 2 --json title,body
~~~

## Hooks for deterministic lifecycle checks

Hooks are experimental and currently disabled on Windows. They are useful when you need a script to run at a known point in the Codex loop.

Good starter events:

- `PreToolUse`: block an unsafe Bash command before it runs
- `PermissionRequest`: auto-deny or auto-allow specific approval requests
- `UserPromptSubmit`: add extra developer context or block a bad prompt
- `Stop`: force one more pass before Codex finishes

Important limits:

- current hook interception is mainly for Bash
- hooks do not fully cover MCP, Write, WebSearch, or every shell path
- hooks are guardrails, not a complete enforcement boundary

See:

- [../.codex/hooks.json.example](../.codex/hooks.json.example): starter hook wiring
- [../.codex/hooks/README.md](../.codex/hooks/README.md): copy-paste script patterns

## Repo-local layout

Keep repo-local policy reviewable:

- `.codex/config.example.toml` for profiles and feature flags
- `.codex/rules/` for outside-sandbox command policy
- `.codex/hooks.json.example` for event wiring
- `.codex/hooks/` for deterministic helper scripts

## Avoid

- using hooks to hide side effects from the user
- assuming rules affect commands that stay inside the sandbox
- treating hooks as a replacement for final verification
- adding repo-local hook scripts that mutate files unless that mutation is the explicit workflow
