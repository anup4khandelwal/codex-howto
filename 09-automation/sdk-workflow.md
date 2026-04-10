# SDK Workflow

Use the Codex SDK when you need Codex inside an internal tool or repeatable engineering workflow.

## Good fits

- a maintenance bot with a fixed prompt contract
- an internal review assistant
- a migration helper that runs inside existing tooling
- a developer portal action that creates a draft PR

## Design checklist

- define the user action that starts the run
- define the repository and environment setup
- define the exact prompt contract
- define the allowed tools and write scope
- define how humans review the result
- define logs, failure handling, and retry behavior

## Avoid

- using the SDK to hide vague prompts behind a button
- giving broad write access without verification
- skipping a human review path for code changes
