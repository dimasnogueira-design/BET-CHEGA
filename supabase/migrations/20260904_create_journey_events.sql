create table if not exists public.journey_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null,
  flow text,
  stage text,
  step text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists journey_events_user_id_idx
  on public.journey_events using btree (user_id);

create index if not exists journey_events_user_created_idx
  on public.journey_events using btree (user_id, created_at desc);

alter table public.journey_events enable row level security;

revoke all on table public.journey_events from anon, authenticated;
grant select, insert, delete on table public.journey_events to authenticated;

drop policy if exists "Users can view their own journey events" on public.journey_events;
create policy "Users can view their own journey events"
on public.journey_events
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can create their own journey events" on public.journey_events;
create policy "Users can create their own journey events"
on public.journey_events
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own journey events" on public.journey_events;
create policy "Users can delete their own journey events"
on public.journey_events
for delete
to authenticated
using ((select auth.uid()) = user_id);
