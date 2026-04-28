# 0001. Initial Toolchain Choices

Date: 2025-01-01
Status: Accepted

## Context

This template repo needed a toolchain for enforcing documentation habits,
code quality, and commit conventions in a Claude-assisted development workflow.
The core requirement was that each tool serves a distinct purpose and they
compose cleanly rather than overlap.

## Decision

We will use the following tools, each responsible for a different layer:

| Tool          | Responsibility                              |
|---------------|---------------------------------------------|
| **CLAUDE.md** | Process and reasoning — what Claude should do and why |
| **Taskfile**  | Named, repeatable commands — the executable interface for both Claude and humans |
| **Husky**     | Git hook enforcement — mechanical gates that cannot be bypassed accidentally |
| **commitlint**| Commit message format — ensures conventional commits are machine-readable |
| **ESLint**    | Code quality rules                          |
| **Prettier**  | Formatting — eliminates style debates       |
| **pnpm**      | Package management — faster, stricter than npm |

## Consequences

- Any developer or Claude instance can run `task check` without knowing
  the underlying tools — the Taskfile is the interface
- Husky ensures the docs-check and commitlint gates cannot be forgotten
  even when working quickly
- The separation of CLAUDE.md (process) from Taskfile (commands) means
  process changes don't require script changes and vice versa
- Adding a new framework (e.g. React, testing library) requires updating
  ESLint config and the test task but not the overall structure

## Alternatives Considered

| Alternative | Why not chosen |
|-------------|----------------|
| Makefile instead of Taskfile | Taskfile's YAML syntax is cleaner and cross-platform; no tab/space gotchas |
| lint-staged | Useful for large repos but adds complexity before it's needed; can be added later |
| npm/yarn | pnpm is faster and enforces stricter dependency isolation |

## References

- [Taskfile docs](https://taskfile.dev)
- [Conventional Commits spec](https://www.conventionalcommits.org)
- [ADR format by Michael Nygard](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
