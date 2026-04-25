# GitHub Review to Fix Loop

Use this playbook when a GitHub review, PR comment, or automated Codex review needs to become a local fix.

## Good fits

- addressing concrete review comments
- triaging automated review findings
- fixing a failing check linked from a PR
- preparing a response after local verification

## Workflow

1. collect the review comments and affected files
2. classify each item as fix, explain, defer, or reject
3. implement fixes locally in the smallest scope
4. run the checks that prove the comments are handled
5. respond with changed files and verification evidence

## Task brief

```md
PR or review source:
Comments to address:
Out of scope:
Files likely involved:
Verification:
Response format:
```

## Verification

A good result includes a local diff, passing checks, and a comment-by-comment response. If a finding is rejected, explain the reason with file or test evidence.

## Failure modes

- treating every automated finding as correct
- making broad refactors while addressing narrow comments
- replying before rerunning the relevant checks
- losing track of which comments were intentionally deferred
