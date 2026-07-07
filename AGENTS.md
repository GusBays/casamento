# AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may differ from older training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing code that depends on Next.js internals.
<!-- END:nextjs-agent-rules -->

## Project

Wedding website for Gustavo and Ana, with a public home page, an animated gift list, and a Pix checkout flow.

## Working Rules

- Keep implementations short, vertical, and reviewable.
- Prefer changing one feature slice at a time over broad refactors.
- Use `docs/` as the source of truth before adding behavior.
- Read only the relevant docs page before editing; avoid loading unrelated context.
- Do not add a new abstraction until at least two call sites need it.
- Keep app copy in Portuguese unless a task explicitly asks otherwise.
- Never commit secrets. Use `.env.local` locally and Vercel environment variables in production.

## Architecture

- Use Next.js App Router with Server Components by default.
- Use Client Components only for state, browser APIs, animation, or form interactions.
- Keep shared UI in `src/components/ui` from shadcn.
- Keep app-specific reusable components in `src/common/components`.
- Keep shared utilities and Supabase clients in `src/lib`.
- Keep domain contracts and seed/mock data close to the domain until the DB schema is finalized.

## Documentation Map

- `docs/engineering/architecture.md`: technical architecture and deploy notes.
- `docs/engineering/vercel.md`: Vercel publishing checklist.
- `docs/domain/wedding.md`: product/domain rules.
- `docs/domain/data-model.md`: initial Supabase tables and payment states.
- `docs/ai/agent-workflow.md`: how AI agents should work in this repo.
- `docs/ai/shadcn.md`: shadcn usage, including MCP preference when available.

## Commands

- `pnpm dev`: local development.
- `pnpm build`: production build check.
- `pnpm lint`: lint check.

## External References

- Use official docs for Vercel, Supabase, Next.js, and shadcn.
- `GusBays/borala` is a style/organization reference: App Router, domain-oriented folders, shadcn components, and server-side backend integration. This project intentionally starts simpler with Supabase instead of TypeORM.
