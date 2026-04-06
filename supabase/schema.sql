-- ─────────────────────────────────────────────────────────────────────────────
-- Quant Review — Supabase Schema
-- Run this in the Supabase SQL editor or via `supabase db push`
-- ─────────────────────────────────────────────────────────────────────────────

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────────────────────────────────────────
-- profiles
-- Extends Supabase auth.users with display name + metadata
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  avatar_url  text,
  streak      integer not null default 0,
  last_active date,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Auto-create profile row on new user signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);


-- ─────────────────────────────────────────────────────────────────────────────
-- problem_progress
-- Tracks per-user, per-problem status
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.problem_progress (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  problem_id  text not null,
  status      text not null check (status in ('unseen', 'attempted', 'solved')),
  updated_at  timestamptz not null default now(),

  unique (user_id, problem_id)
);

alter table public.problem_progress enable row level security;

create policy "Users can read own problem progress"
  on public.problem_progress for select
  using (auth.uid() = user_id);

create policy "Users can upsert own problem progress"
  on public.problem_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own problem progress"
  on public.problem_progress for update
  using (auth.uid() = user_id);

-- Index for fast per-user lookups
create index if not exists idx_problem_progress_user
  on public.problem_progress (user_id);


-- ─────────────────────────────────────────────────────────────────────────────
-- flashcard_progress
-- Stores SM-2 state per user per flashcard
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.flashcard_progress (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  card_id         text not null,
  repetitions     integer not null default 0,
  easiness_factor real    not null default 2.5,
  interval        integer not null default 1,      -- days
  due_date        timestamptz not null default now(),
  last_reviewed   timestamptz,
  updated_at      timestamptz not null default now(),

  unique (user_id, card_id)
);

alter table public.flashcard_progress enable row level security;

create policy "Users can read own flashcard progress"
  on public.flashcard_progress for select
  using (auth.uid() = user_id);

create policy "Users can upsert own flashcard progress"
  on public.flashcard_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own flashcard progress"
  on public.flashcard_progress for update
  using (auth.uid() = user_id);

-- Index for fast per-user lookups
create index if not exists idx_flashcard_progress_user
  on public.flashcard_progress (user_id);

-- Index for due-date queries
create index if not exists idx_flashcard_progress_due
  on public.flashcard_progress (user_id, due_date);


-- ─────────────────────────────────────────────────────────────────────────────
-- reading_preferences
-- Stores per-user text customization settings
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.reading_preferences (
  user_id        uuid primary key references auth.users(id) on delete cascade,
  font_size      integer not null default 16,
  font_family    text    not null default 'inter',
  line_height    real    not null default 1.75,
  letter_spacing real    not null default 0,
  theme          text    not null default 'dark',
  updated_at     timestamptz not null default now()
);

alter table public.reading_preferences enable row level security;

create policy "Users can read own reading preferences"
  on public.reading_preferences for select
  using (auth.uid() = user_id);

create policy "Users can upsert own reading preferences"
  on public.reading_preferences for insert
  with check (auth.uid() = user_id);

create policy "Users can update own reading preferences"
  on public.reading_preferences for update
  using (auth.uid() = user_id);


-- ─────────────────────────────────────────────────────────────────────────────
-- Helper: updated_at trigger
-- ─────────────────────────────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create or replace trigger set_problem_progress_updated_at
  before update on public.problem_progress
  for each row execute procedure public.set_updated_at();

create or replace trigger set_flashcard_progress_updated_at
  before update on public.flashcard_progress
  for each row execute procedure public.set_updated_at();

create or replace trigger set_reading_preferences_updated_at
  before update on public.reading_preferences
  for each row execute procedure public.set_updated_at();
