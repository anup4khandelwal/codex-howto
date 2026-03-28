# Codex How To Design

Date: 2026-03-28

## Summary

Create a Codex-native repository inspired by `luongnv89/claude-howto`, but reorganized around how Codex is actually used in this terminal agent environment. The repository should help three audiences at once:

- beginners who are new to Codex
- users switching from Claude Code or Cursor
- power users who want high-leverage Codex workflows

The first release should be a full toolkit in scope, but intentionally narrow in coverage: strong documentation, reusable templates, a few support scripts, and end-to-end examples. It should be Codex-first, with a small secondary section covering adjacent OpenAI tools where that context is useful.

## Goals

- Teach users how to be productive with Codex in this environment, not how to translate Claude concepts mechanically.
- Provide a structured learning path from first session to advanced workflows.
- Ship copy-paste assets that are practical in a real repository.
- Make mental-model differences explicit for users switching from Claude Code or Cursor.
- Keep the guide useful for advanced users by including disciplined workflows for planning, verification, review, and delegation.

## Non-Goals

- Build a broad OpenAI developer handbook.
- Recreate the source repository section-for-section.
- Promise feature equivalence where Codex behaves differently.
- Ship heavy automation or fake scripts that do not reflect real behavior in this environment.

## Primary Decisions

- Repository shape: workflow-first Codex guide
- Audience: beginners, switchers, and power users
- Artifact scope: docs, templates, scripts, and opinionated examples
- Product focus: Codex first, with a small related-tools section

## Repository Structure

The repository should use this top-level structure:

- `README.md`
- `LEARNING-PATH.md`
- `CATALOG.md`
- `01-getting-started/`
- `02-working-in-a-repo/`
- `03-skills/`
- `04-subagents/`
- `05-github-workflows/`
- `06-connectors-and-tools/`
- `07-openai-adjacent/`
- `08-examples/`
- `templates/`
- `scripts/`
- `assets/`

## Top-Level File Responsibilities

### `README.md`

The landing page should explain:

- what the repository is
- who it is for
- how it differs from official documentation
- how to get value in the first 15 minutes
- where each audience should start

It should emphasize practical outcomes over feature inventory.

### `LEARNING-PATH.md`

The roadmap should define a progressive path for:

- beginners
- switchers from Claude Code or Cursor
- power users

The guide should present these as layered paths through one shared repository rather than separate tracks with duplicated content.

### `CATALOG.md`

The catalog should be a fast-scanning index of:

- modules
- templates
- scripts
- end-to-end examples
- recommended usage points

## Module Design

Each numbered module should contain:

- a `README.md`
- 3 to 6 focused examples
- 1 to 2 copy-paste assets where appropriate

Each module should follow the same content pattern where relevant:

- `Why this matters`
- `Core concepts`
- `Copy-paste assets`
- `Common mistakes`

This gives beginners a predictable learning rhythm and gives experienced users a stable skim pattern.

## Module Intent

### `01-getting-started/`

Introduce the environment, core mental model, first-session value, and the smallest useful workflow.

### `02-working-in-a-repo/`

Teach how to inspect a codebase, plan changes, edit safely, and verify outcomes.

### `03-skills/`

Explain what skills are in this environment, when they apply, and how users should think about skill-driven workflows.

### `04-subagents/`

Cover explicit delegation patterns, when delegation helps, when it hurts, and how to split work cleanly.

### `05-github-workflows/`

Focus on practical repository work such as review, PR preparation, addressing comments, CI-related workflows, and shipping.

### `06-connectors-and-tools/`

Introduce connected capabilities such as GitHub, Gmail, Calendar, and related tool/context access patterns that matter in this environment.

### `07-openai-adjacent/`

Stay intentionally small. This section exists to help users place Codex within the broader OpenAI tool landscape, not to become a second product guide.

### `08-examples/`

Contain end-to-end walkthroughs that combine multiple techniques into real workflows.

## Templates

The `templates/` directory should contain opinionated assets that users can adapt quickly. Initial targets:

- spec template
- implementation plan template
- code review checklist
- bugfix checklist
- PR summary template
- repo orientation prompt
- verification checklist

Templates should be concise, explicit, and tuned for real repository work.

## Scripts

The `scripts/` directory should contain support utilities only. Suitable examples:

- catalog generation
- link checking
- validating template references

Scripts should never imply capabilities that are not actually available in this Codex environment.

## Learning Model

The repository should support three audiences without fragmenting into separate documentation sets:

- Beginners learn the shortest safe path from zero to a successful small change.
- Switchers get explicit mental-model translation from Claude Code or Cursor concepts to Codex-native workflows.
- Power users get reusable patterns for disciplined planning, verification, review, and delegated work.

This layering should happen within shared modules, not through duplicated tracks.

## Migration Guidance

Migration notes should be explicit about differences. The repository should not claim one-to-one mapping where behavior differs. For switchers, the material should answer:

- what carries over conceptually
- what changes in practice
- what to stop assuming

## Content Rules

- Every example must correspond to real Codex behavior in this environment.
- Codex-specific guidance takes priority over source-repo resemblance.
- OpenAI-adjacent content remains secondary and intentionally narrow.
- Copy-paste assets should be practical and opinionated rather than generic prompt filler.
- Examples should show complete workflows, not isolated tricks.

## V1 Scope

Version 1 should prioritize:

- `README.md`
- `LEARNING-PATH.md`
- `CATALOG.md`
- `01-getting-started/`
- `02-working-in-a-repo/`
- `03-skills/`
- `04-subagents/`
- `05-github-workflows/`
- `templates/` with 5 to 8 assets
- `08-examples/` with 3 end-to-end workflows

Suggested example workflows for v1:

- bugfix from repo orientation through verification
- code review and review response workflow
- documentation update with structured validation

## Deferred Scope

These areas should be deferred until after the first release:

- deep connector coverage beyond core GitHub, Gmail, and Calendar usage
- heavy automation scripts
- broad OpenAI platform tutorials
- extensive branding and polished asset work

## Success Criteria

The first release is successful if it:

- gives a new user a useful first Codex workflow in about 15 minutes
- gives a switcher a clear mental-model translation without misleading equivalence claims
- gives a power user reusable workflows that feel disciplined rather than generic
- reads as a Codex-native guide rather than a renamed Claude guide

## Implementation Implications

When implementation begins, the work should start with the repository skeleton, landing documents, prioritized modules, templates, and end-to-end examples in that order. The implementation plan should keep the first release tight and avoid expanding into secondary product coverage too early.
