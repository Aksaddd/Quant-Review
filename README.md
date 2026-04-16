# Quant Interview Review — Ed-Tech Platform

> **Source Book:** *A Practical Guide to Quantitative Finance Interviews* — Xinfeng Zhou (2008)  
> **Extraction Date:** 2026  
> **Purpose:** Structured content for an interactive ed-tech web app where users can read, review, and practice problems from the book.

---

## Repository Structure

```
/
├── README.md                          ← You are here (metadata + build instructions)
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
│   └── Research/                      ← Learning science books & research synthesis
│       ├── quant-review-book-synthesis.md
│       ├── building-a-second-brain.md
│       ├── how-we-learn.md
│       ├── make-it-stick.md
│       ├── moonwalking-with-einstein.md
│       ├── reality-is-broken.md
│       └── uncommon-sense-teaching.md
├── scripts/
│   └── gen-chapters.js                ← Parses chapter markdown → TypeScript data
├── src/
│   ├── app/                           ← Next.js app router (pages & layouts)
│   ├── components/                    ← React components (reader, flashcards, dashboard)
│   ├── data/                          ← Structured TypeScript data (problems, flashcards)
│   ├── hooks/                         ← Custom React hooks
│   └── lib/                           ← Utilities and services
└── supabase/
    └── schema.sql                     ← Database schema
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

### Tech Stack Recommendation

```
Frontend:   React + TypeScript + Tailwind CSS + Framer Motion
Backend:    FastAPI (Python) or Next.js API routes
Database:   Supabase (PostgreSQL) with pgvector for semantic search
Hosting:    Vercel (frontend) + Render/Fly (backend)
```

### Core Features to Implement

#### 1. Reader Mode
- Display each problem **word for word** from the markdown source
- Syntax highlighting for mathematical expressions (use KaTeX or MathJax)
- Collapsible **Solution** sections (hidden by default, reveal on click)
- Sidebar table of contents with scroll spy

#### 2. Practice Mode
- Present the problem **without the solution**
- User types or selects their answer approach
- Reveal solution step-by-step with "Next hint" progression
- Track which problems have been attempted / solved

#### 3. Review Mode (Spaced Repetition)
- Cards based on each problem (SM-2 algorithm recommended)
- "I got it" / "Needs review" buttons
- Track mastery per section and per problem type

#### 4. Progress Dashboard
- Completion percentage per chapter/section
- Problem difficulty distribution
- Weak areas flagged by section

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

The `content/Research/` directory contains learning science books and a synthesis document that inform the platform's instructional design:

| Resource | Author | Focus |
|----------|--------|-------|
| quant-review-book-synthesis.md | — | Cross-book synthesis mapped to platform features |
| Building a Second Brain | Tiago Forte | Digital note-taking and knowledge organization |
| How We Learn | Stanislas Dehaene | Neuroscience of learning |
| Make It Stick | Brown, Roediger, McDaniel | Science of successful learning and memory |
| Moonwalking with Einstein | Joshua Foer | Memory techniques and mnemonics |
| Reality Is Broken | Jane McGonigal | Gamification and engagement |
| Uncommon Sense Teaching | Oakley et al. | Practical teaching methods based on brain science |

---

## Generating Chapter Data

After editing any chapter markdown file in `content/A Practical Guide To Quantitative Finance Interviews Book by Xinfeng Zhou (chapters)/`, regenerate the TypeScript data:

```bash
node scripts/gen-chapters.js
```

This parses chapters 3–7 and outputs structured TypeScript to `src/data/chapters/`.

---

*This README was generated from PDF extraction of the source book. Content is structured for programmatic consumption by an ed-tech platform.*
