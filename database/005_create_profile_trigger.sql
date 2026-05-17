create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    nama,
    email,
    role
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nama', 'User Baru'),
    new.email,
    'relawan'
  );

  return new;
end;
$$;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();
