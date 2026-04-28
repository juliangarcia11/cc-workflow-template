# claude-workflow-template

A project template for Claude-assisted development with enforced documentation
habits, conventional commits, and a clear human-AI collaboration model.

## What's in this template

```
.
├── CLAUDE.md                  # Claude's instructions — start here
├── Taskfile.yml               # All project commands live here
├── package.json               # pnpm + husky + commitlint + eslint + prettier
├── commitlint.config.js
├── eslint.config.js
├── .prettierrc
├── .husky/
│   ├── pre-commit             # Runs docs-check before every commit
│   └── commit-msg             # Validates conventional commit format
└── docs/
    ├── adr/                   # Architecture Decision Records
    │   ├── 0000-template.md
    │   └── 0001-initial-toolchain-choices.md
    ├── chats/                 # Session summaries for cross-session context
    ├── plans/                 # Feature plans and todo lists
    └── specs/                 # Feature specifications
```

## How it works

Each tool owns one layer of the workflow:

| Tool                | Purpose                                              |
| ------------------- | ---------------------------------------------------- |
| `CLAUDE.md`         | Process rules and reasoning for Claude               |
| `Taskfile`          | Named commands — the interface for Claude and humans |
| `Husky`             | Git hooks — mechanical gates that can't be skipped   |
| `commitlint`        | Conventional commit message format                   |
| `ESLint + Prettier` | Code quality and formatting                          |

Claude reads `CLAUDE.md` first and uses `task` commands rather than running
tools directly. Husky ensures the docs-check and commit format gates apply
even in fast-moving sessions.

## Setup for a new project

### Prerequisites

- [Node.js](https://nodejs.org) >= 20
- [pnpm](https://pnpm.io) >= 9 — `npm install -g pnpm`
- [Task](https://taskfile.dev) — `brew install go-task` (macOS) or see taskfile.dev

### Steps

```bash
# 1. Clone or use as a GitHub template
git clone https://github.com/yourname/claude-workflow-template my-project
cd my-project

# 2. Remove the template's git history and start fresh
rm -rf .git && git init

# 3. Install dependencies (also sets up Husky)
pnpm install

# 4. Customize CLAUDE.md — fill in your project details
# See the Customization Checklist at the bottom of CLAUDE.md

# 5. Add your test framework and update `task test` in Taskfile.yml

# 6. Write your first real ADR
task adr SLUG=initial-stack-choices
```

## Common commands

```bash
task check        # lint + test + docs-check
task lint:fix     # auto-fix formatting and lint issues
task test         # run test suite
task adr          # scaffold a new ADR
task spec         # scaffold a new feature spec
task summary      # get the chat summary prompt to paste into Claude
task commit MSG="feat(scope): your message"
```

## Philosophy

The core pattern is **docs-as-context**: planning artifacts, decisions, and
session summaries live in the repo so Claude always has full context — no
relying on conversation memory. CLAUDE.md is the single source of truth for
how this project works.

Read more in `docs/chats/2026-04-27-template-bootstrapping.md` for the
reasoning behind the initial design decisions.
