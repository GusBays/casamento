create table if not exists gifts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price integer not null check (price > 0),
  image text,
  quotes integer not null default 1 check (quotes > 0),
  remaining integer not null default 1 check (remaining >= 0),
  status text not null default 'available' check (status in ('available', 'reserved', 'purchased')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table gifts add column if not exists status text not null default 'available';
alter table gifts drop constraint if exists gifts_status_check;
alter table gifts add constraint gifts_status_check check (status in ('available', 'reserved', 'purchased'));

create table if not exists guests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists carts (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  guest_id uuid references guests(id) on delete set null,
  status text not null default 'active' check (status in ('active', 'converted', 'abandoned')),
  total integer not null default 0 check (total >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table carts add column if not exists guest_id uuid references guests(id) on delete set null;
alter table carts drop column if exists guest_email;

create table if not exists cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references carts(id) on delete cascade,
  gift_id uuid references gifts(id) on delete set null,
  name text not null,
  image text,
  quantity integer not null check (quantity > 0),
  price integer not null check (price > 0),
  total integer not null check (total > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  guest_id uuid not null references guests(id) on delete restrict,
  order_note text,
  status text not null default 'pending' check (status in ('pending', 'paid', 'expired', 'cancelled')),
  total integer not null check (total > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table orders add column if not exists guest_id uuid references guests(id) on delete restrict;
alter table orders add column if not exists order_note text;
alter table orders drop column if exists guest_email;
alter table orders drop column if exists guest_name;

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  gift_id uuid references gifts(id) on delete set null,
  name text not null,
  image text,
  quantity integer not null check (quantity > 0),
  price integer not null check (price > 0),
  total integer not null check (total > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists order_payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references orders(id) on delete cascade,
  provider text not null,
  provider_payment_id text,
  status text not null default 'pending' check (status in ('pending', 'paid', 'expired', 'failed', 'refunded')),
  pix_payload text,
  pix_qr_code_url text,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
