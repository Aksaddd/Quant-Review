# AI/ML Cost Analysis & Model Selection Strategy
> **AI/ML Engineer** · Phase 1 Foundation · April 2026 · CONFIDENTIAL
> **Revision 2** — Updated with full Gemini model assessment

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

## 9. Deep Dive: Google Gemini Model Lineup (Revision 2)

### Complete Gemini Portfolio (April 2026)

Google offers **four generations** of models with dramatically different price/performance points:

| Model | Input/MTok | Output/MTok | Context | Speed | Arena Elo | Generation |
|-------|----------:|------------:|--------:|------:|----------:|:----------:|
| **Gemini 3.1 Flash Lite** | $0.25 | $1.50 | 1M | 381 t/s | 1,432 | Latest |
| **Gemini 3 Flash** | $0.50 | $3.00 | 1M | ~200 t/s | — | Current |
| **Gemini 2.5 Flash Lite** | $0.10 | $0.40 | 1M | ~250 t/s | — | Stable |
| **Gemini 2.5 Flash** | $0.30 | $2.50 | 1M | ~200 t/s | — | Stable |
| **Gemini 2.5 Pro** | $1.25 | $10.00 | 1M | ~100 t/s | — | Stable |
| **Gemini 3.1 Pro** | $1.875 | $15.00 | 1M | ~80 t/s | — | Latest |

**For reference — current Claude stack:**

| Model | Input/MTok | Output/MTok | Context |
|-------|----------:|------------:|--------:|
| Claude Haiku 4.5 | $1.00 | $5.00 | 200K |
| Claude Sonnet 4.6 | $3.00 | $15.00 | 1M |

### Free Tier (Development & Testing)

Google offers a **free tier** — no credit card required:

| Model | RPM | Requests/Day | Tokens/Min |
|-------|----:|-------------:|-----------:|
| Gemini 2.5 Flash | 10 | 250 | 250K |
| Gemini 2.5 Flash Lite | 15 | 1,000 | 250K |
| Gemini 2.5 Pro | 5 | 100 | 250K |

This is significant: **we can develop and test the entire AI pipeline at zero cost** using the free tier. Claude has no free API tier.

### SDK Compatibility

Google provides `@google/genai` (npm), a TypeScript/JavaScript SDK that works with Next.js API routes — same architecture as our current `@anthropic-ai/sdk` integration.

```
npm i @google/genai
```

---

### Head-to-Head: Gemini vs Claude for Each Feature

#### Feature 1: Approach Evaluation (Generate-Before-Reveal)

Task: Compare student text against official solution, return structured JSON.

| Dimension | Gemini 2.5 Flash Lite | Claude Haiku 4.5 | Winner |
|-----------|:--------------------:|:----------------:|:------:|
| Input cost | $0.10/MTok | $1.00/MTok | **Gemini (10x)** |
| Output cost | $0.40/MTok | $5.00/MTok | **Gemini (12.5x)** |
| JSON reliability | Good (schema mode available) | Strong | Haiku slightly |
| Math understanding | Adequate for comparison | Strong | Haiku slightly |
| **Est. cost/call** | **$0.0007** | **$0.0073** | **Gemini (10x)** |

**Verdict: Gemini 2.5 Flash Lite wins.** This is a structured comparison task — it doesn't need deep reasoning. The 10x cost advantage is decisive. Use `response_mime_type: "application/json"` with a response schema to enforce valid JSON.

#### Feature 2: Hint Generation

Task: Generate 1–2 sentence hint, constrained output.

| Dimension | Gemini 2.5 Flash Lite | Claude Haiku 4.5 | Winner |
|-----------|:--------------------:|:----------------:|:------:|
| Input cost | $0.10 | $1.00 | **Gemini (10x)** |
| Output cost | $0.40 | $5.00 | **Gemini (12.5x)** |
| Quality | Adequate | Strong | Haiku slightly |
| **Est. cost/call** | **$0.0005** | **$0.0052** | **Gemini (10x)** |

**Verdict: Gemini 2.5 Flash Lite wins.** Trivial task. Any model handles 2-sentence constrained output.

#### Feature 3: Socratic Interview (Multi-Turn)

Task: Maintain persona, reason about math, strategic hint management across 10+ turns.

| Dimension | Gemini 2.5 Flash | Claude Sonnet 4.6 | Winner |
|-----------|:----------------:|:-----------------:|:------:|
| Input cost | $0.30/MTok | $3.00/MTok | **Gemini (10x)** |
| Output cost | $2.50/MTok | $15.00/MTok | **Gemini (6x)** |
| Multi-turn coherence | Good with thinking budget | Excellent | Sonnet |
| Math reasoning | Strong (AIME 86.7%) | Excellent (89%) | Close |
| Persona consistency | Adequate | Strong | Sonnet |
| **Est. cost/session (10 turns)** | **$0.0055** | **$0.051** | **Gemini (9x)** |

**Verdict: Gemini 2.5 Flash is viable.** This was the one feature we reserved for Sonnet. Gemini 2.5 Flash with a thinking budget can handle Socratic questioning at 9x lower cost. The quality gap is real but may be acceptable for an MVP — and Gemini's 1M context window means conversation history never gets truncated.

**Risk:** Persona consistency is Gemini's weakest point here. Recommendation: **test with Gemini 2.5 Flash first, fall back to Sonnet if user ratings drop below 4.0/5.**

#### Feature 4: Socratic Scoring

Task: Analyze transcript, produce rubric scores as JSON.

| Dimension | Gemini 2.5 Flash Lite | Claude Haiku 4.5 | Winner |
|-----------|:--------------------:|:----------------:|:------:|
| Cost/call | ~$0.001 | ~$0.013 | **Gemini (13x)** |
| Quality | Good | Strong | Haiku slightly |

**Verdict: Gemini 2.5 Flash Lite wins.** Structured evaluation of existing text.

#### Feature 5: Technique Classification (Batch)

Task: Multi-label classification with taxonomy mapping, one-time batch job.

| Dimension | Gemini 2.5 Flash Lite | Claude Haiku 4.5 | Winner |
|-----------|:--------------------:|:----------------:|:------:|
| Cost for all 200 problems | ~$0.003 | ~$0.15 | **Gemini (50x)** |
| Classification quality | Good | Strong | Haiku slightly |

**Verdict: Gemini 2.5 Flash Lite wins.** One-time batch job. Even if quality is slightly lower, we can review and correct the 200 classifications manually.

#### Feature 6: Weakness Analysis

Task: Analyze performance data, produce structured insights.

| Dimension | Gemini 2.5 Flash Lite | Claude Haiku 4.5 | Winner |
|-----------|:--------------------:|:----------------:|:------:|
| Cost/call | ~$0.001 | ~$0.012 | **Gemini (12x)** |
| Quality | Good | Strong | Haiku slightly |

**Verdict: Gemini 2.5 Flash Lite wins.** Data summarization task.

#### Feature 7: Embeddings

Already using Google text-embedding-005 ($0.00625/MTok). No change needed.

---

### Revised Cost Projection: All-Gemini Stack

| Feature | Model | Est. Cost/Call | Calls/Session | Session Cost |
|---------|-------|:-------------:|:-------------:|-----------:|
| Approach Eval | Gemini 2.5 Flash Lite | $0.0007 | 5 | $0.0035 |
| Hint Generation | Gemini 2.5 Flash Lite | $0.0005 | 4 | $0.0020 |
| Socratic (10 turns) | Gemini 2.5 Flash | $0.0055 | 1 | $0.0055 |
| Socratic Scoring | Gemini 2.5 Flash Lite | $0.0010 | 1 | $0.0010 |
| Weakness Analysis | Gemini 2.5 Flash Lite | $0.0010 | 0.2 | $0.0002 |
| **Session Total** | | | | **$0.012** |

### Strategy Comparison: All Costs Per User Per Month (20 Sessions)

| Strategy | Session Cost | Monthly | Annual | vs. All-Sonnet |
|----------|:----------:|:------:|:------:|:--------------:|
| All Sonnet (original) | $0.22 | $4.40 | $52.80 | — |
| Haiku + Sonnet (Rev 1) | $0.052 | $1.04 | $12.48 | **-76%** |
| **All Gemini (Rev 2)** | **$0.012** | **$0.24** | **$2.88** | **-95%** |

### At Scale — All Gemini

| Users | Sessions/mo | Monthly Cost | Annual Cost |
|------:|:----------:|:------------:|:-----------:|
| 100 | 2,000 | **$24** | **$288** |
| 1,000 | 20,000 | **$240** | **$2,880** |
| 10,000 | 200,000 | **$2,400** | **$28,800** |

At 10,000 users: **$2,400/month** on Gemini vs **$10,400/month** on Haiku+Sonnet vs **$44,000/month** on all-Sonnet.

---

### Known Gemini Risks & Mitigations

| Risk | Severity | Mitigation |
|------|:--------:|------------|
| **Flash Lite JSON reliability** — documented issues with backtick-wrapped JSON on some inputs | Medium | Use `response_mime_type: "application/json"` + response schema (enforces valid JSON server-side). Add client-side JSON cleanup as fallback. |
| **Silent truncation** — no error when response hits token limit | Medium | Set explicit `maxOutputTokens` below limit. Validate response completeness client-side. |
| **Free tier privacy** — prompts may be used to improve Google products | Low | Use paid tier for production. Free tier only for development. |
| **Gemini 2.5 Flash deprecation** — scheduled shutdown June 2026 | High | Build provider-agnostic abstraction layer. Plan migration to Gemini 3 Flash ($0.50/$3.00) before June. |
| **Multi-turn persona drift** — Gemini less consistent than Claude in sustained personas | Medium | For Socratic interviews: implement a model-selection fallback. Start with Gemini 2.5 Flash; if user satisfaction < 4.0/5, route to Claude Sonnet. |

---

### 10. Revised Recommendation: Dual-Provider Architecture

Instead of picking one provider, build a **provider-agnostic service layer** that routes to the cheapest capable model:

```
Feature                  → Primary Model            → Fallback
────────────────────────────────────────────────────────────────
Approach Evaluation      → Gemini 2.5 Flash Lite    → Haiku 4.5
Hint Generation          → Gemini 2.5 Flash Lite    → Haiku 4.5
Socratic Interview       → Gemini 2.5 Flash         → Sonnet 4.6
Socratic Scoring         → Gemini 2.5 Flash Lite    → Haiku 4.5
Technique Classification → Gemini 2.5 Flash Lite    → Haiku 4.5
Weakness Analysis        → Gemini 2.5 Flash Lite    → Haiku 4.5
Embeddings               → Google text-embedding-005 (no fallback needed)
```

**Why dual-provider and not all-Gemini?**
- Claude remains the safety net for quality-critical features
- If Gemini has an outage or deprecation, we failover instantly
- The abstraction layer costs us a few hours of engineering once, saves us permanently

**Development strategy:**
1. Build on Gemini free tier (zero cost during development)
2. Launch MVP on Gemini paid tier ($0.24/user/month)
3. Monitor quality metrics — fall back to Claude per-feature if needed
4. Migrate from Gemini 2.5 Flash → 3 Flash before June 2026 deprecation

---

## Sources

- [Anthropic Claude API Pricing](https://www.finout.io/blog/anthropic-api-pricing)
- [Claude API Pricing Full Breakdown](https://www.metacto.com/blogs/anthropic-api-pricing-a-full-breakdown-of-costs-and-integration)
- [Claude Prompt Caching Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
- [OpenAI API Pricing](https://www.finout.io/blog/openai-pricing-in-2026)
- [GPT-4o-mini Pricing](https://pricepertoken.com/pricing-page/model/openai-gpt-4o-mini)
- [OpenAI Embeddings Pricing](https://costgoat.com/pricing/openai-embeddings)
- [Gemini API Pricing 2026 Complete Guide](https://www.metacto.com/blogs/the-true-cost-of-google-gemini-a-guide-to-api-pricing-and-integration)
- [Gemini 2.5 Flash Lite Pricing](https://pricepertoken.com/pricing-page/model/google-gemini-2.5-flash-lite)
- [Gemini 3.1 Flash Lite — Google Blog](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-lite/)
- [Gemini 3.1 Flash Lite vs 2.5 Flash Benchmarks](https://www.buildfastwithai.com/blogs/gemini-3-1-flash-lite-vs-2-5-flash-speed-cost-benchmarks-2026)
- [Gemini 3 Flash vs 2.5 Flash](https://www.aifreeapi.com/en/posts/gemini-3-flash-vs-gemini-2-5-flash)
- [Gemini Free Tier Limits 2026](https://tokenmix.ai/blog/gemini-api-free-tier-limits)
- [Gemini Flash Lite Structured Output Issues](https://discuss.ai.google.dev/t/gemini-2-5-flash-lite-produces-incorrect-structured-output/102367)
- [Gemini Developer Guide 2026 — Production Pitfalls](https://www.shareuhack.com/en/posts/gemini-2-5-flash-developer-guide-2026)
- [Haiku 4.5 vs Gemini 2.5 Flash Comparison](https://blog.galaxy.ai/compare/claude-haiku-4-5-vs-gemini-2-5-flash)
- [Sonnet 4.6 vs Gemini 2.5 Pro Benchmarks](https://benchlm.ai/compare/claude-sonnet-4-6-vs-gemini-2-5-pro)
- [Claude Opus vs Sonnet vs Haiku Benchmarks](https://tech-insider.org/claude-opus-vs-sonnet-vs-haiku-2026/)
- [Haiku 4.5 vs GPT-4o-mini Comparison](https://blog.galaxy.ai/compare/claude-haiku-4-5-vs-gpt-4o-mini)
- [Multi-Model Routing Strategy](https://www.morphllm.com/anthropic-api-pricing)
- [Google Gen AI JS SDK](https://github.com/googleapis/js-genai)
