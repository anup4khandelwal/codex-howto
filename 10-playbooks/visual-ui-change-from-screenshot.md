# Visual UI Change From Screenshot

Use this playbook when Codex needs to turn a screenshot, mockup, or visual bug report into a frontend change.

## Good fits

- fixing visible layout regressions
- matching a component to a design reference
- making responsive UI adjustments across viewports
- implementing small visual states that are easy to screenshot

## Workflow

1. attach the screenshot or design reference
2. name the exact screen, route, or component
3. define viewport sizes that must work
4. ask for implementation and visual verification
5. review screenshots before accepting the diff

## Task brief

```md
Reference image:
Target route or component:
Expected behavior:
Viewport checks:
Allowed files:
Do not change:
Verification:
```

## Verification

Use automated tests when they exist, then capture screenshots for the named viewports. For interactive or canvas-heavy UI, verify that the primary visual area is nonblank and framed correctly.

## Failure modes

- the prompt describes the image instead of attaching it
- the change is checked only at desktop size
- text fits in one viewport but overflows in another
- visual polish is accepted without a before/after screenshot
