# Design Spec: Focus Mode & Session-Length Nudges
> **Quant Review Platform** · Gamification & UX Designer · Spec 03 · For Review

---

## Overview

The current platform has no concept of "study mode" vs "browse mode." Sidebar navigation, flashcard badges, streak counters, and the progress panel are always visible. Every one of these elements competes for the ~4 working memory slots available during problem-solving (Cowan 2001; Oakley Ch. 1; Dehaene Pillar 1).

This spec designs two tightly coupled systems:

1. **Focus Mode** — A distraction-free study environment that strips all gamification chrome, navigation, and notifications. Content and essential controls only.
2. **Session-Length Nudges** — Science-backed prompts for micro-breaks, longer breaks, and "come back tomorrow" signals that align gamification incentives with learning science.

**The core tension this spec resolves:** The gamification layer (Specs 01-02) adds visual elements that motivate engagement. The learning science demands that those elements disappear during active study. Focus Mode is the bridge — gamification motivates the student to *start* studying; Focus Mode ensures the study itself is undistracted; the session summary delivers the gamification "payday" when study ends.

---

## Part A: Focus Mode — Chrome Reduction & Distraction-Free Design

### The Science

**Dehaene's invisible gorilla principle** (Ch. 7, *How We Learn*): Focused attention requires active suppression of peripheral information. Every UI element outside the primary task competes for suppression resources. "Carefully getting rid of any source of distraction: overly illustrated textbooks and excessively decorated classrooms only distract children from their primary task."

**Ward et al. (2017, *JACR*)**: "Brain Drain" — the mere visible presence of distractors reduces available cognitive capacity, even when successfully ignored. The process of suppression itself consumes the same resource pool used for learning.

**Sweller's Cognitive Load Theory**: Working memory holds ~4 items. Intrinsic load (the problem itself) is irreducible. Extraneous load (sidebar links, badge counts, streak flames) is reducible and must be minimized. Germane load (actual schema construction) is what we want to maximize.

**Eye-tracking research** (2025, *Applied Intelligence*): Animations in peripheral vision are the strongest involuntary attention magnets. Any moving element outside the primary task area draws saccades and breaks concentration.

### What Gets Hidden

| Element | Normal Mode | Focus Mode | Why |
|---------|-------------|------------|-----|
| **Sidebar** (264px, full chapter tree) | Visible | **Hidden** | 30+ interactive elements competing for saccades |
| **Top navbar / AppTopBar** | Visible | **Hidden** | Navigation links, logo — not needed during study |
| **MobileNav** (bottom) | Visible | **Hidden** | Same rationale |
| **Streak counter** | Visible on dashboard | **Hidden** | Gamification chrome — seductive detail during study |
| **XP display** | Visible after Spec 01 | **Hidden** | Gamification chrome |
| **Flashcard due badge** | Visible in sidebar | **Hidden** | Creates urgency/FOMO unrelated to current task |
| **ReaderProgressPanel** (floating) | Visible | **Collapsed to ambient bar** | Replaced by thin 2-3px progress bar at bottom |
| **Celebration toasts** | Appear on XP gain | **Suppressed, queued** | Seductive details during active problem-solving |
| **Badge notifications** | Appear on earn | **Suppressed, queued** | Same |
| **Leaderboard position** | Visible (when built) | **Hidden** | Social comparison breaks flow |

### What Stays Visible

| Element | Why It Stays |
|---------|-------------|
| **Problem content** (setup, hints, solution reveal) | The learning task itself |
| **Hint button** | Essential study control — instrumental help-seeking |
| **"Mark as solved" / Solution reveal** | Essential study control |
| **Problem navigation** (prev/next within chapter) | Minimal navigation for continuity |
| **Text controls** (font size, theme) | Accessibility — must always be reachable |
| **Focus Mode exit button** | Must be able to leave. Small, top-right, unobtrusive. |
| **Session timer** (if enabled) | Optional, ambient. Shows elapsed time or countdown. |
| **Ambient progress bar** | Thin 2-3px bar at bottom of viewport — peripheral, no numbers |

### Visual Design

**Entry transition:**
- Single-tap activation: "Focus" button in the reader toolbar (or keyboard shortcut: `F` key)
- Sidebar slides out left (300ms ease-out). Navbar fades up (200ms). MobileNav fades down (200ms).
- Content area expands to fill the viewport
- Background shifts very slightly darker (2-3% opacity overlay) to create psychological "enclosure"
- The transition communicates: "You are entering a different space"

**During Focus Mode:**
- Content is centered, max-width 720px (reading-optimal line length per typography research)
- Generous whitespace above and below problems
- No color accents except within problem content itself
- The ambient progress bar at the bottom: 2-3px height, fills left-to-right as problems are completed. No labels, no percentage text, no animation pulse. Updates silently between problems. Visible in peripheral vision without demanding focal attention.
- Background: clean, single-tone surface. No gradients, patterns, or decorative elements.

**Exit transition:**
- Click exit button (top-right) or press `Escape`
- Reverse the entry transition: sidebar slides in, navbar fades down
- **Immediately show the Session Summary** (see Part C) — all queued celebrations play here

**Keyboard shortcuts (Focus Mode active):**
| Key | Action |
|-----|--------|
| `Escape` | Exit Focus Mode → show Session Summary |
| `H` | Reveal next hint |
| `S` | Toggle solution reveal |
| `→` or `J` | Next problem |
| `←` or `K` | Previous problem |
| `M` | Mark as solved |

### Accessibility

- `prefers-reduced-motion`: entry/exit transitions are instant (no slide/fade). Content area simply appears full-width.
- Screen reader: `aria-live="polite"` announcement on enter: "Focus mode activated. Sidebar and navigation hidden. Press Escape to exit." On exit: "Focus mode ended. Session summary available."
- All keyboard shortcuts have visible tooltip on `?` keypress (help overlay)
- Focus Mode does not trap keyboard focus — Tab still cycles through visible controls normally

---

## Part B: Session Timer & Break Nudges

### The Science of Session Length

The evidence converges on a range, not a single number:

| Duration | What Happens | Source |
|----------|-------------|--------|
| **15-20 min** | Vigilance decrement begins for simple monitoring tasks | Warm, Parasuraman, & Matthews 2008 |
| **25-45 min** | Peak encoding efficiency window for complex problem-solving. Beyond this, encoding rate drops substantially. | Murre & Dros 2015; Oakley "age+1" heuristic; Pattyn et al. 2008 |
| **60-90 min** | Ultradian rhythm upper bound. Elite performers (Ericsson) cap deliberate practice at 60-90 min sessions. | Kleitman BRAC; Ericsson deliberate practice research |
| **2-3 hours** | Daily maximum for effective deliberate practice. Beyond this, returns are negligible. | Ericsson: elite performers max ~4 hours/day total |

**Task-type variation:**

| Task | Optimal Focus Duration | Rationale |
|------|----------------------|-----------|
| **Problem-solving** (hard, novel problems) | 25-45 min | High cognitive demand → overload mechanism dominates |
| **Chapter reading** (prose + embedded problems) | 45-60 min | Varied content maintains engagement longer |
| **Flashcard review** | 15-25 min | Familiar cards → underload/boredom mechanism; challenging cards → standard decrement |

### Timer Design

**Default: No mandatory timer.** The timer is optional and user-selected. Forcing rigid session lengths contradicts autonomy (SDT). The platform provides gentle nudges, not hard stops.

**Timer Options on Focus Mode Entry:**

```
┌─────────────────────────────────────────────┐
│  Focus Mode                                 │
│                                             │
│  How long would you like to study?          │
│                                             │
│  [ 25 min ]  [ 45 min ]  [ No timer ]      │
│     ◆            ○            ○             │
│                                             │
│  ○ Show timer   ○ Hide timer (ambient only) │
│                                             │
│  [ Start Studying ]                         │
└─────────────────────────────────────────────┘
```

| Option | Default | Behavior |
|--------|---------|----------|
| **25 min** | Selected by default | Pomodoro-aligned. Best for problem-solving. |
| **45 min** | Available | For reading/mixed study. Within the evidence-supported range. |
| **No timer** | Available | Session ends when the student exits. Nudges still appear at 25, 45, and 90 min marks. |
| **Show timer** | Default | Small, ambient countdown in bottom-left. Updates every minute, not every second (reducing distraction). |
| **Hide timer** | Available | No visible countdown. Timer fires nudges silently. Reduces clock-watching anxiety. |

### Break Nudge System

Nudges are **gentle, dismissible, non-blocking**. They appear as a slim banner at the top of the content area, not as a modal. The student can dismiss with one click and continue studying. Never a hard stop.

**Nudge Schedule:**

| Trigger | Nudge Type | Message | Visual |
|---------|-----------|---------|--------|
| **Timer expires** (25 or 45 min) | Primary break nudge | "Good session. Your brain consolidates best with a break." | Amber banner with break icon. Buttons: [ Take a break ] [ 5 more min ] |
| **25 min continuous** (no timer set) | Micro-break suggestion | "Quick pause? Even 30 seconds helps your brain consolidate." | Subtle blue text, inline, below current problem. Dismisses on next action. |
| **45 min continuous** | Break recommendation | "You've been focused for 45 minutes. A 5-10 minute break will boost what you retain." | Amber banner. Buttons: [ Take a break ] [ Keep going ] |
| **90 min continuous** | Strong recommendation | "90 minutes of deep focus — impressive. Research shows diminishing returns past this point. Your brain needs rest to lock in what you've learned." | Amber banner, slightly more prominent. Buttons: [ End session ] [ 10 more min ] |
| **Mid-problem at timer expiry** | Modified nudge | "Your timer is up, but you're mid-problem. Finish this one, then take your break." | Blue text, non-blocking. Respects the Zeigarnik return tendency. |

**Nudge design principles:**
1. **Never block content.** Nudges are banners, not modals. The student can read through them.
2. **Always offer "keep going."** Autonomy matters. The nudge informs; the student decides.
3. **Escalate gently.** 25 min = subtle suggestion. 45 min = recommendation. 90 min = strong recommendation. Never an ultimatum.
4. **Frame breaks as learning strategy, not interruption.** "Your brain consolidates during breaks" not "Time's up!"
5. **Respect mid-problem flow.** If the student is actively working a problem, delay the nudge until the next natural break point (problem solved, solution revealed, or next problem opened).

### Micro-Break Prompts

The NIH waking replay study (Buch et al. 2021) found that during 10-second rest breaks, the brain replays just-practiced material at 20x speed — producing consolidation 4x greater than overnight sleep. Oakley confirms: "Even seconds-long rest breaks during a learning experience have been shown to trigger memory-related activity."

**Between-problem micro-break (optional, user-enabled):**

After solving a problem (before navigating to the next), show a brief breathing prompt:

```
┌──────────────────────────────────────┐
│                                      │
│        ○  Take a breath  ○           │
│                                      │
│    Your brain is replaying what      │
│    you just solved.                  │
│                                      │
│         [ Next problem → ]           │
│                                      │
└──────────────────────────────────────┘
```

- Duration: Visible for 5-10 seconds, then auto-advances to next problem (or user clicks immediately)
- Visual: Gentle pulsing circle (breathing rhythm, ~4s cycle)
- Frequency: Not after every problem — every 3rd or 4th problem to prevent fatigue
- **Off by default.** Enabled in settings: "Show micro-break prompts between problems"
- Respects `prefers-reduced-motion`: no animation, just the text + button

### Time-of-Day Awareness

Dehaene's research shows material studied before sleep consolidates more strongly. The platform can surface contextual tips:

| Time Window | Message | Trigger |
|-------------|---------|---------|
| **After 8 PM** | "Studying before bed? Your brain will replay these problems tonight." | Once per evening session, on Focus Mode entry |
| **Before 7 AM** | "Early session? Your brain is fresh from overnight consolidation." | Once per morning session |
| **Weekend afternoon** | No special message | Default behavior |

These are single-line tips, shown once, dismissed by scrolling. Never repeated within the same session.

---

## Part C: "Come Back Tomorrow" & Session Summary

### The Science of Stopping

**The spacing effect** (Ebbinghaus 1885, Murphy/Bjork/Bjork 2023): Same total study time distributed across multiple sessions produces dramatically better long-term retention than the same time concentrated into one session. Dehaene: "Every night, our brain consolidates what it has learned during the day."

**Born's insight experiment**: After learning a complex algorithm with a hidden shortcut, sleep *doubled* the number of participants who discovered it. Sleep deprivation eliminated the eureka effect entirely. Sleep is not rest — it is an active learning algorithm.

**Wilson & McNaughton (1994)**: During sleep, hippocampal cells replay the day's learning at 20x speed. A single event can be replayed hundreds of times in one night.

**Ericsson's deliberate practice ceiling**: Elite performers across domains max out at ~4 hours of deliberate practice per day. Beyond this, additional practice produces negligible gains and risks burnout.

### "Come Back Tomorrow" Triggers

| Condition | Message | Visual |
|-----------|---------|--------|
| **All due flashcards reviewed** | "All caught up on reviews. Sleep on it — your brain will keep learning overnight. Come back tomorrow for fresh cards." | Green completion state. Calm, satisfied tone. |
| **2+ hours studied today** | "You've put in serious work today. The research is clear: your brain needs sleep to consolidate what you've practiced. Tomorrow you'll be sharper." | Amber nudge on dashboard. Not during Focus Mode. |
| **Student attempts to start 3rd Focus Mode session** | "This is your third session today. Diminishing returns set in around this point. Consider saving the rest for tomorrow — your brain will thank you." | Gentle modal on Focus Mode entry. Buttons: [ Study anyway ] [ Done for today ] |
| **Evening study + all goals met** | "You're studying before bed — perfect timing. Your brain will replay today's problems tonight. See you tomorrow." | Blue text on session summary. |
| **Streak maintained + goals complete** | "Streak extended. Problems practiced. Cards reviewed. Optimal day of study — the science says rest now." | Dashboard state when all daily targets are met. |

**Design principles:**
1. **Frame stopping as strategy, not limitation.** "Your brain needs rest to consolidate" not "You've reached your limit."
2. **Never hard-block.** Always offer [ Study anyway ]. Autonomy is non-negotiable (SDT).
3. **Never create anxiety about overdue cards.** Overdue flashcards display neutrally: "3 cards from yesterday" not "3 OVERDUE cards!" A student who stopped when fatigued and returned today did exactly what the science recommends.
4. **Connect stopping to the learning science.** Every "come back tomorrow" message explains *why* stopping helps — hippocampal replay, sleep consolidation, spacing effect. The student should feel smart for stopping, not guilty.

### Session Summary — The "Payday"

When the student exits Focus Mode (or the session naturally ends), all suppressed gamification events are delivered in a concentrated summary. This is the emotional payoff for sustained focus.

**Layout:**

```
┌──────────────────────────────────────────────────────────┐
│                    Session Complete                       │
│                                                          │
│  ⏱  42 minutes focused                                  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Problems                        Flashcards        │  │
│  │  ████ 6 attempted                ████ 14 reviewed  │  │
│  │  ███  4 solved                   ██   8 "Good"     │  │
│  │  █    1 hard, no hints ⭐        █    2 "Easy"     │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  XP Earned This Session                            │  │
│  │                                                    │  │
│  │  Problems:    +245 XP                              │  │
│  │  Flashcards:  +86 XP                               │  │
│  │  Streak:      +14 XP                               │  │
│  │  Bonuses:     +65 XP                               │  │
│  │  ─────────────────────                             │  │
│  │  Total:       +410 XP    ← animated counter roll   │  │
│  │                                                    │  │
│  │  ████████████████████████░░░░░░░░░  Level 12 → 13  │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  🏆 Achievements unlocked:                               │
│  • "Hint-Free Streak" — 3 hard problems solved clean     │
│  • "Comeback Kid" — Solved a previously failed problem   │
│                                                          │
│  💡 "Your brain will now consolidate what you practiced.  │
│     The hard problems will feel easier next time."        │
│                                                          │
│  [ Back to Dashboard ]                                   │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Component Breakdown:**

| Section | Content | Animation |
|---------|---------|-----------|
| **Duration** | Clock icon + total focused minutes | Counter rolls up from 0 |
| **Activity summary** | Problems attempted/solved, flashcards reviewed, grades breakdown | Bars animate in left-to-right, 300ms each, staggered |
| **XP breakdown** | Itemized: problems, flashcards, streak, bonuses. Total with counter animation. | Counter rolls up for total. Individual lines appear sequentially (200ms stagger). |
| **Level progress** | XP bar showing progress. If level-up occurred, the **Tier 3 fiero celebration** from Spec 02 plays HERE. | Bar fills with transition. Gold flash on level-up. |
| **Achievements** | Any badges earned during the session (suppressed during Focus Mode). | Badges slide in from right, 300ms each. |
| **Reframe message** | Contextual learning science message. Rotates from a pool. | Fade in, 500ms delay after rest of summary. |
| **CTA** | "Back to Dashboard" button. | Fade in after all animations complete. |

**If a Tier 3 fiero event was suppressed during the session:**
The level-up / hard-problem celebration plays as part of the session summary, with full confetti and the emblem animation. The session summary IS the celebration venue. This concentrated delivery after a full study session creates a stronger emotional peak than interrupting mid-study.

**If no achievements / low activity:**
Don't show an empty summary. If the student only reviewed 2 flashcards and spent 5 minutes, show a minimal summary: duration + XP earned + "Every session counts." No empty badge sections, no empty achievement lists.

### Integration Points

| Component | File | Change |
|-----------|------|--------|
| **AppShell.tsx** | `src/components/layout/AppShell.tsx` | Add Focus Mode state. Conditionally render Sidebar/Navbar/MobileNav. |
| **New: FocusModeProvider** | `src/components/providers/FocusModeProvider.tsx` | Context: `{ isActive, sessionStart, sessionDuration, questsQueued, enter(), exit() }` |
| **New: FocusModeEntry** | `src/components/focus/FocusModeEntry.tsx` | Timer selection dialog. |
| **New: FocusModeBar** | `src/components/focus/FocusModeBar.tsx` | Thin top bar during Focus: exit button + optional timer + session elapsed. |
| **New: AmbientProgressBar** | `src/components/focus/AmbientProgressBar.tsx` | 2-3px bottom bar replacing ReaderProgressPanel. |
| **New: BreakNudge** | `src/components/focus/BreakNudge.tsx` | Dismissible banner for break suggestions. |
| **New: SessionSummary** | `src/components/focus/SessionSummary.tsx` | Full session summary modal with animations. |
| **New: useSessionTimer** | `src/hooks/useSessionTimer.ts` | Timer logic, nudge scheduling, elapsed time tracking. |
| **ReaderProgressPanel.tsx** | `src/components/reader/ReaderProgressPanel.tsx` | Hide when Focus Mode active (controlled by FocusModeProvider). |

### New Hook: `useSessionTimer`

```typescript
interface UseSessionTimerReturn {
  elapsed: number;              // seconds since session start
  remaining: number | null;     // seconds until timer expires (null if no timer)
  isRunning: boolean;
  nudgeState: 'none' | 'micro' | 'break' | 'strong' | 'stop';
  dismissNudge: () => void;
  start: (durationMinutes: number | null) => void;
  pause: () => void;
  resume: () => void;
  end: () => void;
}
```

### Implementation Priority

| Priority | Component | Complexity |
|----------|-----------|------------|
| 1 | `FocusModeProvider` context | Medium — state management, event queuing |
| 2 | `AppShell` conditional rendering (hide sidebar/nav) | Low — conditional `display: none` or unmount |
| 3 | `AmbientProgressBar` | Low — thin styled div with width transition |
| 4 | `FocusModeBar` (top bar with exit + timer) | Low — minimal UI |
| 5 | `useSessionTimer` hook | Medium — timer logic, nudge scheduling |
| 6 | `BreakNudge` component | Low — dismissible banner |
| 7 | `FocusModeEntry` dialog (timer selection) | Low — 3 buttons + checkbox |
| 8 | `SessionSummary` modal | High — animated XP breakdown, achievement replay, level-up integration |
| 9 | Keyboard shortcut system | Medium — global listener, help overlay |
| 10 | Micro-break prompts | Low — optional, between-problem text |
| 11 | Time-of-day tips | Low — date check + one-line message |
| 12 | "Come back tomorrow" dashboard state | Medium — daily study tracking, neutral overdue display |

---

## Sources

### Attention & Cognitive Load
- Warm, Parasuraman, & Matthews (2008) — "Vigilance Requires Hard Mental Work and Is Stressful," *Human Factors*
- Pattyn, Neyt, Henderickx, & Soetens (2008) — Vigilance decrement psychophysiology, *Physiology and Behavior*
- Sweller — Cognitive Load Theory (intrinsic, extraneous, germane load)
- Cowan (2001) — Working memory capacity ~4 items
- Ward, Duke, Gneezy, & Bos (2017) — "Brain Drain," *JACR*
- Simons & Chabris (1999) — Invisible gorilla / inattentional blindness
- 2025 *Applied Intelligence* — Visual design interventions for reducing mind-wandering

### Breaks & Consolidation
- Buch et al. (2021) — NIH waking replay study: 20x speed replay during 10-second breaks, *Cell Reports*
- Oakley, *Uncommon Sense Teaching* Ch. 3 — Micro-breaks, "Hip and Neo" consolidation model
- Kaplan & Kaplan — Attention Restoration Theory
- Sio & Ormerod (2009) — Incubation effect meta-analysis, *Psychological Bulletin*
- Frontiers in Psychology (2025) — Micro-breaks in classroom settings

### Session Length
- Murre & Dros (2015) — Encoding efficiency meta-analysis
- Ericsson — Deliberate practice: 60-90 min sessions, 4 hours/day ceiling
- Kleitman — Basic Rest-Activity Cycle (90-min ultradian rhythm)
- DeskTime/Draugiem Group — Most productive workers: 52 min focus, 17 min break

### Sleep & Consolidation
- Dehaene, *How We Learn* Ch. 10 — Sleep consolidation, 20x hippocampal replay
- Born — Insight doubled after sleep; eliminated by sleep deprivation
- Wilson & McNaughton (1994) — Hippocampal replay during sleep
- Murphy, Bjork, & Bjork (2023) — "Going beyond the spacing effect," *QJEP*

### Platform Patterns
- McGonigal, *Reality Is Broken* — "Blissful productivity," clear next goals
- Zeigarnik (1927) — Unfinished tasks remembered better (the return tendency)
- Forest app, Anki, Duolingo — Session completion patterns
