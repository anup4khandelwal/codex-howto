# MCP Frontend Context

This workflow uses MCP-backed context for a frontend task where the repo alone is not enough.

## Flow

1. identify the missing external context
2. query the narrowest relevant MCP tool
3. summarize what the tool proved
4. inspect the local component and styling patterns
5. make the smallest matching change
6. verify with tests, screenshots, or manual browser checks

## Prompt shape

~~~text
Use MCP only for the design or documentation context needed for this task.

First summarize:
- what external source you checked
- what it proves
- which local files it affects

Then inspect the repo and propose the smallest implementation path.
Do not edit unrelated UI patterns.
Verify with the relevant local checks.
~~~

## Verification

For UI work, prefer evidence that proves the rendered result, not just a passing build.
