# Quant Interview Review — Ed-Tech Platform

> **Source Book:** *A Practical Guide to Quantitative Finance Interviews* — Xinfeng Zhou (2008)  
> **Extraction Date:** 2026  
> **Purpose:** Structured content for an interactive ed-tech web app where users can read, review, and practice problems from the book.

---

## Repository Structure

```
/
├── README.md                          ← You are here (metadata + build instructions)
├── .env.local.example                 ← Environment variable template (API keys, DB config)
├── content/
│   ├── A Practical Guide To Quantitative Finance Interviews
│   │   Book by Xinfeng Zhou (chapters)/   ← Quant interview chapter source markdown
│   │   ├── chapter-01-general-principles.md
│   │   ├── chapter-02-brain-teasers.md
│   │   ├── chapter-03-calculus-linear-algebra.md
│   │   ├── chapter-04-probability-theory.md
│   │   ├── chapter-05-stochastic-processes.md
│   │   ├── chapter-06-finance.md
│   │   └── chapter-07-algorithms-numerical-methods.md
│   ├── Agent Roles/                   ← Team composition & role definitions
│   │   ├── 00_team_overview.md        ← CTO strategic doc — phased hiring plan
│   │   ├── 01_lead_fullstack_engineer.md
│   │   ├── 02_ai_ml_engineer.md
│   │   ├── 03_curriculum_lead.md
│   │   ├── 04_gamification_ux_designer.md
│   │   ├── 05_frontend_engineer.md
│   │   ├── 06_data_analytics_engineer.md
│   │   ├── 07_quant_content_author.md
│   │   ├── 08_growth_community_manager.md
│   │   └── ai_ml_cost_analysis.md     ← LLM provider cost analysis & optimization
│   └── Research/                      ← Learning science research
│       ├── Books/                     ← Six-book cognitive science synthesis sources
│       │   ├── building-a-second-brain.md
│       │   ├── how-we-learn.md
│       │   ├── make-it-stick.md
│       │   ├── moonwalking-with-einstein.md
│       │   ├── reality-is-broken.md
│       │   └── uncommon-sense-teaching.md
│       └── Synthesis/                 ← Research synthesis & analysis
│           ├── quant-review-book-synthesis.md
│           ├── primary-research-sources.md       ← ~82 peer-reviewed sources
│           └── gamification-design-research.md   ← Gamification research synthesis
├── scripts/
│   └── gen-chapters.js                ← Parses chapter markdown → TypeScript data
├── src/
│   ├── app/                           ← Next.js app router (pages & layouts)
│   │   └── api/ai/                    ← AI/ML API routes
│   │       ├── adaptive/              ← Adaptive difficulty engine
│   │       ├── evaluate-approach/     ← Generate-before-reveal evaluation
│   │       ├── health/                ← AI service health check
│   │       ├── interleaved/           ← Cross-chapter interleaved practice
│   │       ├── socratic/              ← Socratic interview simulation
│   │       ├── technique-atlas/       ← Technique classification & atlas
│   │       └── weakness-profile/      ← Personalized weakness analysis
│   ├── components/                    ← React components
│   │   ├── flashcards/                ← Flashcard UI + MistakeTaxonomy
│   │   ├── gamification/              ← FieroOverlay, SessionNudge, XPBar, XPToast
│   │   ├── layout/                    ← AppShell, FocusModeToggle, PageTransition
│   │   └── reader/                    ← ProblemBlock, CollapsibleSolution, ScratchpadGate
│   ├── data/                          ← Structured TypeScript data (problems, flashcards)
│   ├── hooks/                         ← Custom React hooks
│   │   ├── useErrorTracking.ts        ← Mistake taxonomy tracking
│   │   ├── useInterleaved.ts          ← Interleaved practice session management
│   │   ├── useProblemSR.ts            ← SM-2 spaced repetition for problems
│   │   └── useTimerTracking.ts        ← Time-to-solution tracking
│   ├── lib/
│   │   └── ai/                        ← AI/ML core library
│   │       ├── claude.ts              ← Claude API client
│   │       ├── gemini.ts              ← Gemini API client
│   │       ├── llm-router.ts          ← Provider-agnostic LLM router
│   │       ├── sm2-problems.ts        ← SM-2 algorithm extended to problems
│   │       ├── interleave.ts          ← Interleaving engine
│   │       ├── adaptive-difficulty.ts ← Adaptive difficulty calibration
│   │       ├── socratic.ts            ← Socratic simulation layer
│   │       ├── technique-atlas.ts     ← Technique classification system
│   │       ├── weakness-profile.ts    ← Weakness profile generation
│   │       ├── embeddings.ts          ← Vector embeddings for semantic search
│   │       ├── generate-before-reveal.ts ← Generation effect implementation
│   │       ├── prompts.ts             ← LLM prompt templates
│   │       ├── types.ts               ← Shared AI/ML type definitions
│   │       └── index.ts               ← Module exports
│   └── stores/                        ← Zustand state stores
│       ├── useSessionStore.ts         ← Session state (focus mode, timing)
│       └── useXPStore.ts              ← XP, leveling, and gamification state
└── supabase/
    ├── schema.sql                     ← Base database schema
    └── migrations/
        └── 001_ai_ml_infrastructure.sql ← AI/ML tables, events, and indexes
```

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase project (for database, auth, and pgvector)
- Anthropic API key (Claude) and Google API key (Gemini)

### Installation

```bash
# Clone the repo
git clone https://github.com/aksaddd/quant-review.git
cd quant-review

# Install dependencies
npm install

# Copy the env template and fill in your keys
cp .env.local.example .env.local
```

### Development

```bash
npm run dev      # Start the Next.js dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Run the production build
npm run lint     # Lint with ESLint
```

### Regenerating Chapter Data

After editing any chapter markdown under `content/A Practical Guide To Quantitative Finance Interviews Book by Xinfeng Zhou (chapters)/`, regenerate the TypeScript data:

```bash
node scripts/gen-chapters.js
```

---

## Book Overview

This book prepares candidates for **quantitative finance interviews** by covering 200+ real interview problems across 7 chapters. Problems are drawn from actual interviews at top-tier quant firms, hedge funds, and trading desks.

### Full Table of Contents

| Chapter | Title | Book Pages |
|---------|-------|-----------|
| 1 | General Principles | 1–2 |
| 2 | Brain Teasers | 3–32 |
| 3 | Calculus and Linear Algebra | 33–58 |
| 4 | Probability Theory | 59–103 |
| 5 | Stochastic Processes and Stochastic Calculus | 105–136 |
| 6 | Finance | 137–169 |
| 7 | Algorithms and Numerical Methods | 171–200 |

---

## Content in This Repo

### Chapter 1 — General Principles

**Page count:** 2 pages  
**Problem count:** 0 (conceptual chapter)  
**Topic tags:** `interview-strategy` `mindset` `preparation`

| Principle | Core Idea |
|-----------|-----------|
| Build a Broad Knowledge Base | Know essentials across math, finance, programming |
| Practice Your Interview Skills | Prepare before the room; anticipate questions |
| Listen Carefully | Clarify before solving; absorb hints |
| Speak Your Mind | Vocalize reasoning; show your thought process |
| Make Reasonable Assumptions | State assumptions; design frameworks around them |

---

### Chapter 2 — Brain Teasers

**Page count:** 30 pages  
**Problem count:** 28 problems  
**Topic tags:** `brain-teasers` `logic` `combinatorics` `game-theory` `induction` `modular-arithmetic` `symmetry` `pigeon-hole`

#### Problem Index

| # | Problem Name | Section | Difficulty | Key Technique |
|---|-------------|---------|-----------|---------------|
| 1 | Screwy Pirates | 2.1 | Medium | Problem simplification, game theory |
| 2 | Tiger and Sheep | 2.1 | Medium | Problem simplification, parity |
| 3 | River Crossing | 2.2 | Easy | Logic reasoning |
| 4 | Birthday Problem | 2.2 | Hard | Deductive logic |
| 5 | Card Game | 2.2 | Medium | Symmetry, invariants |
| 6 | Burning Ropes | 2.2 | Medium | Creative measurement |
| 7 | Defective Ball | 2.2 | Hard | Divide-into-thirds, ternary search |
| 8 | Trailing Zeros | 2.2 | Easy | Prime factorization |
| 9 | Horse Race | 2.2 | Medium | Structured elimination |
| 10 | Infinite Sequence | 2.2 | Medium | Fixed-point equation |
| 11 | Box Packing | 2.3 | Hard | 3D coloring argument |
| 12 | Calendar Cubes | 2.3 | Medium | Thinking out of the box (6↔9) |
| 13 | Door to Offer | 2.3 | Medium | Double-negation questioning |
| 14 | Message Delivery | 2.3 | Easy | Sequential locking |
| 15 | Last Ball | 2.3 | Medium | Parity invariant |
| 16 | Light Switches | 2.3 | Medium | Binary state + heat property |
| 17 | Quant Salary | 2.3 | Easy | Secure sum computation |
| 18 | Coin Piles | 2.4 | Medium | Symmetry, blind flip trick |
| 19 | Mislabeled Bags | 2.4 | Easy | Constraint logic |
| 20 | Wise Men (Sultan's Glass) | 2.4 | Hard | Symmetric role assignment |
| 21 | Clock Pieces | 2.5 | Medium | Series summation |
| 22 | Missing Integers | 2.5 | Easy | Sum + sum-of-squares |
| 23 | Counterfeit Coins I | 2.5 | Medium | Weighted sampling |
| 24 | Glass Balls | 2.5 | Hard | Optimal worst-case strategy |
| 25 | Matching Socks | 2.6 | Easy | Pigeon Hole Principle |
| 26 | Handshakes | 2.6 | Easy | Pigeon Hole Principle |
| 27 | Have We Met Before? | 2.6 | Medium | Generalized Pigeon Hole |
| 28 | Ants on a Square | 2.6 | Medium | Generalized Pigeon Hole |
| 29 | Counterfeit Coins II | 2.6 | Hard | Base-3 encoding, Pigeon Hole |
| 30 | Prisoner Problem (2 colors) | 2.7 | Hard | Parity / modular arithmetic |
| 31 | Division by 9 | 2.7 | Easy | Modular arithmetic proof |
| 32 | Chameleon Colors | 2.7 | Hard | Modular invariant |
| 33 | Coin Split Problem | 2.8 | Medium | Strong induction |
| 34 | Chocolate Bar Problem | 2.8 | Medium | Induction + intuition |
| 35 | Race Track | 2.8 | Hard | Induction + greedy insight |
| 36 | Irrational Number (√2) | 2.9 | Easy | Proof by contradiction |
| 37 | Rainbow Hats | 2.9 | Hard | Modular arithmetic + contradiction |

---

## Claude Code Instructions — Building the Ed-Tech Platform

### Tech Stack

```
Frontend:   React 18+ / Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion
State:      Zustand (client) + React Query / TanStack Query (server)
AI/ML:      Claude API (Anthropic) + Gemini API (Google) via provider-agnostic router
Database:   Supabase (PostgreSQL + pgvector + Auth + Realtime)
Math:       KaTeX / MathJax (LaTeX formula rendering)
Animations: Framer Motion + Lottie React
Hosting:    Vercel (frontend) + Render/Railway (backend)
```

### Core Features

#### 1. Reader Mode
- Display each problem **word for word** from the markdown source
- Syntax highlighting for mathematical expressions (KaTeX/MathJax)
- **Collapsible step-by-step solutions** — each step is one working-memory load (CLT-informed)
- **Focus mode** — zero sidebar, zero notification badges, distraction-free reading
- Sidebar table of contents with scroll spy

#### 2. Practice Mode (Generate-Before-Reveal)
- Present the problem **without the solution**
- **Scratchpad gate** — student must submit their approach before solution is revealed (generation effect)
- AI evaluates the student's approach and provides feedback
- Progressive hint ladder with **hint consumption logging**
- **Time-to-solution tracking** per problem

#### 3. Review Mode (SM-2 Extended to Problems)
- SM-2 spaced repetition applied to **problems, not just flashcards**
- Solved problems resurface on expanding schedules (1d → 6d → 3wk → 2mo)
- **Mistake taxonomy** on incorrect answers: conceptual error, calculation error, formula recall failure, misread problem
- **Cross-chapter interleaved practice** — mixed problem types across chapters
- **Adaptive difficulty** using time-to-solution + error taxonomy signals

#### 4. Gamification Layer
- **XP and leveling system** — XP for attempts, bonus for hint-free solves, extra for spaced review
- **Fiero moment animations** — visceral celebration after hard-problem breakthroughs
- **"Fun Failure" feedback** — show closeness, correct technique, reframe failure as progress
- **Session nudges** — cognitive science-informed break reminders after 45–60 minutes
- **XP toast notifications** — real-time feedback on progress

#### 5. AI-Powered Features
- **Socratic interview simulation** — AI interviewer mode for mock quant interviews
- **Technique Atlas** — cross-cutting index linking all problems by underlying technique
- **Weakness profile generation** — personalized gap analysis from error + timing data
- **Adaptive difficulty engine** — calibrates problem difficulty to maintain flow state
- **Provider-agnostic LLM router** — Claude (complex reasoning) + Gemini (routine tasks) with 95% cost optimization

#### 6. Progress Dashboard
- Completion percentage per chapter/section
- Problem difficulty distribution
- Weak areas flagged by section and technique
- SM-2 interval accuracy trends

### Markdown Parsing Notes

Each problem in the content files follows this structure:

```markdown
### Problem: [Title]
**Setup:** [Problem statement]
**Solution:** [Full solution with reasoning]
```

Section headers follow:
```markdown
## 2.X [Section Name]
```

Use these patterns to parse problems into structured data objects:

```typescript
interface Problem {
  id: string;           // e.g., "ch2-screwy-pirates"
  chapter: number;
  section: string;      // e.g., "2.1"
  title: string;
  setup: string;        // problem statement
  solution: string;     // full solution text
  hints: string[];      // extracted from footnotes
  tags: string[];
  difficulty: "easy" | "medium" | "hard";
}
```

### Math Rendering

Some solutions contain LaTeX-style expressions extracted from the PDF (may have OCR artifacts). Flag expressions containing:
- Summation symbols (Σ)
- Fractions
- Superscripts (^)
- Greek letters

And render with **KaTeX** for clean display.

### Key Design Principles

1. **Fidelity first:** Users must see the exact wording from the book.
2. **Progressive reveal:** Never show the solution automatically.
3. **Mobile-first:** This is study material — accessed on the go.
4. **Fast:** Each problem page should load in <1s.

---

## Research

The `content/Research/` directory contains the cognitive science foundation for the platform's design decisions, organized in three layers:

### Six-Book Synthesis (Popular Science Layer)

| Book | Author | Focus |
|------|--------|-------|
| *Make It Stick* | Brown, Roediger, McDaniel | Science of successful learning and memory |
| *How We Learn* | Stanislas Dehaene | Neuroscience of learning (four pillars) |
| *Moonwalking with Einstein* | Joshua Foer | Memory techniques and mnemonics |
| *Reality Is Broken* | Jane McGonigal | Gamification and intrinsic motivation |
| *Building a Second Brain* | Tiago Forte | Digital note-taking and knowledge organization |
| *Uncommon Sense Teaching* | Oakley, Sejnowski, McConville | Practical teaching methods based on brain science |

### Synthesis Documents

| Document | Description |
|----------|-------------|
| `quant-review-book-synthesis.md` | Cross-book synthesis — convergence map, 8 feature recommendations mapped to platform |
| `primary-research-sources.md` | ~82 peer-reviewed sources across 11 categories tracing synthesis claims to primary literature |
| `gamification-design-research.md` | Deep-dive on gamification research — SDT, flow theory, fiero mechanics, XP system design |

### Primary Research Coverage (82 Sources)

| Category | Sources | Key Finding |
|----------|---------|-------------|
| Spaced Repetition | 13 | SM-2 through FSRS; optimal gap = 10–20% of retention interval |
| Retrieval Practice | 8 | g = 0.50 vs restudying (Rowland 2014 meta-analysis) |
| Interleaving | 8 | 215% improvement in delayed test scores (Rohrer & Taylor 2007) |
| Cognitive Load Theory | 8 | Working memory holds ~4 items (Cowan 2001) |
| Sleep & Memory | 5 | 2.7x insight probability after sleep (Wagner et al. 2004) |
| Memory Techniques | 7 | Method of loci: g = 0.65 (Twomey & Kroneisen 2021) |
| Gamification | 12 | Cognitive g = .49, game fiction > surface PBL (Sailer & Homner 2020) |
| Adaptive Learning | 8 | ITS d = 0.76, nearly matching human tutoring (VanLehn 2011) |
| Metacognition | 4 | Only practice testing + distributed practice rated "high utility" (Dunlosky 2013) |
| EdTech Effectiveness | 4 | Adaptive supplements > replacements (Escueta et al. 2020) |

---

## Team Composition & Agent Roles

The `content/Agent Roles/` directory defines the full team required to build Quant Review into a cognitive science-driven learning engine. Every role is grounded in the six-book research synthesis. See `Team Overview` for the CTO strategic document including the phased hiring plan.

### Five Highest-Impact Features (from Synthesis)

| # | Feature |
|---|---------|
| 1 | SM-2 extended to problems |
| 2 | Cross-chapter interleaved practice |
| 3 | Time and error tracking |
| 4 | Gamification layer with fiero moments |
| 5 | Prerequisite gating |

### Team Roles

| Role | Dept | Difficulty | Phase | Primary Mandate |
|------|------|------------|-------|-----------------|
| Lead Full-Stack Engineer | Engineering | High | 1 — Foundation | Architectural owner of the entire platform |
| AI / ML Engineer | Engineering | High | 1 — Foundation | LLMs, adaptive intelligence, ingestion pipeline |
| Cognitive Science & Curriculum Lead | Product / Content | High | 1 — Foundation | Bridges learning science and product |
| Gamification & UX Designer | Product / Design | Medium | 2 — Experience | Emotional and motivational layer |
| Frontend Engineer | Engineering | Medium | 2 — Experience | Design system, all user-facing components |
| Data / Analytics Engineer | Engineering / Growth | Medium | 2 — Experience | Data infrastructure for adaptive platform |
| Quant Content Author | Content | Low | 3 — Scale | Authors, reviews, and tags all quant problems |
| Growth & Community Manager | Growth | Low | 3 — Scale | Distribution, community, social connectivity |

### Phased Hiring Plan

- **Phase 1 — Foundation (Months 1–3):** Lead Full-Stack, AI/ML, Curriculum Lead
- **Phase 2 — Experience Layer (Months 3–6):** Gamification & UX, Frontend, Data/Analytics
- **Phase 3 — Scale (Months 6+):** Quant Content Authors, Growth & Community Manager

---

## Environment Setup

Copy the environment template and fill in your API keys:

```bash
cp .env.local.example .env.local
```

Required environment variables include Supabase credentials, Anthropic (Claude) API key, and Google (Gemini) API key. See `.env.local.example` for the full list.

---

## Database Migrations

The Supabase schema includes:
- `schema.sql` — Base tables (users, flashcards, problems, progress)
- `migrations/001_ai_ml_infrastructure.sql` — AI/ML event tables, error taxonomy, hint logging, weakness profiles, technique atlas, and pgvector indexes

Run migrations through the Supabase CLI or dashboard.

---

*This README reflects the Main-Testing-1 integration branch, which includes all agent contributions merged from the foundation sprint.*
