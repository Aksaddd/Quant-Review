# AI/ML Cost Analysis & Model Selection Strategy
> **AI/ML Engineer** · Phase 1 Foundation · April 2026 · CONFIDENTIAL

---

## 1. Model Pricing Reference (April 2026)

### LLM Providers — Per Million Tokens

| Model | Input | Output | Batch Input | Batch Output | Context |
|-------|------:|-------:|------------:|-------------:|--------:|
| **Claude Opus 4.6** | $5.00 | $25.00 | $2.50 | $12.50 | 1M |
| **Claude Sonnet 4.6** | $3.00 | $15.00 | $1.50 | $7.50 | 1M |
| **Claude Haiku 4.5** | $1.00 | $5.00 | $0.50 | $2.50 | 200K |
| GPT-4o-mini | $0.15 | $0.60 | $0.075 | $0.30 | 128K |
| Gemini 2.5 Flash | $0.30 | $2.50 | — | — | 1M |
| Gemini 2.5 Flash Lite | $0.10 | $0.40 | — | — | 1M |

### Anthropic Discount Multipliers

| Optimization | Discount | Stacks? |
|-------------|----------|---------|
| **Prompt Caching** (cache read) | **90% off** input | Yes |
| Prompt Caching (5-min write) | 1.25x input (one-time) | Yes |
| **Batch API** | **50% off** all tokens | Yes |
| Cache + Batch combined | **95% off** input | — |

### Embedding Providers — Per Million Tokens

| Model | Cost/MTok | Dimensions | MTEB Score |
|-------|----------:|:----------:|-----------:|
| Google text-embedding-005 | **$0.00625** | 768 | ~64% |
| OpenAI text-embedding-3-small | $0.02 | 1536 | ~62% |
| OpenAI text-embedding-3-large | $0.13 | 3072 | ~65% |

**Winner: Google text-embedding-005** — 3.2x cheaper than OpenAI 3-small with comparable quality.

---

## 2. Feature Audit: Task Difficulty × Token Usage × Call Frequency

### Per-Call Token Estimates

For each feature, I estimated tokens by counting actual system prompt length + average problem/solution content + expected response length.

| Feature | System Prompt | Avg Input (user) | Avg Output | **Total/Call** | Task Difficulty |
|---------|:------------:|:----------------:|:----------:|:--------------:|:---------------:|
| **Approach Evaluation** | ~450 tok | ~800 tok (problem + solution + approach) | ~200 tok | **~1,450 tok** | Medium — structured JSON, compare two texts |
| **Hint Generation** | ~350 tok | ~600 tok (problem + solution + approach) | ~80 tok | **~1,030 tok** | Low — short, constrained output |
| **Socratic Interview (per turn)** | ~500 tok | ~300 tok (conversation grows) | ~150 tok | **~950 tok/turn** | High — requires contextual reasoning, persona consistency |
| **Socratic Scoring** | ~400 tok | ~2,000 tok (full transcript) | ~300 tok | **~2,700 tok** | Medium — analyze transcript, produce rubric |
| **Technique Classification** | ~400 tok | ~800 tok (problem + solution) | ~300 tok | **~1,500 tok** | Medium — taxonomy mapping, multi-label |
| **Weakness Analysis** | ~350 tok | ~1,500 tok (performance data blob) | ~500 tok | **~2,350 tok** | Medium — pattern analysis across data |
| **Embeddings (per problem)** | — | ~500 tok (setup + solution) | — | **~500 tok** | N/A — embedding model |

### Call Frequency Per User (Active Study Session)

| Feature | Frequency | Notes |
|---------|-----------|-------|
| Approach Evaluation | 3–8x / session | Once per problem attempted (generate-before-reveal) |
| Hint Generation | 2–6x / session | 0–3 hints per problem, ~2 problems needing hints |
| Socratic Interview | 1x / session, 8–12 turns | Single interview = ~10 API calls |
| Socratic Scoring | 1x / session | Once per completed interview |
| Technique Classification | 0x at runtime | **Batch job** — run once per new problem, cache forever |
| Weakness Analysis | 0.2x / session | Once per ~5 sessions (dashboard view) |
| Embeddings | 0x at runtime | **One-time batch** — embed all 200+ problems on deploy |

---

## 3. Model Selection: Cheapest Viable Model Per Feature

The key insight from benchmarking data: **the most sophisticated production systems use all three tiers together — Haiku for simple tasks, Sonnet for medium, Opus only for the 10–15% that require deep reasoning. This reduces total costs by 60–70%.**

### Recommendation Matrix

| Feature | Min. Required Capability | **Recommended Model** | Why Not Cheaper? | Why Not More Expensive? |
|---------|-------------------------|----------------------|-----------------|------------------------|
| **Approach Evaluation** | Structured JSON, compare two texts, nuanced feedback | **Haiku 4.5** | — | JSON output quality is strong on Haiku; no deep reasoning needed |
| **Hint Generation** | Short constrained output, 2 sentences | **Haiku 4.5** | — | Trivial task, Haiku handles this easily |
| **Socratic Interview** | Persona consistency, multi-turn context, Socratic questioning | **Sonnet 4.6** | Haiku struggles with sustained persona + mathematical reasoning across turns | Opus is overkill for conversational guidance |
| **Socratic Scoring** | Transcript analysis, rubric evaluation | **Haiku 4.5** | — | Structured evaluation of existing text — no creative reasoning |
| **Technique Classification** | Multi-label classification, taxonomy | **Haiku 4.5** | — | Classification is Haiku's sweet spot; batch job anyway |
| **Weakness Analysis** | Pattern recognition, actionable insights | **Haiku 4.5** | — | Data summarization with structured output |
| **Embeddings** | Vector generation | **Google text-embedding-005** | — | 3.2x cheaper than OpenAI with equal or better quality |

### Only One Feature Needs Sonnet

The Socratic interviewer is the only feature that genuinely requires Sonnet-level intelligence. It must:
- Maintain a consistent persona across 10+ turns
- Reason about mathematical correctness in real-time
- Ask probing questions that expose flaws without stating them
- Manage hint budget strategically

Every other feature is a **structured input → structured JSON output** task that Haiku handles reliably.

---

## 4. Cost Projections

### Per-User Session Cost (Optimized Model Selection)

Assumptions: 1 study session = ~5 problems attempted, 1 Socratic interview, hints on 2 problems.

| Feature | Calls | Model | Input Tok | Output Tok | Input Cost | Output Cost | **Total** |
|---------|------:|-------|----------:|-----------:|-----------:|------------:|----------:|
| Approach Eval | 5 | Haiku | 6,250 | 1,000 | $0.006 | $0.005 | **$0.011** |
| Hint Gen | 4 | Haiku | 3,800 | 320 | $0.004 | $0.002 | **$0.006** |
| Socratic (10 turns) | 10 | Sonnet | 9,500 | 1,500 | $0.029 | $0.023 | **$0.051** |
| Socratic Score | 1 | Haiku | 2,400 | 300 | $0.002 | $0.002 | **$0.004** |
| Weakness Analysis | 0.2 | Haiku | 370 | 100 | $0.000 | $0.001 | **$0.001** |
| **Session Total** | | | | | | | **$0.073** |

### Before vs After Optimization

| Strategy | Session Cost | Monthly (20 sessions) | Annual |
|----------|:-----------:|:--------------------:|:------:|
| **All Sonnet** (current default) | $0.22 | $4.40 | $52.80 |
| **All Haiku** (except Socratic) | $0.073 | $1.46 | $17.52 |
| **+ Prompt Caching** (system prompts cached) | $0.052 | $1.04 | $12.48 |
| **+ Batch** (weakness analysis batched) | $0.051 | $1.02 | $12.24 |

**Savings: 77% cost reduction** by using Haiku for 5 of 6 features + prompt caching.

### At Scale

| Users | Sessions/mo | Strategy | Monthly Cost | Annual Cost |
|------:|:----------:|----------|:------------:|:-----------:|
| 100 | 2,000 | All Sonnet | $440 | $5,280 |
| 100 | 2,000 | **Optimized** | **$104** | **$1,248** |
| 1,000 | 20,000 | All Sonnet | $4,400 | $52,800 |
| 1,000 | 20,000 | **Optimized** | **$1,040** | **$12,480** |
| 10,000 | 200,000 | All Sonnet | $44,000 | $528,000 |
| 10,000 | 200,000 | **Optimized** | **$10,400** | **$124,800** |

### One-Time Costs (Infrastructure)

| Task | Items | Model | Est. Tokens | Cost |
|------|------:|-------|------------:|-----:|
| Embed all problems (200+) | 200 | text-embedding-005 | 100K | **$0.0006** |
| Classify all problems | 200 | Haiku Batch | 300K | **$0.15** |
| Embed techniques (25) | 25 | text-embedding-005 | 12K | **~$0.00** |
| **Total one-time** | | | | **< $0.20** |

One-time infrastructure costs are negligible.

---

## 5. Alternative: Drop OpenAI Entirely

Currently the architecture uses:
- **Anthropic** for LLM calls
- **OpenAI** for embeddings

We could eliminate the OpenAI dependency entirely:

| Option | Embedding Model | Cost/MTok | Quality | Vendor Lock-in |
|--------|----------------|----------:|--------:|:--------------:|
| Current | OpenAI text-embedding-3-small | $0.02 | ~62% MTEB | 2 vendors |
| **Recommended** | Google text-embedding-005 | $0.00625 | ~64% MTEB | 2 vendors |
| Alternative | Gemini Embedding 001 | $0.015 | Good | 2 vendors |

**Recommendation: Switch to Google text-embedding-005.** 3.2x cheaper, slightly better quality, and the pgvector dimension just changes from 1536 to 768 in the schema.

---

## 6. Cost Optimization Techniques to Implement

### Priority 1: Model Routing (Biggest Win — 77% savings)

```
Feature                  → Model
─────────────────────────────────────
Approach Evaluation      → Haiku 4.5
Hint Generation          → Haiku 4.5
Socratic Interview       → Sonnet 4.6
Socratic Scoring         → Haiku 4.5
Technique Classification → Haiku 4.5 (batch)
Weakness Analysis        → Haiku 4.5
```

### Priority 2: Prompt Caching (Additional ~30% on input costs)

All 5 system prompts are **static** per feature — they never change between calls. Cache them:
- EVALUATE_APPROACH system prompt: ~450 tokens, cached across all evaluations
- SOCRATIC_INTERVIEWER system prompt: ~500 tokens, cached across all turns in a session
- System prompt + problem context is identical for all turns within one Socratic session

The Socratic interviewer benefits most — the 500-token system prompt + problem context (~800 tokens) is identical across all 10 turns. Caching saves ~12,000 input tokens per session.

### Priority 3: Batch API for Non-Real-Time Features (50% off)

| Feature | Latency-Sensitive? | Batch Eligible? |
|---------|:-----------------:|:---------------:|
| Technique Classification | No (one-time job) | **Yes** |
| Weakness Analysis | No (dashboard refresh) | **Yes** |
| Embeddings | No (one-time job) | **Yes** |
| Approach Evaluation | Yes (user waiting) | No |
| Socratic Interview | Yes (real-time chat) | No |

### Priority 4: Client-Side Caching

- Cache technique classifications permanently (problems don't change)
- Cache weakness analysis for 1 hour (no need to recompute per page load)
- Cache related-problem queries (technique atlas results are static)

---

## 7. Gemini Flash Alternative Assessment

Could we use Gemini 2.5 Flash Lite ($0.10/$0.40) instead of Haiku ($1.00/$5.00) for the simple tasks?

| Dimension | Haiku 4.5 | Gemini 2.5 Flash Lite | Verdict |
|-----------|:---------:|:--------------------:|:-------:|
| Price | $1.00/$5.00 | $0.10/$0.40 | Flash Lite is **10x cheaper** |
| JSON reliability | Strong | Good but less consistent | Haiku is safer |
| Math reasoning | Strong for size | Adequate | Close |
| Tool calling | Zero failures in testing | Occasional issues | Haiku wins |
| Ecosystem | Same SDK as Sonnet | Different SDK | Haiku is simpler |

**Assessment:** Gemini Flash Lite is tempting at 10x cheaper, but introduces a second LLM provider (Anthropic + Google) with a different SDK, error handling, and reliability profile. The added engineering complexity outweighs the savings at current scale.

**Recommendation:** Start with Haiku for simplicity and reliability. Revisit Flash Lite at >5,000 users when marginal cost savings justify the multi-provider complexity.

---

## 8. Final Recommendation Summary

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Primary LLM** | Claude Haiku 4.5 | Handles 5 of 6 features at $1/$5 MTok |
| **Complex LLM** | Claude Sonnet 4.6 | Only for Socratic interviews |
| **Embedding model** | Google text-embedding-005 | 3.2x cheaper than OpenAI, better MTEB score |
| **Schema change** | Vector dimension 1536 → 768 | Match text-embedding-005 output |
| **Prompt caching** | Enable for all system prompts | 90% off cached input tokens |
| **Batch API** | Use for classification + weakness analysis | 50% off, acceptable latency |
| **Estimated cost per user/month** | **~$1.04** (20 sessions) | Down from $4.40 with all-Sonnet |
| **Estimated cost at 1K users** | **~$1,040/month** | Sustainable for an EdTech startup |

---

## Sources

- [Anthropic Claude API Pricing](https://www.finout.io/blog/anthropic-api-pricing)
- [Claude API Pricing Full Breakdown](https://www.metacto.com/blogs/anthropic-api-pricing-a-full-breakdown-of-costs-and-integration)
- [Claude Prompt Caching Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
- [OpenAI API Pricing](https://www.finout.io/blog/openai-pricing-in-2026)
- [GPT-4o-mini Pricing](https://pricepertoken.com/pricing-page/model/openai-gpt-4o-mini)
- [OpenAI Embeddings Pricing](https://costgoat.com/pricing/openai-embeddings)
- [Gemini API Pricing 2026](https://www.metacto.com/blogs/the-true-cost-of-google-gemini-a-guide-to-api-pricing-and-integration)
- [Gemini 2.5 Flash Lite Pricing](https://pricepertoken.com/pricing-page/model/google-gemini-2.5-flash-lite)
- [Claude Opus vs Sonnet vs Haiku Benchmarks](https://tech-insider.org/claude-opus-vs-sonnet-vs-haiku-2026/)
- [Haiku 4.5 vs GPT-4o-mini Comparison](https://blog.galaxy.ai/compare/claude-haiku-4-5-vs-gpt-4o-mini)
- [Multi-Model Routing Strategy](https://www.morphllm.com/anthropic-api-pricing)
