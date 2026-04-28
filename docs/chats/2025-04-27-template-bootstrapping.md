# Chat Summary: Workflow Template Bootstrapping

Date: 2025-04-27
Session topic: Designing and building the claude-workflow-template repo

## What we were trying to accomplish

Design a reusable project template that codifies a docs-as-context development
workflow for Claude-assisted coding. The goal was a repo a developer could clone
to immediately have enforced documentation habits, conventional commits, and a
clear collaboration model with Claude.

## Decisions made

**Docs-as-context as the core pattern.** Rather than relying on Claude's
conversation memory (which resets), all planning, decisions, and session
summaries live in the repo. CLAUDE.md is the entry point Claude reads first.

**Tool separation by purpose.** Each tool owns exactly one layer:

- CLAUDE.md → process and reasoning
- Taskfile → commands (the interface for Claude and humans)
- Husky → git hook enforcement (mechanical gates)
- commitlint → commit message format
- ESLint + Prettier → code quality and formatting

**ADRs for decisions, specs for features, plans for todo/progress.**
Three distinct doc types prevent "where does this go?" confusion.

**Husky error messages as Claude instructions.** Hook failure messages are
written in plain English describing what is missing, not just that something
failed. This makes them actionable as Claude instructions.

**`task commit` as the only commit path.** Claude is instructed never to
run raw `git commit` — always `task commit MSG='...'`, which enforces all
checks first. `--no-verify` is explicitly prohibited in CLAUDE.md.

## What was deferred

- Specific test framework choice (left as a placeholder — too project-specific)
- lint-staged for large repos (noted as an easy addition later)
- Log4brains for ADR web UI (mentioned as an option, not included in template)

## Follow-up tasks for new projects using this template

- [ ] Fill in Project Overview in CLAUDE.md
- [ ] Choose and wire up a test framework; update `task test`
- [ ] Write `0002-` ADR for first real architectural decision
- [ ] Add framework-specific ESLint plugins (e.g. eslint-plugin-react)
- [ ] Delete this file and write your own first chat summary
