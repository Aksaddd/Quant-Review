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
│   ├── Design Specs/                  ← XP leveling, fiero mechanics, focus-mode nudges,
│   │                                    epic-meaning narrative, technique atlas spec
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
│   ├── gen-chapters.js                ← Parses chapter markdown → TypeScript data
│   └── patch-tunnel-rat.js            ← Postinstall patch for a transitive dep
├── src/
│   ├── app/                           ← Next.js 14 App Router
│   │   ├── layout.tsx · page.tsx      ← Root layout + landing page
│   │   ├── (app)/                     ← Authenticated app shell route group
│   │   │   ├── dashboard/             ← Progress dashboard (chapters, stats, streaks)
│   │   │   ├── flashcards/            ← Flashcard study interface
│   │   │   ├── read/chapter-[1-7]/    ← One reader route per chapter (7 total)
│   │   │   └── settings/              ← User settings
│   │   ├── (auth)/                    ← Auth route group
│   │   │   ├── login/
│   │   │   └── signup/
│   │   └── api/ai/                    ← AI/ML API routes
│   │       ├── adaptive/              ← Adaptive difficulty engine
│   │       ├── evaluate-approach/     ← Generate-before-reveal evaluation
│   │       ├── health/                ← AI service health check
│   │       ├── interleaved/           ← Cross-chapter interleaved practice
│   │       ├── socratic/              ← Socratic interview simulation
│   │       ├── technique-atlas/       ← Technique classification & atlas
│   │       └── weakness-profile/      ← Personalized weakness analysis
│   ├── components/                    ← React components
│   │   ├── dashboard/                 ← ChapterList, SectionGrid, StatsOverview, DueCardsBanner, …
│   │   ├── flashcards/                ← FlashcardCard, CardBrowser, MistakeTaxonomy, FilterBar, …
│   │   ├── gamification/              ← XPBar, XPToast, FieroOverlay, SessionNudge
│   │   ├── landing/                   ← Hero, Features, SectionPreview, CTA
│   │   ├── layout/                    ← AppShell, Navbar, Sidebar, MobileNav, FocusModeToggle
│   │   ├── providers/                 ← ProgressProvider, TextSettingsProvider
│   │   ├── reader/                    ← ChapterReader, ProblemBlock, ScratchpadGate,
│   │   │                                ApproachCanvas, HintStep, MarkdownRenderer, …
│   │   └── ui/                        ← Button, Card, Badge, Modal, Progress
│   ├── data/                          ← Structured TypeScript data
│   │   ├── chapter1/                  ← 5 principle cards (ch1-01 … ch1-05)
│   │   ├── problems/                  ← 37 Chapter-2 brain-teaser problems (ch2-01 … ch2-37)
│   │   ├── chapters/                  ← Auto-generated data for chapters 3–7 (+ index)
│   │   └── flashcards/                ← concepts/, formulas/, principles/, problems/ card sets
│   ├── hooks/                         ← Custom React hooks
│   │   ├── useFlashcards.ts           ← Filtering + retrieval for flashcards
│   │   ├── useProgress.ts             ← Progress context (SM-2 state, due cards)
│   │   ├── useProblemSR.ts            ← SM-2 spaced repetition for problems
│   │   ├── useCustomSets.ts           ← User-created card collections
│   │   ├── useStreak.ts               ← Daily streak tracking
│   │   ├── useCanvasStore.ts          ← Approach-canvas drawing state
│   │   ├── useErrorTracking.ts        ← Mistake taxonomy tracking
│   │   ├── useTextSettings.ts         ← Reader typography / theme preferences
│   │   ├── useTimerTracking.ts        ← Time-to-solution tracking
│   │   └── useInterleaved.ts          ← Interleaved practice session management
│   ├── lib/
│   │   ├── types.ts                   ← Shared domain types (Chapter, Problem, …)
│   │   ├── sm2.ts                     ← SM-2 spaced repetition (flashcards)
│   │   ├── storage.ts                 ← LocalStorage helpers
│   │   ├── supabase.ts                ← Supabase client factory
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
│       ├── useSessionStore.ts         ← Session state (focus mode, timing, nudges)
│       └── useXPStore.ts              ← XP, leveling, and gamification state
└── supabase/
    ├── schema.sql                     ← Base schema — profiles, problem_progress, flashcard_progress
    └── migrations/
        └── 001_ai_ml_infrastructure.sql ← AI/ML tables (problem_sm2_state, problem_sessions,
                                            problem_errors), embeddings, pgvector indexes
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
**Problem count:** 37 problems  
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

### Chapter 3 — Calculus and Linear Algebra

**Page count:** 26 pages  
**Problem count:** 19 problems  
**Topic tags:** `calculus` `linear-algebra` `derivatives` `integration` `ode` `matrices`

#### Problem Index

| # | Problem Name | Section | Difficulty | Key Technique |
|---|-------------|---------|------------|---------------|
| 1 | Derivative of `y = (ln x)^(ln x)` | 3.1 Limits and Derivatives | Medium | Logarithmic differentiation, chain rule |
| 2 | `eᵖ` vs. `πᵉ` | 3.1 | Medium | Monotonicity of `f(x) = ln(x)/x` |
| 3 | Two Limits | 3.1 | Medium | L'Hôpital / series expansion |
| 4 | Volume of Intersecting Cylinders | 3.2 Integration | Medium | Cross-section integration |
| 5 | Snow Plow Problem | 3.2 | Medium | Separable ODE + geometric setup |
| 6 | `E[X \| X > 0]` for Standard Normal | 3.2 | Medium | Truncated expectation via direct integration |
| 7 | Bernoulli's Inequality | 3.4 Important Calculus Methods | Medium | Induction / convexity |
| 8 | Root-Finding Algorithms | 3.4 | Medium | Bisection, Newton's method |
| 9 | Distance From Origin to a Plane | 3.4 | Medium | Lagrange multipliers |
| 10 | Separable ODE With Initial Condition | 3.5 ODEs | Medium | Separation of variables |
| 11 | Change of Variable | 3.5 | Medium | Substitution in ODEs |
| 12 | First-Order Linear ODE | 3.5 | Medium | Integrating factor |
| 13 | Complex Roots ODE | 3.5 | Medium | Characteristic equation, Euler's formula |
| 14 | Two Nonhomogeneous ODEs | 3.5 | Medium | Undetermined coefficients |
| 15 | Max/Min Correlation (Vector Approach) | 3.6 Linear Algebra | Medium | Cauchy–Schwarz on centered vectors |
| 16 | Linear Least Squares Regression | 3.6 | Medium | Normal equations, projection |
| 17 | Eigenvalues and Eigenvectors of a 2×2 | 3.6 | Medium | Characteristic polynomial |
| 18 | Correlation Bounds (PSD Approach) | 3.6 | Medium | Positive semidefiniteness of covariance matrix |
| 19 | Generating Correlated Normal RVs | 3.6 | Medium | Cholesky decomposition |

> Section 3.3 (*Partial Derivatives and Multiple Integrals*) is a reference-only section with no structured problems.

---

### Chapter 4 — Probability Theory

**Page count:** 45 pages  
**Problem count:** 40 problems  
**Topic tags:** `probability` `combinatorics` `bayes` `distributions` `expectation` `variance`

#### Problem Index

| # | Problem Name | Section | Difficulty | Key Technique |
|---|-------------|---------|------------|---------------|
| 1 | Coin Toss Game | 4.1 Basic Probability | Medium | Complementary counting |
| 2 | Card Game | 4.1 | Medium | Inclusion–exclusion |
| 3 | Drunk Passenger | 4.1 | Medium | Symmetry argument |
| 4 | N Points on a Circle | 4.1 | Medium | Symmetry, arc covering |
| 5 | Poker Hands | 4.2 Combinatorial Analysis | Medium | Binomial/multinomial counting |
| 6 | Hopping Rabbit | 4.2 | Medium | Stars and bars |
| 7 | Screwy Pirates 2 | 4.2 | Medium | Combinatorial locking argument |
| 8 | Chess Tournament | 4.2 | Medium | Counting pairings |
| 9 | Application Letters (Derangement) | 4.2 | Medium | Derangement formula `!n` |
| 10 | Birthday Problem | 4.2 | Medium | Complementary probability |
| 11 | 100th Digit of `(1 + √2)³⁰⁰⁰` | 4.2 | Hard | Conjugate surds, integer parity |
| 12 | Cubic of Integer | 4.2 | Medium | Modular arithmetic |
| 13 | All-Girl World? | 4.3 Conditional Probability and Bayes' | Medium | Gambler's fallacy / independence |
| 14 | Unfair Coin | 4.3 | Medium | Bayes' rule |
| 15 | Fair Probability From an Unfair Coin | 4.3 | Medium | Von Neumann's trick |
| 16 | Dart Game | 4.3 | Medium | Law of total probability |
| 17 | Birthday Line | 4.3 | Medium | Conditioning on position |
| 18 | Dice Order | 4.3 | Medium | Symmetry, ordering |
| 19 | Monty Hall Problem | 4.3 | Medium | Bayes' rule, information update |
| 20 | Amoeba Population | 4.3 | Hard | Generating functions / recursion |
| 21 | Candies in a Jar | 4.3 | Medium | Conditional expectation |
| 22 | Coin Toss Game (HT) | 4.3 | Medium | Markov chain / first-step analysis |
| 23 | Aces | 4.3 | Medium | Symmetry in card positions |
| 24 | Gambler's Ruin | 4.3 | Hard | Absorbing random walk |
| 25 | Basketball Scores | 4.3 | Medium | Recursion on states |
| 26 | Cars on a Road | 4.3 | Medium | Poisson process |
| 27 | Meeting Probability | 4.4 Distributions | Medium | Geometric probability |
| 28 | Probability of Triangle | 4.4 | Medium | Integration over feasible region |
| 29 | Poisson Process and Memorylessness | 4.4 | Medium | Exponential inter-arrivals |
| 30 | Moments of the Normal Distribution | 4.4 | Medium | Integration by parts, even/odd |
| 31 | Connecting Noodles | 4.5 Expectation and Variance | Medium | Linearity of expectation |
| 32 | Optimal Hedge Ratio | 4.5 | Medium | Variance minimization |
| 33 | Dice Game | 4.5 | Medium | Conditional expectation |
| 34 | Card Game — First Ace | 4.5 | Medium | Symmetry / order statistics |
| 35 | Sum of Random Variables | 4.5 | Medium | Moment generating functions |
| 36 | Coupon Collection | 4.5 | Medium | Geometric sum of expectations |
| 37 | Joint Default Probability | 4.5 | Hard | Copulas / bivariate normal |
| 38 | Expected Value of Max and Min | 4.6 Order Statistics | Medium | Order-statistic density |
| 39 | Correlation of Max and Min | 4.6 | Medium | Joint distribution of extremes |
| 40 | Random Ants | 4.6 | Medium | Symmetry + order-statistic tricks |

---

### Chapter 5 — Stochastic Processes and Stochastic Calculus

**Page count:** 32 pages  
**Problem count:** 13 problems  
**Topic tags:** `markov-chains` `martingales` `brownian-motion` `ito` `sde` `dp`

#### Problem Index

| # | Problem Name | Section | Difficulty | Key Technique |
|---|-------------|---------|------------|---------------|
| 1 | Gambler's Ruin (Markov Chain) | 5.1 Markov Chain | Hard | Absorbing chain, first-step analysis |
| 2 | Dice Question (12 vs. 7-7) | 5.1 | Hard | Expected hitting time |
| 3 | Markov Chain Problem 3 | 5.1 | Hard | Stationary distribution |
| 4 | Drunk Man on Bridge | 5.2 Martingale and Random Walk | Hard | Optional stopping theorem |
| 5 | Dice Game (Wald's Equality) | 5.2 | Hard | Wald's identity |
| 6 | Ticket Line (Ballot Problem) | 5.2 | Hard | Reflection principle |
| 7 | Coin Sequence: `n` Heads in a Row | 5.2 | Hard | Martingale expected stopping time |
| 8 | DP Dice Game (Up to 3 Rolls) | 5.3 Dynamic Programming | Hard | Backward induction |
| 9 | World Series Betting | 5.3 | Hard | Value iteration / replication |
| 10 | Dynamic Dice Game | 5.3 | Hard | Bellman equation |
| 11 | Dynamic Card Game | 5.3 | Hard | Optimal stopping |
| 12 | Correlation of `W_t` and `W_t²` | 5.4 Brownian Motion and Stochastic Calculus | Hard | Itô's lemma, BM moments |
| 13 | Prob. of Ever Reaching `−1` With Positive Drift | 5.4 | Hard | Exponential martingale / hitting probability |

---

### Chapter 6 — Finance

**Page count:** 33 pages  
**Problem count:** 23 problems  
**Topic tags:** `options` `black-scholes` `greeks` `exotics` `derivatives` `finance`

#### Problem Index

| # | Problem Name | Section | Difficulty | Key Technique |
|---|-------------|---------|------------|---------------|
| 1 | Price Direction of Options | 6.1 Option Pricing | Medium | Comparative statics on S, K, r, σ, τ, D |
| 2 | Put-Call Parity | 6.1 | Medium | No-arbitrage replication |
| 3 | Put-Spread Arbitrage | 6.1 | Medium | Monotonicity and convexity of option prices |
| 4 | Black-Scholes-Merton PDE | 6.1 | Medium | Dynamic hedging derivation |
| 5 | Digital / First-Passage Payoff | 6.1 | Hard | Martingale + first-hitting time |
| 6 | Inverse Stock Price Contract (`1/Sₜ`) | 6.1 | Hard | Change of numeraire, risk-neutral pricing |
| 7 | Call Delta of a European Call | 6.2 The Greeks | Medium | Differentiation of BS formula |
| 8 | ATM Delta Near Maturity | 6.2 | Medium | Limiting behavior of `N(d₁)` |
| 9 | Delta Hedging and Rebalancing | 6.2 | Medium | Replication portfolio maintenance |
| 10 | ATM Call Approximation | 6.2 | Medium | Brenner–Subrahmanyam approximation |
| 11 | Gamma of an ATM Option Near Maturity | 6.2 | Medium | Sensitivity blow-up at expiry |
| 12 | Delta-Neutral: Gamma vs. Theta | 6.2 | Medium | P&L decomposition of Δ-hedged portfolio |
| 13 | Constant vs. Stochastic Volatility | 6.2 | Hard | Jensen on convex payoff |
| 14 | Recovering Risk-Neutral Density | 6.2 | Hard | Breeden–Litzenberger |
| 15 | Bull Call Spread Boundaries | 6.3 Option Portfolios and Exotic Options | Medium | Payoff construction, no-arbitrage bounds |
| 16 | Straddle | 6.3 | Medium | Volatility view via long C + long P |
| 17 | Binary / Cash-or-Nothing Option | 6.3 | Medium | Digital pricing and static hedge |
| 18 | Exchange Option (Margrabe) | 6.3 | Hard | Two-asset GBM, change of numeraire |
| 19 | Portfolio Optimization (Minimum Variance) | 6.4 Other Finance Questions | Medium | Two-asset variance minimization |
| 20 | Value at Risk (VaR) | 6.4 | Medium | Quantile risk measure + limitations |
| 21 | Duration of an Inverse Floater | 6.4 | Hard | Decomposition into plain bond + swap |
| 22 | Forwards vs. Futures | 6.4 | Medium | Daily marking-to-market and rate correlation |
| 23 | Interest Rate Models | 6.4 | Medium | Vasicek, CIR, HJM / short-rate vs. forward-rate |

---

### Chapter 7 — Algorithms and Numerical Methods

**Page count:** 30 pages  
**Problem count:** 17 problems  
**Topic tags:** `algorithms` `dp` `bit-manipulation` `numerical-methods` `monte-carlo`

#### Problem Index

| # | Problem Name | Section | Difficulty | Key Technique |
|---|-------------|---------|------------|---------------|
| 1 | Number Swap Without Extra Storage | 7.1 Algorithms | Easy | XOR / arithmetic swap |
| 2 | Unique Elements (Sorted Array) | 7.1 | Easy | Two-pointer dedup |
| 3 | Horner's Algorithm | 7.1 | Medium | Polynomial evaluation in `O(n)` |
| 4 | Moving Average | 7.1 | Medium | Sliding window |
| 5 | Sorting Algorithms | 7.1 | Medium | Insertion / merge / quicksort analysis |
| 6 | Random Permutation (Fisher–Yates) | 7.1 | Medium | Uniform in-place shuffle |
| 7 | Reservoir Sampling | 7.1 | Medium | Streaming uniform sample |
| 8 | Min and Max in ≤ 3n/2 Comparisons | 7.1 | Medium | Pairwise comparison trick |
| 9 | First Nonzero in Unknown-Length Array | 7.1 | Medium | Exponential + binary search |
| 10 | Search in a Sorted 2D Grid | 7.1 | Medium | Staircase search `O(m + n)` |
| 11 | Fibonacci Efficiency | 7.1 | Medium | Memoization / matrix exponentiation |
| 12 | Maximum Contiguous Subarray | 7.1 | Medium | Kadane's algorithm |
| 13 | Power-of-2 Check | 7.2 The Power of Two | Easy | Bit trick `n & (n-1) == 0` |
| 14 | Multiplication by 7 | 7.2 | Easy | Shift-and-subtract |
| 15 | Probability Simulation From Fair Coin | 7.2 | Medium | Binary expansion of `p` |
| 16 | Poisonous Wine (Mice and Bottles) | 7.2 | Hard | Binary encoding of bottles |
| 17 | Finite Difference: Time vs. Space Steps | 7.3 Numerical Methods | Hard | Stability (CFL) of explicit scheme |

> Chapter 7 also covers Monte Carlo simulation (European call pricing, variance reduction, Δ/Γ estimation, π estimation) as worked examples within the Numerical Methods section.

---

## Claude Code Instructions — Building the Ed-Tech Platform

### Tech Stack

```
Frontend:   React 18 · Next.js 14 (App Router) · TypeScript 5 · Tailwind CSS 3
State:      Zustand 5 (client) · Supabase Realtime (server)
AI/ML:      Anthropic SDK (Claude) + Google GenAI SDK (Gemini) via provider-agnostic llm-router
Database:   Supabase — PostgreSQL + pgvector + Auth
Math:       KaTeX + react-katex + remark-math / rehype-katex (LaTeX rendering)
Markdown:   react-markdown + remark-gfm
Canvas:     react-sketch-canvas + @excalidraw/excalidraw (scratchpad / approach canvas)
Animation:  Framer Motion
Icons:      lucide-react
Toasts:     react-hot-toast
Dates:      date-fns
Hosting:    Vercel (frontend) + Supabase (managed backend)
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

## Contributing

1. Create a feature branch off `main`.
2. Run `npm run lint` and verify `npm run build` succeeds before opening a PR.
3. If you touch chapter markdown, regenerate data with `node scripts/gen-chapters.js` and commit the generated TypeScript alongside your content changes.
4. Keep new research or design documents under `content/Research/` or `content/Design Specs/` respectively, so the cognitive-science provenance stays discoverable.
