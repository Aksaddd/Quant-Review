# Role: Frontend Engineer
> **Quant Review Platform** · Engineering · Phase 2 Hire · CONFIDENTIAL

---

## Role Snapshot

| Field | Detail |
|-------|--------|
| **Department** | Engineering |
| **Headcount** | 1 Mid-Level |
| **Task Difficulty** | 🟡 Medium |
| **Engagement Type** | Full-Time / Contract |
| **Hiring Phase** | Phase 2 — Experience Layer (Months 3–6) |

---

## Role Overview

Executes the design system and builds all user-facing components. Works directly from Figma specs produced by the Gamification & UX Designer and implements them in React with Framer Motion.

Owns the TextSettingsProvider, focus mode, collapsible step renderer, and the real-time WebSocket UI.

> Must be strong in **React performance optimization** — the progressive extraction UX is latency-sensitive.

---

## Core Responsibilities

- Implement all Figma-designed components in React/TypeScript with pixel accuracy
- Build the **collapsible step-by-step solution renderer** for long stochastic calculus problems
- Implement the **focus mode UI** (zero sidebar, zero notification badges, distraction-free reading)
- Build the **"Generate Before Reveal" UI**: scratchpad input, submission gate, then solution reveal
- Implement fiero moment animations using Framer Motion / Lottie
- Build the XP / leveling / progress visualization components
- Own the **WebSocket real-time connection** on the frontend (progressive document extraction display)
- Maintain the **Storybook component library** with every reusable component documented

---

## Tech Stack

| Layer | Tools |
|-------|-------|
| Core | React 18+, TypeScript, Tailwind CSS |
| Animations | Framer Motion, Lottie React |
| State | Zustand (client), React Query / TanStack Query (server) |
| Math Rendering | KaTeX / MathJax (LaTeX formula rendering) |
| Real-time | WebSocket API, EventSource (SSE) |
| Testing / Docs | Storybook, Vitest, React Testing Library |
| Performance | Lighthouse, Web Vitals |

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Lighthouse performance score (all primary routes) | ≥ 90 |
| Visual regressions on component library | 0 (Chromatic or Percy) |
| WebSocket reconnection UX disruption | < 500ms |
| Figma spec implementation accuracy | 100% within sprint commitment |

---

## Agent Operating Notes

> The AI agent occupies this role. Agent produces complete React component code from structured design specs. Aksad performs code review on all components before merge into main. Agent is responsible for maintaining Storybook documentation and ensuring test coverage on all new components. Performance budgets are non-negotiable and must be verified before handoff.
