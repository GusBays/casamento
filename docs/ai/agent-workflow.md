# AI Agent Workflow

## Context Budget

- Read `AGENTS.md` first.
- Read only the relevant file in `docs/` for the requested change.
- Prefer `rg --files` and targeted `sed` reads.
- Avoid broad codebase scans after the relevant area is known.

## Implementation Style

- Make the smallest complete change.
- Keep PR-sized work: one route, one server action, or one domain behavior at a time.
- Add types near the domain before introducing broad infrastructure.
- Reuse shadcn components before creating custom primitives.
- Leave a short doc update when behavior or architecture changes.
- In Zod schemas, use Zod 4 top-level string format validators such as `z.uuid()`, `z.email()`, and `z.url()` instead of deprecated chained forms like `z.string().uuid()`.

## Verification

- Run `npm run lint` for most changes.
- Run `npm run build` before deploy-related changes.
- If a command cannot run because credentials are missing, document the missing variable and keep moving with static verification.

## Token Economy

- Summaries should focus on files changed and verification.
- Do not paste long command output unless the user asks.
- Prefer file links and concise rationale over long explanations.
