# Fresh Docs With Web Search

Use this playbook when work depends on facts that may have changed: product docs, API names, SDK behavior, pricing, release notes, or platform support.

## Good fits

- upgrading an API integration
- writing docs about current product behavior
- checking recently released framework features
- verifying installation or configuration commands

## Workflow

1. state the freshness question
2. search official or primary sources first
3. capture source dates or update markers when available
4. summarize the evidence before editing
5. keep citations in the final explanation when useful

## Task brief

```md
Freshness question:
Preferred sources:
Facts to verify:
Files to update:
Verification:
Output should include:
```

## Verification

Check that the final change separates sourced facts from local repo guidance. If the source is versioned, confirm that the version matches the code or docs being changed.

## Failure modes

- using stale memory for recently changed APIs
- mixing official docs with unsourced blog claims
- omitting source dates for release-dependent guidance
- changing repo behavior based on docs for a different version
