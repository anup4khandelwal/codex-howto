# Linear to Local Finish

This workflow starts from a Linear issue and ends with a locally verified change.

## Flow

1. read the Linear issue for product intent
2. restate the goal, scope, exclusions, and verification
3. let Codex investigate or draft the change
4. inspect the diff locally
5. run the promised verification
6. reply on the issue with what changed and what remains

## Handoff prompt

~~~text
Use the linked Linear issue as the source of product intent.

Goal: implement the smallest change that satisfies the issue.
Scope: stay within the affected subsystem unless the code proves otherwise.
Do not change unrelated behavior.
Verification: run the focused test and report any broader check that is relevant.
Return: changed files, verification result, and unresolved questions.
~~~

## Completion note

~~~text
Implemented the issue with a focused change.

Changed:
- file or subsystem

Verified:
- command and result

Remaining:
- none, or specific follow-up
~~~
