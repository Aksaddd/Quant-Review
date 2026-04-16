# Gamification Design Research — Industry Practices & Visual Translation
> **Quant Review Platform** · Gamification & UX Designer · Research Synthesis · CONFIDENTIAL

---

## 1. Executive Summary & Design Philosophy

### The Core Thesis

Gamification in EdTech exists on a spectrum from **pointsification** (slapping badges on unchanged activities) to **genuine motivational design** (restructuring the experience so that learning itself becomes rewarding). The research is unambiguous: the former fails within weeks; the latter drives sustained retention measured in months and years.

The platforms that get gamification right — Duolingo, Brilliant, Khan Academy — share a common trait: **the game mechanics reinforce the learning mechanics.** XP is awarded for retrieval practice, not for clicking buttons. Progress gates require demonstrated competence, not time served. Celebrations are proportional to genuine struggle, not participation.

Quant Review occupies a unique position: a platform built on six books of learning science (spaced repetition, retrieval practice, interleaving, desirable difficulty, consolidation, intrinsic motivation). The gamification layer must **amplify** these principles, never contradict them. A streak mechanic that pressures students to cram at midnight directly undermines Dehaene's sleep consolidation research. An XP system that rewards browsing over problem-solving directly undermines Brown et al.'s retrieval practice evidence.

### The Design Test

Every gamification decision must pass three filters:

1. **Learning Alignment** — Does this mechanic reinforce spaced repetition, retrieval practice, interleaving, or desirable difficulty? If it's orthogonal to learning, it's decoration. If it contradicts learning, it's harmful.
2. **Intrinsic Motivation** — Does this make the student feel competent, autonomous, and connected? Or does it create dependency on extrinsic rewards that will decay?
3. **Ethical Integrity** — Does the student feel *better* after using this feature, or merely *relieved* that they avoided a loss? Engagement is not compulsion.

### What We're Building

A motivational layer grounded in McGonigal's four intrinsic rewards:

| Reward | Platform Expression | NOT This |
|--------|--------------------|----|
| **Satisfying Work** | XP for hard-problem solves, visible mastery progression | XP for opening chapters or viewing pages |
| **Hope of Success** | Fiero moments, "Fun Failure" reframing, difficulty-proportional celebration | Participation trophies, badges for trivial actions |
| **Social Connectivity** | Opt-in weekly leagues, study group features | Forced global leaderboards, anxiety-inducing rank displays |
| **Epic Meaning** | Percentile rank, collective milestones, "You're in the top 15%" | FOMO mechanics, time-limited exclusive content |

### Guiding Principles (Summary)

1. **The learning engine is the product. Gamification is the amplifier.** Never let game chrome distract from problem-solving.
2. **White Hat drives for the engine, Black Hat drives for the spark plug.** Meaning, accomplishment, and creativity sustain long-term motivation. Scarcity and loss aversion can re-engage — but never as the primary driver.
3. **Celebrate struggle, not completion.** A hard problem solved without hints deserves a full-screen fiero moment. An easy problem gets a checkmark. Flat rewards for all achievements devalue hard work.
4. **Separate effort metrics from mastery metrics.** XP measures engagement. SM-2 mastery levels measure learning. Never conflate them.
5. **Make it optional.** The gamification layer should enhance the experience for those who respond to it without trapping those who don't. Always offer a clean, distraction-free study mode.
6. **20% rule.** Gamification visuals should occupy no more than 20% of the interface. The remaining 80% is clean, professional, content-focused.
7. **Design for the quant candidate, not the casual gamer.** Our users are adults preparing for high-stakes interviews. The aesthetic must be professional and credible — never infantilizing.

---

## 2. Frameworks Foundation

Five frameworks inform every design decision. Each contributes a different lens; together they form a complete motivational architecture.

### 2.1 Octalysis Framework (Yu-kai Chou)

Eight core drives arranged on a spectrum from empowering ("White Hat") to compelling ("Black Hat"):

| # | Core Drive | Type | Platform Application | Risk If Overused |
|---|-----------|------|---------------------|------------------|
| 1 | **Epic Meaning & Calling** | White Hat | "You're in the top 15% of quant candidates" | Empty narrative without substance |
| 2 | **Development & Accomplishment** | White Hat | XP, leveling, mastery progression | Pointsification if tied to trivial actions |
| 3 | **Empowerment of Creativity & Feedback** | White Hat | Personal notes, technique atlas, custom study paths | Over-complexity for new users |
| 4 | **Ownership & Possession** | White Hat | Personal progress dashboard, custom flashcard decks | Hoarding behavior, sunk cost traps |
| 5 | **Social Influence & Relatedness** | Neutral | Weekly leagues, study groups, peer comparison | Social anxiety, destructive competition |
| 6 | **Scarcity & Impatience** | Black Hat | "Come back tomorrow" nudges, streak freezes as limited resource | Artificial urgency, FOMO |
| 7 | **Unpredictability & Curiosity** | Black Hat | Variable XP bonuses, surprise milestone rewards | Gambling-like conditioning |
| 8 | **Loss & Avoidance** | Black Hat | Streak maintenance, league demotion | Streak anxiety, compulsion over learning |

**Design rule:** Build the core experience on Drives 1-4 (White Hat). Use Drives 6-8 (Black Hat) sparingly as re-engagement nudges, never as the primary motivational engine. A system built entirely on loss aversion and scarcity generates engagement metrics but erodes trust and well-being.

### 2.2 Self-Determination Theory (Deci & Ryan)

Three innate psychological needs that underpin intrinsic motivation:

**Autonomy** — The learner feels volitional, not controlled.
- *Do:* Let students choose which chapters to study, which problem sets to tackle, how to customize their dashboard.
- *Don't:* Force linear progression, require daily minimums, gate content behind arbitrary XP thresholds.
- Even the *perception* of choice increases intrinsic motivation. Letting a student choose between two equivalent practice sessions is more motivating than assigning one.

**Competence** — The learner feels effective and growing.
- *Do:* Calibrate challenge to skill level. Provide immediate, informational feedback ("You correctly identified this as a Markov absorption problem").
- *Don't:* Provide controlling feedback ("You solved 5 problems, as you should"). Informational feedback supports competence; controlling feedback undermines autonomy.
- The SM-2 algorithm already does this for flashcards by surfacing cards at the edge of forgetting. Extending SM-2 to problems is a competence-building mechanic.

**Relatedness** — The learner feels connected to others.
- *Do:* Collaborative features, peer study groups, shared milestones, mentorship mechanics.
- *Don't:* Rely solely on competition. Cooperative mechanics often serve relatedness better than competitive ones.

**The Overjustification Effect** — The single most important finding for gamification designers. When expected extrinsic rewards are attached to intrinsically motivating activities, people attribute their motivation to the reward. When the reward disappears, motivation drops *below* the pre-reward baseline. Deci, Koestner, & Ryan's 1999 meta-analysis of 128 studies confirmed: tangible, expected, contingent rewards significantly undermine intrinsic motivation for interesting tasks.

*Implication:* Never reward activities students already find intrinsically motivating. Use rewards that are **unexpected** (variable) rather than **expected** (contingent), and **informational** ("You've mastered conditional probability") rather than **controlling** ("Complete 5 more to unlock the next badge").

### 2.3 Flow Theory (Csikszentmihalyi)

Flow is the state of complete absorption where challenge matches skill. It occurs in a narrow channel between boredom (skill exceeds challenge) and anxiety (challenge exceeds skill).

**Conditions for flow in Quant Review:**

| Condition | Implementation |
|-----------|---------------|
| Clear goals | "Solve this probability problem" — never ambiguous |
| Immediate feedback | Correct/incorrect + technique identification + hint availability |
| Challenge-skill balance | SM-2 surfaces problems at the edge of competence; difficulty tags guide self-selection |
| Sense of control | Student chooses when to reveal hints, when to see solutions, which topics to study |
| Concentration | Focus mode: no sidebar, no notifications, no gamification chrome during active problem-solving |

**Critical insight:** The best gamification is often invisible during the core activity. It structures the experience so flow emerges naturally. Excessive gamification chrome (animations, pop-ups, badge notifications) *breaks* flow by pulling attention from the task. All celebration must happen **between** problems or **after** sessions, never *during* active problem-solving.

### 2.4 Bartle's Player Types

| Type | Motivation | % of Users | Platform Mechanic |
|------|-----------|-----------|-------------------|
| **Achievers** | Points, levels, status markers | ~10% | XP system, leveling, badges, completion percentages |
| **Explorers** | Discovery, understanding systems | ~10% | Technique atlas, cross-chapter connections, hidden problem patterns |
| **Socializers** | Relationships, communication | ~50-80% | Study groups, shared milestones, peer encouragement |
| **Killers** | Dominance, competitive ranking | ~5-10% | Opt-in leaderboards, weekly leagues |

**Design implication:** Most gamification over-indexes on Achiever mechanics (points, badges, levels) because they're easiest to implement. But Socializers typically comprise the **largest** user segment. Quant Review should invest in community and peer mechanics alongside the achievement layer. Andrzej Marczewski's extended "Hexad" model adds Philanthropists (who want to help others) and Disruptors — both relevant for a study community.

### 2.5 McGonigal's Four Intrinsic Rewards

From *Reality Is Broken* — the primary source for our gamification architecture:

**1. Satisfying Work** — Clear, actionable tasks with visible results.
- Games provide a sense of productivity that real work often obscures behind ambiguity.
- Platform expression: Every problem attempted = visible XP gain. Every chapter = clear progress ring. Every session = quantified output ("You solved 4 problems and reviewed 12 flashcards").
- McGonigal calls this "blissful productivity" — the WoW effect of always having a clear next goal.

**2. Hope of Success (Fun Failure)** — Success always feels achievable; failure is temporary and instructive.
- M.I.N.D. Lab research: gamers feel the **strongest positive emotions at the moment of failure** — but only when failure feedback is spectacular, immediate, and shows what to try next.
- Platform expression: When a student gets a problem wrong, show closeness ("You got 3 of 4 steps right"), identify the correct technique, and reframe as progress ("You've now seen this pattern — it'll stick"). Never just "Wrong."
- Fiero — the neurochemical rush after triumphing over adversity — activates three reward structures simultaneously. Design for the emotional peak after struggle, not just completion.

**3. Social Connectivity** — Structured social interaction with clear roles and shared goals.
- Games reduce the friction of real-world socializing by providing rules of engagement.
- Platform expression: Weekly leagues (30-person cohorts), shared chapter milestones, future study group features.
- The leaderboard must be opt-in and segmented — never a forced global ranking.

**4. Epic Meaning** — Individual actions connected to grand narratives.
- Even small contributions feel significant when framed as part of a larger mission.
- Platform expression: "You've solved 127 of 200 problems. You're in the top 15% of candidates preparing for quant interviews." Connect daily practice to the arc of career preparation.
- Halo 3's collective kill counter worked because it connected individual action to group narrative. Quant Review's equivalent: "Together, our community has solved 1.2 million problems this month."

---

## 3. Industry Case Studies & Lessons Learned

### 3.1 Duolingo — The Gold Standard

50M+ daily active users. DAU/MAU ratio of 34.7%. Under Head of Growth Jorge Mazal, the company 4.5x'd DAU over four years through systematic, A/B-tested gamification iteration. Every mechanic below was validated with data.

**XP System:**
- Base lesson completion: 10-20 XP per lesson
- Testing out of a unit (demonstrated mastery): 50 XP — rewarding competence over grinding
- XP boosts tied to achievements: Bronze Chest = 1.5x, Silver = 2x, Gold = 3x
- **2024-2025 critical change:** Deliberately *reduced* per-lesson XP and capped streak multipliers. Reason: hyper-competitive users were burning through lessons to top leaderboards, which was counter-productive to actual learning. Recalibration encouraged sustainable study over frantic grinding.
- *Lesson for Quant Review:* XP must never incentivize speed over depth. Weight XP toward difficulty and quality (hint-free solves, spaced retrieval success), not volume.

**Streak Mechanics (with published data):**

| Metric | Impact |
|--------|--------|
| Users reaching 7-day streak | 3.6x more likely to remain engaged long-term |
| 7-day streak users | 2.4x more likely to return the next day |
| Separating streak from daily XP goal | +40% users on 7+ day streaks, +3.3% Day-14 retention |
| Streak Freeze feature | -21% churn among at-risk users |
| Weekend Amulet (Friday-purchased streak protection) | +4% weekly return rate, -5% streak loss |
| Streak wager (bet gems on maintaining 7-day streak) | +14% Day-14 retention |

The psychological engine is **loss aversion**. Duolingo's blog: once a streak reaches meaningful length, fear of losing it becomes stronger than desire to gain XP. But this is also the danger — see Anti-Patterns (Section 5).

**League System (30-Person Weekly Cohorts):**
- 10 divisions: Bronze through Diamond
- 30 randomly matched users per league (similar timezone/study habits)
- Weekly reset every Sunday evening
- Top ~10 promote, bottom ~5 demote
- **Impact:** +17% learning time, 3x highly engaged learners
- *Why it works:* Small cohort = realistic competition. Weekly reset = fresh starts. Tier matching = compete against peers, not power users. This avoids the "I can never catch the leaders" demotivation of global leaderboards.

**Heart → Energy System Evolution:**
- Original (2017): 5 hearts. Each wrong answer costs 1. Run out = can't progress. Perceived as punitive — students were penalized *specifically for mistakes*, which contradicts learning science.
- New (2025): Energy system. 25 units. Each question costs 1 regardless of correct/incorrect. Removed punishment-for-errors framing while preserving pacing function.
- *Lesson for Quant Review:* Never penalize errors. Errors are the learning event. XP for *attempting* hard problems (even incorrectly) reinforces the behavior of attempting hard things.

**Fiero Moment Design:**
- Lesson completion confetti bursts scale with achievement level — bigger milestones = more spectacular celebrations
- Phoenix-themed animations for streak milestones (7, 30, 100, 365 days). Multiple animation passes to experiment with rhythm/energy. Metrics confirmed enhanced animations increased streak maintenance.
- "5 in a Row" combo animation triggers dopamine release cycle
- All celebrations appear immediately after the triggering action — clear cause-and-effect association

### 3.2 Khan Academy — The Dual-Track Model

Philosophically different from Duolingo. Gamification exists explicitly in service of mastery-based learning, not engagement maximization. Deliberately avoids competitive mechanics that incentivize speed over understanding.

**Energy Points (Effort Track):**
- First-time correct answer: 75 points
- Mastery challenge correct answer: 50 points
- Already-practiced skill correct answer: **5 points** (deliberately low to discourage grinding mastered content)
- First video watch: 750 points + 100 completion bonus

The steep decay (75 → 5 for practiced skills) is intentional: it pushes toward new material, not farming easy content.

**Mastery Levels (Learning Track):**
- Five levels: Not Started → Attempted → Familiar → Proficient → Mastered
- Each requires **demonstrated competence**, not just completion
- Mastery Challenges periodically resurface old material (lightweight spaced repetition)
- Getting a challenge wrong can **regress** a skill level — knowledge must be maintained

**The Key Insight:** Points measure effort. Mastery measures learning. These are **separate, parallel systems.** Students cannot skip ahead by gaming the point system. This dual-track design avoids the failure mode where students optimize for points rather than learning.

**Badge Rarity Tiers:**
| Tier | Difficulty | Examples |
|------|-----------|----------|
| Meteorite | Common | First video, first exercise |
| Moon | Moderate | Completing skill sets |
| Earth | Challenging | Mastering multiple skills, long streaks |
| Sun | Rare | Sustained excellence |
| Black Hole | Extraordinary | Exceptional community contributions |

### 3.3 Brilliant.org — Less Is More

Occupies the closest niche to Quant Review: gamifying deep STEM problem-solving. Approach is "fewer mechanics, executed with precision."

- **Problem-first learning.** Users encounter challenges before receiving instruction. Progressive disclosure — next information only after grappling with the current piece — creates natural "aha moments" that function as intrinsic fiero.
- **Scaffolded difficulty curves** keep learners constantly at the edge of ability (flow channel).
- **No repeat XP.** Repeating a completed lesson earns nothing — XP is a genuine measure of new learning, not grinding.
- **30-person leagues** with STEM-themed names (Hydrogen through Einsteinium). Same structure as Duolingo — small cohort, weekly reset, promotion/demotion.
- **Variable rewards** — occasional bonus points and surprise content add unpredictability, which behavioral psychology identifies as more motivating than predictable rewards.
- *Lesson for Quant Review:* A platform focused on hard problem-solving should trust the content to carry intrinsic engagement. Gamification supports, never overwhelms.

### 3.4 Anki / SuperMemo — The Anti-Gamification Case

Deliberately utilitarian. The algorithm is the product. Minimal gamification by design.

**What Anki's community built anyway:**
- **Review Heatmap** (most popular motivational add-on): GitHub-style calendar showing daily review activity across an entire year. Color intensity = review volume. Shows current streak, longest streak, daily average.
- Uses the "Don't Break the Chain" (Seinfeld technique) — a continuous block of colored squares creates visual pressure to maintain consistency.

**What this tells us:** Even highly intrinsically motivated users (med students, language learners with clear external goals) benefit from visual progress tracking. The heatmap pattern is so effective that the *community* built it when the developers deliberately excluded it. Progress visualization is a universal motivator, not a crutch.

### 3.5 LeetCode & Chess.com — Competition-First Models

**LeetCode:**
- Elo/Glicko-style contest rating — genuine skill measurement
- Badges: Knight (top 25%), Guardian (top 5%, rating 1600+)
- Streak badges: 50, 100, 300+ days of accepted solutions
- Works because users have extremely clear external motivation (job interviews). The rating provides genuine signal about interview readiness.

**Chess.com:**
- **Separate skill from motivation.** Puzzle Rating (Glicko) = truth metric. Puzzle Points = engagement metric. Deliberately removed features that gave extra rating points — preventing inflation that would eventually cause disillusionment.
- *Lesson for Quant Review:* SM-2 mastery levels are our "truth metric." XP is our "engagement metric." They must remain separate systems. Never let XP inflate perceived mastery.

### 3.6 Cross-Platform Patterns

| Pattern | Evidence | Status for Quant Review |
|---------|----------|------------------------|
| Loss aversion > reward-seeking | Universal across all platforms | Use for streaks, but with ethical guardrails |
| Small cohort competition (30 users, weekly reset) | Duolingo +17% learning time, Brilliant mirrors it | Adopt directly |
| Separate effort from mastery metrics | Khan Academy, Chess.com | XP (effort) vs SM-2 levels (mastery) — already architected |
| Graceful failure recovery (streak freezes, repairs) | Duolingo -21% churn | Build streak freeze + 24-hour repair window |
| Celebration proportional to struggle | Duolingo, Brilliant | 3-tier fiero system mapped to difficulty |
| Novelty decay requires continuous iteration | Duolingo runs hundreds of A/B tests weekly | Plan for iterative refinement, not a one-time launch |

---

## 4. Visual Design System — How Gamification Translates Visually

### 4.1 XP & Progress Bar Design

**Progress Bar Form Factors:**

| Type | Best For | Spec |
|------|----------|------|
| **Linear** | Sequential progress ("12 of 37 problems solved") | Height: 4-8px ambient, 10-16px hero. Fully rounded ends. CSS `transition` on width, `ease-out`, 500-700ms. Color shifts from blue → green → gold at 100%. |
| **Circular / Ring** | At-a-glance summary (daily XP goal, chapter mastery) | SVG `strokeDasharray`/`strokeDashoffset`. Center shows the number. 32-48px for inline, 64-96px for hero widgets. |
| **Segmented** | Chapter progress with discrete units | One segment per problem/section. 2-3px gap between segments. Each fills independently. Creates a "collectible" feeling of completing discrete units. |

**Showing XP Gains — Three-Layer Feedback:**

XP feedback operates at three timescales, layered for maximum reinforcement without interruption:

1. **Immediate (0-300ms) — Floating Numbers.** "+25 XP" animates upward from the triggering element with `translateY(-40px)` and `opacity: 0` over 800ms. Bold weight, accent color, 14-18px. Bonus XP (hint-free, streak multiplier) uses larger size and gold color.

2. **Short-term (300ms-2s) — Toast Notification.** Compact toast slides in from top-right: "Problem Solved +25 XP" or "Streak Bonus +10 XP." Auto-dismiss after 3-5 seconds with fade-out. Queue via shared UI manager to prevent pile-up during rapid actions.

3. **Session-level — Animated Counter.** On dashboard/session summary, an animated counter rolls from previous XP total to new total. `ease-out` easing, 1-2 second duration. The odometer roll creates slot-machine satisfaction. Libraries: `react-countup`.

**Level-Up Screen:**

- Full-screen modal overlay with darkened backdrop (60-70% opacity black)
- Central badge/emblem animates in with scale-up (0.5 → 1.0) + slight bounce
- Particle burst (confetti or radial light rays) from center
- New level title in large bold type: "Level 5: Probability Master"
- XP bar showing the completed bar resetting for the next level
- "Continue" CTA — user dismisses intentionally (the pause reinforces the achievement)
- Animation sequence: 2-4 seconds, then waits for user dismissal

**Progress Dashboard Layout:**

- **Top row:** 3-4 stat cards (problems solved, cards mastered, due today, streak) with mini progress bars or rings inside each
- **Middle row:** Full-width "current level" XP bar showing progress toward next level — the most motivating element, visually dominant
- **Bottom rows:** Activity heatmap (calendar view) + recent activity feed
- Principle: most motivating number (streak, XP) is visually dominant; completion percentages provide context beneath

### 4.2 Celebration / Fiero Moment Animation Design

Fiero is the neurochemical rush after triumphing over adversity. Animation intensity must be **proportional to difficulty** — flat rewards for all achievements habituate within days and devalue hard work.

**Three-Tier Celebration System:**

**Tier 1 — Correct Answer (Easy problem, flashcard rated "Good"):**
- Subtle green checkmark animation: scale 0 → 1 with slight overshoot bounce
- Brief color flash on the card/container: green highlight fading over 400ms
- Optional: soft chime (100-200ms, major chord, no sharp attack)
- Total duration: ~400ms. No interruption to workflow.

**Tier 2 — Problem Solved (Medium difficulty, or solved with hints):**
- Checkmark + floating "+XP" number
- Small confetti burst: 15-25 particles, contained to the problem area (not full-screen)
- Progress bar advancement animation
- Total duration: ~1 second

**Tier 3 — Hard Problem Solved Without Hints (The true fiero moment):**
- Full-screen confetti explosion: 100+ particles, 2-3 second duration
- Screen flash: brief white overlay at 20% opacity, fading over 200ms
- Central achievement badge animation with scale-bounce
- XP gain displayed prominently with multiplier callout ("2x Bonus!")
- Optional: subtle screen shake (1-2px, 200ms) for visceral impact
- Total duration: 2-3 seconds for animation, then summary card

**React Implementation Options:**
| Library | Best For |
|---------|----------|
| `react-confetti-explosion` | Lightest option, CSS-only, no canvas overhead |
| `canvas-confetti` | Triggering from a specific screen position (burst from the solved problem) |
| `tsParticles` | Complex particle effects with full control |
| Framer Motion | Checkmark bounces, scale animations, layout transitions |
| Lottie (`lottie-react`) | Pre-designed After Effects animations for milestone moments |

**Timing Research:**
- Instant feedback (button press): 50-100ms
- Confirmation (correct answer): 200-500ms
- Achievement celebration (level-up, hard solve): 1-3 seconds animation, then user-dismissed summary
- **Critical rule:** Never block the next action for more than 3 seconds without a dismiss option
- Duolingo: showing celebration immediately while finishing background work reduced perceived latency by 60%+

**Sound Design Principles:**
- Avoid sharp attack sounds — use soft-onset chimes, bell tones, marimba timbres
- Vary sounds contextually (same instrument, different notes) to prevent repetition fatigue
- Correct answer = ascending major interval. Wrong answer = gentle descending tone (never a harsh buzzer). XP gain = coin/bell ding. Level-up = triumphant chord progression.
- **Always make sound optional** with a persistent mute toggle. Many users study in shared spaces.

**Haptic Feedback (Mobile/PWA):**
- Success: single short pulse
- Achievement/Level-up: double pulse pattern (short-long)
- Error: single soft buzz (noticeably different from success)
- Trigger only at meaningful moments — constant vibration causes haptic fatigue

**The "Juicy" Design Principle:**
Layered, multi-sensory feedback within the same 200-500ms window: visual (animation + color) + auditory (sound cue) + tactile (haptic pulse). The key is proportionality — small wins get subtle nods, major milestones deserve layered celebrations.

### 4.3 Streak Visual Design

**Streak Counter UI:**
- Active state: Flame icon in warm orange (#e8471d) with optional subtle pulse/glow animation
- Inactive/zero state: Gray icon, muted text — communicates potential, not loss
- Milestone states (7, 30, 100, 365 days): Flame visually evolves — larger, brighter, additional elements (rings, crowns). Duolingo uses phoenix imagery with increasingly powerful animations at high milestones.
- Display: Always visible on dashboard. Compact inline display in the navbar during study sessions.

**Calendar Heatmap (GitHub Contribution Graph Pattern):**
- Grid: 52 columns (weeks) x 7 rows (days), left-to-right time progression
- Color scale: 4-5 intensity levels from empty (gray/transparent) → light-to-dark brand color
- Current day highlighted or pulsing subtly
- Hover/tap on a day shows details: problems solved, cards reviewed, XP earned
- Encode study *intensity* per day (problems + flashcards) rather than binary active/inactive — richer feedback, avoids binary "did I do enough?" anxiety
- The unbroken chain visual where consecutive active days form a visible pattern is intrinsically motivating

**Streak Risk Messaging — Ethical Guidelines:**

| Do | Don't |
|----|-------|
| "Keep it going! Do one problem to keep your 14-day streak alive." | "You're about to LOSE your streak!" |
| "You have 1 streak freeze available" (show safety net prominently) | Urgent red warning language |
| After broken streak: "Your best was 23 days. Start a new one today." | Dramatic counter reset animation |
| Warm, encouraging tone throughout | Push notifications that create anxiety about streak loss |

**Ethical test:** "Does the product make money by selling solutions to anxiety that the product itself created?" If yes, the streak system is exploitative.

**Streak Freeze / Recovery:**
- Earn 1 freeze per 7-day streak, or purchase with earned (never paid) in-app currency
- Visual: Shield or ice-crystal icon overlaying the flame on freeze days. Calendar heatmap shows freeze days in distinct color (blue/silver), not blank.
- 24-hour repair window after a broken streak — reduces the emotional cliff
- Cap at 2-3 banked freezes to maintain the streak's meaning

### 4.4 Leaderboard & Badge Visuals

**Weekly Leaderboard (30-Person Cohort Model):**

Structure (proven by Duolingo — retention increased from 12% to 55% after launch):
- 10 tiers with distinct colors and icons (e.g., Bronze → Diamond, or quant-themed: Intern → Managing Director)
- 30 users per leaderboard, grouped by similar league tier
- Weekly reset (Sunday), timezone-aware
- Promotion zone (top ~7-10): green dividing line
- Safe zone (middle): no visual marker
- Demotion zone (bottom ~5-7): orange dividing line
- User's own row highlighted with distinct background color

**Avoiding Demotivation:**
- **Relative positioning:** Center the view on the user's row with 3-5 people above/below. Users compete with neighbors, not the untouchable leader.
- **Multiple views:** Daily, weekly, monthly. A user who is 25th all-time might be 3rd this week.
- **Personal best emphasis:** Show personal best rank, XP, or streak alongside the board. "You" marker visually distinct.
- **Opt-in participation.** Never force users into competitive display.

**Percentile Display (Epic Meaning):**
- Large number with "%" suffix: "Top 15%"
- Distribution curve graphic with user's position highlighted
- Weekly momentum: "You moved from top 22% to top 15% this week"
- More motivating than absolute rank for large user bases

**When to Show Social vs. Personal:**

| Context | Show |
|---------|------|
| During active study/problem-solving | Personal progress ONLY. No leaderboard, no social. Preserves flow. |
| Dashboard / home screen | Personal stats (prominent) + social context (secondary, scroll-to) |
| After completing a session | Session summary with personal stats first, then optional social: "This session put you 2 spots ahead" |
| Weekly | League results notification (not during-session) |

**Badge Grid Layout:**

- Responsive grid: 4-5 columns desktop, 3 tablet, 2 mobile
- Each cell: badge icon (48-64px centered), name (12-14px medium weight), rarity indicator (colored border), earned date or lock icon
- Grouped by category: Problem-solving, Consistency, Mastery, Social
- Each category has a mix of easy and hard badges for forward momentum

**Badge States:**

| State | Visual |
|-------|--------|
| **Unlocked** | Full color, full opacity, subtle shadow/glow. Hover shows earn date + description. Recently earned: "NEW" gold dot. |
| **Locked** | Grayscale silhouette at 30-40% opacity. Small lock icon (bottom-right, 16px). Name and criteria **still visible** — seeing what you're working toward is more motivating than "???". |
| **In-progress** | Locked appearance + mini progress bar beneath: "23/50 problems." Goal-gradient effect. |

**Rarity Tiers:**

| Tier | Color Treatment | Examples |
|------|----------------|----------|
| **Common** (Bronze) | Warm brown/copper border | "First Problem Solved," "7-Day Streak" |
| **Uncommon** (Silver) | Silver/cool gray border | "Chapter Complete," "30-Day Streak" |
| **Rare** (Gold) | Gold/amber border + subtle glow | "All Hard Problems in a Chapter," "100-Day Streak" |
| **Legendary** (Purple) | Purple gradient border, animated shimmer | "All Problems Solved Without Hints," "365-Day Streak" |

Visual differentiation through: border thickness (thicker = higher tier), background glow (none → radial glow), iconography complexity (simple flat → detailed illustrated).

**Achievement Notification:**
- Slide-in banner at top of screen (not a blocking modal)
- Badge icon + name + rarity tier + brief message ("You solved 10 hard problems!")
- Auto-dismiss after 5 seconds, tappable for full details
- Legendary badges: brief modal with particle effects (the only interrupting notification)

### 4.5 Focus Mode & Distraction-Free Design

The role spec demands: "no sidebar, no notification badges, zero peripheral distractions." Dehaene's invisible gorilla research shows even peripheral distractions measurably reduce learning. Csikszentmihalyi's flow requires concentration.

**Entering Focus Mode:**
- Single-tap activation (no multi-step flow)
- Gentle visual transition: fade/zoom that communicates "entering a different space"
- Psychological boundary between "dashboard space" and "study space"

**During Focus Mode:**
- **Chrome reduction:** Hide sidebar, top navigation, streak/XP counters, notification badges. Show ONLY: content, essential controls (hint button, solution reveal, problem navigation).
- **Ambient progress only:** Thin 2-3px progress bar at top or bottom of screen — visible in peripheral vision without demanding focal attention. No animation pulse, no number change animation, just a quiet redraw between problems.
- **Suppress ALL gamification:** No "+25 XP" toasts, no badge earned banners, no leaderboard updates during active study. Queue everything.
- **Optional ambient audio:** Lo-fi, nature sounds, white noise — never default, always opt-in.
- Timer option: Pomodoro-style 25-minute countdown (Oakley recommends brain breaks proportional to study duration).

**Exiting Focus Mode — The Session Summary:**
- Reverse the entry transition
- **All queued celebrations play here** — concentrated reward moment:
  - Time studied
  - Problems attempted / solved
  - XP earned during session
  - Any badges or milestones reached
  - Fiero moments replayed in summary if a hard problem was solved
- This is the "payday" — the accumulated feedback that was suppressed during study

**Showing Progress Without Breaking Flow:**
- Color-only state changes: background of current problem card shifts very subtly (few degrees warmer) as progress advances — unconscious sense of advancement
- Completion checkmarks on problem list: small, non-animated, visible only if user deliberately looks
- The progress ring updates silently — no animation during active solving

### 4.6 Color Psychology & Gamification Palette

**The 20% Rule:** Gamification visuals occupy max 20% of the interface. The remaining 80% is clean, professional, content-focused. During study, the student sees mostly neutral tones. Color floods in during reward moments, making them special by contrast.

**Gamification Color Map:**

| Color | Hex | Role |
|-------|-----|------|
| **Blue** | #1865f2 | Primary brand, progress, learning — trust and calm |
| **Green** | #1fab54 | Success, completion, mastery — positive reinforcement |
| **Orange/Amber** | #f5a623 | Streaks, urgency, warmth — energy without alarm |
| **Red** | #d92916 | Errors, hearts/lives, streak danger — used sparingly |
| **Purple** | #9059ff | Rare achievements, premium — aspiration |
| **Gold** | #FFB800 | XP gains, level-ups, celebration — reward |

**Integration Guidelines:**
- Contain gamification in designated zones (dashboard header, sidebar widget, floating panel) — never scattered across content areas
- Consistent illustration style across all gamification elements (flat, geometric)
- Same typeface as the rest of the app for gamification text — just bolder weight + accent color. No separate "game font."
- Progressive disclosure: gamification depth (badges, leaderboard, level details) only when navigated to. Study experience stays clean.

**Accessibility:**
- Never use color alone to communicate state — pair with icons, text labels, patterns
- WCAG 2.1 AA contrast ratios (4.5:1 minimum) for all gamification text
- `prefers-reduced-motion` media query for all celebration animations — users with vestibular disorders get instant state changes (checkmark appears, no confetti, no screen shake)
- All progress bars: `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- All badges and achievements: meaningful ARIA labels

**Dark Mode Adaptations:**
- Surface: dark gray (#1a1a2e), not pure black — softer contrast with colored elements
- Reduce accent color saturation by 10-20% — full-saturation on dark backgrounds is eye-straining
- Confetti/particles actually look *better* in dark mode (bright on dark = more dramatic)
- Badges get subtle outer glow to pop against dark surfaces
- Progress bar tracks: lighter dark-gray (#2a2a3e) to maintain visual channel

---

## 5. Anti-Patterns & Ethical Guidelines — What NOT to Do

### 5.1 The Six Deadly Sins of EdTech Gamification

**1. Pointsification** — XP for low-effort actions (opening a chapter, viewing a page) that devalues the system. A student earning 50 XP for clicking "next page" learns nothing different from clicking without XP — but the XP creates an illusion of progress.
- *Our rule:* XP is awarded exclusively for cognitive effort — problem attempts, hint-free solves, spaced retrieval success, generation before revelation. Never for passive consumption.

**2. The Overjustification Effect** — Expected extrinsic rewards destroying intrinsic motivation. Deci, Koestner, & Ryan (1999): tangible, expected, contingent rewards significantly undermine intrinsic motivation for interesting tasks. A student who once studied probability because they found it fascinating now studies only for XP — and when XP loses novelty, they stop entirely.
- *Our rule:* Use informational feedback ("You've mastered conditional probability") over controlling rewards ("Complete 5 more to unlock"). Make bonus rewards unexpected/variable, not contingent.

**3. Chocolate-Covered Broccoli** — Superficial game decoration on unchanged learning content. Students see through it immediately. The mismatch between "this is supposed to be fun" and "this is not fun" creates *worse* engagement than no gamification at all.
- *Our rule:* Game mechanics must reinforce learning mechanics (LM-GM model). XP for retrieval practice reinforces learning. XP for page views does not.

**4. Streak Anxiety** — When streaks shift from motivator to obligation. Research (Journal of Consumer Research): "Users often view extending their streak as more important than engaging in the underlying activity." Users log in to protect a number, not to learn.
- *Our rule:* Streaks are encouragement-only. Warm language. Streak freezes as safety nets. 24-hour repair window. Never punish breaks. Never sell streak protection for real money.

**5. Leaderboard Harm** — Anxiety, cheating, and disengagement for non-top performers. Toda et al.: badges, leaderboards, competitions, and points are the game elements *most often reported as causing negative effects* in educational contexts.
- *Our rule:* Opt-in only. 30-person weekly cohorts, not global. Relative positioning (show neighbors, not rank 1). Multiple dimensions. Team-based options.

**6. Seductive Details** — Entertaining but irrelevant game elements that increase extraneous cognitive load and divert attention from learning content. Animations and celebrations during active problem-solving compete for the same attentional resources needed for learning.
- *Our rule:* All gamification chrome is suppressed during active study (Focus Mode). Celebrations happen between problems or at session end. Never interrupt cognitive processing.

### 5.2 Dark Patterns We Will Not Use

| Dark Pattern | What It Is | Why We Reject It |
|-------------|-----------|-----------------|
| **Loss aversion manipulation** | Threatening removal of progress/status to compel usage | Creates compulsion, not learning |
| **Artificial scarcity / FOMO** | Time-limited events, exclusive rewards that create urgency | Conflicts with spacing/consolidation science |
| **Playing by appointment** | Requiring login at specific times | Learning readiness varies; forced timing is pedagogically wrong |
| **Sunk cost exploitation** | Making users feel they "can't quit now" due to accumulated progress | Retention should come from value, not guilt |
| **Variable ratio reinforcement (gambling)** | Slot-machine-like random rewards | Powerful for retention, toxic for learning |
| **Punishing errors** | Removing XP, status, or progress for wrong answers | Errors are the learning event (Dehaene's Pillar 3). Punishing them creates avoidance. |

### 5.3 The Engagement vs. Compulsion Test

For every gamification feature, ask: **Does the student feel *better* after using this feature, or merely *relieved* they avoided a loss?**

- Engagement = voluntary, autonomous participation driven by interest and growth
- Compulsion = anxiety-driven participation motivated by fear of loss

If a feature produces high session counts but low satisfaction, it has failed. We measure success by learning outcomes and qualitative satisfaction, not vanity metrics.

### 5.4 Designing for Novelty Decay

Points and badges that feel exciting in week 1 feel routine by week 8 and feel like noise by week 20. Long-term learners need:

- **Deepening challenge, not more rewards.** As competence grows, reveal new layers of challenge rather than inflating reward quantities.
- **Intrinsic motivation scaffolding.** Early-stage learners may need extrinsic scaffolding (XP, progress bars) that gradually fades as mastery and genuine interest develop. The goal is *graduation* from the reward system, not permanent dependency.
- **Meaningful milestones over frequent rewards.** "Chapter 4: Level 3 Probabilist" after demonstrating mastery is more durable than 500 micro-rewards for individual actions.
- **Narrative and identity.** "You've demonstrated mastery of 4 of 7 core competency areas" creates durable motivation that points cannot.

---

## 6. Quant Review Design Principles — Platform-Specific Application

### 6.1 How Research Maps to Our Codebase

The existing codebase already has foundational elements that gamification builds on:

| Existing Component | Gamification Extension |
|-------------------|----------------------|
| `useStreak.ts` — Day streak (localStorage) | Enhance with heatmap, streak freeze, milestone celebrations |
| `StatsOverview.tsx` — 4-stat widget | Add XP bar, level display, daily XP goal ring |
| `ProgressRing` in `ChapterList.tsx` | Upgrade with mastery color coding tied to SM-2 state |
| `RatingButtons.tsx` — SM-2 grade buttons | Trigger fiero animations on "Good"/"Easy" after hard problems |
| `ProblemBlock.tsx` — Problem + solution reveal | Add XP award on solve, difficulty-proportional celebration |
| `sm2.ts` — SM-2 algorithm | This is the mastery truth metric. XP (effort) must remain separate. |
| `ProgressProvider.tsx` — Progress state | Extend with XP state, level state, badge unlock tracking |
| `ReaderProgressPanel.tsx` — Floating progress widget | Becomes the sole visible element during Focus Mode |

### 6.2 Our User — The Quant Candidate

The audience shapes every visual and tonal decision:

- **Demographics:** Young adult and adult learners (22-35 primarily). Graduate-educated or in graduate programs. Preparing for quantitative finance interviews at banks, hedge funds, prop trading firms.
- **Motivation profile:** Extremely high external motivation (career advancement). Moderate-to-high intrinsic interest in mathematics and problem-solving. Time-pressured.
- **Implication:** Gamification must feel **professional and credible**, not infantilizing. This audience will disengage from cartoon mascots and "gold stars for adults." The visual language should be closer to Bloomberg Terminal meets Brilliant.org than Duolingo meets Candy Crush.
- **Bartle type distribution (likely):** Heavy Achiever/Explorer. This is a performance-driven audience that wants to see quantified progress and understand the system. Socializer features are secondary but valuable for community building.

### 6.3 The Learning-Gamification Alignment Matrix

Every gamification mechanic must map to a learning science principle. If it doesn't, it doesn't ship.

| Learning Principle (from Synthesis) | Gamification Mechanic | How It Reinforces |
|-------------------------------------|----------------------|-------------------|
| **Retrieval practice** (Dehaene Pillar 3, Brown Ch.2) | XP for problem attempts + bonus for hint-free solves | Rewards the act of retrieval, not passive review |
| **Spaced repetition** (SM-2) | XP multiplier for solving on spaced review schedule | Incentivizes returning to resurface problems, not just forward progress |
| **Interleaving** (215% better delayed test scores) | XP bonus for Mixed Practice mode | Rewards cross-chapter practice, the hardest and most effective study type |
| **Desirable difficulty** (Dehaene Pillar 3, Brown Ch.4) | Fiero celebrations proportional to difficulty | Hard problems = bigger rewards = reinforces choosing challenge |
| **Generation before revelation** (Dehaene, Brown) | XP awarded for submitting approach before viewing solution | Rewards the struggle itself, not just the outcome |
| **Sleep consolidation** (Dehaene, Oakley) | "Come back tomorrow" nudges, session length limits | Gamification must never pressure studying at the expense of rest |
| **Error as learning** (Dehaene Pillar 3 — error feedback) | "Fun Failure" reframing, XP for attempts regardless of outcome | Errors are celebrated as progress, never punished |
| **Cognitive load management** (Oakley, Dehaene Pillar 1) | Focus Mode suppresses all game chrome during study | Gamification elements are seductive details if shown during problem-solving |
| **Unexpected rewards strengthen learning** (Oakley Ch.7) | Variable XP bonuses, surprise milestone rewards | Dopamine from unexpected rewards strengthens neural links being formed |

### 6.4 Gamification Intensity Settings

Three levels, user-selectable:

| Setting | What's Visible | Who It's For |
|---------|---------------|-------------|
| **Minimal** | Checkmarks only. No XP display, no streak, no leaderboard. SM-2 mastery levels shown as simple progress. | Learners who find gamification distracting. Pure study mode. |
| **Standard** (default) | XP gains, progress bars, streak counter, Tier 1-2 celebrations, session summaries. No leaderboard. | Most users. Motivational scaffolding without social pressure. |
| **Full** | Everything: leaderboards, badges, Tier 3 celebrations, percentile rank, community milestones. | Competitive/social learners who thrive on external benchmarks. |

Learning progress (SM-2 state, mastery levels, retrieval success rates) is **always** tracked regardless of gamification setting. Engagement features are a display layer, never a learning dependency.

---

## 7. Component Visual Spec Summary — Figma-Ready Reference

### 7.1 XP System Components

| Component | States | Animation | Trigger |
|-----------|--------|-----------|---------|
| **XP Floating Number** | "+10 XP" / "+25 XP" / "+50 XP (2x Bonus!)" | `translateY(-40px)`, `opacity: 0` over 800ms | Problem solved, flashcard rated, spaced review completed |
| **XP Toast** | Standard / Bonus / Streak Bonus | Slide-in from top-right, auto-dismiss 3-5s | Queued after floating number, 300ms delay |
| **XP Bar (Level Progress)** | Empty → Filling → Full → Level Up | `width` transition, `ease-out`, 500-700ms. Color: blue → green → gold | Dashboard, session summary |
| **Level-Up Modal** | Badge scale-bounce (0.5→1.0), confetti burst, bar reset | 2-4s animation, user-dismissed | XP crosses level threshold |
| **Session XP Counter** | Previous → New (animated roll-up) | `react-countup`, `ease-out`, 1-2s | Session summary screen |

### 7.2 Fiero / Celebration Components

| Component | Tier | Visual Spec | Duration |
|-----------|------|-------------|----------|
| **Checkmark** | 1 (Easy) | Green, scale 0→1 with overshoot bounce. Green flash on container (400ms fade). | 400ms |
| **Small Confetti** | 2 (Medium) | 15-25 particles, contained to problem area. Checkmark + floating XP. | ~1s |
| **Full Fiero** | 3 (Hard, no hints) | 100+ particles full-screen. White flash overlay (20% opacity, 200ms). Badge scale-bounce. Screen shake (1-2px, 200ms). XP multiplier callout. | 2-3s + dismiss |
| **Fun Failure Card** | On wrong answer | Closeness indicator ("3 of 4 steps right"). Technique identification. Reframe message. Warm orange accent, not red. | User-dismissed |

### 7.3 Streak Components

| Component | States | Visual Spec |
|-----------|--------|-------------|
| **Streak Counter (Navbar)** | Active (1-6 days) / Milestone (7, 30, 100, 365) / Inactive (0) / Frozen | Flame icon: orange #e8471d active, gray inactive. Pulse animation at milestones. Shield overlay when frozen. |
| **Streak Calendar Heatmap** | Empty / Light / Medium / Dark / Today | 52x7 grid. 4-5 color intensity levels. Frozen days in blue/silver. Today: subtle pulse. Hover shows day detail. |
| **Streak Freeze Badge** | Available (1-3) / Used / None | Shield icon with count. Visual depletion as freezes are used. |
| **Streak Milestone Celebration** | 7 / 30 / 100 / 365 | Increasing intensity: 7-day = small animation, 365-day = full-screen phoenix with unique art. |

### 7.4 Leaderboard Components

| Component | States | Visual Spec |
|-----------|--------|-------------|
| **League Tier Badge** | 10 tiers (Bronze → Diamond) | Distinct icon + color per tier. Current tier highlighted. |
| **Weekly Leaderboard** | Promotion zone / Safe / Demotion zone | 30 rows. User's row highlighted. Green line above promotion cutoff. Orange line above demotion zone. Relative view (centered on user). |
| **Percentile Display** | Top X% | Large number + "%" suffix. Distribution curve with user marker. Weekly momentum indicator. |
| **League Result Toast** | Promoted / Maintained / Demoted | Sunday notification. Green (up), neutral (same), warm orange (down, encouraging tone). |

### 7.5 Badge Components

| Component | States | Visual Spec |
|-----------|--------|-------------|
| **Badge Cell** | Locked / In-progress / Unlocked / New | Grid: 4-5 col desktop, 3 tablet, 2 mobile. 48-64px icon. Locked: grayscale 30-40% + lock icon. In-progress: locked + mini progress bar "23/50". Unlocked: full color + shadow. New: gold "NEW" dot. |
| **Badge Detail Modal** | Earned / Not earned | Full badge art, name, description, criteria, earn date. Rarity border color. |
| **Badge Notification** | Common / Uncommon / Rare / Legendary | Slide-in banner (Common-Rare). Modal with particles (Legendary only). 5s auto-dismiss. |
| **Rarity Border** | Bronze / Silver / Gold / Purple | Border thickness increases with rarity. Gold and Purple get subtle glow. Purple gets animated shimmer. |

### 7.6 Focus Mode Components

| Component | States | Visual Spec |
|-----------|--------|-------------|
| **Focus Mode Toggle** | Off / Entering / Active / Exiting | Single button. Transition: gentle fade/zoom (300ms). Sidebar, navbar, all chrome disappears. |
| **Ambient Progress Bar** | 0-100% | 2-3px bar, top or bottom of screen. No animation, quiet redraw. |
| **Session Timer** | Running / Paused / Break | Optional Pomodoro: 25min countdown. Gentle pulse at 5min remaining. Break prompt at 0. |
| **Session Summary** | Post-session | Modal: time studied, problems attempted/solved, XP earned, badges, queued celebrations. |

---

## Sources & References

### Frameworks
- Yu-kai Chou, *Actionable Gamification: Beyond Points, Badges, and Leaderboards* (2015)
- Edward Deci & Richard Ryan, Self-Determination Theory research program (1985-present)
- Mihaly Csikszentmihalyi, *Flow: The Psychology of Optimal Experience* (1990)
- Richard Bartle, "Hearts, Clubs, Diamonds, Spades: Players Who Suit MUDs" (1996)
- Jane McGonigal, *Reality Is Broken: Why Games Make Us Better* (2011)

### Research
- Deci, Koestner, & Ryan, "Extrinsic Rewards and Intrinsic Motivation in Education" (2001, meta-analysis of 128 studies)
- Sailer & Homner, "The Gamification of Learning: A Meta-analysis" (2020, Educational Psychology Review)
- Zeng et al., British Journal of Educational Technology meta-analysis (2024, g = 0.504)
- Toda et al., "The Dark Side of Gamification" — systematic mapping of negative effects
- Lepper, Greene, & Nisbett, overjustification effect (1973)
- Hull (1932), Kivetz/Urminsky/Zheng (2006) — goal gradient effect
- Nunes & Dreze (2006) — endowed progress effect
- Garcia & Tor (2009) — the N-effect (leaderboard motivation near the top)
- Howard-Jones & Demetriou (2009) — uncertain rewards in educational games

### Platform Data
- Duolingo Q3 2025 earnings, blog posts on streak optimization, league system, energy system
- Khan Academy help documentation on energy points, mastery system
- Brilliant.org XP and league documentation
- Chess.com puzzle points and tier system documentation
- Codecademy Skill XP system (2024)
- LeetCode contest rating system documentation

### Learning Science (Platform Source Books)
- Stanislas Dehaene, *How We Learn* — Four Pillars of Learning
- Peter Brown, Henry Roediger, Mark McDaniel, *Make It Stick* — Retrieval practice, spaced repetition
- Joshua Foer, *Moonwalking with Einstein* — Memory techniques, deliberate practice
- Tiago Forte, *Building a Second Brain* — Progressive summarization, CODE method
- Barbara Oakley, Beth Rogowsky, Terry Sejnowski, *Uncommon Sense Teaching* — Cognitive load, unexpected rewards, growth mindset
