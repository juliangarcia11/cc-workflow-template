# CLAUDE.md

This file defines how Claude and the developer collaborate in this project.
It is the first file Claude reads and the source of truth for all workflow rules.
Customize every section to match your project's needs.

---

## 1. Project Overview

> **[CUSTOMIZE]** Replace this section with a brief description of what this
> project is, what stack it uses, and any domain context Claude needs to be useful.

```
Project: <name>
Stack:   <e.g. Node.js / TypeScript / React / Postgres>
Purpose: <one or two sentences>
```

---

## 2. How We Work Together

This project uses a **docs-as-context** workflow. All planning, decisions, and
chat summaries live in the repo so Claude always has full context — no relying
on conversation memory.

### The basic loop

1. **Discuss** ideas and requirements in chat
2. **Plan** — Claude writes or updates a file in `docs/plans/` before touching code
3. **Approve** — developer reviews and explicitly says "proceed" or requests changes
4. **Spec** (for features) — Claude writes `docs/specs/<feature>.md` if a new
   feature is involved; developer approves before any code is written
5. **Implement** — Claude writes code against the approved plan/spec
6. **Test** — Claude runs `task test` and fixes failures before moving on
7. **Document** — Claude updates the relevant ADR, spec, or plan to reflect
   what was actually built & summarizes the session in `docs/chats/`
8. **Commit** — Claude runs `task commit` (never raw `git commit`), which
   enforces all checks and the conventional commit format

### What Claude should never do without explicit approval

- Start coding before a plan or spec exists for non-trivial changes
- Skip or bypass any `task` step with flags like `--no-verify`
- Delete or overwrite a doc file without confirming with the developer
- Make architectural decisions silently — write an ADR instead

---

## 3. Documentation Rules

### docs/adr/ — Architecture Decision Records

Use for any decision that is hard to reverse or that future developers would
wonder about. Format: `docs/adr/NNNN-short-title.md` (e.g. `0001-use-postgres.md`).

Create a new ADR when:

- Choosing a library, framework, or infrastructure component
- Establishing a pattern that will be used project-wide
- Deliberately going against a common convention

Template: see `docs/adr/0000-template.md`

### docs/chats/ — Chat Summaries

After implementation, Claude writes a summary to
`docs/chats/YYYY-MM-DD-topic.md` before commiting. This is what
allows the next session to have full context.

A good chat summary includes:

- What we were trying to do
- Decisions made and why
- What was left unresolved or deferred
- Any follow-up tasks

### docs/bugs/ — Deferred Bug Reports

Use when a bug is discovered during implementation but is out of scope for the current session. Scaffold with `task bug SLUG=short-description`. One file per bug; mark `Status: Fixed` (with a commit link) when resolved — do not delete.

### docs/plans/ — Project Plans and Todo Lists

Active work lives here. A plan file is created before implementation begins
and updated (not deleted) as work progresses. Completed items are marked done,
not removed — the history is useful.

### docs/specs/ — Feature Specifications

Every non-trivial feature gets a spec before code is written. A spec defines:

- What the feature does (user-facing behavior)
- What it does not do (explicit scope boundaries)
- Acceptance criteria (becomes the basis for tests)
- Open questions (resolved before implementation starts)

---

## 4. Commit Workflow

All commits go through `task commit` which runs checks in order:

```
lint → test → docs-check → commitlint → git commit
```

**Commit message format** (Conventional Commits):

```
<type>(<optional scope>): <short description>

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `style`, `ci`

Examples:

```
feat(auth): add OAuth2 login flow
fix(api): handle null response from payments endpoint
docs(adr): record decision to use Zod for validation
```

**If a pre-commit hook fails:** read the error message, fix the problem,
stage the fix, and run `task commit` again. Never use `--no-verify`.

---

## 5. Task Reference

```
task check       # Run all checks (lint + test + docs-check)
task lint        # ESLint + Prettier check
task lint:fix    # Auto-fix lint and formatting issues
task test        # Run test suite
task test:watch  # Run tests in watch mode
task docs:check  # Verify docs are up to date with staged changes
task commit      # Run checks then commit (prompts for message)
task adr         # Scaffold a new ADR file
task spec        # Scaffold a new spec file
task summary     # Remind Claude to write a chat summary
```

---

## 6. Code Conventions

> **[CUSTOMIZE]** Add project-specific conventions here.

- Language: TypeScript strict mode
- Formatting: Prettier (config in `.prettierrc`)
- Linting: ESLint (config in `eslint.config.js`)
- Tests: [your test framework] — colocate test files as `*.test.ts`
- Imports: absolute imports from `src/` root preferred over relative

---

## 7. Workflow Extraction Prompt

To extract this project's current workflow into a shareable format at any point,
paste this into a session:

```
You have access to this entire codebase and our conversation history.
Analyze the folder structure, docs/, CLAUDE.md, recent commit messages,
and our session history. Produce an updated WORKFLOW.md that documents:

1. Project conventions (naming, structure, formatting)
2. Planning & decision process (how ideas become code)
3. Documentation habits (what gets written, when, in what format)
4. Commit workflow (checks, doc updates, message style)
5. Claude interaction patterns (how I prefer to work with you)
6. Open questions or inconsistencies I should resolve

Flag anything project-specific vs. genuinely reusable. Write it so a
future version of me can reconstruct this workflow from scratch.
```

---

## 8. Customization Checklist

When bootstrapping a new project from this template, work through these:

- [ ] Fill in the Project Overview (section 1)
- [ ] Adjust the development loop steps if your process differs (section 2)
- [ ] Choose and configure your test framework; update `task test`
- [ ] Add project-specific code conventions (section 6)
- [ ] Write your first ADR: `task adr` → `0001-initial-stack-choices.md`
- [ ] Delete this checklist once done
