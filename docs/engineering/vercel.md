# Vercel Publishing

## Current References

- Vercel supports Next.js with zero-configuration deployment and automatic framework-aware infrastructure for SSR, streaming, image optimization, and route handlers.
- Vercel projects can connect to Git providers and create preview deployments for pull requests.
- Environment variables should be configured in the Vercel project settings for Production, Preview, and Development as needed.

Sources checked on 2026-07-07:

- https://vercel.com/docs/frameworks/full-stack/nextjs
- https://vercel.com/docs/environment-variables
- https://supabase.com/docs/guides/auth/server-side/creating-a-client?framework=nextjs

## Required Environment Variables

Local `.env.local` and Vercel project variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
PIX_PROVIDER=
PIX_KEY=
PIX_MERCHANT_NAME=
PIX_MERCHANT_CITY=
NEXT_PUBLIC_SITE_URL=
```

Only add `SUPABASE_SERVICE_ROLE_KEY` when server-only code needs privileged operations.

## Deploy Checklist

- Connect `GusBays/casamento` to Vercel.
- Set framework preset to Next.js.
- Keep install command as `npm install` unless the package manager changes.
- Keep build command as `npm run build`.
- Add all required environment variables.
- Add Supabase production URL to any payment/webhook allowlist if needed.
- Configure custom domain after the first successful production deployment.

## Supabase Checklist

- Create a Supabase project.
- Create tables from `docs/domain/data-model.md`.
- Enable Row Level Security before production.
- Add public read policies only for safe gift catalog fields.
- Keep order/payment writes behind server actions or route handlers.

## Payment Notes

The first version can display a static Pix payload for manual validation. Production should integrate a provider or a deterministic Pix generator on the server, then persist provider ids and webhook events.
