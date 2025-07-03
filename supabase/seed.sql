-- seed data for development
-- this file runs after migrations

-- insert sample user profiles (these will be linked to auth.users via triggers or manual insertion)
-- note: in practice, user_profiles are created via the signup api
-- this is just for testing purposes

insert into public.user_profiles (id, first_name, last_name, username) values
  ('00000000-0000-0000-0000-000000000001', 'John', 'Doe', 'johndoe'),
  ('00000000-0000-0000-0000-000000000002', 'Jane', 'Smith', 'janesmith')
on conflict (id) do nothing;