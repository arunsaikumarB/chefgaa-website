-- Tighten demo_requests writes.
--
-- Apply this file to the Supabase project (SQL editor or CLI).
-- A Netlify deploy does not run it.
--
-- anon may INSERT a row that passes the checks below.
-- anon is not granted SELECT, UPDATE, or DELETE, and no such policies exist.
-- The same email is limited to 5 inserts per hour, and the table to 100 per hour.
--
-- If this migration fails because older rows violate the new checks, clean
-- those rows and run it again.

-- Helpers live in a schema the Data API does not expose.
create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to anon;

-- ============================================================
-- Payload checks (shared by the column constraint and RLS)
-- ============================================================
create or replace function private.demo_request_payload_ok(
  p_name text,
  p_email text,
  p_phone text,
  p_restaurant_name text,
  p_message text
)
returns boolean
language sql
immutable
parallel safe
as $$
  select
    p_name is not null
    and char_length(p_name) between 1 and 120
    and char_length(btrim(p_name)) >= 1
    and p_email is not null
    and char_length(p_email) <= 254
    and p_email = btrim(p_email)
    and p_email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'
    and (p_phone is null or char_length(p_phone) <= 40)
    and p_restaurant_name is not null
    and char_length(p_restaurant_name) between 1 and 200
    and char_length(btrim(p_restaurant_name)) >= 1
    and (p_message is null or char_length(p_message) <= 2000);
$$;

revoke all on function private.demo_request_payload_ok(text, text, text, text, text)
  from public, anon, authenticated;
grant execute on function private.demo_request_payload_ok(text, text, text, text, text)
  to anon;

do $$
begin
  if exists (
    select 1
    from public.demo_requests
    where not private.demo_request_payload_ok(
      name, email, phone, restaurant_name, message
    )
  ) then
    raise exception
      'demo_requests has rows that violate the new checks. Clean those rows, then run this migration again.';
  end if;
end $$;

alter table public.demo_requests
  alter column name set not null,
  alter column email set not null,
  alter column restaurant_name set not null;

alter table public.demo_requests
  drop constraint if exists demo_requests_payload_ok;

alter table public.demo_requests
  add constraint demo_requests_payload_ok
  check (
    private.demo_request_payload_ok(
      name, email, phone, restaurant_name, message
    )
  );

create index if not exists demo_requests_email_created_at_idx
  on public.demo_requests (lower(email), created_at);

-- ============================================================
-- Rate limit (runs as the function owner so it can count rows
-- the inserting role is not allowed to read)
-- ============================================================
create or replace function private.enforce_demo_request_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  email_recent integer;
  global_recent integer;
begin
  select count(*) into email_recent
  from public.demo_requests
  where lower(email) = lower(new.email)
    and created_at > now() - interval '1 hour';

  if email_recent >= 5 then
    raise exception 'You have sent a few requests recently. Please wait a bit and try again.'
      using errcode = 'P0001';
  end if;

  select count(*) into global_recent
  from public.demo_requests
  where created_at > now() - interval '1 hour';

  if global_recent >= 100 then
    raise exception 'We cannot accept another request right now. Please try again later.'
      using errcode = 'P0001';
  end if;

  return new;
end;
$$;

revoke all on function private.enforce_demo_request_rate_limit()
  from public, anon, authenticated;
grant execute on function private.enforce_demo_request_rate_limit() to anon;

drop trigger if exists demo_requests_rate_limit on public.demo_requests;
create trigger demo_requests_rate_limit
  before insert on public.demo_requests
  for each row
  execute function private.enforce_demo_request_rate_limit();

-- ============================================================
-- RLS: insert-only for anon. Drop any previous policies so a
-- leftover "with check (true)" cannot keep the table open.
-- ============================================================
do $$
declare
  pol record;
begin
  for pol in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'demo_requests'
  loop
    execute format('drop policy %I on public.demo_requests', pol.policyname);
  end loop;
end $$;

create policy "anon can insert demo_requests"
  on public.demo_requests
  for insert
  to anon
  with check (
    private.demo_request_payload_ok(
      name, email, phone, restaurant_name, message
    )
  );

revoke all on table public.demo_requests from public, anon, authenticated;
grant insert on table public.demo_requests to anon;
