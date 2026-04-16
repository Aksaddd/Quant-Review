# Design Spec: XP & Leveling System
> **Quant Review Platform** · Gamification & UX Designer · Spec 01 · For Review

---

## Overview

The XP system is the foundation of the gamification layer. It provides the **effort metric** — a visible, accumulating measure of engagement that drives satisfying work (McGonigal Reward #1) and blissful productivity (always having a clear next goal).

**Critical constraint:** XP measures *effort*. SM-2 mastery levels measure *learning*. These are **separate, parallel systems** (the Khan Academy dual-track model, validated by Chess.com). XP never gates learning content. SM-2 progression never depends on XP. A student with 0 XP who demonstrates mastery has mastered the material.

---

## Part A: XP Award Formula & Sources

### Design Principles

1. **XP is earned exclusively through cognitive effort** — problem attempts, hint-free solves, spaced retrieval, flashcard recall. Never for passive actions (opening chapters, viewing pages, logging in).
2. **Difficulty drives value.** A hard problem solved without hints earns 10x a basic flashcard review. This creates Desirable Difficulty incentive (Brown et al., Ch. 4).
3. **Hint-free solves earn a significant bonus.** This reinforces Generation Before Revelation (Dehaene Pillar 2) — the struggle itself is the learning event.
4. **Spaced retrieval earns a multiplier.** Returning to previously solved problems on schedule earns more than first-time solves. This directly incentivizes SM-2 compliance.
5. **Bonus XP is variable, not guaranteed.** Streak bonuses and milestone bonuses use the Unexpected Reward principle (Oakley Ch. 7) — dopamine from unexpected rewards strengthens neural links being formed.

### XP Award Table — Problems

| Action | Easy | Medium | Hard |
|--------|------|--------|------|
| **Problem attempted** (opened solution without solving) | 5 XP | 5 XP | 5 XP |
| **Problem solved (with hints used)** | 15 XP | 25 XP | 40 XP |
| **Problem solved (NO hints)** | 25 XP | 50 XP | 100 XP |
| **Spaced review solve** (returning to previously solved problem on SM-2 schedule) | ×1.5 | ×1.5 | ×1.5 |

**Calculation examples:**
- Solve a hard problem without hints on first attempt: **100 XP**
- Solve a hard problem without hints on spaced review: **150 XP** (100 × 1.5)
- Attempt a medium problem, use 2 hints, mark solved: **25 XP**
- Open a solution without attempting: **5 XP** (attempted, not solved — still rewarding the exposure)

**Why these numbers:**
- The 2x gap between hint/no-hint rewards (e.g., 25 vs 50 for medium) is large enough to incentivize attempting without hints, but small enough that students don't avoid hints when genuinely stuck. Hints are a learning tool, not a penalty.
- The 1.5x spaced review multiplier is the single most important incentive: it rewards the behavior with the strongest evidence base (retrieval practice on expanding intervals).
- "Attempted" XP (5 per problem regardless) rewards the act of engaging with difficult material, aligning with McGonigal's "Fun Failure" — failure is progress, not waste.

### XP Award Table — Flashcards

XP is awarded on every flashcard review, scaled by recall quality:

| Grade | SM-2 Quality | XP Awarded | Rationale |
|-------|-------------|------------|-----------|
| **Blackout** | 0 | 2 XP | You showed up. The exposure itself has learning value. |
| **Again** | 1 | 3 XP | Wrong, but you attempted recall. |
| **Hard** | 2 | 5 XP | Struggled but got it. Desirable difficulty. |
| **Good** | 4 | 8 XP | Solid recall after thought. The sweet spot. |
| **Easy** | 5 | 10 XP | Instant, confident recall. Mastery demonstrated. |

**Why these numbers:**
- The floor is 2 XP (never 0). Every flashcard interaction has value. Punishing failed recall with 0 XP creates avoidance behavior — students stop attempting cards they might fail.
- The ceiling is 10 XP — modest compared to problem-solving. Flashcards are lighter cognitive load than working a full problem. The XP ratio reflects this (~10:1 between a hard hint-free problem solve and an easy flashcard).
- "Good" (8 XP) is weighted high relative to "Easy" (10 XP) because "Good" represents the optimal learning zone — effortful recall that strengthens memory. "Easy" means the card might be over-reviewed.

### XP Multipliers & Bonuses

| Bonus | Trigger | Value | Type |
|-------|---------|-------|------|
| **Streak Bonus** | First action of the day while on an active streak | `min(streak_days, 10) × 2` XP | Variable — capped at +20 XP |
| **Interleaving Bonus** | Completing a Mixed Practice session (cross-chapter problems) | +25% XP for all problems in that session | Flat multiplier |
| **Comeback Bonus** | Solving a problem previously marked "attempted" (failed) | +15 XP flat | Rewards retrying after failure |
| **Session Completion** | Completing a full study session (5+ problems or 10+ flashcards) | +10 XP flat | Rewards sustained effort |
| **Milestone Surprise** | Crossing a round number (100th problem solved, 500th flashcard reviewed) | +50 XP | Unexpected — not shown in advance |

**Streak Bonus rationale:** Capped at 10 days (×20 XP max) to prevent infinite scaling. The bonus is small enough that it's a pleasant surprise, not a reason to study. This avoids the Duolingo trap where streak maintenance becomes the goal.

**Interleaving Bonus rationale:** Mixed Practice is the hardest study mode (215% better delayed test scores per Brown et al.). The 25% bonus explicitly rewards choosing the more difficult, more effective study pattern.

**Milestone Surprise rationale:** Not displayed in advance. The student doesn't know it's coming. This uses the Unexpected Reward principle from Oakley Ch. 7 — unexpected dopamine at the moment of achievement strengthens the neural links formed during the preceding study session.

### What Does NOT Earn XP

| Action | Why No XP |
|--------|-----------|
| Opening the app / logging in | Login rewards are pointsification — no cognitive effort |
| Reading a chapter page | Passive consumption is not retrieval practice |
| Viewing a flashcard front (without rating) | No recall attempt was made |
| Browsing the technique atlas | Exploration is its own reward; XP would create gaming behavior |
| Customizing settings | Infrastructure, not learning |
| Viewing the leaderboard | Social comparison is not a learning action |

---

## Part B: Leveling Curve & Titles

### Leveling Formula

```
XP required for level N = round(100 × 1.18^(N-1))
```

This produces an exponential curve where early levels come fast (onboarding momentum) and later levels require sustained effort (preventing trivial max-out):

| Level | XP to Next | Cumulative XP | Approximate Effort |
|-------|-----------|---------------|-------------------|
| 1 | 100 | 100 | ~2-4 easy problems solved |
| 2 | 118 | 218 | First study session |
| 3 | 139 | 357 | |
| 4 | 164 | 521 | |
| 5 | 194 | 715 | ~1 week of light study |
| 6 | 229 | 944 | |
| 7 | 270 | 1,214 | |
| 8 | 319 | 1,533 | |
| 9 | 376 | 1,909 | |
| 10 | 444 | 2,353 | ~2-3 weeks of regular study |
| 11 | 524 | 2,877 | |
| 12 | 618 | 3,495 | |
| 13 | 729 | 4,224 | |
| 14 | 860 | 5,084 | |
| 15 | 1,015 | 6,099 | ~1-2 months regular study |
| 16 | 1,197 | 7,296 | |
| 17 | 1,413 | 8,709 | |
| 18 | 1,667 | 10,376 | |
| 19 | 1,967 | 12,343 | |
| 20 | 2,321 | 14,664 | ~3-4 months dedicated prep |
| 21 | 2,739 | 17,403 | |
| 22 | 3,232 | 20,635 | |
| 23 | 3,814 | 24,449 | |
| 24 | 4,500 | 28,949 | |
| 25 | MAX | 28,949+ | Complete mastery |

**Why 25 levels:**
- With ~200+ problems across 7 chapters plus ~56 flashcards, a dedicated student who solves everything without hints and completes spaced reviews can realistically reach level 20-22.
- Level 25 requires exceptional breadth (all problems, all flashcards, sustained spaced review over months). It's aspirational but achievable.
- 25 is enough granularity to feel continuous progress, not so many that levels feel meaningless.

**Why 1.18 growth rate:**
- Tested against the problem pool: a student solving 5 medium problems per day (no hints) earns ~250 XP/day. At 1.18 growth, they level up roughly weekly through mid-levels, slowing to biweekly at higher levels.
- Fast enough for early momentum (Level 1-5 in the first week), slow enough that Level 20+ feels like a genuine milestone.

### Global Level Titles

Finance-themed titles that resonate with the quant candidate audience:

| Levels | Title | Meaning |
|--------|-------|---------|
| 1-5 | **Intern** | Just getting started. Learning the fundamentals. |
| 6-10 | **Analyst** | Building systematic skill. Developing technique recognition. |
| 11-15 | **Associate** | Demonstrated breadth. Comfortable with multiple problem domains. |
| 16-20 | **Vice President** | Deep expertise. Attacking hard problems with confidence. |
| 21-24 | **Director** | Comprehensive mastery across chapters. Interview-ready. |
| 25 | **Managing Director** | Complete platform mastery. The top. |

**Why finance titles:**
- Our users are quant candidates. Finance career titles are immediately legible and aspirational for this audience.
- They're professional, not childish — "Vice President" carries more weight for our users than "Gold Badge III."
- The progression maps intuitively: an intern is learning, a Managing Director has mastered everything.

### Chapter Mastery Levels (Separate System)

In addition to global XP levels, each chapter has its own mastery rating. This is the **learning truth metric** — tied to SM-2 state, not XP accumulation.

| Mastery Level | Criteria | Visual |
|--------------|----------|--------|
| **Untouched** | 0 problems attempted | Gray ring, empty |
| **Exploring** | 1-24% problems solved | Ring fills with blue |
| **Practicing** | 25-49% problems solved | Ring turns amber |
| **Proficient** | 50-74% problems solved | Ring turns green |
| **Mastered** | 75%+ problems solved AND ≥50% of chapter flashcards at SM-2 interval ≥21 days | Ring turns gold with glow |

**Why separate from XP:**
- A student could grind flashcards for XP and reach Level 15 without solving hard problems. Their XP level says "Associate" but they haven't demonstrated competence in Chapter 5. The chapter mastery system catches this.
- Conversely, a student who turns off all gamification and studies in Minimal mode still earns mastery. Learning progress never depends on engagement features.

---

## Part C: Integration Points & Data Model

### New TypeScript Types

```typescript
// ── XP System ───────────────────────────────

export type XPSource =
  | 'problem_attempted'
  | 'problem_solved'
  | 'problem_solved_no_hints'
  | 'spaced_review_solve'
  | 'flashcard_review'
  | 'streak_bonus'
  | 'interleaving_bonus'
  | 'comeback_bonus'
  | 'session_completion'
  | 'milestone_surprise';

export interface XPEvent {
  id: string;                // UUID
  source: XPSource;
  amount: number;            // XP awarded
  referenceId?: string;      // problem ID or flashcard ID
  difficulty?: Difficulty;
  multiplier?: number;       // e.g. 1.5 for spaced review
  timestamp: string;         // ISO datetime
}

export interface UserXP {
  totalXP: number;
  level: number;             // computed from totalXP
  xpToNextLevel: number;     // remaining XP to reach next level
  xpInCurrentLevel: number;  // XP earned within current level
  levelProgress: number;     // 0-1 fraction for progress bar
  title: string;             // "Analyst", "Associate", etc.
}

// ── XP Configuration (constants) ─────────────

export interface XPConfig {
  problemAttempted: number;                          // 5
  problemSolved: Record<Difficulty, number>;          // { easy: 15, medium: 25, hard: 40 }
  problemSolvedNoHints: Record<Difficulty, number>;   // { easy: 25, medium: 50, hard: 100 }
  spacedReviewMultiplier: number;                     // 1.5
  flashcardReview: Record<ReviewGrade, number>;       // { blackout: 2, again: 3, hard: 5, good: 8, easy: 10 }
  streakBonusPerDay: number;                          // 2
  streakBonusCap: number;                             // 20 (10 days × 2)
  interleavingMultiplier: number;                     // 1.25
  comebackBonus: number;                              // 15
  sessionCompletionBonus: number;                     // 10
  milestoneSurpriseBonus: number;                     // 50
}

export const XP_CONFIG: XPConfig = {
  problemAttempted: 5,
  problemSolved: { easy: 15, medium: 25, hard: 40 },
  problemSolvedNoHints: { easy: 25, medium: 50, hard: 100 },
  spacedReviewMultiplier: 1.5,
  flashcardReview: { blackout: 2, again: 3, hard: 5, good: 8, easy: 10 },
  streakBonusPerDay: 2,
  streakBonusCap: 20,
  interleavingMultiplier: 1.25,
  comebackBonus: 15,
  sessionCompletionBonus: 10,
  milestoneSurpriseBonus: 50,
};
```

### Leveling Utility Functions

```typescript
const LEVEL_BASE = 100;
const LEVEL_GROWTH = 1.18;
const MAX_LEVEL = 25;

const LEVEL_TITLES: Record<number, string> = {
  1: 'Intern', 2: 'Intern', 3: 'Intern', 4: 'Intern', 5: 'Intern',
  6: 'Analyst', 7: 'Analyst', 8: 'Analyst', 9: 'Analyst', 10: 'Analyst',
  11: 'Associate', 12: 'Associate', 13: 'Associate', 14: 'Associate', 15: 'Associate',
  16: 'Vice President', 17: 'Vice President', 18: 'Vice President', 19: 'Vice President', 20: 'Vice President',
  21: 'Director', 22: 'Director', 23: 'Director', 24: 'Director',
  25: 'Managing Director',
};

/** XP required to complete level N (go from N to N+1). */
function xpForLevel(n: number): number {
  if (n >= MAX_LEVEL) return Infinity;
  return Math.round(LEVEL_BASE * Math.pow(LEVEL_GROWTH, n - 1));
}

/** Cumulative XP required to reach level N. */
function cumulativeXPForLevel(n: number): number {
  let total = 0;
  for (let i = 1; i < n; i++) total += xpForLevel(i);
  return total;
}

/** Compute UserXP from totalXP. */
function computeUserXP(totalXP: number): UserXP {
  let level = 1;
  let remaining = totalXP;
  
  while (level < MAX_LEVEL) {
    const needed = xpForLevel(level);
    if (remaining < needed) break;
    remaining -= needed;
    level++;
  }
  
  const xpNeeded = xpForLevel(level);
  return {
    totalXP,
    level,
    xpToNextLevel: level >= MAX_LEVEL ? 0 : xpNeeded - remaining,
    xpInCurrentLevel: remaining,
    levelProgress: level >= MAX_LEVEL ? 1 : remaining / xpNeeded,
    title: LEVEL_TITLES[level] ?? 'Managing Director',
  };
}
```

### XP Award Function

```typescript
/** Calculate XP for a problem solve event. */
function awardProblemXP(
  difficulty: Difficulty,
  hintsUsed: number,
  totalHints: number,
  isSpacedReview: boolean,
  previousStatus: ProblemStatus,
): XPEvent {
  let base: number;
  let source: XPSource;

  if (hintsUsed === 0 && totalHints > 0) {
    // Solved without using any available hints
    base = XP_CONFIG.problemSolvedNoHints[difficulty];
    source = 'problem_solved_no_hints';
  } else {
    base = XP_CONFIG.problemSolved[difficulty];
    source = 'problem_solved';
  }

  let multiplier = 1;
  if (isSpacedReview) {
    multiplier = XP_CONFIG.spacedReviewMultiplier;
    source = 'spaced_review_solve';
  }

  const amount = Math.round(base * multiplier);
  
  // Check for comeback bonus
  const comebackXP = previousStatus === 'attempted' ? XP_CONFIG.comebackBonus : 0;

  return {
    id: crypto.randomUUID(),
    source,
    amount: amount + comebackXP,
    referenceId: undefined, // set by caller
    difficulty,
    multiplier: multiplier > 1 ? multiplier : undefined,
    timestamp: new Date().toISOString(),
  };
}

/** Calculate XP for a flashcard review event. */
function awardFlashcardXP(grade: ReviewGrade): XPEvent {
  return {
    id: crypto.randomUUID(),
    source: 'flashcard_review',
    amount: XP_CONFIG.flashcardReview[grade],
    timestamp: new Date().toISOString(),
  };
}
```

### Database Schema Extension

```sql
-- ─────────────────────────────────────────────────────────────────
-- xp_events — Immutable log of all XP awards
-- ─────────────────────────────────────────────────────────────────
create table if not exists public.xp_events (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  source       text not null,
  amount       integer not null,
  reference_id text,              -- problem_id or card_id
  difficulty   text,
  multiplier   real,
  created_at   timestamptz not null default now()
);

alter table public.xp_events enable row level security;

create policy "Users can read own XP events"
  on public.xp_events for select using (auth.uid() = user_id);
create policy "Users can insert own XP events"
  on public.xp_events for insert with check (auth.uid() = user_id);

create index idx_xp_events_user on public.xp_events (user_id);
create index idx_xp_events_user_date on public.xp_events (user_id, created_at);

-- ─────────────────────────────────────────────────────────────────
-- Add total_xp to profiles (denormalized for fast reads)
-- ─────────────────────────────────────────────────────────────────
alter table public.profiles add column if not exists total_xp integer not null default 0;
```

### Codebase Integration Points

| Trigger Location | File | Event | XP Awarded |
|-----------------|------|-------|------------|
| "Mark as solved" button click | `SolutionReveal.tsx:99` → `onSolved()` | Problem solved (needs hint count from HintStep) | `problemSolved[difficulty]` or `problemSolvedNoHints[difficulty]` |
| Solution revealed without solving | `SolutionReveal.tsx:32` → `handleReveal()` | Problem attempted | 5 XP |
| Flashcard rated | `RatingButtons.tsx:29` → `onRate(grade)` | Flashcard review | `flashcardReview[grade]` |
| SM-2 card reviewed on schedule | `ProgressProvider.tsx:133` → `reviewCard()` | Spaced review (if problem-type card, solved) | ×1.5 multiplier |
| First action of the day | `useStreak.ts:49` → `recordActivity()` | Streak bonus | `min(streak, 10) × 2` |
| Session threshold reached | New: session tracking hook | 5+ problems or 10+ flashcards in one session | +10 XP |

### New Hook: `useXP`

```typescript
// src/hooks/useXP.ts
interface UseXPReturn {
  userXP: UserXP;                           // current level, progress, title
  awardXP: (event: XPEvent) => void;        // add XP and persist
  recentEvents: XPEvent[];                  // last 10 events (for toasts)
  todayXP: number;                          // XP earned today
  sessionXP: number;                        // XP earned this session
  leveledUp: boolean;                       // true if level changed this session (triggers celebration)
  clearLevelUp: () => void;                 // reset after celebration plays
}
```

This hook reads from localStorage (client-side, matching current architecture) and syncs to Supabase `xp_events` + `profiles.total_xp` when authenticated.

### ProgressProvider Extension

The `ProgressProvider` context value expands with:

```typescript
interface ProgressContextValue {
  // ... existing fields ...
  
  /* XP System */
  userXP: UserXP;
  awardXP: (event: XPEvent) => void;
  recentXPEvents: XPEvent[];
  todayXP: number;
  sessionXP: number;
  leveledUp: boolean;
  clearLevelUp: () => void;
}
```

---

## Part D: Visual States & Animation Triggers

### XP Gain Feedback (Three-Layer System)

**Layer 1 — Floating Number (Immediate)**

| Property | Spec |
|----------|------|
| Trigger | Any XP award event |
| Position | Animates upward from the triggering element (solve button, rating button) |
| Animation | `translateY(0 → -40px)`, `opacity(1 → 0)` over 800ms, `ease-out` |
| Typography | 14px bold (standard), 18px bold gold (bonus/multiplier) |
| Color | `#1865f2` standard XP, `#FFB800` bonus XP, `#1fab54` spaced review XP |
| Content | "+25 XP" standard. "+150 XP (1.5×)" with multiplier. "+15 XP Comeback!" for comeback bonus. |
| Implementation | Framer Motion `<motion.div>` with `initial={{ y: 0, opacity: 1 }}` `animate={{ y: -40, opacity: 0 }}` |

**Layer 2 — Toast Notification (Short-term)**

| Property | Spec |
|----------|------|
| Trigger | 300ms after floating number (queued, not simultaneous) |
| Position | Top-right corner, slides in from right |
| Duration | 3-5 seconds, auto-dismiss with fade |
| Content | Icon + source label + XP amount. Examples: "Problem Solved +50 XP", "Streak Bonus +14 XP" |
| Queuing | Max 2 visible at once. New toasts push old ones up. Shared toast manager prevents pile-up. |
| Focus Mode | **Suppressed.** Queued for session summary. |

**Layer 3 — Dashboard Counter (Session-level)**

| Property | Spec |
|----------|------|
| Location | `StatsOverview` component — new XP stat card alongside existing 4 cards |
| Animation | Counter rolls from previous total to new total on mount/update. `react-countup`, 1-2s, `ease-out`. |
| Display | "2,847 XP" with small "Level 12 — Associate" subtitle |
| Progress bar | Full-width bar beneath the stat cards showing XP progress toward next level. Color: blue filling, gold flash at completion. |

### Level-Up Celebration

| Property | Spec |
|----------|------|
| Trigger | `leveledUp === true` (detected by `useXP` when `computeUserXP(newTotal).level > computeUserXP(oldTotal).level`) |
| Type | Modal overlay (not blocking — user can dismiss) |
| Backdrop | 60-70% opacity black |
| Animation sequence | 1. Backdrop fades in (200ms) |
| | 2. Level badge scales up from center (0.5→1.0) with bounce overshoot (400ms) |
| | 3. Confetti burst from center (100+ particles, 2s) — `canvas-confetti` |
| | 4. Title text fades in: "Level 12" (large) + "Associate" (subtitle) |
| | 5. XP bar resets animation: gold → empty → blue (new level starting) |
| | 6. "Continue" button appears (300ms fade-in) |
| Dismiss | Click "Continue" or click backdrop. Calls `clearLevelUp()`. |
| Sound | Optional: ascending chord progression (C→E→G→C), soft onset, 1.5s. Respects mute toggle. |
| Duration | 2-4s animation, then waits for user. Never auto-dismiss. The pause reinforces the achievement. |
| Reduced motion | `prefers-reduced-motion`: skip all animation. Show badge + title instantly. No confetti, no scale, no shake. |

### XP Bar Component Spec

New component: `<XPBar />` — the primary XP visualization.

```
┌─────────────────────────────────────────────────────┐
│  Level 12 — Associate           2,847 / 3,495 XP   │
│  ████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                          81%         │
└─────────────────────────────────────────────────────┘
```

| Property | Spec |
|----------|------|
| Height | 10px (hero, dashboard) or 4px (compact, navbar) |
| Track color | `#e4e6ea` (light mode), `#2a2a3e` (dark mode) |
| Fill color | `#1865f2` (blue) — transitions to `#1fab54` (green) at 75%, `#FFB800` (gold) at 95% |
| Fill animation | CSS `transition: width 700ms ease-out` |
| Level-up flash | When bar reaches 100%: brief gold flash (`#FFB800` at 40% opacity, 300ms), then bar resets to 0% with new level label |
| Corner radius | Fully rounded (`border-radius: 9999px`) |
| Labels | Left: "Level {N} — {Title}". Right: "{current} / {needed} XP". Below-right: "{percent}%" |
| Compact variant | Navbar: 4px height, no labels, tooltip on hover shows level + progress |
| Accessibility | `role="progressbar"`, `aria-valuenow={xpInCurrentLevel}`, `aria-valuemin={0}`, `aria-valuemax={xpForLevel(level)}`, `aria-label="Level {N} progress: {percent}%"` |

### StatsOverview Enhancement

The existing 2×2 / 4-column stat grid becomes a **5-card layout** (or the XP card replaces the streak card at Standard gamification level, with streak folded into the XP card):

**Option A — Add 5th card:**
```
[ Problems Solved ] [ Cards Mastered ] [ Due Today ] [ Day Streak ] [ XP Level ]
```

**Option B (recommended) — Replace streak, add XP bar below grid:**
```
[ Problems Solved ] [ Cards Mastered ] [ Due Today ] [ Level 12 🔥 14 ]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[ ████████████████████░░░░░░░░░░  2,847 / 3,495 XP — Associate  ]
```

The 4th card combines level + streak (flame icon + streak count inline with level number). The full-width XP bar beneath the grid provides the primary progression visualization.

### Gamification Intensity Behavior

| Setting | XP Visibility |
|---------|--------------|
| **Minimal** | XP is tracked internally but not displayed. No floating numbers, no toasts, no XP bar. No level-up celebration. Only SM-2 mastery progress shown. |
| **Standard** | Floating numbers + toasts + XP bar on dashboard. No leaderboard. Level-up celebration is a subtle banner, not full modal. |
| **Full** | Everything: full level-up modal with confetti, floating numbers, toasts, XP bar in navbar, percentile rank, leaderboard context. |

---

## Implementation Priority

For the Frontend Engineer handoff:

| Priority | Component | Complexity | Dependencies |
|----------|-----------|------------|-------------|
| 1 | `XP_CONFIG` constants + `computeUserXP()` utility | Low | None — pure functions |
| 2 | `useXP` hook with localStorage persistence | Medium | `XP_CONFIG`, `computeUserXP` |
| 3 | `<XPBar />` component | Low | `useXP` |
| 4 | XP floating number animation | Medium | Framer Motion |
| 5 | Wire `SolutionReveal.onSolved` → `awardXP` | Medium | `useXP`, hint tracking |
| 6 | Wire `RatingButtons.onRate` → `awardXP` | Low | `useXP` |
| 7 | Toast notification system | Medium | Shared toast manager |
| 8 | Level-up celebration modal | High | `canvas-confetti`, Framer Motion |
| 9 | `StatsOverview` enhancement | Low | `useXP` |
| 10 | Supabase schema + sync | Medium | Schema migration, RLS policies |

---

## Open Questions — Resolved

### 1. Hint Tracking Granularity — RESOLVED

**Decision:** Yes — thread hint count through to the XP award function, using **event sourcing** at medium granularity.

**Research basis:** Baker, Corbett, & Koedinger (2004) established that medium granularity (hint count, hint level, whether bottom-out was reached) is the evidence-backed sweet spot. Binary "used/didn't" loses the distinction between a student who took one contextual nudge vs one who clicked through to the answer. Millisecond-level tracking is overkill for our use case.

**Architecture:**

- Add an `InteractionTrackingContext` (Context + `useReducer`) at the `ProblemBlock` level
- `HintStep` dispatches `{ type: 'HINT_REVEALED', hintIndex, timestamp }` events
- `SolutionReveal` reads derived state: `{ hintsRevealed: number, totalHints: number, reachedBottomOut: boolean }`
- On "Mark as solved," pass `hintsRevealed` and `totalHints` to `awardProblemXP()`
- Raw interaction events are logged to an append-only `interaction_events` table (event sourcing) for future analysis

**Critical framing rule** (Roll et al. 2014, Karabenick 2003): Our XP system gives a **bonus** for hint-free solves, never a **penalty** for using hints. This is already correct in the spec. The UI should never display "Hints used: 3" — instead show "Solved independently" for hint-free solves. Research shows hint-count displays create avoidance in the 25-30% of students who need help most.

**Scope for Frontend Engineer:** Medium — requires threading state through `HintStep` → `SolutionReveal` → `onSolved` callback, plus a new `InteractionTrackingContext`. Estimated 2-3 hours of wiring.

### 2. Spaced Review Detection — RESOLVED

**Decision:** Fixed 24-hour threshold. `isSpacedReview = (status === 'solved') AND (hoursSinceLastSolve >= 24)`. Flat 1.5× multiplier (no scaling with gap length).

**Research basis:**
- Cepeda et al. (2008, n=1,354): optimal spacing gap for 1-week retention is 1-3 days. 24 hours is the validated floor.
- Ebbinghaus forgetting curve: 70-80% of material forgotten within 24 hours — the 24-hour mark is the sweet spot of desirable difficulty.
- Bjork & Bjork (1992) New Theory of Disuse: the lower the retrieval strength at successful retrieval, the greater the gain in storage strength. After 24+ hours, retrieval strength has meaningfully dropped for multi-step problems.
- Sleep consolidation boundary (Dehaene Pillar 4): sub-24-hour re-solves haven't crossed the critical biological threshold for memory consolidation.
- Platform consensus: Anki, FSRS, SuperMemo, and Duolingo all treat sub-day repetitions as "learning phase," not spaced review.

**Why NOT scale XP with gap length:** Longer gaps produce more learning per retrieval (Bjork), but scaling XP with gap length incentivizes *procrastination* ("wait longer for more XP"). The SM-2 algorithm already handles optimal scheduling — the XP multiplier rewards showing up on schedule, not gaming the timing.

**The 2-hour edge case:** A student who solves a problem, closes the app, and returns 2 hours later earns base XP for the re-solve but NOT the 1.5× spaced review multiplier. No sleep consolidation has occurred. The solution path is still in episodic memory. Duolingo's HLR model computes retrievability as ~1.0 at 2 hours. This is not genuine retrieval practice.

**Data model extension:** Add to `ProblemProgress`:

```typescript
export interface ProblemProgress {
  problemId: string;
  status: ProblemStatus;
  lastVisited?: string;      // existing
  lastSolvedAt?: string;     // NEW — ISO timestamp of most recent solve
  solveCount?: number;       // NEW — total times solved (enables re-solve tracking)
  firstSolvedAt?: string;    // NEW — ISO timestamp of first solve
}
```

**Detection function:**

```typescript
function isSpacedReview(progress: ProblemProgress): boolean {
  if (!progress.lastSolvedAt) return false;
  if (progress.status !== 'solved') return false;
  const hoursSinceLastSolve =
    (Date.now() - new Date(progress.lastSolvedAt).getTime()) / (1000 * 60 * 60);
  return hoursSinceLastSolve >= 24;
}
```

**Schema extension:**

```sql
alter table public.problem_progress
  add column if not exists last_solved_at timestamptz,
  add column if not exists solve_count integer not null default 0,
  add column if not exists first_solved_at timestamptz;
```

**Scope for Frontend Engineer:** Low — add 3 fields to `ProblemProgress`, update `setProblemStatus` in `ProgressProvider` to stamp `lastSolvedAt` and increment `solveCount` when status becomes 'solved', and pass `isSpacedReview()` result into `awardProblemXP()`. Estimated 1-2 hours.

### 3. Mixed Practice Mode — PENDING

**Proposal:** The Interleaving Bonus (1.25× multiplier) requires a "Mixed Practice" session mode that doesn't exist yet. This is a separate feature — flag for the Curriculum Lead to spec the problem selection algorithm.

**Status:** Awaiting review.

### 4. Level Title Localization — PENDING

**Options:** Finance titles (Intern → MD), academic titles (Student → Professor), or quant-specific (Trainee → Quant).

**Status:** Awaiting review.

### 5. XP Reset / Prestige System — RESOLVED

**Decision:** Deferred — not needed for v1. Revisit if users reach Level 25 at meaningful volume.

