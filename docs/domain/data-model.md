# Data Model

## Tables

### gifts

```sql
create table gifts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price decimal(10,2) not null check (price > 0),
  image text,
  quotes integer not null default 1 check (quotes > 0),
  remaining integer not null default 1 check (remaining >= 0),
  status text not null default 'available' check (status in ('available', 'reserved', 'purchased')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

Guests can mark a gift as purchased manually by setting `status = 'purchased'`
and, when applicable, `remaining = 0`. The checkout does not automatically
reserve or purchase gifts.

### guests

```sql
create table guests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### carts

```sql
create table carts (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  guest_id uuid,
  order_id uuid,
  status text not null default 'active' check (status in ('active', 'converted', 'abandoned')),
  total decimal(10,2) not null default 0 check (total >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint carts_guest_id_fkey foreign key (guest_id) references guests(id) on delete set null,
  constraint carts_order_id_fkey foreign key (order_id) references orders(id) on delete set null
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
  price decimal(10,2) not null check (price > 0),
  total decimal(10,2) not null check (total > 0),
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
  guest_id uuid,
  cart_id uuid,
  note text,
  status text not null default 'pending' check (status in ('pending', 'paid', 'expired', 'cancelled')),
  total decimal(10,2) not null check (total > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint orders_guest_id_fkey foreign key (guest_id) references guests(id) on delete restrict,
  constraint orders_cart_id_fkey foreign key (cart_id) references carts(id) on delete set null
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
  price decimal(10,2) not null check (price > 0),
  total decimal(10,2) not null check (total > 0),
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

### rsvps

```sql
create table rsvps (
  id uuid primary key default gen_random_uuid(),
  guest_id uuid not null,
  companions text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint rsvps_guest_id_key unique (guest_id),
  constraint rsvps_guest_id_fkey foreign key (guest_id) references guests(id) on delete cascade
);
```

### users

Simple admin login table. `token` stores the active admin session cookie value.

```sql
create table users (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  password text not null,
  token text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

## Module Map

- `src/modules/gift`: gift catalog.
- `src/modules/cart`: cart and cart items before checkout.
- `src/modules/guest`: guest identity used by checkout orders.
- `src/modules/order`: confirmed orders and order items.
- `src/modules/order/core/domain/order-payment.*`: order payment submodule used by the order backend.
- `src/modules/user`: simple admin user login, cookie token, and authorization helpers.

## RLS Direction

- `gifts`: public read for catalog fields.
- `guests`, `carts`, `cart_items`, `orders`, `order_items`, `order_payments`, `rsvps`, `users`: no direct public writes. Use server actions or route handlers.
- Service-role access only on the server when privileged operations are required.
