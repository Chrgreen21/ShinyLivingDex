-- Run this in Supabase SQL Editor once.
create table if not exists dex_saves (
  user_id uuid primary key references auth.users(id) on delete cascade,
  caught_json jsonb not null default '{}',
  settings_json jsonb not null default '{}',
  updated_at timestamp with time zone default now()
);

alter table dex_saves enable row level security;

drop policy if exists "Users can read own save" on dex_saves;
drop policy if exists "Users can insert own save" on dex_saves;
drop policy if exists "Users can update own save" on dex_saves;

create policy "Users can read own save"
on dex_saves for select
using (auth.uid() = user_id);

create policy "Users can insert own save"
on dex_saves for insert
with check (auth.uid() = user_id);

create policy "Users can update own save"
on dex_saves for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);


-- Required for the in-app Delete Account button.
create or replace function delete_current_user()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from auth.users where id = auth.uid();
end;
$$;

revoke all on function delete_current_user() from public;
grant execute on function delete_current_user() to authenticated;
