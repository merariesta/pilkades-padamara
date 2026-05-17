create table public.warga (
  id uuid default gen_random_uuid() primary key,

  nama text not null,
  rw text not null,
  rt text not null,

  no_hp text,

  status text not null
    check (status in ('siap', 'ragu', 'tolak')),

  jumlah_suara integer default 1,

  catatan text,

  approval_status text default 'pending'
    check (
      approval_status in (
        'pending',
        'approved',
        'rejected'
      )
    ),

  input_by uuid references profiles(id),

  approved_by uuid references profiles(id),

  created_at timestamptz default now(),

  updated_at timestamptz default now()
);
