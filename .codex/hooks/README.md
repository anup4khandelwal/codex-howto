# Hooks Starter Patterns

Use [../hooks.json.example](../hooks.json.example) as the wiring template, then add only the scripts you actually need.

Keep hook scripts:

- deterministic
- side-effect free unless mutation is the explicit workflow
- fast enough to avoid turning every turn into a slow path
- reviewed like any other repo policy

## PreToolUse: block destructive Bash commands

Use this when you want to stop obviously unsafe commands before they run.

~~~python
import json
import sys

payload = json.load(sys.stdin)
command = payload["tool_input"]["command"]
blocked_prefixes = (
    "git reset --hard",
    "git checkout --",
    "rm -rf /",
)

if any(command.startswith(prefix) for prefix in blocked_prefixes):
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": "Destructive command blocked by repository hook."
        }
    }))
~~~

## PermissionRequest: deny publish or push outside the release flow

Use this when the command is already asking for approval and repo policy wants a stronger default than a normal prompt.

~~~python
import json
import sys

payload = json.load(sys.stdin)
command = payload["tool_input"]["command"]

if command.startswith("git push") or command.startswith("npm publish"):
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PermissionRequest",
            "decision": {
                "behavior": "deny",
                "message": "Push or publish only from the explicit release workflow."
            }
        }
    }))
~~~

## UserPromptSubmit: add a reminder before broad work

Use this when a risky prompt pattern should inject guidance before Codex starts acting.

~~~python
import json
import sys

payload = json.load(sys.stdin)
prompt = payload["prompt"].lower()

if "refactor the whole repo" in prompt:
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "UserPromptSubmit",
            "additionalContext": "Ask for a bounded scope and explicit verification before editing."
        }
    }))
~~~

## Stop: force one more pass

Use this when a turn should continue instead of stopping immediately, such as when verification was promised but not mentioned.

~~~python
import json

print(json.dumps({
    "decision": "block",
    "reason": "Before stopping, state the verification command you ran or say what you could not verify."
}))
~~~

## Notes

- `PreToolUse`, `PermissionRequest`, and `PostToolUse` currently center on Bash tool events.
- `UserPromptSubmit` and `Stop` ignore `matcher` today.
- `Stop` continuation is not a rejection. It creates a new continuation prompt.
- For repo-local hooks, prefer paths resolved from the git root so the hook still works when Codex starts from a subdirectory.
