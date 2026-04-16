# Design Spec: Technique Atlas UI
> **Quant Review Platform** · Gamification & UX Designer · Spec 05 · For Review

---

## Overview

The current platform organizes 200+ problems by chapter — a **surface-feature** organization. Chapter 4 contains probability problems, Chapter 5 contains stochastic processes, Chapter 2 contains brain teasers. But the same underlying technique — say, indicator variables — appears across chapters 2, 4, and 5. A student who masters indicator variables in Chapter 4 doesn't know they've already seen (and possibly failed) an indicator-variable problem in Chapter 2.

**Chi, Feltovich, & Glaser (1981)** — the landmark study on expert vs novice problem categorization — found that **experts categorize by deep structure** (techniques and principles) while **novices categorize by surface features** (topic and context). The Technique Atlas gives students the expert's organizational view before they have expert-level experience.

**The Technique Atlas is not a replacement for chapter-based navigation.** Khan Academy abandoned their Knowledge Map because most learners performed better with structured linear progression. Duolingo retreated from open skill trees because navigational freedom paralyzed learners. **Chapter-based study remains primary.** The Atlas is a supplementary cross-cutting view — a power-user feature that grows more valuable as mastery increases.

**What it does:** Across 200+ problems spanning 7 chapters, the Atlas surfaces every recurring technique as a navigable category. A student can click "Pigeon Hole Principle" and see every problem that uses it — from Chapter 2 brain teasers to Chapter 4 probability to Chapter 7 algorithms. This builds the associative web that Foer identifies as the foundation of expert memory.

---

## Part A: Concept & Architecture

### The Science

**Dual Coding Theory (Paivio):** When information is encoded through multiple representations (chapter context AND technique category), retrieval probability increases because "the response can be retrieved from either code." The Atlas creates a second encoding path for every problem.

**Findability research:** Sites offering 3+ classification approaches show 40-60% improvement in content discovery vs single hierarchy. Every problem should be reachable through at minimum three paths:

| Path | Example | Maps To (Forte's PARA) |
|------|---------|----------------------|
| **Chapter path** | Chapter 4 → Section 4.3 → Problem 4.3.2 | Resource (reference material by topic) |
| **Technique path** | Atlas → Conditioning → All conditioning problems (spans Ch 2, 4, 5, 6) | Area (ongoing skill development by competency) |
| **Review path** | Due for Review → Problem 4.3.2 (SM-2 scheduled) | Project (current actionable work) |

**Concept map meta-analyses:** Effect sizes of 0.58-1.08 on academic achievement. Interactive, student-engaged maps outperform static indexes. The Atlas should be filterable and clickable, not a static page.

**NeetCode model (closest parallel):** NeetCode organizes 150 coding problems around 28 fundamental patterns (Two Pointers, Sliding Window, DP, etc.). Problems live in both a topic hierarchy (Arrays, Trees, Graphs) AND a pattern hierarchy. Their philosophy: "It's less about the number of problems solved and more about how many patterns you know."

### Technique Taxonomy

Based on the existing `tags` and `keyTechnique` fields across 200+ problems, the Atlas organizes techniques into categories:

| Category | Techniques | Chapters |
|----------|-----------|----------|
| **Logical Reasoning** | Problem simplification, elimination, constraint satisfaction, deduction, process of elimination | 1, 2 |
| **Proof Techniques** | Induction, contradiction, parity invariants, modular invariants, coloring arguments | 2, 3, 4 |
| **Counting & Combinatorics** | Pigeon Hole Principle, inclusion-exclusion, generating functions, Ramsey-type arguments | 2, 4, 7 |
| **Probability** | Bayes' theorem, conditioning, indicator variables, expectation, variance, distributions | 4, 5, 6 |
| **Stochastic Processes** | Markov chains, martingales, Brownian motion, SDEs, absorption probabilities | 5, 6 |
| **Optimization** | Dynamic programming, greedy algorithms, worst-case analysis, minimax | 2, 3, 7 |
| **Algebraic Methods** | Fixed-point equations, series summation, modular arithmetic, linear algebra | 2, 3, 4 |
| **Financial Mathematics** | Black-Scholes, Ito's lemma, risk-neutral pricing, Greeks, hedging | 6 |
| **Creative / Lateral** | Symmetry arguments, information theory, cryptographic reasoning, measurement tricks | 2 |
| **Numerical Methods** | Monte Carlo, finite differences, root-finding, interpolation | 7 |

**Content gap (flagged for Quant Content Author):** Chapter 2 problems have rich `keyTechnique` fields (e.g., "Optimal worst-case strategy, triangular numbers"). Chapters 3-7 have **empty** `keyTechnique` fields — only generic chapter-level tags. The Atlas requires per-problem technique tagging for all chapters. This is a content authoring task, not a UX task.

### Three-Phase Technique Recognition

The Atlas integrates with Mixed Practice (Spec 01) to create a deliberate technique-recognition training pipeline:

| Phase | Mode | Technique Visibility | Purpose |
|-------|------|---------------------|---------|
| **1. Blocked** | Chapter study | Technique explicitly labeled on each problem | Build explicit schema. "This is a conditioning problem." |
| **2. Interleaved** | Mixed Practice | Technique **hidden** — student must discriminate | Train discrimination. "What kind of problem is this?" |
| **3. Feedback** | Post-solve in Mixed Practice | Technique tag revealed + link to Atlas page | Convert implicit recognition into explicit, transferable knowledge |

This pipeline directly implements Chi et al.'s finding: the transition from novice (surface categorization) to expert (deep-structure categorization) requires both explicit labeling and implicit pattern recognition practice.

---

## Part B: Visual Design & Navigation

### Atlas Main Page — Filterable Grid

The primary Atlas view is a filterable grid of technique cards — the NeetCode roadmap pattern adapted for quant problems.

```
┌──────────────────────────────────────────────────────────────────┐
│  Technique Atlas                                                 │
│                                                                  │
│  Filter: [ All Chapters ▾ ] [ All Difficulties ▾ ] [ All ▾ ]   │
│          [ ○ Show mastered  ● Show all  ○ Show weak ]           │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │ Pigeon Hole      │  │ Conditioning     │  │ Induction        │ │
│  │ Principle         │  │                  │  │                  │ │
│  │                   │  │                  │  │                  │ │
│  │ 7 problems        │  │ 12 problems      │  │ 5 problems       │ │
│  │ Ch 2, 4, 7        │  │ Ch 2, 4, 5, 6    │  │ Ch 2, 3          │ │
│  │ ████░░░ 4/7       │  │ ██░░░░ 3/12      │  │ █████ 5/5 ✓     │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │ Symmetry         │  │ Dynamic          │  │ Bayes' Theorem   │ │
│  │ Arguments         │  │ Programming      │  │                  │ │
│  │                   │  │                  │  │                  │ │
│  │ 6 problems        │  │ 4 problems       │  │ 8 problems       │ │
│  │ Ch 2, 4           │  │ Ch 2, 7          │  │ Ch 4, 5, 6       │ │
│  │ ███░░░ 3/6        │  │ ░░░░ 0/4         │  │ █░░░░░ 1/8       │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                  │
│  ...                                                             │
└──────────────────────────────────────────────────────────────────┘
```

**Technique Card Spec:**

| Element | Spec |
|---------|------|
| **Title** | Technique name: "Pigeon Hole Principle," "Conditioning," "Induction" |
| **Problem count** | "7 problems" — total problems using this technique |
| **Chapter span** | "Ch 2, 4, 7" — which chapters this technique appears in. Shows the cross-cutting nature. |
| **Mastery bar** | Mini progress bar: solved / total. Color: gray (0%) → blue (partial) → green (75%+) → gold (100%) |
| **Card state** | Normal (gray border), Weak (amber border, sorted to top when "Show weak" selected), Mastered (green border + checkmark) |
| **Click action** | Opens the Technique Detail Page |
| **Grid** | Responsive: 3 columns desktop, 2 tablet, 1 mobile. Cards sorted by: most problems first (default), weakest first (filter), alphabetical (filter). |

**Filter Bar:**

| Filter | Options | Behavior |
|--------|---------|----------|
| **Chapter** | All, Ch 2, Ch 3, Ch 4, Ch 5, Ch 6, Ch 7 | Filter technique cards to only show those with problems in the selected chapter |
| **Difficulty** | All, Easy, Medium, Hard | Filter to techniques that have problems at the selected difficulty |
| **Mastery** | Show all (default), Show mastered, Show weak | "Weak" = <50% solved. Sorts weak techniques to the top. |

### Technique Detail Page

Clicking a technique card opens a dedicated page showing all problems for that technique across chapters.

```
┌──────────────────────────────────────────────────────────────────┐
│  ← Back to Atlas                                                 │
│                                                                  │
│  Pigeon Hole Principle                                           │
│  ──────────────────────────────────────────────────              │
│  "If n items are put into m containers where n > m, at least     │
│  one container must contain more than one item."                 │
│                                                                  │
│  7 problems across Chapters 2, 4, 7    ███████░░░ 4/7 solved    │
│                                                                  │
│  Related techniques: Combinatorics · Proof · Counting            │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Chapter 2 — Brain Teasers                      4 problems │  │
│  │                                                            │  │
│  │  ✓  Matching Socks              Easy    +25 XP  Solved     │  │
│  │  ✓  Handshakes                  Medium  +50 XP  Solved     │  │
│  │  ✓  Have We Met?                Hard    +100 XP Solved     │  │
│  │  ○  Ants on a Square            Hard           Unseen      │  │
│  ├────────────────────────────────────────────────────────────┤  │
│  │  Chapter 4 — Probability                        2 problems │  │
│  │                                                            │  │
│  │  ✓  Counting Overlaps           Medium  +50 XP  Solved     │  │
│  │  ○  Distribution Bounds          Hard           Unseen      │  │
│  ├────────────────────────────────────────────────────────────┤  │
│  │  Chapter 7 — Algorithms                         1 problem  │  │
│  │                                                            │  │
│  │  ●  Hash Collision Proof         Medium         Attempted   │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  [ Practice All Pigeon Hole Problems ]  (launches Mixed Practice │
│   with these 7 problems — technique-focused interleaving)        │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Detail Page Spec:**

| Element | Spec |
|---------|------|
| **Technique description** | 1-2 sentence definition of the technique. Authored by Quant Content Author. |
| **Overall progress** | Mastery bar: solved / total for this technique across all chapters. |
| **Related techniques** | Clickable links to related techniques. Builds the associative web. |
| **Problem list** | Grouped by chapter. Each problem shows: status icon (✓/●/○), title, difficulty badge, XP potential (from Spec 01), current status. |
| **Problem click** | Navigates to the problem in its chapter reader context (preserves chapter-based study flow). |
| **"Practice All" button** | Launches a technique-focused Mixed Practice session using only problems from this technique. Applies the 1.25× interleaving multiplier (Spec 01) since the problems span multiple chapters. |
| **Mastery state** | When all problems in a technique are solved: gold border, "Mastered" badge, technique card turns gold on the Atlas grid. |

### Technique Tags on Problem Cards

Every problem card (`ProblemBlock.tsx`) gains clickable technique tags:

```
┌─────────────────────────────────────────────────────────┐
│  §2.25 · Easy · ✓ Solved                                │
│  Matching Socks                                          │
│  Technique: Pigeon Hole Principle                        │
│             ^^^^^^^^^^^^^^^^^^^^^^^^ ← clickable         │
│                                                          │
│  [problem content...]                                    │
└─────────────────────────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| **Location** | Below the title, next to the existing `keyTechnique` display |
| **Style** | Small blue link text, matching existing technique label styling |
| **Click** | Navigates to the Technique Detail Page for that technique |
| **During Mixed Practice** | **Hidden** (Phase 2 — technique must be discriminated, not given) |
| **Post-solve in Mixed Practice** | **Revealed** with a subtle animation (Phase 3 — feedback) |

### Weak Spot Analysis Widget (Dashboard)

A dashboard widget surfacing technique-level weaknesses that chapter-level analytics would miss:

```
┌──────────────────────────────────────────────────┐
│  Technique Weak Spots                            │
│                                                  │
│  These techniques need the most work:            │
│                                                  │
│  1. Dynamic Programming    0/4 solved   Ch 2, 7  │
│  2. Bayes' Theorem         1/8 solved   Ch 4-6   │
│  3. Martingale Methods     1/5 solved   Ch 5, 6  │
│                                                  │
│  [ Practice Weak Spots ]                         │
│  (launches Mixed Practice with these techniques) │
└──────────────────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| **Placement** | Dashboard, below StatsOverview. Only visible at Standard/Full gamification intensity. |
| **Selection** | Shows the 3 techniques with the lowest solve percentage (min 2 problems in the technique). |
| **"Practice" button** | Launches Mixed Practice drawing from the weak techniques. Targeted review. |
| **Update** | Recalculates on each problem solve. |

---

## Part C: Integration, Data Model, & Implementation

### Data Model

**New type: Technique**

```typescript
export interface Technique {
  id: string;                 // e.g. "pigeon-hole"
  name: string;               // "Pigeon Hole Principle"
  category: string;           // "Counting & Combinatorics"
  description: string;        // 1-2 sentence definition
  relatedTechniques: string[]; // IDs of related techniques
}

export interface TechniqueIndex {
  techniques: Technique[];
  // Map: technique ID → array of problem IDs that use it
  problemsByTechnique: Record<string, string[]>;
  // Map: problem ID → array of technique IDs it uses
  techniquesByProblem: Record<string, string[]>;
}
```

**Extending existing Problem type (no breaking changes):**

The `Problem` interface already has `keyTechnique: string` and `tags: string[]`. The Atlas maps these to `Technique` entries. No type changes needed — just a mapping layer.

```typescript
// src/data/techniques/index.ts
// Maps tag strings to canonical Technique entries

const TAG_TO_TECHNIQUE: Record<string, string> = {
  'pigeon-hole': 'pigeon-hole',
  'combinatorics': 'combinatorics',
  'induction': 'induction',
  'parity': 'parity-invariants',
  'modular-arithmetic': 'modular-arithmetic',
  'game-theory': 'game-theory',
  'symmetry': 'symmetry-arguments',
  'invariants': 'invariants',
  'proof': 'proof-techniques',
  'contradiction': 'proof-by-contradiction',
  // ... complete mapping for all tags across all chapters
};
```

### Content Authoring Dependency (Critical)

**Chapter 2:** Rich data — every problem has specific `keyTechnique` and granular `tags`. Ready for Atlas.

**Chapters 3-7:** All problems have `keyTechnique: ""` (empty) and only generic chapter-level tags (e.g., every Chapter 4 problem has the same 6 tags). **This blocks a meaningful Atlas for 70%+ of problems.**

**Flagged for Quant Content Author:**
- Tag every problem in Chapters 3-7 with specific technique tags (matching the taxonomy in Part A)
- Write `keyTechnique` strings for each problem (1-line technique description)
- Estimate: ~160 problems × 2 minutes each = ~5-6 hours of content authoring
- **This is the critical path dependency.** The Atlas UI can be built before tagging is complete, but it will only show Chapter 2 problems until the content is tagged.

### Route Structure

```
/atlas                    → Atlas main page (filterable grid)
/atlas/[technique-id]     → Technique detail page
```

Both added to the sidebar navigation under a new "Atlas" entry (BookOpen icon), positioned between "Flashcards" and the chapter list.

### New Components

| Component | File | Complexity |
|-----------|------|------------|
| `<AtlasGrid />` | `src/components/atlas/AtlasGrid.tsx` | Medium — filterable card grid |
| `<TechniqueCard />` | `src/components/atlas/TechniqueCard.tsx` | Low — single card with progress bar |
| `<TechniqueDetail />` | `src/components/atlas/TechniqueDetail.tsx` | Medium — problem list grouped by chapter |
| `<TechniqueTag />` | `src/components/atlas/TechniqueTag.tsx` | Low — clickable tag for ProblemBlock |
| `<WeakSpotWidget />` | `src/components/dashboard/WeakSpotWidget.tsx` | Medium — aggregation + Mixed Practice launch |
| `<AtlasFilterBar />` | `src/components/atlas/AtlasFilterBar.tsx` | Low — dropdowns + radio buttons |

### Hooks

```typescript
// src/hooks/useTechniques.ts
interface UseTechniquesReturn {
  techniques: Technique[];
  getTechniqueById: (id: string) => Technique | undefined;
  getProblemsForTechnique: (id: string) => Problem[];
  getTechniquesForProblem: (problemId: string) => Technique[];
  getWeakTechniques: (limit: number) => Technique[];  // lowest solve %
  getTechniqueProgress: (id: string) => { solved: number; total: number; pct: number };
}
```

### Gamification Intensity

| Feature | Minimal | Standard | Full |
|---------|---------|----------|------|
| Atlas page accessible | Yes | Yes | Yes |
| Technique tags on problems | **Yes** (always — this is learning, not gamification) | Yes | Yes |
| Weak Spot Widget | Hidden | **Visible** | Visible |
| "Practice All" button on detail page | Yes | Yes | Yes |
| Technique mastery badges | Hidden | Hidden | **Visible** |

The Atlas is **not behind a gamification toggle** — it's a learning feature, not a gamification feature. Technique tags and cross-cutting navigation serve the learning engine directly. Only the decorative layer (mastery badges, weak spot gamification) follows intensity settings.

### Implementation Priority

| Priority | Component | Dependencies | Why This Order |
|----------|-----------|-------------|----------------|
| 1 | Technique data file (`src/data/techniques/index.ts`) | Tag-to-technique mapping | Foundation — everything references this |
| 2 | `<TechniqueTag />` on `ProblemBlock` | Technique data | Minimum viable Atlas — clickable tags create connections immediately |
| 3 | `<AtlasGrid />` + `<TechniqueCard />` | Technique data, progress aggregation | Atlas main page |
| 4 | `<TechniqueDetail />` page | AtlasGrid, route `/atlas/[id]` | Technique deep-dive with cross-chapter problem list |
| 5 | `<WeakSpotWidget />` | Technique progress aggregation | Dashboard integration |
| 6 | "Practice All" button → Mixed Practice | Spec 01 Mixed Practice mode | Technique-focused interleaving |
| 7 | Phase 2/3 technique visibility in Mixed Practice | Focus Mode (Spec 03), Mixed Practice | Hide during solve, reveal after |
| **Content** | **Ch 3-7 technique tagging** | **Quant Content Author** | **Critical path — blocks 70%+ of Atlas content** |

---

## Sources

### Knowledge Organization
- Chi, Feltovich, & Glaser (1981) — Expert vs novice problem categorization, *Cognitive Science*
- Rohrer (2012) — "Interleaving Helps Students Distinguish among Similar Concepts"
- Paivio — Dual Coding Theory: multiple representations increase retrieval probability

### Concept Maps & Navigation
- Nesbit & Adesope (2006) — Concept map meta-analysis, g = 0.58
- Heliyon meta-analysis (2023) — 78 studies, effect size 1.08
- STEM meta-analysis (2025) — 37 studies, ES = 0.630
- Findability research — 40-60% improvement with 3+ classification approaches

### Platform Patterns
- NeetCode — 28 fundamental patterns, dual topic/pattern hierarchy
- Khan Academy — Knowledge Map (launched and abandoned — power users loved it, novices struggled)
- Metacademy — "Package manager for knowledge," 487 concepts, 7,947 prerequisite pairs
- Duolingo — Retreated from open skill tree to linear path

### Transfer & Discrimination
- Birnbaum et al. (2013) — Discrimination hypothesis
- Sana, Yan, & Kim (2017) — Interleaving benefits greatest after basic competence achieved
- Transfer of strategic task components (2024, PMC) — Practiced components expedite novel tasks

### Learning Science Foundation
- Foer, *Moonwalking with Einstein* — "Memory is like a spiderweb"
- Forte — PARA system (Projects, Areas, Resources, Archives)
- Oakley, *Uncommon Sense Teaching* — Chunking for problem patterns
