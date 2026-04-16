# Review PR

Use this skill when reviewing a patch, pull request, or worker result for correctness and risk.

## Review stance

Prioritize:

- bugs
- regressions
- unsafe assumptions
- missing tests

Lead with findings. Keep summaries brief and secondary.

## Workflow

1. Inspect the diff and any nearby code needed for context.
2. Check behavior, not just style.
3. Look for edge cases, stale assumptions, and broken contracts.
4. Verify whether tests cover the changed behavior.
5. Return findings ordered by severity with file references.

## Avoid

- leading with praise or summary
- reporting style nits as findings unless they affect correctness
- skipping test gaps when a behavior change is present
