-- migration: create user profiles table
-- purpose: store additional user profile information
-- affected tables: user_profiles

-- create user_profiles table
create table public.user_profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  first_name text,
  last_name text,
  username text unique,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);
comment on table public.user_profiles is 'additional user profile information linked to auth.users';

-- enable row level security
alter table public.user_profiles enable row level security;

-- allow users to view their own profile
create policy "users can view own profile" on public.user_profiles
  for select to authenticated using (auth.uid() = id);

-- allow users to update their own profile
create policy "users can update own profile" on public.user_profiles
  for update to authenticated using (auth.uid() = id);

-- allow users to insert their own profile
create policy "users can insert own profile" on public.user_profiles
  for insert to authenticated with check (auth.uid() = id);