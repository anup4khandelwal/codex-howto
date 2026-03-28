# Task Design for Subagents

A good delegated task includes:

- exact goal
- owned files or responsibility
- what not to change
- what output to return

## Example shape

- "Own `src/api/auth.ts` and `tests/auth.test.ts`."
- "Do not revert unrelated edits."
- "Return the files changed and any follow-up risks."
