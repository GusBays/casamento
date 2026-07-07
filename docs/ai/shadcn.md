# shadcn Usage

## Preferred Flow

When a shadcn MCP server is available in the tool list, use it to inspect registries and add components.

In this session, no shadcn MCP tool was exposed, so the project was initialized with the official CLI:

```bash
npx shadcn@latest init --defaults --template next
npx shadcn@latest add card input label badge separator alert dialog sheet sonner skeleton
```

## Local Rules

- Components live in `src/components/ui`.
- Use `lucide-react` for icons.
- Keep app-specific composition outside `src/components/ui`.
- Do not hand-edit generated UI primitives unless a project-wide design decision requires it.
- Prefer adding one component at a time when a feature needs it.
