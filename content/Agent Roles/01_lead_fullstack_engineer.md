# Role: Lead Full-Stack Engineer
> **Quant Review Platform** · Engineering · Phase 1 Hire · CONFIDENTIAL

---

## Role Snapshot

| Field | Detail |
|-------|--------|
| **Department** | Engineering |
| **Headcount** | 1 (You / CTO) |
| **Task Difficulty** | 🔴 High |
| **Engagement Type** | Full-Time / Contract |
| **Hiring Phase** | Phase 1 — Foundation (Months 1–3) |

---

## Role Overview

The architectural owner of the entire platform. Responsible for the core React/FastAPI/Supabase/pgvector stack, the SM-2 scheduling engine, real-time WebSocket pipeline, and all backend services.

This is the **highest-leverage seat on the team** — every other role builds on top of what this person ships.

---

## Core Responsibilities

- Design and maintain the monorepo architecture (React frontend, FastAPI backend, Supabase DB)
- Own the SM-2 scheduling engine for both flashcards and problem re-surfacing
- Build and maintain the WebSocket-based progressive document extraction pipeline
- Implement prerequisite gating logic and cognitive load chunking across chapter flows
- Define API contracts that the AI/ML and Curriculum teams consume
- Lead code reviews, enforce standards, own CI/CD pipeline (GitHub Actions / Railway / Render)
- Instrument time-to-solution tracking, hint consumption logging, and error taxonomy APIs
- Scale infrastructure as user load grows (pgvector indexing, connection pooling, caching layers)

---

## Tech Stack

| Layer | Tools |
|-------|-------|
| Frontend | React, TypeScript, Tailwind CSS, Zustand, React Query |
| Backend | FastAPI (Python), Pydantic, SQLAlchemy |
| Database | Supabase (Postgres + pgvector + Auth + Realtime) |
| Caching | Redis (session state, rate limiting) |
| Real-time | WebSockets, Server-Sent Events |
| DevOps | GitHub Actions, Docker, Railway / Render |
| Observability | Sentry, PostHog |

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Critical bugs in prod per sprint | 0 |
| P95 API latency | < 200ms |
| SM-2 scheduling accuracy | Verified against spaced-repetition literature benchmarks |
| Feature delivery | Full parity with roadmap within 2-week cycle |

---

## Agent Operating Notes

> This role is occupied by **Aksad (CTO)**. The AI agent assists with execution but Aksad makes all architectural decisions, enforces standards, and owns the codebase. Agent scope: implementation support, code generation, debugging, and documentation — not autonomous architectural changes.
