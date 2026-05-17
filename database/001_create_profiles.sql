create table public.profiles (
  id uuid references auth.users(id) on delete cascade,
  nama text not null,
  email text unique not null,
  role text not null default 'relawan',
  rw text,
  is_active boolean default true,
  created_at timestamptz default now(),

  primary key (id)
);
