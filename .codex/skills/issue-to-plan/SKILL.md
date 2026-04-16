# Issue To Plan

Use this skill when an issue, bug report, or feature request needs a bounded implementation plan before code changes begin.

## Workflow

1. Inspect the repository before proposing a plan.
2. Restate the goal and any explicit constraints from the issue.
3. Identify the smallest set of files or modules likely to change.
4. Produce a step-by-step plan with verification commands.
5. Call out assumptions, missing context, and anything that could change the plan.

## Output contract

Return these sections:

- `Goal`
- `Relevant Files`
- `Proposed Plan`
- `Verification`
- `Risks And Unknowns`

## Avoid

- writing code when the ask is only to plan
- inventing product requirements that are not stated
- skipping verification or file references
