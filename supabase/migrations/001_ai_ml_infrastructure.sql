-- ─────────────────────────────────────────────────────────────────────────────
-- Migration 001: AI / ML Infrastructure
-- AI/ML Engineer — Phase 1 Foundation
--
-- Adds: pgvector, problem SM-2, time tracking, error taxonomy,
--       hint consumption, embeddings, technique atlas, weakness profiles,
--       student approaches (generate-before-reveal), socratic sessions,
--       and prompt version tracking.
-- ─────────────────────────────────────────────────────────────────────────────

-- ═══════════════════════════════════════════════════════════════════════════
-- 1. EXTENSIONS
-- ═══════════════════════════════════════════════════════════════════════════

create extension if not exists "vector";  -- pgvector for semantic search

-- ═══════════════════════════════════════════════════════════════════════════
-- 2. PROBLEM SM-2 STATE
--    Extends spaced repetition from flashcards to problems.
--    A "solved" problem now resurfaces on an expanding schedule.
--    Research: 3 retrieval sessions "immunize" against forgetting (Make It Stick).
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists public.problem_sm2_state (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  problem_id      text not null,
  state           text not null default 'new' check (state in ('new', 'review', 'mastered')),
  repetitions     integer not null default 0,
  easiness_factor real    not null default 2.5,
  interval_days   integer not null default 0,
  due_date        timestamptz not null default '9999-12-31T00:00:00Z',
  last_reviewed   timestamptz,
  first_reviewed  timestamptz,
  last_grade      text check (last_grade in ('blackout', 'again', 'hard', 'good', 'easy')),
  total_reviews   integer not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  unique (user_id, problem_id)
);

alter table public.problem_sm2_state enable row level security;

create policy "Users can read own problem SM-2 state"
  on public.problem_sm2_state for select using (auth.uid() = user_id);
create policy "Users can insert own problem SM-2 state"
  on public.problem_sm2_state for insert with check (auth.uid() = user_id);
create policy "Users can update own problem SM-2 state"
  on public.problem_sm2_state for update using (auth.uid() = user_id);

create index if not exists idx_problem_sm2_user      on public.problem_sm2_state (user_id);
create index if not exists idx_problem_sm2_due        on public.problem_sm2_state (user_id, due_date);
create index if not exists idx_problem_sm2_state      on public.problem_sm2_state (user_id, state);

-- ═══════════════════════════════════════════════════════════════════════════
-- 3. PROBLEM SESSIONS (Time Tracking)
--    Tracks every attempt: when it started, how long it took, which hints
--    were consumed, whether solution was revealed.
--    Research: Time-to-solution + deliberate practice metrics (Ericsson).
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists public.problem_sessions (
  id                  uuid primary key default uuid_generate_v4(),
  user_id             uuid not null references auth.users(id) on delete cascade,
  problem_id          text not null,
  started_at          timestamptz not null default now(),
  ended_at            timestamptz,
  time_spent_seconds  integer,
  hints_viewed        integer not null default 0,   -- count of hints consumed
  total_hints         integer not null default 0,   -- total hints available
  solution_revealed   boolean not null default false,
  approach_submitted  boolean not null default false, -- generate-before-reveal
  outcome             text check (outcome in ('solved', 'gave_up', 'timed_out', 'in_progress')),
  created_at          timestamptz not null default now()
);

alter table public.problem_sessions enable row level security;

create policy "Users can read own sessions"
  on public.problem_sessions for select using (auth.uid() = user_id);
create policy "Users can insert own sessions"
  on public.problem_sessions for insert with check (auth.uid() = user_id);
create policy "Users can update own sessions"
  on public.problem_sessions for update using (auth.uid() = user_id);

create index if not exists idx_sessions_user       on public.problem_sessions (user_id);
create index if not exists idx_sessions_problem    on public.problem_sessions (user_id, problem_id);
create index if not exists idx_sessions_started    on public.problem_sessions (started_at desc);

-- ═══════════════════════════════════════════════════════════════════════════
-- 4. ERROR TAXONOMY
--    Categorizes mistakes to build weakness profiles.
--    Research: OK Plateau broken only through focused attention on
--    specific weaknesses (Ericsson, cited in Make It Stick + Moonwalking).
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists public.problem_errors (
  id             uuid primary key default uuid_generate_v4(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  problem_id     text not null,
  session_id     uuid references public.problem_sessions(id) on delete set null,
  error_type     text not null check (error_type in (
    'conceptual',        -- wrong mental model
    'calculation',       -- arithmetic / algebraic mistake
    'misread',           -- misunderstood the problem statement
    'forgot_formula',    -- knew the approach, forgot the formula
    'wrong_technique',   -- applied the wrong technique entirely
    'incomplete',        -- right approach but didn't finish
    'other'
  )),
  notes          text,          -- optional free-text explanation
  created_at     timestamptz not null default now()
);

alter table public.problem_errors enable row level security;

create policy "Users can read own errors"
  on public.problem_errors for select using (auth.uid() = user_id);
create policy "Users can insert own errors"
  on public.problem_errors for insert with check (auth.uid() = user_id);

create index if not exists idx_errors_user    on public.problem_errors (user_id);
create index if not exists idx_errors_type    on public.problem_errors (user_id, error_type);
create index if not exists idx_errors_problem on public.problem_errors (user_id, problem_id);

-- ═══════════════════════════════════════════════════════════════════════════
-- 5. STUDENT APPROACHES (Generate-Before-Reveal)
--    Forces students to submit their approach before seeing the solution.
--    Research: Generation effect — attempting before seeing answer dramatically
--    improves learning (Dehaene, Brown et al.).
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists public.student_approaches (
  id             uuid primary key default uuid_generate_v4(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  problem_id     text not null,
  session_id     uuid references public.problem_sessions(id) on delete set null,
  approach_text  text not null,                       -- student's written approach
  confidence     integer check (confidence between 1 and 5), -- self-rated confidence
  ai_evaluation  jsonb,                               -- LLM evaluation result
  score          real,                                -- 0.0–1.0 approach quality
  created_at     timestamptz not null default now()
);

alter table public.student_approaches enable row level security;

create policy "Users can read own approaches"
  on public.student_approaches for select using (auth.uid() = user_id);
create policy "Users can insert own approaches"
  on public.student_approaches for insert with check (auth.uid() = user_id);

create index if not exists idx_approaches_user    on public.student_approaches (user_id);
create index if not exists idx_approaches_problem on public.student_approaches (user_id, problem_id);

-- ═══════════════════════════════════════════════════════════════════════════
-- 6. CONTENT EMBEDDINGS (pgvector)
--    Semantic search across all content blocks.
--    Powers: Technique Atlas, related problem discovery, weakness-based retrieval.
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists public.content_embeddings (
  id             uuid primary key default uuid_generate_v4(),
  content_type   text not null check (content_type in (
    'problem_setup',     -- problem statement
    'problem_solution',  -- full solution text
    'problem_hint',      -- individual hint
    'flashcard_front',   -- flashcard question
    'flashcard_back',    -- flashcard answer
    'prose',             -- textbook prose block
    'technique'          -- technique description for the Atlas
  )),
  content_id     text not null,      -- problem_id, flashcard_id, or section_id
  chunk_index    integer not null default 0,  -- for multi-chunk content
  content_text   text not null,               -- raw text that was embedded
  embedding      vector(1536),                -- text-embedding-3-small dimension
  metadata       jsonb default '{}',          -- chapter, section, tags, difficulty, etc.
  created_at     timestamptz not null default now(),

  unique (content_type, content_id, chunk_index)
);

-- Approximate nearest neighbor index (IVFFlat) for fast similarity search
-- Rebuild after bulk inserts with: REINDEX INDEX idx_embeddings_vector;
create index if not exists idx_embeddings_vector
  on public.content_embeddings
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 50);

create index if not exists idx_embeddings_type
  on public.content_embeddings (content_type);

create index if not exists idx_embeddings_content
  on public.content_embeddings (content_id);

-- ═══════════════════════════════════════════════════════════════════════════
-- 7. TECHNIQUE ATLAS
--    Cross-cutting index linking problems that share a technique.
--    A student struggling with Bayes sees every problem that uses it.
--    Research: Associative web = foundation of expert memory (Foer).
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists public.techniques (
  id             uuid primary key default uuid_generate_v4(),
  slug           text unique not null,         -- e.g. "bayes-theorem"
  name           text not null,                -- e.g. "Bayes' Theorem"
  description    text,                         -- what this technique is
  category       text,                         -- e.g. "probability", "combinatorics", "algebra"
  embedding      vector(1536),                 -- for semantic technique search
  created_at     timestamptz not null default now()
);

create table if not exists public.problem_techniques (
  id             uuid primary key default uuid_generate_v4(),
  problem_id     text not null,
  technique_id   uuid not null references public.techniques(id) on delete cascade,
  relevance      real not null default 1.0,    -- 0.0–1.0 how central is this technique
  is_primary     boolean not null default false, -- is this the primary technique?
  created_at     timestamptz not null default now(),

  unique (problem_id, technique_id)
);

create index if not exists idx_prob_tech_problem   on public.problem_techniques (problem_id);
create index if not exists idx_prob_tech_technique on public.problem_techniques (technique_id);

-- ═══════════════════════════════════════════════════════════════════════════
-- 8. WEAKNESS PROFILES
--    Aggregated per-user, per-technique performance metrics.
--    Updated by the adaptive difficulty engine after each session.
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists public.weakness_profiles (
  id                 uuid primary key default uuid_generate_v4(),
  user_id            uuid not null references auth.users(id) on delete cascade,
  technique_id       uuid not null references public.techniques(id) on delete cascade,
  attempts           integer not null default 0,
  successes          integer not null default 0,
  success_rate       real not null default 0.0,           -- 0.0–1.0
  avg_time_seconds   real,
  avg_hints_used     real,                                -- 0.0–max_hints
  hint_dependency    real not null default 0.0,           -- 0.0–1.0
  error_distribution jsonb default '{}',                  -- { "conceptual": 3, "calculation": 1, ... }
  current_difficulty real not null default 0.5,           -- adaptive difficulty target 0.0–1.0
  last_updated       timestamptz not null default now(),

  unique (user_id, technique_id)
);

alter table public.weakness_profiles enable row level security;

create policy "Users can read own weakness profiles"
  on public.weakness_profiles for select using (auth.uid() = user_id);
create policy "Users can insert own weakness profiles"
  on public.weakness_profiles for insert with check (auth.uid() = user_id);
create policy "Users can update own weakness profiles"
  on public.weakness_profiles for update using (auth.uid() = user_id);

create index if not exists idx_weakness_user      on public.weakness_profiles (user_id);
create index if not exists idx_weakness_technique on public.weakness_profiles (user_id, technique_id);
create index if not exists idx_weakness_rate      on public.weakness_profiles (user_id, success_rate);

-- ═══════════════════════════════════════════════════════════════════════════
-- 9. SOCRATIC SESSIONS (AI Interviewer)
--    Stores mock interview conversations and scoring.
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists public.socratic_sessions (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  problem_id       text not null,
  status           text not null default 'active' check (status in ('active', 'completed', 'abandoned')),
  messages         jsonb not null default '[]',   -- conversation history
  score            jsonb,                          -- { clarity, correctness, communication, overall }
  hints_given      integer not null default 0,
  duration_seconds integer,
  started_at       timestamptz not null default now(),
  ended_at         timestamptz,
  created_at       timestamptz not null default now()
);

alter table public.socratic_sessions enable row level security;

create policy "Users can read own socratic sessions"
  on public.socratic_sessions for select using (auth.uid() = user_id);
create policy "Users can insert own socratic sessions"
  on public.socratic_sessions for insert with check (auth.uid() = user_id);
create policy "Users can update own socratic sessions"
  on public.socratic_sessions for update using (auth.uid() = user_id);

create index if not exists idx_socratic_user    on public.socratic_sessions (user_id);
create index if not exists idx_socratic_problem on public.socratic_sessions (user_id, problem_id);

-- ═══════════════════════════════════════════════════════════════════════════
-- 10. PROMPT VERSIONS (Eval Pipeline)
--     Tracks every prompt template version for regression testing.
--     Agent must log all prompt versions and eval scores (per role spec).
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists public.prompt_versions (
  id             uuid primary key default uuid_generate_v4(),
  prompt_key     text not null,              -- e.g. "evaluate_approach", "socratic_interviewer"
  version        integer not null,
  template       text not null,              -- the prompt template (with {{placeholders}})
  model          text not null default 'claude-sonnet-4-20250514',
  parameters     jsonb default '{}',         -- temperature, max_tokens, etc.
  is_active      boolean not null default false,
  eval_scores    jsonb default '{}',         -- { accuracy, latency_p50, latency_p99, cost }
  notes          text,
  created_at     timestamptz not null default now(),

  unique (prompt_key, version)
);

-- Only one active version per prompt key
create unique index if not exists idx_prompt_active
  on public.prompt_versions (prompt_key)
  where is_active = true;

-- ═══════════════════════════════════════════════════════════════════════════
-- 11. INTERLEAVED PRACTICE LOGS
--     Tracks which problems were served in interleaved sessions
--     to measure improvement vs blocked practice baseline.
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists public.interleaved_sessions (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  mode             text not null check (mode in ('interleaved', 'blocked')),
  problem_ids      text[] not null,              -- ordered list of problems served
  chapters_mixed   integer[] not null,           -- which chapters were included
  completed_count  integer not null default 0,
  total_correct    integer not null default 0,
  started_at       timestamptz not null default now(),
  ended_at         timestamptz,
  created_at       timestamptz not null default now()
);

alter table public.interleaved_sessions enable row level security;

create policy "Users can read own interleaved sessions"
  on public.interleaved_sessions for select using (auth.uid() = user_id);
create policy "Users can insert own interleaved sessions"
  on public.interleaved_sessions for insert with check (auth.uid() = user_id);
create policy "Users can update own interleaved sessions"
  on public.interleaved_sessions for update using (auth.uid() = user_id);

create index if not exists idx_interleaved_user on public.interleaved_sessions (user_id);

-- ═══════════════════════════════════════════════════════════════════════════
-- 12. UPDATED_AT TRIGGERS FOR NEW TABLES
-- ═══════════════════════════════════════════════════════════════════════════

create or replace trigger set_problem_sm2_updated_at
  before update on public.problem_sm2_state
  for each row execute procedure public.set_updated_at();

create or replace trigger set_weakness_profiles_updated_at
  before update on public.weakness_profiles
  for each row execute procedure public.set_updated_at();

-- ═══════════════════════════════════════════════════════════════════════════
-- 13. SEMANTIC SEARCH FUNCTION
--     Used by the Technique Atlas and related-problem discovery.
-- ═══════════════════════════════════════════════════════════════════════════

create or replace function public.match_embeddings(
  query_embedding vector(1536),
  match_count     integer default 10,
  match_threshold real default 0.7,
  filter_type     text default null
)
returns table (
  id           uuid,
  content_type text,
  content_id   text,
  content_text text,
  metadata     jsonb,
  similarity   real
)
language plpgsql
as $$
begin
  return query
    select
      ce.id,
      ce.content_type,
      ce.content_id,
      ce.content_text,
      ce.metadata,
      (1 - (ce.embedding <=> query_embedding))::real as similarity
    from public.content_embeddings ce
    where
      (filter_type is null or ce.content_type = filter_type)
      and (1 - (ce.embedding <=> query_embedding)) > match_threshold
    order by ce.embedding <=> query_embedding
    limit match_count;
end;
$$;

-- ═══════════════════════════════════════════════════════════════════════════
-- 14. ADAPTIVE DIFFICULTY FUNCTION
--     Computes recommended difficulty for a user on a given technique.
--     Targets ~70% success rate (desirable difficulty sweet spot).
-- ═══════════════════════════════════════════════════════════════════════════

create or replace function public.compute_adaptive_difficulty(
  p_user_id      uuid,
  p_technique_id uuid
)
returns real
language plpgsql
as $$
declare
  v_success_rate   real;
  v_avg_time       real;
  v_hint_dep       real;
  v_difficulty     real;
begin
  select success_rate, avg_time_seconds, hint_dependency
  into v_success_rate, v_avg_time, v_hint_dep
  from public.weakness_profiles
  where user_id = p_user_id and technique_id = p_technique_id;

  if not found then
    return 0.5;  -- default medium difficulty for new users
  end if;

  -- Target 70% success rate (desirable difficulty).
  -- If success_rate > 0.8: increase difficulty (too easy).
  -- If success_rate < 0.6: decrease difficulty (too hard).
  -- Hint dependency further adjusts: heavy hint use = lower effective mastery.
  v_difficulty := 0.5
    + (v_success_rate - 0.7) * 0.5             -- push toward 70% sweet spot
    - v_hint_dep * 0.2;                         -- penalize hint dependency

  -- Clamp to [0.1, 1.0]
  return greatest(0.1, least(1.0, v_difficulty));
end;
$$;
