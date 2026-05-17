create table public.wilayah (
  id bigint generated always as identity primary key,
  rw text not null,
  rt text not null
);
