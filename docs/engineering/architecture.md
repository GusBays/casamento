# Architecture

## Stack

- Next.js 16 App Router with TypeScript.
- React 19.
- Tailwind CSS 4.
- shadcn/ui local components.
- Supabase for database access and future storage/auth if needed.
- Vercel for hosting, previews, functions, and environment variables.

## Routes

- `/`: public wedding home for Gustavo and Ana, with full-page sections and scroll-friendly layout.
- `/presentes`: redirects to the home gift section. Gifts are read from Supabase.
- `/checkout`: confirms selected items, collects email, and displays Pix QR Code.

## Backend

The backend lives inside Next.js:

- Server Components for read-only data loading.
- Server Actions or Route Handlers for checkout creation, Pix generation, and payment callbacks.
- Supabase client helpers in `src/lib/supabase`.
- `src/proxy.ts` runs the Supabase session refresh logic from `src/lib/supabase/proxy.ts` before matched requests. Next.js 16 renamed the old `middleware.ts` convention to `proxy.ts`.

Do not expose service-role keys to the browser. Browser code may only use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.

## Suggested Folders

- `src/app`: routes and route-level composition.
- `src/common/components`: reusable app components.
- `src/lib`: shared utilities, shadcn helpers, and Supabase clients.
- `docs`: engineering, AI, and domain reference.

## Data Flow

1. Guest opens `/presentes`.
2. App lists gifts with current availability.
3. Guest chooses one or more gifts and goes to `/checkout`.
4. Guest confirms items and email.
5. Server creates an order and Pix payment.
6. Checkout shows QR Code and copy/paste Pix payload.
7. Payment provider webhook updates order/payment status.

## Data Principle

Use Supabase as the source of truth for gifts, carts, guests, orders, and payments. UI-only state should not duplicate checkout domain state.
