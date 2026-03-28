# Systematic Debugging

When behavior is wrong, do not jump to the first plausible fix.

## Strong debugging loop

1. reproduce the issue
2. isolate where the behavior diverges
3. write or run the smallest failing check
4. make the smallest fix that explains the failure
5. run a regression check

## Weak debugging loop

- guess
- patch
- hope
