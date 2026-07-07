# Data Model

## Tables

### gifts

```sql
create table gifts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price integer not null check (price > 0),
  image text,
  quotes integer not null default 1 check (quotes > 0),
  remaining integer not null default 1 check (remaining >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### carts

```sql
create table carts (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  guest_email text,
  status text not null default 'active' check (status in ('active', 'converted', 'abandoned')),
  total integer not null default 0 check (total >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### cart_items

```sql
create table cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null,
  gift_id uuid,
  name text not null,
  image text,
  quantity integer not null check (quantity > 0),
  price integer not null check (price > 0),
  total integer not null check (total > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cart_items_cart_id_fkey foreign key (cart_id) references carts(id) on delete cascade,
  constraint cart_items_gift_id_fkey foreign key (gift_id) references gifts(id) on delete set null
);
```

### orders

```sql
create table orders (
  id uuid primary key default gen_random_uuid(),
  guest_email text not null,
  guest_name text,
  guest_message text,
  status text not null default 'pending' check (status in ('pending', 'paid', 'expired', 'cancelled')),
  total integer not null check (total > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### order_items

```sql
create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null,
  gift_id uuid,
  name text not null,
  image text,
  quantity integer not null check (quantity > 0),
  price integer not null check (price > 0),
  total integer not null check (total > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint order_items_order_id_fkey foreign key (order_id) references orders(id) on delete cascade,
  constraint order_items_gift_id_fkey foreign key (gift_id) references gifts(id) on delete set null
);
```

### order_payments

Each `orders` row must have exactly one `order_payments` row. The database enforces one payment per order with `unique (order_id)`, and `OrderService.create` creates the order and its payment in the same workflow.

```sql
create table order_payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null,
  provider text not null,
  provider_payment_id text,
  status text not null default 'pending' check (status in ('pending', 'paid', 'expired', 'failed', 'refunded')),
  pix_payload text,
  pix_qr_code_url text,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint order_payments_order_id_key unique (order_id),
  constraint order_payments_order_id_fkey foreign key (order_id) references orders(id) on delete cascade
);
```

## Module Map

- `src/modules/gift`: gift catalog.
- `src/modules/cart`: cart and cart items before checkout.
- `src/modules/order`: confirmed orders and order items.
- `src/modules/order/core/domain/order-payment.*`: order payment submodule used by the order backend.

## RLS Direction

- `gifts`: public read for catalog fields.
- `carts`, `cart_items`, `orders`, `order_items`, `order_payments`: no direct public writes. Use server actions or route handlers.
- Service-role access only on the server when privileged operations are required.
