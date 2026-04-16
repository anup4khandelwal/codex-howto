# AGENTS.md

Persistent instructions for Codex contributors in this repository.

## Repository purpose

This repo is a workflow-first guide for using Codex well in a real repository.
Prefer practical, reviewable assets over generic prompting advice.

## Editing rules

- Keep the writing direct, concrete, and copy-pasteable.
- Prefer bounded workflows, prompt contracts, checklists, and examples.
- Do not add marketing language or vague claims about product behavior.
- When adding or changing workflow guidance, make the verification path explicit.
- Keep examples safe by default. Favor read-only review flows before write flows.

## Validation

Run these commands before finishing doc changes:

- `npm run test`
- `npm run validate`
- `npm run check`

## Repository constraints

- The required docs contract is enforced in `scripts/lib/validate-docs.mjs`.
- If you add or rename required guide files, update the validation library and tests in the same change.
- Keep the root `README.md` and `CATALOG.md` aligned with any new starter assets.

## Starter kit conventions

- Root `AGENTS.md` is the persistent repo contract.
- `.codex/skills/` contains reusable workflow skills that downstream repos can copy.
- `.github/prompts/` holds reviewable prompt contracts used by automation.
- `.github/workflows/` should keep permissions minimal and prompts inspectable.
