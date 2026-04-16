# Design Spec: Epic Meaning Layer
> **Quant Review Platform** · Gamification & UX Designer · Spec 04 · For Review

---

## Overview

Epic Meaning is McGonigal's fourth intrinsic reward: the feeling that individual actions connect to something larger than oneself. The current platform treats studying as a purely individual activity — you, alone, solving problems. This spec designs the layer that transforms individual practice into participation in a shared mission.

**The critical research finding:** Yeager & Duckworth (2014, 4 studies, 2,000+ participants) demonstrated that **self-transcendent purpose** — the desire to make a positive impact beyond the self — sustains persistence through difficult and boring tasks. Self-oriented motives (career advancement, salary) did *not* produce the same effect. A brief one-time purpose-framing intervention improved high school GPA over several months.

This means "ace your interview" is insufficient framing. "Join a community of rigorous quantitative thinkers pushing each other to mastery" is the frame that sustains effort when problems get hard and the novelty of XP wears off.

**Three sub-systems in this spec:**
1. **Self-Transcendent Framing** — platform narrative and identity language
2. **Percentile Rank & Personal Bests** — how you're doing relative to others and yourself
3. **Weekly Leagues & Community Milestones** — shared goals that drive individual behavior

---

## Part A: Self-Transcendent Framing & Narrative Identity

### The Science

**Yeager & Duckworth (2014, *JPSP*)**: Self-transcendent purpose for learning fostered academic self-regulation. Students who connected studying to a "beyond-the-self" purpose persisted longer on boring tasks and were less likely to drop out. Self-oriented motives (interesting career, good salary) did not produce these benefits.

**Oyserman's Identity-Based Motivation**: When action feels identity-congruent, difficulty is interpreted as meaningful. When identity-incongruent, the same difficulty feels pointless. The existing interview-journey titles (Applicant → Quant) already activate this. The Epic Meaning layer extends it from individual identity to collective identity.

**Mekler et al. (2017)**: "Meaning" framing + game mechanics together produced the strongest effects on performance. Meaning affects task interpretation; game mechanics affect effort allocation. They are complementary, not substitutes.

### Platform Narrative

The platform should consistently communicate three narrative threads:

| Thread | Message | Where It Appears |
|--------|---------|-----------------|
| **Community of Practice** | "You're part of a growing community of quantitative thinkers." | Onboarding, dashboard footer, community counter |
| **Shared Rigor** | "Every hard problem you solve raises the bar for all of us." | Post-session summary, community milestone messages |
| **The Craft** | "Quantitative reasoning is a discipline worth mastering, not just an interview hoop to jump through." | Loading tips, break nudges, evening study messages |

**Tone guidelines:**
- Professional, not cheerful. This audience respects intellectual rigor, not rah-rah encouragement.
- Specific, not generic. "127 people solved Chapter 4 problems today" not "Our community is growing!"
- Honest, not hype. Never overstate what the platform is. It's a prep tool and study community — frame it as the best one, not as a revolution.

### Purpose-Connection Prompt (Onboarding)

Based on Yeager & Duckworth's intervention design — a brief one-time writing exercise about self-transcendent purpose that improved GPA over months:

**During onboarding (after first session):**

```
┌──────────────────────────────────────────────────────────┐
│  One question before you go.                             │
│                                                          │
│  Beyond the interview — why does mastering quantitative  │
│  reasoning matter to you?                                │
│                                                          │
│  ┌──────────────────────────────────────────────────┐    │
│  │                                                  │    │
│  │  [free text, 2-3 sentences]                      │    │
│  │                                                  │    │
│  └──────────────────────────────────────────────────┘    │
│                                                          │
│  This is private — just for you. We'll show it back to   │
│  you when the problems get hard.                         │
│                                                          │
│  [ Save & Continue ]              [ Skip ]               │
└──────────────────────────────────────────────────────────┘
```

**Where the response resurfaces:**
- After 3+ consecutive failed problems: "You said: '[their response].' Keep going."
- On the "Come back tomorrow" screen: "Remember why you started: '[their response].'"
- Monthly in a "reflection" email: "You wrote this on day one. Here's how far you've come."

**Why this works:** Yeager's research shows that connecting study effort to beyond-the-self purpose is most effective when the connection is articulated by the student themselves, not imposed by the platform. The platform provides the prompt; the student provides the meaning.

### Community Counter (Dashboard)

A persistent element on the dashboard (not during Focus Mode):

```
┌─────────────────────────────────────────────────┐
│  🌐  Together we've solved 847,293 problems      │
│      You contributed 247 (0.03%)                 │
│      1,847 people studying this week             │
└─────────────────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| **Global counter** | Total problems solved across all users, all time. Updates in near-real-time. |
| **Individual contribution** | User's total solved + percentage of global. The Halo 3 effect: "I contributed .00032%." The absolute contribution is tiny; the connection to the whole is motivating. |
| **Active learners** | Count of users who studied in the past 7 days. Anonymous — no names, no profiles. Social facilitation without evaluation apprehension (Zajonc 1965). |
| **Visual** | Compact, single-line or two-line. Globe icon. Muted text. Not a hero element — ambient presence. |

---

## Part B: Percentile Rank & Personal Bests

### B1: Percentile Rank System

#### The Science

**Festinger's Social Comparison Theory (1954):** Humans have an innate drive to evaluate abilities by comparing to others. Whether this helps or harms depends on: perceived attainability of the comparison target, controllability attributions, self-efficacy, and mindset.

**The Big-Fish-Little-Pond Effect (Marsh; Fang et al. 2018 meta-analysis, 26+ countries):** Equally capable students have higher self-concept in a less capable reference group. In a self-selected group of quant candidates (already highly capable), the median user is above the general population — but the percentile display will still label half of them "below 50th." This can deflate self-concept even when absolute ability is high.

**Stereotype threat (Spencer, Steele, Quinn 1999):** When members of negatively stereotyped groups are made aware their performance will be compared, anxiety increases and performance decreases via working memory depletion. Real risk for women in quant fields, underrepresented minorities, and non-traditional candidates.

**Rank effects are long-lasting:** A 2025 EdWorkingPapers study found low rank carries penalties through high school, college, and even earnings at age 28.

#### Design Decisions

**1. Percentile is OPT-IN only.**
- Not shown by default. Available in Settings → "Show percentile rank."
- Falls under "Full" gamification intensity setting (Spec 01).
- Rationale: the BFLPE and stereotype threat research show that forced social comparison harms the bottom half. Opt-in ensures only students who benefit from comparison see it.

**2. Show trajectory, not static position.**
- Primary display: "You moved from 45th → 62nd percentile this month"
- Secondary: current percentile as a number
- Never show percentile as the *first* thing a student sees on their dashboard
- Rationale: growth trajectory activates mastery orientation. Static position activates performance orientation.

**3. Never show percentile during active study.**
- Percentile appears on: Dashboard (opt-in widget), Session Summary (if enabled), Monthly recap email
- Percentile does NOT appear: during Focus Mode, during problem-solving, on problem cards, on flashcard reviews
- Rationale: social comparison during problem-solving triggers evaluation apprehension, breaking flow state

**4. Pair with competence indicators.**
- Always show percentile alongside mastery data: "62nd percentile · 4 of 7 chapters mastered"
- This grounds the percentile in concrete achievement, preventing the abstract number from dominating self-assessment

**5. Frame the reference group honestly.**
- "Among all Quant Review users who have solved 20+ problems"
- This communicates that the reference group is self-selected and active, not a general population comparison

#### Visual Design

```
┌─────────────────────────────────────────────────┐
│  Your Position                                  │
│                                                 │
│        ╭─────── You ───────╮                    │
│  ▁▂▃▅▆███████████████▇▅▃▂▁                     │
│  0%              62nd           100%            │
│                                                 │
│  ↑ 17 percentile points this month              │
│  4 of 7 chapters mastered                       │
│                                                 │
│  Among 2,847 active users                       │
└─────────────────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| **Distribution curve** | Bell curve / histogram showing where the user falls. User's position marked with a vertical line + label. |
| **Percentile number** | Large, bold. "62nd" not "62%." Ordinal feels more like a position than a score. |
| **Trajectory arrow** | Green up-arrow with delta: "↑ 17 percentile points this month." Red down-arrow if declined (warm tone, not alarming). |
| **Mastery pairing** | Always shown beneath percentile. "4 of 7 chapters mastered." Grounds the abstract number. |
| **Reference group** | Small text: "Among X active users." Transparency about the comparison pool. |
| **Update frequency** | Weekly recalculation. Not real-time — prevents obsessive checking. |

### B2: Personal Best / Ghost Competitor System

#### The Science

**University of Bath ghost racing research:** Competing against a replay of your own past performance produces higher motivation and enjoyment than leaderboard-based competition. Multi-ghost racing (competing against multiple past versions + a projected "future self") produced the highest engagement.

**Why self-competition is superior for this audience:**
- Eliminates social comparison anxiety entirely — no stereotype threat possible
- The comparison target is always attainable (you literally achieved it before)
- Improvement is always visible and unambiguous
- Matches the likely Bartle type distribution (Achievers/Explorers > Socializers for quant candidates)

#### Personal Best Metrics

Track and display these trajectories on the dashboard:

| Metric | Display | Update Frequency |
|--------|---------|-----------------|
| **Problems solved per week** | Sparkline chart (last 8 weeks). Current week highlighted. Personal best week marked with a star. | Weekly |
| **Accuracy by chapter** | Bar chart per chapter (% of problems solved correctly on first attempt). Color: gray → blue → green as accuracy improves. | After each solve |
| **Streak record** | "Current: 14 days · Best: 23 days" | Daily |
| **Hard problems hint-free** | Running count. "You've solved 8 hard problems without hints. Best week: 3." | After each hard solve |
| **Flashcard retention rate** | % of reviews rated "Good" or "Easy" over the last 30 days. Trend arrow. | Weekly |

#### Ghost Competitor — "Last Week You"

A lightweight self-competition mechanic:

```
┌──────────────────────────────────────────────────────┐
│  This Week vs. Last Week                             │
│                                                      │
│  Problems solved:   ████████ 12  vs  █████ 8  (+50%) │
│  XP earned:         ██████ 410  vs  ████ 285  (+44%) │
│  Hard solves:       ██ 3        vs  █ 1       (+200%)│
│  Flashcards:        █████████ 42 vs ████████ 38 (+11%)│
│                                                      │
│  🏆 You're outpacing last week in every category.    │
└──────────────────────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| **Placement** | Dashboard widget, below stats overview. Not in Focus Mode. |
| **Comparison** | Current week (Mon-now) vs same period last week. Fair comparison even mid-week. |
| **Visual** | Horizontal bar pairs. This week in brand blue, last week in muted gray. Percentage delta. |
| **Tone** | When ahead: "You're outpacing last week." When behind: "Last week you solved 12 problems by Wednesday. You're at 8 — still time." Never negative or shaming. |
| **When insufficient data** | First week: "Complete this week to start tracking your personal bests." No empty state with zeros. |

---

## Part C: Weekly Leagues & Community Milestones

### C1: Weekly Leagues (30-Person Cohorts)

#### The Science

**The N-Effect (Garcia & Tor 2009, *Psychological Science*):** Increasing the number of competitors decreases competitive motivation. SAT scores fall as venue size increases. Participants completed tasks faster competing against 10 people than against 100. Social comparison is most salient in small groups.

**The Fresh Start Effect (Dai, Milkman, Riis 2014, *Management Science*):** Temporal landmarks (new week, new month) increase goal-directed behavior. Gym visits are 33% higher at the start of a week, 47% higher at a new semester. Weekly resets give everyone psychological permission to start fresh after a bad week.

**Duolingo's league data:** +17% learning time after league launch. Highly engaged learners tripled. Retention increased from 12% to 55%.

**Li et al. (2024, *JCAL*):** Team leaderboards promote collaborative learning; individual leaderboards drive personal effort. Combining both is most effective.

#### League Structure

**10 tiers, quant-themed names:**

| Tier | Name | Color | Promotion | Demotion |
|------|------|-------|-----------|----------|
| 1 | **Sigma** | Bronze | Top 10 promote | — |
| 2 | **Delta** | Silver | Top 10 promote | Bottom 5 demote |
| 3 | **Theta** | Gold | Top 10 promote | Bottom 5 demote |
| 4 | **Lambda** | Emerald | Top 8 promote | Bottom 5 demote |
| 5 | **Pi** | Sapphire | Top 8 promote | Bottom 5 demote |
| 6 | **Phi** | Amethyst | Top 7 promote | Bottom 5 demote |
| 7 | **Omega** | Ruby | Top 7 promote | Bottom 5 demote |
| 8 | **Euler** | Pearl | Top 5 promote | Bottom 5 demote |
| 9 | **Gauss** | Obsidian | Top 5 promote | Bottom 5 demote |
| 10 | **Riemann** | Diamond | — | Bottom 5 demote |

**Why Greek letters / mathematician names:** Quant candidates use these symbols daily. Sigma (Σ), Delta (Δ), Theta (Θ) are the language of quantitative finance. The progression from basic notation (Sigma) to legendary mathematicians (Euler, Gauss, Riemann) mirrors the journey from fundamentals to mastery. Professional, domain-native, never infantilizing.

#### Mechanics

| Property | Spec |
|----------|------|
| **Cohort size** | 30 users per league. Matched by tier + timezone + activity level. |
| **Reset** | Every Sunday at 22:00 local time. XP resets to 0 for league standings. |
| **Joining** | Complete 1 lesson/problem after reset to be placed in a new league. |
| **Scoring** | Weekly XP earned (from Spec 01). Only XP earned during the league week counts. |
| **Promotion** | Top N users (varies by tier) advance one tier next week. |
| **Demotion** | Bottom 5 users drop one tier. Tier 1 (Sigma) users cannot demote further. |
| **Safe zone** | Users between promotion and demotion thresholds stay in their current tier. |

#### Visual Design

```
┌──────────────────────────────────────────────────┐
│  Lambda League · Week of Apr 13                  │
│  ─────────────────────────────────────────────── │
│  ▲ Promotion zone                                │
│  ┌────────────────────────────────────────────┐  │
│  │  1.  ●●● A.K.         487 XP              │  │
│  │  2.  ●●● M.S.         445 XP              │  │
│  │  ...                                       │  │
│  │  7.  ●●● R.T.         312 XP              │  │
│  │  8.  ●●● J.L.         289 XP  ← promote   │  │
│  ├────────────────────────────────────────────┤  │
│  │  9.  ●●● D.M.         271 XP              │  │
│  │  ...                                       │  │
│  │  14. ██▌ You           198 XP  ← you       │  │
│  │  15. ●●● S.P.         187 XP              │  │
│  │  ...                                       │  │
│  ├────────────────────────────────────────────┤  │
│  │  26. ●●● K.R.          45 XP  ← demote    │  │
│  │  ...                                       │  │
│  │  30. ●●● T.W.          12 XP              │  │
│  └────────────────────────────────────────────┘  │
│  ▼ Demotion zone                                 │
│                                                  │
│  🕐 Resets in 3 days, 14 hours                   │
└──────────────────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| **Default view** | Centered on the user's row, showing 3-5 users above and below. Scroll to see full board. Never default to showing rank 1. |
| **User's row** | Highlighted with brand blue background. Bold text. Distinct from all other rows. |
| **Promotion line** | Green divider between last promoted position and safe zone. Label: "▲ Promotion." |
| **Demotion line** | Warm orange divider between safe zone and demotion zone. Label: "▼ Demotion." Never red. |
| **User names** | Initials only (A.K., M.S.) for privacy. No full names, no photos. Reduces evaluation apprehension. |
| **Timer** | Countdown to reset: "Resets in 3 days, 14 hours." Creates temporal salience without urgency. |
| **Opt-in** | Leagues are only visible under "Full" gamification intensity. Users on "Standard" or "Minimal" never see them. |

#### League Result Notification (Sunday Evening)

| Result | Message | Tone |
|--------|---------|------|
| **Promoted** | "You've been promoted to Pi League. New week, new competition." | Green accent. Tier 2 celebration (small confetti). |
| **Maintained** | "You held your position in Lambda League. Solid week." | Blue accent. Calm, affirming. |
| **Demoted** | "You've moved to Theta League this week. Fresh start — you'll be back." | Warm amber. Encouraging, never shaming. Fresh start framing per Dai et al. |

### C2: Community Milestones & Challenges

#### The Science

**Community challenge research (Whistl 2026):** Structured challenges with collective progress bars increase engagement 100-150% compared to static gamification. Key features: time-bounded, shared goal, individual contribution visible, tiered milestones.

**We-intention (Tuomela):** Framing goals collectively ("Can our community solve 100,000 problems?") changes individual behavior beyond what aggregated individual goals produce. Group members feel bound by the group's ethos.

**Group flow (Pels et al. 2018, *PLOS ONE*):** Group flow states are associated with increased task performance, creativity, and emotional contagion. Requires: shared goals, perceived collective efficacy, equal opportunity to participate.

#### Always-On Community Milestones

Permanent platform milestones that the community pursues collectively:

| Milestone | Target | Reward |
|-----------|--------|--------|
| **First Million** | 1,000,000 total problems solved (all users) | Platform-wide badge for all users who contributed. Community counter turns gold. |
| **Chapter Conquerors** | 100 users reach "Mastered" on all 7 chapters | Celebratory dashboard banner for all active users |
| **The 200 Club** | First user to solve all 200+ problems | Special "Pioneer" badge (visible on leaderboard) |

These are aspirational, long-term, and create a sense of shared history. They don't reset.

#### Seasonal Community Challenges (Monthly)

Time-bounded collective goals that create urgency and shared purpose:

**Structure:**

```
┌──────────────────────────────────────────────────────────┐
│  April Challenge: Probability Month                      │
│                                                          │
│  Can our community solve 25,000 probability problems     │
│  this month?                                             │
│                                                          │
│  ████████████████████████░░░░░░░░░  18,247 / 25,000     │
│                                         73%              │
│                                                          │
│  Milestones:                                             │
│  ✓ 5,000  — Unlocked: Community solved-count badge       │
│  ✓ 10,000 — Unlocked: +5% XP bonus for all (rest of mo) │
│  ✓ 15,000 — Unlocked: Special probability problem set    │
│  → 20,000 — Next: Community avatar frame                 │
│  ○ 25,000 — Final: "Probability Month Champion" badge    │
│                                                          │
│  Your contribution: 127 problems (0.7%)                  │
│  ⏱ 12 days remaining                                    │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| **Frequency** | Monthly. New challenge on the 1st. Ends on the last day of the month. |
| **Theme** | Rotates by chapter focus: Probability Month, Stochastic Processes Month, Brain Teaser Blitz, etc. |
| **Goal** | Set based on active user count × reasonable per-user contribution. Should require broad participation — no single user or small group can hit it alone. |
| **Tiered milestones** | 5 tiers (20%, 40%, 60%, 80%, 100% of goal). Each tier unlocks a reward for ALL participants. Early progress feels meaningful even if the final goal isn't reached. |
| **Progress bar** | Full-width, prominently displayed on dashboard. Updates in near-real-time. |
| **Individual contribution** | "Your contribution: 127 problems (0.7%)" — the Halo 3 "my .00032%" effect. |
| **Countdown** | Days remaining. Creates temporal salience per the fresh start effect research. |
| **Rewards** | Cosmetic (badges, avatar frames) + minor functional (small XP bonus). Never content-gating — completing the challenge never unlocks learning content that non-participants can't access. |

#### Design Principles for Community Challenges

1. **Never gate learning content behind community challenges.** The challenge rewards engagement, not access. A student who doesn't participate still has full access to all problems and flashcards.
2. **Rewards benefit ALL participants,** not just top contributors. The shared XP bonus (e.g., +5% for the rest of the month) applies to everyone who contributed at least 1 problem. This prevents the challenge from becoming another leaderboard.
3. **Set achievable goals.** Failing a community challenge is demoralizing for the entire community. Err on the side of achievable. Use tiered milestones so partial completion still feels like success.
4. **Rotate themes to highlight different chapters.** This nudges users toward chapters they might otherwise ignore, creating incidental interleaving.

---

## Part D: Integration Points & Implementation Priority

### Database Schema Extensions

```sql
-- Community counters (aggregated, updated by cron/trigger)
create table if not exists public.community_stats (
  id           text primary key,          -- 'global' or challenge ID
  total_problems_solved  bigint not null default 0,
  total_flashcards_reviewed bigint not null default 0,
  active_users_7d        integer not null default 0,
  updated_at   timestamptz not null default now()
);

-- Weekly league assignments
create table if not exists public.league_assignments (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  week_start   date not null,             -- Monday of the league week
  tier         integer not null default 1, -- 1 (Sigma) to 10 (Riemann)
  cohort_id    uuid not null,             -- groups 30 users together
  weekly_xp    integer not null default 0,
  final_rank   integer,                   -- set on Sunday at reset
  result       text check (result in ('promoted','maintained','demoted')),
  unique (user_id, week_start)
);

alter table public.league_assignments enable row level security;
create policy "Users can read own league data"
  on public.league_assignments for select using (auth.uid() = user_id);

-- Community challenges
create table if not exists public.community_challenges (
  id           uuid primary key default uuid_generate_v4(),
  title        text not null,
  description  text,
  target       integer not null,          -- e.g. 25000
  current      integer not null default 0,
  chapter_focus integer,                  -- optional: which chapter
  starts_at    date not null,
  ends_at      date not null,
  milestones   jsonb not null default '[]' -- [{threshold: 5000, reward: "...", reached: false}]
);

-- User's personal bests (denormalized for dashboard)
alter table public.profiles
  add column if not exists best_streak integer not null default 0,
  add column if not exists best_weekly_xp integer not null default 0,
  add column if not exists best_weekly_problems integer not null default 0,
  add column if not exists purpose_statement text;  -- from onboarding prompt
```

### Gamification Intensity Behavior

| Feature | Minimal | Standard | Full |
|---------|---------|----------|------|
| Community counter | Hidden | Visible on dashboard | Visible |
| Personal bests / ghost competitor | Hidden | **Visible** | Visible |
| Percentile rank | Hidden | Hidden | **Visible (opt-in)** |
| Weekly leagues | Hidden | Hidden | **Visible** |
| Community challenges | Hidden | **Visible** (progress bar only) | Visible (full detail) |
| Purpose-connection prompt | Still asked (private) | Still asked | Still asked |

### New Components

| Component | Purpose | Complexity |
|-----------|---------|------------|
| `<CommunityCounter />` | Dashboard widget: global problems solved, user contribution, active users | Low |
| `<PercentileWidget />` | Opt-in dashboard card: distribution curve, trajectory, mastery pairing | Medium |
| `<PersonalBestDashboard />` | Ghost competitor widget: this week vs last week, sparkline trends | Medium |
| `<LeagueStandings />` | Full league view: 30-person board, promotion/demotion zones, user highlighting | High |
| `<LeagueTierBadge />` | Small tier icon + name (Sigma through Riemann) for navbar/profile | Low |
| `<CommunityChallenge />` | Dashboard widget: progress bar, milestones, individual contribution, countdown | Medium |
| `<PurposePrompt />` | Onboarding modal: free-text purpose statement capture | Low |
| `<LeagueResultNotification />` | Sunday notification: promoted/maintained/demoted with appropriate tone | Low |

### Implementation Priority

| Priority | Component | Why First | Dependencies |
|----------|-----------|-----------|-------------|
| 1 | `<CommunityCounter />` | Lowest complexity, highest ambient impact. Creates shared identity immediately. | Community stats table + aggregation cron |
| 2 | `<PersonalBestDashboard />` | Self-competition has the strongest evidence and zero social-comparison risk | Weekly stats aggregation |
| 3 | `<PurposePrompt />` | One-time onboarding component with outsized long-term motivation impact (Yeager) | profiles.purpose_statement |
| 4 | `<CommunityChallenge />` | Monthly engagement driver. 100-150% engagement increase per research. | community_challenges table, contribution tracking |
| 5 | `<LeagueStandings />` + matching algorithm | Full league system. Highest complexity but validated by Duolingo's +17% learning time. | league_assignments table, cohort matching, Sunday cron |
| 6 | `<PercentileWidget />` | Opt-in only. Requires sufficient user base for meaningful percentiles. | percentile computation, weekly aggregation |
| 7 | `<LeagueTierBadge />` + `<LeagueResultNotification />` | Polish layer on top of league system | LeagueStandings |

---

## Sources

### Epic Meaning & Purpose
- Yeager & Duckworth (2014) — "Boring but Important: Self-Transcendent Purpose," *JPSP*
- Oyserman & Destin (2010) — Identity-Based Motivation, *PMC*
- McGonigal (2011) — *Reality Is Broken*, Chapters 6 (Epic Meaning) and 12-14 (Collective Projects)
- Mekler et al. (2017) — "Disassembling Gamification" — meaning + mechanics complementary
- Curtis (2015) — Foldit participant motivation
- Foldit, Nature (2019) — Citizen-designed proteins

### Social Comparison & Percentile
- Festinger (1954) — Social Comparison Theory
- Fang et al. (2018) — Big-Fish-Little-Pond Effect meta-analysis, *Frontiers in Psychology*
- Spencer, Steele, Quinn (1999) — Stereotype threat and math performance
- EdWorkingPapers (2025) — Long-term effects of rank on educational outcomes
- Garcia & Tor (2009) — The N-Effect, *Psychological Science*

### Leaderboards & Competition
- Dai, Milkman, Riis (2014) — The Fresh Start Effect, *Management Science*
- Li et al. (2024) — Leaderboards in higher education, *JCAL*
- Lim & Lee (2024) — Leaderboard design principles, *JMIR Serious Games*
- Yu-kai Chou — Leaderboard design definitive guide
- University of Bath — Ghost racing research

### Community & Collective Motivation
- Pels, Kleinert, Mennigen (2018) — Group flow scoping review, *PLOS ONE*
- Zumeta et al. (2016) — Collective efficacy and emotional synchrony
- Tuomela — We-intention vs I-intention
- Zajonc (1965) — Social facilitation drive theory
- Whistl (2026) — Community challenge engagement data
