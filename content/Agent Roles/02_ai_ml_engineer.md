# Role: AI / ML Engineer
> **Quant Review Platform** · Engineering · Phase 1 Hire · CONFIDENTIAL

---

## Role Snapshot

| Field | Detail |
|-------|--------|
| **Department** | Engineering |
| **Headcount** | 1 Senior |
| **Task Difficulty** | 🔴 High |
| **Engagement Type** | Full-Time / Contract |
| **Hiring Phase** | Phase 1 — Foundation (Months 1–3) |

---

## Role Overview

Owns everything that touches language models and adaptive intelligence. This includes the document ingestion pipeline (quant-aware block taxonomy), the adaptive difficulty engine, the Socratic simulation layer, and all LLM prompt engineering.

Works directly from the cognitive science synthesis — translating **retrieval practice, interleaving, and generation-before-revelation** into production AI features.

---

## Core Responsibilities

- Build and maintain the document ingestion pipeline (PDF → structured blocks → pgvector embeddings)
- Implement **"Generate Before Reveal"** flow: force student to submit approach before solution is shown
- Design the **cross-chapter interleaved practice engine** — problem selection logic that avoids blocked practice
- Build the adaptive difficulty system using time-to-solution + error taxonomy signals
- Develop the **Socratic simulation layer** (AI interviewer mode for mock quant interviews)
- Engineer the **Technique Atlas**: cross-cutting index linking all problems that share a technique (Bayes, martingales, etc.)
- Prompt-engineer and evaluate all LLM calls; maintain evals pipeline to catch regressions
- Implement personalized weakness-profile generation from mistake taxonomy and hint consumption data

---

## Tech Stack

| Layer | Tools |
|-------|-------|
| LLM | Claude API (Anthropic) — primary backbone |
| Vector DB | pgvector (Supabase) for semantic search and retrieval |
| Orchestration | Python, LangChain or direct API orchestration |
| Embeddings | Sentence Transformers / text-embedding-3 |
| GPU Inference | RunPod serverless (heavy document parsing / Docling) |
| Eval Tracking | MLflow or Weights & Biases |
| Output Parsing | Pydantic for structured LLM outputs |
| Testing | Pytest + custom eval harness for regression testing |

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Interleaved practice improvement (delayed test score) | ≥ 30% vs blocked practice baseline |
| Generate-before-reveal completion rate | ≥ 70% |
| Document ingestion pipeline speed | < 3 minutes per new problem set |
| Socratic simulation usefulness rating (beta users) | ≥ 4.2 / 5 |

---

## Agent Operating Notes

> The AI agent fully occupies this role. Aksad provides strategic direction, reviews eval results, and approves prompt changes — but the agent autonomously builds, tests, and iterates on all LLM-powered features. Agent must log all prompt versions, eval scores, and pipeline latency benchmarks for CTO review.
