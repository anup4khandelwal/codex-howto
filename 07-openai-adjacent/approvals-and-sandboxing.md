# Approvals and Sandboxing

Choose the approval and sandbox mode before you optimize prompt wording.

These defaults change what Codex is allowed to do, what it must ask before doing, and how much damage a bad assumption can cause.

## Good starting presets

- read-only review: `--sandbox read-only --ask-for-approval never`
- safe daily write: `--sandbox workspace-write --ask-for-approval untrusted`
- tighter autopilot: `--full-auto`
- dangerous full access: `--dangerously-bypass-approvals-and-sandbox` or `--yolo`

Use `workspace-write` with `untrusted` for most real repository work. Use read-only for review, planning, summaries, and CI jobs that should never edit files.

`--full-auto` is only a convenience alias for `--sandbox workspace-write --ask-for-approval on-request`. It is not the same as full access.

## Config example

Use profiles so the safe choice is easy to repeat.

~~~toml
approval_policy = "untrusted"
sandbox_mode = "workspace-write"
allow_login_shell = false

project_doc_fallback_filenames = ["TEAM_GUIDE.md", ".agents.md"]

[features]
codex_hooks = true

[profiles.readonly_quiet]
approval_policy = "never"
sandbox_mode = "read-only"

[profiles.safe_write]
approval_policy = "untrusted"
sandbox_mode = "workspace-write"

[profiles.full_auto]
approval_policy = "on-request"
sandbox_mode = "workspace-write"

# Uncomment only when a workflow truly needs network in workspace-write mode.
# [sandbox_workspace_write]
# network_access = true
~~~

See [../.codex/config.example.toml](../.codex/config.example.toml) for a starter file you can copy.

## How to choose the mode

1. start with read-only when the task might only need orientation, review, or reporting
2. move to `workspace-write` when the task clearly requires edits
3. keep approvals on `untrusted` until the workflow is repetitive, bounded, and easy to verify
4. use `--full-auto` only when the write scope and verification path are already explicit
5. treat `--yolo` as an exception path, not as a normal default

## Test the sandbox locally

Use the platform sandbox command when you want to understand how a command behaves under Codex restrictions.

~~~bash
# macOS
codex sandbox macos --full-auto --log-denials -- npm test

# Linux
codex sandbox linux --full-auto -- npm test
~~~

This is useful when a command fails in Codex but works in your normal shell. Test the exact narrow command instead of guessing.

## Avoid

- starting broad write workflows with `--yolo`
- enabling workspace-write network access by default when the task does not need it
- assuming an approval grant is the same thing as verification
- letting one permissive profile become the default for every repository
