# Specs

This folder contains feature specifications written before implementation begins.

## Conventions

- One file per feature: `feature-name.md`
- Status must be **Approved** before any code is written for that feature
- Acceptance criteria in the spec become the basis for tests
- Specs are not deleted after completion — they serve as a record of intent
  vs. what was actually built

## Lifecycle

```
Draft → (developer review) → Approved → In Progress → Complete
```

Claude should not begin implementing a feature until its spec status is Approved.

## Scaffold a new spec

```
task spec NAME=your-feature-name
```
