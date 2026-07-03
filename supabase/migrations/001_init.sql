-- Chefgaa website — initial schema
-- Tables: demo_requests, site_content
-- Row Level Security enabled with anon-scoped policies.

-- ============================================================
-- demo_requests
-- ============================================================
create table if not exists public.demo_requests (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  phone text,
  restaurant_name text,
  message text,
  created_at timestamptz default now()
);

alter table public.demo_requests enable row level security;

-- Anonymous visitors may only INSERT demo requests.
-- No select / update / delete is granted to the anon role.
drop policy if exists "anon can insert demo_requests" on public.demo_requests;
create policy "anon can insert demo_requests"
  on public.demo_requests
  for insert
  to anon
  with check (true);

-- ============================================================
-- site_content
-- ============================================================
create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  page text,
  section text,
  title text,
  body text,
  image_url text,
  display_order int,
  status text default 'active',
  created_at timestamptz default now()
);

alter table public.site_content enable row level security;

-- Anonymous visitors may only SELECT active site content.
drop policy if exists "anon can select active site_content" on public.site_content;
create policy "anon can select active site_content"
  on public.site_content
  for select
  to anon
  using (status = 'active');
