# Fix CI

A failing check is a debugging problem with better logs.

## Useful sequence

1. identify the failing job
2. read the failing step output
3. reproduce locally if possible
4. isolate the smallest fix
5. rerun the most relevant verification

## Avoid

- changing code before understanding the failure
- bundling unrelated cleanups into the fix
