# Role: Data / Analytics Engineer
> **Quant Review Platform** · Engineering / Growth · Phase 2 Hire · CONFIDENTIAL

---

## Role Snapshot

| Field | Detail |
|-------|--------|
| **Department** | Engineering / Growth |
| **Headcount** | 1 Mid-Level |
| **Task Difficulty** | 🟡 Medium |
| **Engagement Type** | Full-Time / Contract |
| **Hiring Phase** | Phase 2 — Experience Layer (Months 3–6) |

---

## Role Overview

Owns the **data infrastructure that makes the platform adaptive**. Every feature in the cognitive science synthesis — time-to-solution tracking, mistake taxonomy, hint consumption logging, weakness profiles, SM-2 accuracy trends — requires clean, queryable data.

This role builds the event pipeline, maintains the analytics schema, and delivers the dashboards that the Curriculum Lead and CTO use to make product decisions.

---

## Core Responsibilities

- Design and maintain the **event schema**: `problem_started`, `problem_submitted`, `hint_used`, `solution_revealed`, `card_reviewed`, `session_ended`
- Build the **time-to-solution tracking pipeline** (event timestamps → aggregated per-problem performance data)
- Implement **mistake taxonomy logging**: capture user-selected error type on each "Wrong" / "Blackout" card rating
- Build the **hint consumption log**: which hint level, which problem, which user, at what session time
- Develop the **Weakness Profile engine**: aggregate error taxonomy + time signals into per-user, per-chapter gap reports
- Build **internal analytics dashboards**: SM-2 interval distribution, chapter abandonment rates, fiero moment trigger frequency
- Maintain data pipeline hygiene: deduplication, backfills, schema migration versioning
- Own **GDPR-compliant data retention** and anonymization policies

---

## Tech Stack

| Tool | Use |
|------|-----|
| Supabase (Postgres) | Primary event store |
| dbt | Data transformation and modeling |
| Metabase or Retool | Internal dashboards |
| PostHog | Product analytics — event capture on the frontend |
| Python (pandas, SQLAlchemy) | Batch jobs and data processing |
| pgvector | User embedding similarity queries for cohort clustering |
| Airflow or Dagster | Pipeline scheduling (at scale) |

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Event pipeline latency (user action → queryable record) | < 5 seconds |
| Weakness Profile data coverage (active users within 7 days of use) | ≥ 95% |
| Data loss events | 0 |
| Dashboard-driven product decisions by Curriculum Lead | ≥ 1 per sprint |

---

## Agent Operating Notes

> The AI agent occupies this role. Agent autonomously designs and maintains the event schema, builds dbt models, and generates dashboard definitions. Aksad reviews the event schema on initial design and approves any breaking schema changes. Agent must surface any data quality anomaly (deduplication failures, schema drift) to Aksad within the same sprint cycle.
