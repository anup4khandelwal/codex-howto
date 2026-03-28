# Verify Before Completion

Never stop at "the code looks right."

## Minimum verification loop

1. run the most relevant focused test or command
2. run any broader check that would catch integration mistakes
3. inspect the changed files one more time
4. summarize exactly what was verified and what was not

## Good completion language

- "I ran `npm test -- widget` and it passed."
- "I could not run the browser flow in this environment."
- "I changed `src/a.ts` and `tests/a.test.ts` only."

## Bad completion language

- "should be fixed now"
- "looks good"
- "done" with no evidence
