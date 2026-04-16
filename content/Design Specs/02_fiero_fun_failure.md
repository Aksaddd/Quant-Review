# Design Spec: Fiero Moments & Fun Failure System
> **Quant Review Platform** · Gamification & UX Designer · Spec 02 · For Review

---

## Overview

The current platform treats success and failure almost identically — a green border for solved, nothing for failed. This spec designs two complementary systems:

1. **Fiero Moments** — difficulty-proportional celebration that makes triumph after struggle feel visceral
2. **Fun Failure** — error reframing that makes wrong answers feel like discovery, not punishment

These are two halves of a single emotional design system. Research shows the hedonic contrast between them explains 68% of gamification effectiveness (2020 Sage study). You need both highs and lows for either to feel meaningful.

**The neuroscience mandate:** Effort directly amplifies reward experience (PNAS Nexus 2024). A student who struggled for 20 minutes on a hard problem and solves it without hints experiences a neurochemically stronger reward than a student who breezed through an easy problem. Flat celebrations waste this biological signal. The platform must match the celebration to the struggle.

---

## Part A: Fiero Moment System — Celebration Design

### The Science

**Fiero** activates three structures in the mesocorticolimbic reward circuit simultaneously:
- **VTA (Ventral Tegmental Area):** Dopamine neurons fire in response to prediction error — the gap between expected difficulty and actual success. Harder problem = larger prediction error = stronger burst.
- **Nucleus Accumbens:** Integrates reward signal with motivational salience. A 2024 study showed that augmenting reward after overcoming stress promotes resilience — fiero literally recalibrates the brain's cost-benefit analysis of future effort.
- **Prefrontal Cortex:** Integrates the reward with executive function, allowing the learner to attribute the positive feeling to the *specific strategy* that produced it.

**Key timing constraint:** Dopamine response follows hyperbolic discounting — a reward delayed by even a few seconds is neurologically "worth less." Celebrations must begin within **50-300ms** of the triggering action. Show the animation immediately; finish background work (XP persistence, state updates) in parallel.

**Key intensity constraint:** PNAS Nexus (2024) confirmed that cognitive effort directly amplifies hedonic reward. Rats and humans who exerted more effort experienced subsequent rewards as *physically more intense*. This validates the three-tier system — flat rewards waste the amplification effect.

### Three-Tier Celebration System

#### Tier 1 — Correct / Easy Solve / Flashcard "Good"

The baseline positive signal. Frequent, subtle, never interrupting.

| Element | Spec |
|---------|------|
| **Trigger** | Easy problem solved (any hints); flashcard rated "Good" or "Easy" |
| **Visual** | Green checkmark scales in (0→1) with slight overshoot bounce. Brief green highlight on the card container, fading over 400ms. |
| **Sound** | Soft ascending major interval (C→E), 150ms, soft onset. Optional — respects mute toggle. |
| **Haptic** | Single short pulse (mobile/PWA) |
| **Duration** | 400ms total. Zero workflow interruption. |
| **XP Display** | Floating "+8 XP" in blue, standard size (14px) |
| **Framer Motion** | `initial={{ scale: 0 }} animate={{ scale: [0, 1.15, 1] }} transition={{ duration: 0.4 }}` |

#### Tier 2 — Medium Solve / Solve With Hints

Noticeable reward for genuine effort. Contained to the problem area.

| Element | Spec |
|---------|------|
| **Trigger** | Medium problem solved (with or without hints); Hard problem solved with hints |
| **Visual** | Checkmark bounce + floating "+XP" number + small confetti burst (15-25 particles, contained to problem area, not full-screen). Progress bar advancement animation. |
| **Sound** | Ascending major triad (C→E→G), 300ms, soft onset |
| **Haptic** | Double pulse (short-short) |
| **Duration** | ~1 second total |
| **XP Display** | Floating "+25 XP" in blue, standard size |
| **Libraries** | `react-confetti-explosion` (CSS-only, lightest) or `canvas-confetti` (position-aware) |

#### Tier 3 — Hard Problem Solved Without Hints (True Fiero)

The full emotional peak. Reserved for genuine triumph over adversity. This is the moment McGonigal describes — the moment that activates three reward structures simultaneously.

| Element | Spec |
|---------|------|
| **Trigger** | Hard problem solved with 0 hints revealed; OR a previously-failed problem solved on retry (Comeback) |
| **Visual** | Full-screen confetti explosion (100+ particles, 2-3s). Screen flash (white overlay at 20% opacity, 200ms fade). Central achievement emblem with scale-bounce (0.5→1.0). Subtle screen shake (1-2px, 200ms). XP multiplier callout ("2× Bonus!"). |
| **Sound** | Triumphant chord progression (C→E→G→C octave), 1.5s, crescendo. Optional — respects mute. |
| **Haptic** | Success pattern (short-long-short) |
| **Duration** | 2-3 seconds animation. Then summary card waits for user dismissal. |
| **XP Display** | Floating "+100 XP" in gold (#FFB800), large size (18px bold), with multiplier badge |
| **Dismiss** | "Continue" button or backdrop click. The pause reinforces the achievement — never auto-dismiss. |
| **Libraries** | `canvas-confetti` (burst from solved problem position), Framer Motion (scale/shake), Lottie (optional pre-designed emblem animation) |

### Celebration Variability (Preventing Fatigue)

Research on the overjustification effect (Deci et al. 1999, 128 studies) and novelty decay (Koivisto & Hamari 2014) demands that celebrations remain *variable*, not predictable.

| Strategy | Implementation |
|----------|---------------|
| **Rotating animations** | Maintain 3-4 confetti color palettes and particle patterns. Randomly select on each Tier 3 event. |
| **Surprise milestone callouts** | At unexpected thresholds (10th hard problem, 50th hint-free solve), overlay a unique badge that doesn't appear in the badge grid. Fully unexpected per Oakley Ch. 7 — dopamine strengthens neural links for ~30 minutes after unexpected reward. |
| **Progressive emblem evolution** | The Tier 3 central emblem subtly evolves over time (simple star → detailed crest → animated sigil). The student notices the change without being told. |
| **Variable bonus XP** | Occasionally award +5-15 XP above the standard formula. Not on every solve — randomized at ~20% frequency. |

### Anticipatory vs. Consummatory Design

Per Berridge's "wanting" vs. "liking" research:

- **Signal difficulty in advance** (fuels anticipatory dopamine — the "wanting" drive that increases effort allocation): Hard problems are already labeled with difficulty badges. The XP spec shows the range ("Hard: up to 100 XP"). This activates appetitive motivation.
- **Keep celebration specifics unpredictable** (maintains prediction error at the consummatory phase — the "liking" pleasure): The student knows a hard hint-free solve earns big XP, but doesn't know exactly which animation, which confetti color, or whether a surprise bonus will appear. This preserves the dopamine prediction error that makes the moment feel fresh.

### Focus Mode Behavior

All celebrations are **suppressed** during Focus Mode. Queued and played back in the session summary. Rationale:
- Flow state requires uninterrupted concentration (Csikszentmihalyi)
- Celebrations are "seductive details" that increase extraneous cognitive load during problem-solving
- The session summary becomes a concentrated "payday" — neurologically sound because temporal spacing between reward events prevents habituation

---

## Part B: Fun Failure System — Error Reframing

### The Science

**McGonigal's M.I.N.D. Lab finding** (Ravaja et al., Helsinki School of Economics, 2005-2007): In biometric-monitored Super Monkey Ball 2 sessions, players exhibited the *most potent combination of positive emotions* at the moment of failure. Three conditions made failure rewarding:
1. **Spectacular feedback** — failure was visually entertaining, not bland
2. **Agency demonstration** — players could see their own power, even in failure
3. **Implied near-success** — the failure animation showed how close they were

**Kapur's Productive Failure** (ETH Zurich, meta-analysis d=0.36-0.58): Failure before instruction outperforms instruction before practice for conceptual understanding and transfer. The Four A's: Activation (failure recruits prior knowledge), Awareness (reveals gaps), Affect (struggle enhances encoding), Assembly (instruction reorganizes failed attempts).

**The near-miss effect** (Clark et al. 2009, *Neuron*): Near-misses activate reward-related brain circuitry (ventral striatum) in ways standard losses do not. Framing matters enormously — "3 of 4 steps right" activates approach motivation; "1 wrong" activates avoidance.

**Dehaene's Pillar 3 — Error Feedback:** "Organisms only learn when events violate their expectations." Error signals must be *directional* (telling the system HOW to adjust, not just THAT it was wrong). Telling a student "Wrong" provides almost zero learning signal. Telling a student where their approach diverged from the correct path provides maximum signal.

**The elaborated feedback meta-analysis** (Wisniewski, Zierer, Hattie 2020):
| Feedback Type | Effect Size (d) |
|--------------|----------------|
| Elaborated Feedback (explains why + correct reasoning) | **0.49** |
| Knowledge of Correct Response (shows answer, no reasoning) | 0.32 |
| Knowledge of Results ("right" or "wrong") | 0.05 |

### Design Principles

1. **Never punish errors.** No XP loss. No red screens. No harsh sounds. Errors earn 5 XP ("attempted") because the exposure has learning value. Dehaene: punishing errors creates avoidance and learned helplessness. Duolingo learned this the hard way — replaced their heart system.

2. **Frame failure as proximity to success.** "You got 3 of 4 steps right" not "You got 1 wrong." The near-miss effect recruits reward circuitry.

3. **Use process praise, not ability praise** (Dweck, Mueller & Dweck 1998). "Your approach of breaking this into cases was correct — the error was in case 3" not "This is a hard problem."

4. **The word "yet" is transformative.** "You haven't mastered conditional probability *yet*." Temporal framing implies future success.

5. **Show what was right before what was wrong.** Dehaene's research shows stressed/anxious learners learn better from success feedback. Lead with what they got right.

6. **Make failure interesting, not bland.** The M.I.N.D. Lab finding: spectacular failure feedback produces positive emotions. Show what happened — where the approach diverged — in an engaging way.

7. **Use warm amber, not alarm red.** Red triggers threat responses (amygdala activation, math anxiety). Warm amber (#f5a623) signals "pay attention" without signaling "danger." Reserve true red for system errors only.

### Fun Failure Feedback Card

When a student views the solution without solving (or rates a flashcard "Blackout"/"Again"), the platform shows a **Fun Failure Card** instead of just the bare solution.

**Layout:**

```
┌──────────────────────────────────────────────────────────┐
│  ┌───┐                                                   │
│  │ → │  Almost there.                                    │
│  └───┘                                                   │
│                                                          │
│  ✓ You correctly identified this as a [technique].       │
│  ✓ Your approach through [step description] was right.   │
│                                                          │
│  → The key insight: [specific concept/step that was      │
│    missing or incorrect, explained in 1-2 sentences]     │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │  "You've now seen this pattern — it'll stick."     │  │
│  │                                    +5 XP Attempted  │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  [ Try Again ]                    [ See Full Solution ]  │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Component States:**

| Element | Spec |
|---------|------|
| **Header icon** | Arrow icon (→) in amber (#f5a623), not a red X. Conveys "forward direction" not "wrong." |
| **Header text** | Rotates between: "Almost there." / "Good attempt." / "You're closer than you think." / "Not quite — here's what happened." |
| **What was right** (✓ items) | Green checkmarks. Identifies correct technique recognition, correct setup steps, partial progress. 1-2 items. Process praise per Dweck. |
| **The key insight** (→ item) | Amber accent. The specific concept, formula, or step that was missing. Elaborated feedback — the WHY, not just the WHAT. This is the maximum-signal directional error per Dehaene. |
| **Reframe message** | Rotates between growth-mindset messages: "You've now seen this pattern — it'll stick." / "This is exactly how mastery builds." / "Every expert got this wrong the first time." |
| **XP display** | "+5 XP Attempted" — visible proof that the attempt had value |
| **Try Again** | Primary action. Returns to the problem with hints available. Preserves generation effect. |
| **See Full Solution** | Secondary action. Shows the complete solution with elaborated explanation. |
| **Background** | Warm amber tint (#fef9e7), NOT red. Amber border (#fdd8a0). Matches existing hint card styling. |
| **Animation** | Gentle slide-up entry (300ms). No shake, no dramatic error animation. Calm, coach-like. |

### Fun Failure for Flashcards

When a flashcard is rated "Blackout" (0) or "Again" (1):

| Element | Spec |
|---------|------|
| **Visual** | Card border briefly pulses warm amber (not red). Gentle "flip back" animation showing the front again with the answer overlaid. |
| **Message** | Below the rating buttons: "This one's building. You'll see it again soon." (for Blackout) or "Getting closer. The next review will be easier." (for Again) |
| **No punishment** | SM-2 resets the interval (this is the algorithm, not a penalty). XP is still awarded (2 XP for Blackout, 3 XP for Again). The card simply resurfaces sooner — framed as "more practice" not "you failed." |
| **Technique tag** | If the flashcard is problem-type, show the keyTechnique tag: "This uses: Conditional Expectation." Connects the failure to the knowledge gap. |

### Comeback Flow — Turning Failure Into Fiero

The highest-value emotional arc: fail → retry → succeed. This is where the hedonic contrast effect is strongest — the memory of failure makes the subsequent success feel neurochemically more rewarding.

| Stage | What Happens | Emotional Design |
|-------|-------------|-----------------|
| **Fail** | Student views solution without solving. Fun Failure Card appears. +5 XP. | Warm, coach-like. "Almost there." Shows proximity. |
| **Time passes** | Problem status = "attempted." The problem appears in review. | The gap creates genuine forgetting — re-solving will require real retrieval. |
| **Retry** | Student opens the problem again. A subtle "Comeback" badge appears: "You've seen this before. Solve it this time." | Anticipatory dopamine. The student knows a bonus awaits. |
| **Succeed** | Student solves it. **Tier 3 fiero triggers** even for medium problems (because the comeback arc elevates the emotional stakes). +15 XP Comeback Bonus on top of standard XP. | Full celebration. The contrast with the original failure amplifies the reward. |

This flow directly implements:
- Kapur's Productive Failure (fail → instruction → succeed)
- The Comeback Bonus from the XP spec (+15 XP)
- McGonigal's Fun Failure ("the right kind of failure feedback is a reward")
- Bjork's storage strength theory (the retrieval after failure strengthens memory more than if they'd succeeded the first time)

---

## Part C: Integration Points & Implementation

### Tier Determination Logic

```typescript
type CelebrationTier = 1 | 2 | 3;

interface CelebrationEvent {
  tier: CelebrationTier;
  xpAwarded: number;
  isComeback: boolean;
  difficulty: Difficulty;
  hintsUsed: number;
  totalHints: number;
  isSpacedReview: boolean;
}

function determineTier(
  difficulty: Difficulty,
  hintsUsed: number,
  totalHints: number,
  previousStatus: ProblemStatus,
): CelebrationTier {
  const hintFree = hintsUsed === 0 && totalHints > 0;
  const isComeback = previousStatus === 'attempted';

  // Tier 3: Hard hint-free OR comeback solve
  if ((difficulty === 'hard' && hintFree) || isComeback) return 3;

  // Tier 2: Medium solve (any hints) OR hard with hints
  if (difficulty === 'medium' || difficulty === 'hard') return 2;

  // Tier 1: Easy solve, any condition
  return 1;
}
```

### Fun Failure Content Generation

The Fun Failure Card requires structured content that the current `Problem` type partially supports:

```typescript
interface FunFailureContent {
  // What the student got right (derived from problem metadata)
  correctElements: string[];     // e.g. ["Identified this as a Markov chain problem",
                                 //        "Set up the transition matrix correctly"]

  // The key insight they missed (from problem.keyTechnique + solution analysis)
  keyInsight: string;            // e.g. "The absorbing state probability requires
                                 //        solving the fundamental matrix N = (I-Q)^(-1)"

  // Growth-mindset reframe (rotated from a pool)
  reframeMessage: string;

  // The technique tag
  technique: string;             // from problem.keyTechnique
}
```

**Content sourcing for v1:** The `Problem.keyTechnique` field already exists and provides the technique tag. The `correctElements` and `keyInsight` require either:
- **Option A (v1):** Hand-authored per problem by the Quant Content Author — most accurate, highest effort
- **Option B (v1-lite):** Auto-generated from difficulty + keyTechnique: "You engaged with a {difficulty} {keyTechnique} problem." Generic but functional.
- **Option C (v2):** LLM-generated from the problem setup, solution, and student's interaction pattern. Most personalized, requires AI/ML Engineer involvement.

**Recommendation:** Start with Option B for launch (auto-generated from existing metadata). Flag Option A as a content authoring task for high-value problems (Hard difficulty). Plan Option C as a v2 enhancement.

### Reframe Message Pool

```typescript
const REFRAME_MESSAGES: string[] = [
  "You've now seen this pattern — it'll stick.",
  "This is exactly how mastery builds.",
  "Every quant got this wrong the first time.",
  "Your brain just formed a new connection. It'll be stronger next time.",
  "Struggle is the learning. You just did the hard part.",
  "This problem is now in your mental library. You'll recognize it next time.",
  "The fact that this was hard means it's worth learning.",
  "You've activated the right neural pathways. Sleep will consolidate them.",
];

// Select pseudorandomly based on problem ID to ensure consistency on revisit
function getReframeMessage(problemId: string): string {
  const hash = problemId.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return REFRAME_MESSAGES[hash % REFRAME_MESSAGES.length];
}
```

### Codebase Integration Map

| Component | Current Behavior | New Behavior |
|-----------|-----------------|--------------|
| `SolutionReveal.tsx` — "Mark as solved" | Sets status to 'solved'. Green border appears. | Calls `determineTier()` → triggers appropriate celebration. Awards XP. Plays Tier 1/2/3 animation. |
| `SolutionReveal.tsx` — "Show solution" (without solving) | Reveals solution. Sets status to 'attempted'. | Shows **Fun Failure Card** above the solution. Awards 5 XP. Logs interaction event. |
| `RatingButtons.tsx` — rating "Good"/"Easy" | Calls `reviewCard()`. No visual feedback. | Triggers Tier 1 celebration (checkmark bounce + floating XP). |
| `RatingButtons.tsx` — rating "Blackout"/"Again" | Calls `reviewCard()`. No visual feedback. | Shows gentle amber pulse on card. Displays encouragement message below buttons. Awards 2-3 XP. |
| `RatingButtons.tsx` — rating "Hard" | Calls `reviewCard()`. No visual feedback. | Triggers Tier 1 celebration (checkmark only, no confetti — "Hard" recall is success but borderline). |
| `ProblemBlock.tsx` — problem with status 'attempted' | Shows "In progress" badge. | Shows "In progress" badge + subtle "Comeback" indicator: "You've seen this before." |
| `FlashcardCard.tsx` — card flip | Flips front→back. No context. | If card was previously rated Blackout/Again, show subtle "Try again" badge on the front. |

### New Components Required

| Component | Purpose | Complexity |
|-----------|---------|------------|
| `<CelebrationOverlay />` | Renders Tier 1/2/3 celebration animations. Receives `CelebrationEvent`. | High — animation library integration |
| `<FunFailureCard />` | Renders the failure reframing card above solutions. Receives `FunFailureContent`. | Medium — structured layout + rotating messages |
| `<FloatingXP />` | Renders the "+N XP" floating number animation. Receives amount + color. | Low — single Framer Motion component |
| `<ComebackBadge />` | Small badge on problems with status 'attempted'. "You've seen this before." | Low — static component with condition |
| `<FlashcardEncouragement />` | Message below rating buttons for Blackout/Again ratings. | Low — conditional text display |

### Accessibility

| Requirement | Implementation |
|-------------|---------------|
| `prefers-reduced-motion` | All animations → instant state changes. Checkmark appears without bounce. No confetti, no shake, no screen flash. XP number appears statically. |
| Screen readers | `aria-live="polite"` region for celebration announcements: "Problem solved. 100 XP earned. Level 12 Finalist." Fun Failure card: "Problem attempted. 5 XP earned. Key technique: conditional probability." |
| Color independence | Success = checkmark icon + "Solved" text (not just green). Failure = arrow icon + "Almost there" text (not just amber). |
| Sound toggle | Global mute persists across sessions. Sound is enhancement, never the only signal. |
| Keyboard | Celebration dismiss: Enter or Escape. Fun Failure "Try Again": Enter. "See Full Solution": Tab + Enter. |

### Implementation Priority

| Priority | Component | Dependencies |
|----------|-----------|-------------|
| 1 | `<FloatingXP />` | Framer Motion (already in project) |
| 2 | `<FunFailureCard />` | Reframe message pool, problem metadata |
| 3 | Wire `SolutionReveal` → celebration tier logic | `determineTier()`, hint count from Spec 01 Q1 |
| 4 | Wire `RatingButtons` → celebration/encouragement | `<FlashcardEncouragement />` |
| 5 | `<CelebrationOverlay />` Tier 1-2 | `canvas-confetti` or `react-confetti-explosion` |
| 6 | `<CelebrationOverlay />` Tier 3 (full fiero) | `canvas-confetti` + Framer Motion + optional Lottie |
| 7 | `<ComebackBadge />` + comeback detection | ProblemProgress status check |
| 8 | Sound design integration | Audio files, mute toggle, `prefers-reduced-motion` |
| 9 | Focus Mode queuing | Session summary celebration playback |

---

## Sources

### Neuroscience
- PNAS Nexus (2024) — "Cognitive effort increases the intensity of rewards"
- PNAS (2022) — "Rewarding cognitive effort increases the intrinsic value of mental labor"
- Frontiers in Behavioral Neuroscience (2024) — Nucleus accumbens in reward and aversion
- Annual Reviews — Neurobiology of motivational aspects of dopamine
- Berridge & Robinson — "Wanting" vs "liking" dissociation in reward systems
- Nature Communications (2024) — Inter-reward interval dictates learning speed

### Failure & Feedback
- Ravaja et al. (2005-2007) — M.I.N.D. Lab biometric study of emotions during game failure
- Kapur — Productive Failure framework; Sinha & Kapur (2021) meta-analysis (d=0.36-0.58)
- Clark et al. (2009, *Neuron*) — Near-miss effect recruits win-related brain circuitry
- Wisniewski, Zierer, Hattie (2020) — Feedback meta-analysis (EF d=0.49 vs KR d=0.05)
- Mueller & Dweck (1998) — Process praise vs ability praise
- Dehaene, *How We Learn* — Pillar 3: Error Feedback

### Platform Design
- McGonigal, *Reality Is Broken* — Fiero, Fun Failure, four intrinsic rewards
- Oakley et al., *Uncommon Sense Teaching* — Unexpected rewards strengthen neural links
- Deci, Koestner, Ryan (1999) — Overjustification effect (128-study meta-analysis)
