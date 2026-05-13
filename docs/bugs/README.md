# docs/bugs/

Deferred bugs discovered during implementation that are out of scope for the current session.

## Convention

- Create a file with `task bug SLUG=short-description`
- One file per bug, named `YYYY-MM-DD-slug.md`
- Set **Discovered during** so the next session has context
- When a bug is fixed, mark `Status: Fixed` and link the commit or PR — do not delete the file

## When to use

A bug belongs here when:
- It was found incidentally while working on something else
- Fixing it now would derail the current feature or fix
- It needs to be tracked so it isn't forgotten

Do not use this folder for known limitations or future feature ideas — those belong in `docs/plans/`.
