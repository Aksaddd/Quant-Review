import type { Chapter } from '@/lib/types';

/** Auto-generated from content/chapters/chapter-06-finance.md — run `node scripts/gen-chapters.js` after editing. */
const chapter6: Chapter = {
  id: 'chapter-6',
  number: 6,
  title: "Finance",
  pageRange: "137–169",
  overview: "Options pricing, the Greeks, and exotic derivatives. This chapter develops Black–Scholes intuition from risk-neutral pricing, then walks through hedging, Greeks, exotic payoffs, and general finance interview questions.",
  tags: ["options","black-scholes","greeks","exotics","derivatives","finance"],
  sections: [
    {
      id: "6.1",
      title: "Option Pricing",
      problemCount: 6,
      blocks: [
        { kind: 'prose', markdown: `### Notation Reference

| Symbol | Meaning |
|--------|---------|
| \`T\` | Maturity date |
| \`t\` | Current time |
| \`τ = T - t\` | Time to maturity |
| \`S\` | Stock price at time \`t\` |
| \`r\` | Continuous risk-free interest rate |
| \`y\` | Continuous dividend yield |
| \`σ\` | Annualized asset volatility |
| \`c\` | Price of a European call |
| \`p\` | Price of a European put |
| \`C\` | Price of an American call |
| \`P\` | Price of an American put |
| \`D\` | Present value (at \`t\`) of future dividends |
| \`K\` | Strike price |
| \`PV\` | Present value at \`t\` |` },
        {
          kind: 'problem',
          problem: {
            id: "ch6-6-1-01-option-pricing-problem-1",
            chapter: 6,
            section: "6.1",
            sectionTitle: "Option Pricing",
            title: "Option Pricing Problem 1",
            difficulty: "medium",
            keyTechnique: "",
            tags: ["options","black-scholes","greeks","exotics","derivatives","finance"],
            setup: `How do vanilla European/American option prices change when S, K, r, σ, τ, or D changes?`,
            solution: `The payoff of a call is \`max(S - K, 0)\` and the payoff of a put is \`max(K - S, 0)\`. A European option can only be exercised at expiration; an American option can be exercised at any time before maturity.

**Table 6.1 — Impact of market variables on option prices:**

| Variable | European Call | European Put | American Call | American Put |
|----------|--------------|--------------|---------------|--------------|
| Stock price ↑ | ↑ | ↓ | ↑ | ↓ |
| Strike price ↑ | ↓ | ↑ | ↓ | ↑ |
| Time to maturity ↑ | ? | ? | ↑ | ↑ |
| Volatility ↑ | ↑ | ↑ | ↑ | ↑ |
| Risk-free rate ↑ | ↑ | ↓ | ↑ | ↓ |
| Dividends ↑ | ↓ | ↑ | ↓ | ↑ |

> **Note:** The effect of time to maturity on European calls/puts is uncertain because a large dividend between two maturity dates can make the shorter-maturity call more valuable.`,
            hints: [],
          },
        },
        {
          kind: 'problem',
          problem: {
            id: "ch6-6-1-02-formula-european-options-with-dividends",
            chapter: 6,
            section: "6.1",
            sectionTitle: "Option Pricing",
            title: "Formula (European options with dividends):",
            difficulty: "medium",
            keyTechnique: "",
            tags: ["options","black-scholes","greeks","exotics","derivatives","finance"],
            setup: `Write down and prove put-call parity for European options on non-dividend paying stocks.`,
            solution: `The parity is:
\`\`\`
c + K·e^(-rT) = p + S
\`\`\`

- **Portfolio A** (left side): Long a call + zero-coupon bond with face value K. Payoff at T: \`max(S_T - K, 0) + K = max(S_T, K)\`
- **Portfolio B** (right side): Long a put + underlying stock (protective put). Payoff at T: \`max(K - S_T, 0) + S_T = max(S_T, K)\`

Both portfolios have identical payoffs at T and no intermediate payments, so by no-arbitrage they must have the same value at t.

**Alternative insight:** Rearranging to \`c - p = S - K·e^(-rT)\` reveals that long call + short put replicates a forward with delivery price K (present value: \`S - K·e^(-rT)\`). Therefore:
- When \`K = S·e^(rT)\` (forward price): call = put
- When \`K < S·e^(rT)\`: call > put
- When \`K > S·e^(rT)\`: put > call`,
            hints: [],
          },
        },
        { kind: 'prose', markdown: `### American vs. European Options

#### Part A — Why never exercise an American call on a non-dividend paying stock early?

**Solution (3 arguments):**

**Argument 1 — Time Value:**
Exercising early yields only intrinsic value \`S - K\`. The option price includes time value (positive for non-dividend paying stocks), so selling the option dominates early exercise.

From put-call parity: \`c = (S - K) + (K - K·e^(-rT)) + p\`
- Component 1: intrinsic value \`S - K\`
- Component 2: time value of strike (positive, since \`K > K·e^(-rT)\`)
- Component 3: put value (positive protection against downside)

All components are positive → European call > intrinsic value → American call > intrinsic value → never optimal to exercise early.

**Argument 2 — Dominant Strategy:**
At time \`t < T\`, instead of exercising:
- Keep the call
- Short the underlying stock
- Lend K dollars at rate r

**Cash flow comparison:**

| Time | Exercise | Alternative |
|------|----------|-------------|
| t | S - K | S - K (same) |
| T (S_T < K) | — | K·e^(rT) - S_T > 0 |
| T (S_T > K) | — | K·e^(rT) - K > 0 |

The alternative always yields positive cash flow at T → keeping the call alive is strictly better.

**Argument 3 — Jensen's Inequality:**
The call payoff \`C(S) = max(S - K, 0)\` is a convex function of S. Under risk-neutral measure, \`E[S_T] = S·e^(rT)\`. By Jensen's inequality:

\`\`\`
E[e^(-rT) · C(S_T)] ≥ e^(-rT) · C(E[S_T]) ≥ C(S_t)
\`\`\`

So the discounted expected future payoff is always ≥ the current intrinsic value → never optimal to exercise early.

> **Note:** This argument does NOT extend to American puts. A put's payoff \`P(S) = max(K - S, 0)\` is also convex, but \`P(0) = K ≠ 0\`, so \`P(λS) ≥ λP(S)\`, not \`≤\`. Early exercise of deep in-the-money American puts can be optimal.` },
        {
          kind: 'problem',
          problem: {
            id: "ch6-6-1-03-option-pricing-problem-3",
            chapter: 6,
            section: "6.1",
            sectionTitle: "Option Pricing",
            title: "Option Pricing Problem 3",
            difficulty: "medium",
            keyTechnique: "",
            tags: ["options","black-scholes","greeks","exotics","derivatives","finance"],
            setup: `A European put with K = $80 is priced at $8. A put on the same stock with K = $90 is priced at $9. Is there an arbitrage?`,
            solution: `The price of a put option is a convex function of the strike price. Since \`P(0) = 0\`, we need \`P(80) ≤ (80/90) × P(90) = (8/9) × 9 = 8\`.

The put with K = $80 is priced at exactly $8, which equals the upper bound — it is overpriced (even marginally). Arbitrage portfolio:

- **Short** 9 units of put with K = $80
- **Long** 8 units of put with K = $90
- Initial cash flow: 0

**Payoffs at maturity:**
| Scenario | Payoff |
|----------|--------|
| S_T > 90 | 0 (no puts exercised) |
| 80 < S_T < 90 | 8 × (90 - S_T) > 0 |
| S_T < 80 | 8(90 - S_T) - 9(80 - S_T) = S_T > 0 |

Final payoff ≥ 0 with positive probability of strictly positive payoff → arbitrage opportunity.`,
            hints: [],
          },
        },
        {
          kind: 'problem',
          problem: {
            id: "ch6-6-1-04-option-pricing-problem-4",
            chapter: 6,
            section: "6.1",
            sectionTitle: "Option Pricing",
            title: "Option Pricing Problem 4",
            difficulty: "medium",
            keyTechnique: "",
            tags: ["options","black-scholes","greeks","exotics","derivatives","finance"],
            setup: `Write down the BSM PDE and briefly explain how to derive it.`,
            solution: `If the stock price follows geometric Brownian motion:
\`\`\`
dS = μS·dt + σS·dW(t)
\`\`\`

Applying Itô's Lemma to \`V = V(S, t)\`:
\`\`\`
dV = (∂V/∂t + μS·∂V/∂S + ½σ²S²·∂²V/∂S²)dt + σS·∂V/∂S·dW(t)
\`\`\`

**Black-Scholes-Merton PDE:**
\`\`\`
∂V/∂t + rS·∂V/∂S + ½σ²S²·∂²V/∂S² = rV
\`\`\`

**Derivation:** Build a delta-hedged portfolio:
\`\`\`
Π = V - (∂V/∂S)·S
\`\`\`

This portfolio is risk-free (no \`dW\` term), so it must earn the risk-free rate: \`dΠ = r·Π·dt\`. Combining with the Itô expansion of \`dV\` yields the BSM PDE.

**Connection to Feynman-Kac Theorem:** The BSM PDE is a special case. For an Itô process \`dX = β(t,X)dt + γ(t,X)dW(t)\`, if \`V(t,x) = E[e^(-r(T-t))·f(X_T) | X_t = x]\`, then V satisfies:
\`\`\`
∂V/∂t + β(t,x)·∂V/∂x + ½γ²(t,x)·∂²V/∂x² = rV
\`\`\`

Setting \`β = rS\` and \`γ = σS\` recovers the BSM PDE.`,
            hints: [],
          },
        },
        { kind: 'prose', markdown: `### Black-Scholes Formula

**Formula (European calls and puts with continuous dividend yield y):**
\`\`\`
c = S·e^(-yT)·N(d₁) - K·e^(-rT)·N(d₂)
p = K·e^(-rT)·N(-d₂) - S·e^(-yT)·N(-d₁)
\`\`\`

Where:
\`\`\`
d₁ = [ln(S/K) + (r - y + σ²/2)T] / (σ√T)
d₂ = d₁ - σ√T
\`\`\`

\`N(x)\` = CDF of the standard normal distribution.

**Special cases:**
- Underlying is a futures contract: \`y = r\`
- Underlying is foreign currency: \`y = r_f\` (foreign risk-free rate)` },
        { kind: 'prose', markdown: `#### Part A — Assumptions Behind Black-Scholes

**Solution:**

1. The stock pays **no dividends**
2. The risk-free interest rate is **constant and known**
3. Stock price follows **geometric Brownian motion** with constant drift μ and volatility σ: \`dS = μS·dt + σS·dW(t)\`
4. **No transaction costs or taxes**; short sale proceeds can be fully invested
5. All securities are **perfectly divisible**
6. **No risk-free arbitrage** opportunities` },
        { kind: 'prose', markdown: `#### Part B — Derive Black-Scholes via Risk-Neutral Pricing

**Solution:**

Under risk-neutral measure: \`dS = rS·dt + σS·dW(t)\`

Applying Itô's lemma to \`ln(S)\`:
\`\`\`
d(ln S) = (r - σ²/2)dt + σdW(t)
=> ln(S_T) ~ N(ln(S) + (r - σ²/2)T, σ²T)
\`\`\`

So \`S_T = S·e^((r - σ²/2)T + σ√T·ε)\` where \`ε ~ N(0,1)\`.

The call option is in the money when \`ε > -d₂\`. Computing the expected payoff:
\`\`\`
E[max(S_T - K, 0)] = S·e^(rT)·N(d₁) - K·N(d₂)
\`\`\`

Discounting:
\`\`\`
c = e^(-rT)·E[max(S_T - K, 0)] = S·N(d₁) - K·e^(-rT)·N(d₂)
\`\`\`

**Key insight:** \`N(d₂)\` is the risk-neutral probability that the call finishes in the money.` },
        { kind: 'prose', markdown: `#### Part C — Derive Black-Scholes via PDE (Heat Equation)

**Solution:** *(Advanced — requires PDE background)*

> **Note on notation:** To avoid conflict with \`y\` (dividend yield used elsewhere in this chapter), the book uses \`y\` only within this derivation as a change-of-variable. Here we rename it \`z\` for clarity.

Transform the BSM PDE using three substitutions:
- \`z = ln S\` (converts geometric BM to arithmetic BM)
- \`τ = T - t\` (reverses time direction: τ=0 at maturity, τ=T at inception)
- \`u = e^(rτ)·V\` (eliminates the \`rV\` term)

A fourth substitution \`x = z + (r - σ²/2)τ\` eliminates the first-order \`∂u/∂z\` term. After all substitutions, the BSM PDE reduces to the **heat/diffusion equation**:

\`\`\`
∂u/∂τ = (σ²/2) · ∂²u/∂x²
\`\`\`

**Boundary condition** at τ = 0 (maturity), expressed in the original variable S = e^z:

\`\`\`
u(x, 0) = max(e^z - K, 0) = max(S_T - K, 0)
\`\`\`

The fundamental solution to the heat equation applied with this boundary condition yields exactly the same result as the risk-neutral pricing approach: \`V(S,t) = S·N(d₁) - K·e^(-rT)·N(d₂)\`.` },
        {
          kind: 'problem',
          problem: {
            id: "ch6-6-1-05-option-pricing-problem-5",
            chapter: 6,
            section: "6.1",
            sectionTitle: "Option Pricing",
            title: "Option Pricing Problem 5",
            difficulty: "medium",
            keyTechnique: "",
            tags: ["options","black-scholes","greeks","exotics","derivatives","finance"],
            setup: `Assume zero interest rate, current stock price $1 (no dividends). The stock hits level $H (H > 1) for the first time and pays $1. What is this option worth today?`,
            solution: `**Risk-neutral / Martingale approach:**

Under risk-neutral measure with \`r = 0\`: \`dS = σS·dW(t)\` → \`d(ln S) = -½σ²dt + σdW(t)\`

Using the exponential martingale \`Z(t) = exp(λW(t) - ½λ²t)\` with \`E[Z(t)] = 1\`, set \`λ = σ\`:

Let P = probability that \`ln S\` ever reaches \`ln H\`. Then:
\`\`\`
P·exp(ln H) + (1-P)·exp(-∞) = 1
P·H = 1 → P = 1/H
\`\`\`

The option value = probability that S reaches H = **$1/H**.

**No-arbitrage confirmation:**
- To pay $1 when S hits H, buy \`1/H\` shares at $1 each → cost = $1/H → option worth no more than $1/H
- If option price C < $1/H, borrow C shares and buy option; when S = H, exercise for $1, return C shares at cost C·H < 1 → positive profit with zero initial investment (contradiction)
- Therefore: option price = **$1/H** exactly.`,
            hints: [],
          },
        },
        {
          kind: 'problem',
          problem: {
            id: "ch6-6-1-06-option-pricing-problem-6",
            chapter: 6,
            section: "6.1",
            sectionTitle: "Option Pricing",
            title: "Option Pricing Problem 6",
            difficulty: "medium",
            keyTechnique: "",
            tags: ["options","black-scholes","greeks","exotics","derivatives","finance"],
            setup: `What is the value of a contract that pays \`1/S_T\` at maturity T?`,
            solution: `Apply Itô's lemma to \`V = 1/S\`:

\`\`\`
dV = (-r + σ²)V·dt - σV·dW(t)
\`\`\`

So V follows a geometric Brownian motion. Applying Itô's lemma to \`ln V\`:

\`\`\`
d(ln V) = (-r + ½σ²)dt - σdW(t)
\`\`\`

Therefore: \`E[V_T] = (1/S)·e^((-r + σ²)T)\`

where S is the **current** stock price (deterministic, not the terminal random variable S_T).

Discounting: **\`V = e^(-rT)·E[V_T] = (1/S)·e^(-2rT + σ²T)\`**

---`,
            hints: [],
          },
        },
      ],
    },
    {
      id: "6.2",
      title: "The Greeks",
      problemCount: 8,
      blocks: [
        { kind: 'prose', markdown: `All Greeks are first- or second-order partial derivatives of the option price measuring risks and potential returns.

| Greek | Symbol | Definition |
|-------|--------|-----------|
| Delta | Δ | ∂V/∂S |
| Gamma | Γ | ∂²V/∂S² |
| Theta | Θ | ∂V/∂t |
| Vega | ν | ∂V/∂σ |
| Rho | ρ | ∂V/∂r |

**For European options with dividend yield y:**
- **Call Delta:** \`Δ = e^(-yT)·N(d₁)\`
- **Put Delta:** \`Δ = -e^(-yT)·[1 - N(d₁)]\`` },
        {
          kind: 'problem',
          problem: {
            id: "ch6-6-2-01-the-greeks-problem-1",
            chapter: 6,
            section: "6.2",
            sectionTitle: "The Greeks",
            title: "The Greeks Problem 1",
            difficulty: "medium",
            keyTechnique: "",
            tags: ["options","black-scholes","greeks","exotics","derivatives","finance"],
            setup: `What is the delta of a European call on a non-dividend paying stock?`,
            solution: `For \`c = S·N(d₁) - K·e^(-rT)·N(d₂)\`, a common mistake is treating N(d₁) and N(d₂) as constants. They are both functions of S through d₁ and d₂. The correct partial derivative is:

\`\`\`
∂c/∂S = N(d₁) + S·(∂N(d₁)/∂S) - K·e^(-rT)·(∂N(d₂)/∂S)
\`\`\`

Taking partial derivatives of N(d₁) and N(d₂) with respect to S:

\`\`\`
∂N(d₁)/∂S = N'(d₁) · (1/(Sσ√T))
∂N(d₂)/∂S = N'(d₂) · (1/(Sσ√T))
\`\`\`

The key identity (verifiable from the definitions of d₁ and d₂) is:

\`\`\`
S · N'(d₁) = K · e^(-rT) · N'(d₂)
\`\`\`

This follows because \`N'(d₂)/N'(d₁) = exp((d₁²-d₂²)/2) = exp(d₁σ√T - σ²T/2) = (S/K)·e^(rT)\`.

Therefore: \`S·∂N(d₁)/∂S - K·e^(-rT)·∂N(d₂)/∂S = [S·N'(d₁) - K·e^(-rT)·N'(d₂)]/(Sσ√T) = 0\`

Therefore: **\`Δ = N(d₁)\`**`,
            hints: [],
          },
        },
        {
          kind: 'problem',
          problem: {
            id: "ch6-6-2-02-the-greeks-problem-2",
            chapter: 6,
            section: "6.2",
            sectionTitle: "The Greeks",
            title: "The Greeks Problem 2",
            difficulty: "medium",
            keyTechnique: "",
            tags: ["options","black-scholes","greeks","exotics","derivatives","finance"],
            setup: `Estimate delta for an at-the-money call. What happens as maturity approaches?`,
            solution: `For S = K (at-the-money):
\`\`\`
d₁ = (r/σ + σ/2)√T > 0 → Δ = N(d₁) > 0.5
\`\`\`

All at-the-money call options have Δ > 0.5. The longer the maturity, the higher the Δ.

As \`T - t → 0\`: \`d₁ → 0 → N(d₁) → N(0) = 0.5\`

**Behavior with stock price:**
- When \`S >> K\` (deep ITM): Δ → 1 (faster for shorter maturities)
- When \`S << K\` (deep OTM): Δ → 0 (faster for shorter maturities)`,
            hints: [],
          },
        },
        {
          kind: 'problem',
          problem: {
            id: "ch6-6-2-03-the-greeks-problem-3",
            chapter: 6,
            section: "6.2",
            sectionTitle: "The Greeks",
            title: "The Greeks Problem 3",
            difficulty: "medium",
            keyTechnique: "",
            tags: ["options","black-scholes","greeks","exotics","derivatives","finance"],
            setup: `You are long a European call on GM and want to delta hedge. How do you hedge? If GM's stock price suddenly increases, how do you rebalance?`,
            solution: `**Initial hedge:** Short Δ = \`e^(-yT)·N(d₁)\` shares of GM stock for each call option. Also invest cash (lend \`K·e^(-rT)·N(d₂)\` per call) in the money market.

**Rebalancing after price increase:**
Since Δ is an increasing function of d₁, a rise in S increases d₁ → increases Δ. Therefore, short more stock and lend more cash.

The delta hedge only replicates the option's value and slope. To hedge curvature as well, gamma hedging is also required.`,
            hints: [],
          },
        },
        {
          kind: 'problem',
          problem: {
            id: "ch6-6-2-04-the-greeks-problem-4",
            chapter: 6,
            section: "6.2",
            sectionTitle: "The Greeks",
            title: "The Greeks Problem 4",
            difficulty: "medium",
            keyTechnique: "",
            tags: ["options","black-scholes","greeks","exotics","derivatives","finance"],
            setup: `Estimate the value of an at-the-money call on a non-dividend paying stock (low interest rate, short maturity).`,
            solution: `When S = K: \`c = S·(N(d₁) - e^(-rT)·N(d₂))\`

For low r (r ≈ 0) and small T:
\`\`\`
c ≈ S·(N(d₁) - N(d₂))
\`\`\`

Since both d₁ and d₂ are close to 0, approximate using the normal PDF at 0 (\`N'(0) = 1/√(2π)\`):
\`\`\`
N(d₁) - N(d₂) ≈ (1/√(2π))·(d₁ - d₂) = σ√T/√(2π)
\`\`\`

**Result: \`c ≈ 0.4·σ·S·√T\`**

> **Practical use:** Volatility traders use this approximation to estimate implied volatility of at-the-money options: \`σ ≈ c / (0.4·S·√T)\`.`,
            hints: [],
            finalAnswer: "`c ≈ 0.4·σ·S·√T`",
          },
        },
        {
          kind: 'problem',
          problem: {
            id: "ch6-6-2-05-formula-european-call-put-with-dividend-yield-y",
            chapter: 6,
            section: "6.2",
            sectionTitle: "The Greeks",
            title: "Formula (European call/put with dividend yield y):",
            difficulty: "medium",
            keyTechnique: "",
            tags: ["options","black-scholes","greeks","exotics","derivatives","finance"],
            setup: `What happens to gamma of an at-the-money option near maturity?`,
            solution: `- **Deep ITM or OTM (S far from K):** Γ → 0 because delta is nearly constant at 1 or 0 respectively. When comparing maturities in this region, **longer** maturities have higher gamma (N'(d₁) decays more slowly than the denominator \`S·σ·√T\` grows).
- **Near ATM (S ≈ K):** **Shorter** maturities have higher gamma — as T - t → 0, delta transitions sharply from 0 to 1, making the slope (gamma) increasingly steep.
- **ATM exactly at expiry:** As T - t → 0 with S = K, d₁ → 0 so \`N'(d₁) → 1/√(2π)\`, while the denominator \`S·σ·√T → 0\`, giving **Γ → ∞**. Delta becomes a step function, making hedging practically impossible.

This means delta becomes a step function at expiry — making hedging extremely difficult when t → T for ATM options.`,
            hints: [],
          },
        },
        { kind: 'prose', markdown: `### Theta

**Formula (European call, no dividend):**
\`\`\`
Θ = -S·N'(d₁)·σ / (2√T) - r·K·e^(-rT)·N(d₂)
\`\`\`

This is always **negative** for European calls on non-dividend paying stocks (options lose value as time passes, all else equal).

**Behavior:**
- Deep OTM (S << K): Θ → 0
- Deep ITM (S >> K): Θ → -r·K·e^(-rT)` },
        { kind: 'prose', markdown: `#### Part A — When Can a European Option Have Positive Theta?

**Solution:**

American options and European calls on non-dividend paying stocks always have Θ < 0. However, **deep in-the-money European puts** can have positive theta:

For a put on a non-dividend paying stock with S << K:
- \`N'(d₁) ≈ 0\` and \`N(-d₂) ≈ 1\`
- \`Θ ≈ r·K·e^(-rT) > 0\`

This is also why it can be optimal to exercise a deep ITM American put before maturity.

Similarly, **deep ITM European calls with high dividend yield** can have positive theta when \`y·S·e^(-yT)·N(d₁)\` dominates.` },
        {
          kind: 'problem',
          problem: {
            id: "ch6-6-2-06-the-greeks-problem-6",
            chapter: 6,
            section: "6.2",
            sectionTitle: "The Greeks",
            title: "The Greeks Problem 6",
            difficulty: "medium",
            keyTechnique: "",
            tags: ["options","black-scholes","greeks","exotics","derivatives","finance"],
            setup: `You are long a call and short delta shares (delta-neutral). What happens if the stock moves immediately up or down? Is this an arbitrage?`,
            solution: `The position is delta-neutral and long gamma. Any immediate move (up or down) in the stock price increases the portfolio value (positive gamma = convexity benefit).

However, this is **not an arbitrage**. From the BSM PDE for a delta-neutral portfolio:
\`\`\`
Θ + ½σ²S²·Γ = r·V
\`\`\`

This shows that **gamma and theta have opposite signs**. Being long gamma means being short theta — the portfolio loses value over time if the stock doesn't move. The gamma benefit and theta decay are in equilibrium under the BSM model.`,
            hints: [],
          },
        },
        { kind: 'prose', markdown: `### Vega

**Formula (European options):**
\`\`\`
ν = ∂c/∂σ = S·e^(-yT)·√T·N'(d₁)
\`\`\`

Vega is always positive (higher volatility → more valuable options, both calls and puts).

**Properties:**
- At-the-money options have the highest vega
- Vega decreases as time to expiration shortens (ν → 0 as √T → 0)` },
        { kind: 'prose', markdown: `#### Part A — Implied Volatility and Volatility Smile

**Solution:**

**Implied volatility:** The volatility value that makes the model option price (BSM) equal to the market option price.

**Volatility smile:** The relationship between implied volatility and strike price for a given underlying:
- **Currency options:** U-shaped — higher implied vol for ITM and OTM, lower for ATM
- **Equity options:** Skewed — implied vol decreases as strike increases ("volatility skew" or "smirk")

**Implications for BSM:**
The BSM model assumes constant volatility (lognormal stock price). In reality, volatility is stochastic and asset prices can jump. The smile/skew is evidence that the market assigns different probabilities to extreme moves than the lognormal distribution implies.` },
        {
          kind: 'problem',
          problem: {
            id: "ch6-6-2-07-the-greeks-problem-7",
            chapter: 6,
            section: "6.2",
            sectionTitle: "The Greeks",
            title: "The Greeks Problem 7",
            difficulty: "medium",
            keyTechnique: "",
            tags: ["options","black-scholes","greeks","exotics","derivatives","finance"],
            setup: `Price a European call with constant vol 30% vs. random vol with mean 30%. Which is more expensive?`,
            solution: `The intuition that stochastic vol makes the stock more volatile and therefore the call more valuable is mostly correct — but not always.

If \`c(σ)\` is convex in σ, then by Jensen's inequality: \`E[c(σ)] > c(E[σ])\`. The Volga (second partial derivative of c with respect to σ) determines convexity:

\`\`\`
∂²c/∂σ² = S·e^(-yT)·√T·N'(d₁)·(d₁·d₂/σ)
\`\`\`

- For most **OTM options**: d₁ < 0, d₂ < 0 → d₁d₂ > 0 → Volga > 0 → c is convex → stochastic vol increases value
- For most **ITM options**: d₁ > 0, d₂ > 0 → d₁d₂ > 0 → Volga > 0 → same conclusion
- **Near ATM**: possible that d₁ > 0, d₂ < 0 → d₁d₂ < 0 → Volga < 0 → c is concave → constant vol option is more expensive

**Conclusion:** Stochastic vol typically makes options more expensive, but for near-ATM options in certain configurations, constant vol can yield a higher price.`,
            hints: [],
          },
        },
        {
          kind: 'problem',
          problem: {
            id: "ch6-6-2-08-the-greeks-problem-8",
            chapter: 6,
            section: "6.2",
            sectionTitle: "The Greeks",
            title: "The Greeks Problem 8",
            difficulty: "medium",
            keyTechnique: "",
            tags: ["options","black-scholes","greeks","exotics","derivatives","finance"],
            setup: `If you have European call prices for all continuous strike prices K, can you determine the risk-neutral probability density of S_T?`,
            solution: `Under risk-neutral measure: \`c = e^(-rT)·∫(s - K)⁺·f_ST(s)ds\`

Taking derivatives with respect to K:
\`\`\`
∂c/∂K = -e^(-rT)·∫_K^∞ f_ST(s)ds
∂²c/∂K² = e^(-rT)·f_ST(K)
\`\`\`

Therefore, the **risk-neutral probability density function** is:
\`\`\`
f_ST(K) = e^(rT)·∂²c/∂K²
\`\`\`

This result (Breeden-Litzenberger) allows recovery of the full risk-neutral distribution from observable option prices.

---`,
            hints: [],
          },
        },
      ],
    },
    {
      id: "6.3",
      title: "Option Portfolios and Exotic Options",
      problemCount: 4,
      blocks: [
        {
          kind: 'problem',
          problem: {
            id: "ch6-6-3-01-option-portfolios-and-exotic-options-problem-1",
            chapter: 6,
            section: "6.3",
            sectionTitle: "Option Portfolios and Exotic Options",
            title: "Option Portfolios and Exotic Options Problem 1",
            difficulty: "medium",
            keyTechnique: "",
            tags: ["options","black-scholes","greeks","exotics","derivatives","finance"],
            setup: `What are the price boundaries for a bull call spread?`,
            solution: `A bull call spread = long call c₁ with strike K₁ + short call c₂ with strike K₂ (K₁ < K₂).

**Cash flow table:**

| Time | Long c₁ | Short c₂ | Total |
|------|---------|---------|-------|
| t = 0 | -c₁ | +c₂ | c₂ - c₁ < 0 |
| S_T < K₁ | 0 | 0 | 0 |
| K₁ < S_T < K₂ | S_T - K₁ | 0 | S_T - K₁ |
| S_T > K₂ | S_T - K₁ | -(S_T - K₂) | K₂ - K₁ |

**Price boundaries:**
- The maximum payoff is \`K₂ - K₁\`, so: \`c₁ - c₂ ≤ e^(-rT)·(K₂ - K₁)\`
- The payoff is also bounded by \`(K₂ - K₁)/K₂ · S_T\`, giving a second upper bound`,
            hints: [],
          },
        },
        {
          kind: 'problem',
          problem: {
            id: "ch6-6-3-02-option-portfolios-and-exotic-options-problem-2",
            chapter: 6,
            section: "6.3",
            sectionTitle: "Option Portfolios and Exotic Options",
            title: "Option Portfolios and Exotic Options Problem 2",
            difficulty: "medium",
            keyTechnique: "",
            tags: ["options","black-scholes","greeks","exotics","derivatives","finance"],
            setup: `Explain a straddle and when you would purchase one.`,
            solution: `A **straddle** = long call + long put, same strike K, same maturity T, same underlying.

- Payoff: \`|S_T - K|\`
- Use: Bet on **large price moves** (direction agnostic)
- Also used as a **volatility trade**: buy a straddle when you believe realized volatility will exceed implied volatility

For an at-the-money straddle: \`c ≈ p ≈ 0.4·σ·S·√T\`

If realized vol \`σ_r > σ\` (implied vol), both options are undervalued and will appreciate as market prices converge.

**Limitation:** A straddle is not a pure volatility bet. As S moves away from K, the delta is no longer near 0, creating directional exposure. For pure vol exposure, use **variance swaps** or **volatility swaps**.

> A variance swap pays \`N × (σ²_realized - K_var)\`, where N is notional and K_var is the strike.`,
            hints: [],
          },
        },
        {
          kind: 'problem',
          problem: {
            id: "ch6-6-3-03-option-portfolios-and-exotic-options-problem-3",
            chapter: 6,
            section: "6.3",
            sectionTitle: "Option Portfolios and Exotic Options",
            title: "Option Portfolios and Exotic Options Problem 3",
            difficulty: "medium",
            keyTechnique: "",
            tags: ["options","black-scholes","greeks","exotics","derivatives","finance"],
            setup: `Price a cash-or-nothing binary European call. How would you hedge it?`,
            solution: `A **cash-or-nothing call** pays $1 if S_T > K at maturity, otherwise $0.

**Price:** \`c_B = e^(-rT)·N(d₂)\`

Since \`N(d₂)\` is the risk-neutral probability that the call finishes ITM, its discounted value is \`e^(-rT)·N(d₂)\`.

**Delta hedging:**
\`\`\`
Δ = ∂c_B/∂S = e^(-rT)·N'(d₂) / (S·σ·√T)
\`\`\`

**Limitation:** As T - t → 0 and S ≈ K, the delta becomes extremely volatile. Small stock price changes cause very large delta changes — making delta hedging practically impossible near expiry when S ≈ K.

**Alternative hedging approach:** Approximate the digital with a bull spread:
- Long \`1/(2ε)\` calls with strike K - ε
- Short \`1/(2ε)\` calls with strike K + ε

As ε → 0, this replicates the digital exactly. Practical limitation: not all strikes are liquidly traded.`,
            hints: [],
          },
        },
        {
          kind: 'problem',
          problem: {
            id: "ch6-6-3-04-option-portfolios-and-exotic-options-problem-4",
            chapter: 6,
            section: "6.3",
            sectionTitle: "Option Portfolios and Exotic Options",
            title: "Option Portfolios and Exotic Options Problem 4",
            difficulty: "medium",
            keyTechnique: "",
            tags: ["options","black-scholes","greeks","exotics","derivatives","finance"],
            setup: `Price an exchange option paying \`max(S_T2 - S_T1, 0)\` at maturity — the right to receive asset S₂ and give up asset S₁. Both stocks follow GBM with correlation ρ.`,
            solution: `Using S₁ as the numeraire, define \`f = S₂/S₁\`. Apply Itô's lemma:
\`\`\`
df/f = (μ₂ - μ₁ + σ₁² - ρσ₁σ₂)dt - σ₁dW₁ + σ₂dW₂
     = drift·dt + σ_f·dW₃
\`\`\`

where \`σ_f = √(σ₁² - 2ρσ₁σ₂ + σ₂²)\`

The exchange option becomes a call on f with strike 1 and r = 0:

\`\`\`
C_s = (S₂/S₁)·N(d₁) - N(d₂)  (expressed as fraction of S₁)
\`\`\`

In local currency (multiply by S₁):

\`\`\`
C = S₂·N(d₁) - S₁·N(d₂)
\`\`\`

Where:
\`\`\`
d₁ = [ln(S₂/S₁) + 0.5·σ_f²·T] / (σ_f·√T)
d₂ = d₁ - σ_f·√T
σ_f = √(σ₁² - 2ρσ₁σ₂ + σ₂²)
\`\`\`

---`,
            hints: [],
          },
        },
      ],
    },
    {
      id: "6.4",
      title: "Other Finance Questions",
      problemCount: 5,
      blocks: [
        {
          kind: 'problem',
          problem: {
            id: "ch6-6-4-01-other-finance-questions-problem-1",
            chapter: 6,
            section: "6.4",
            sectionTitle: "Other Finance Questions",
            title: "Other Finance Questions Problem 1",
            difficulty: "medium",
            keyTechnique: "",
            tags: ["options","black-scholes","greeks","exotics","derivatives","finance"],
            setup: `Two stocks A and B both have expected return 12%. Std dev of A = 20%, std dev of B = 30%, correlation = 50%. How do you allocate to minimize risk?`,
            solution: `Using Markowitz mean-variance theory, for portfolio variance:
\`\`\`
Var(r_p) = σ_A²·w_A² + σ_B²·w_B² + 2·ρ_AB·σ_A·σ_B·w_A·w_B
\`\`\`

where \`w_B = 1 - w_A\`.

Taking the derivative and setting to zero:
\`\`\`
dVar/dw_A = 0 → w_A = (σ_B² - ρ·σ_A·σ_B) / (σ_A² - 2ρσ_Aσ_B + σ_B²)
\`\`\`

Substituting values:
\`\`\`
w_A = (0.09 - 0.5×0.2×0.3) / (0.04 - 2×0.5×0.2×0.3 + 0.09) = 0.06 / 0.07 = 6/7
\`\`\`

**Result: Invest 6/7 ≈ 85.7% in stock A and 1/7 ≈ 14.3% in stock B.**`,
            hints: [],
            finalAnswer: "Invest 6/7 ≈ 85.7% in stock A and 1/7 ≈ 14.3% in stock B",
          },
        },
        {
          kind: 'problem',
          problem: {
            id: "ch6-6-4-02-other-finance-questions-problem-2",
            chapter: 6,
            section: "6.4",
            sectionTitle: "Other Finance Questions",
            title: "Other Finance Questions Problem 2",
            difficulty: "medium",
            keyTechnique: "",
            tags: ["options","black-scholes","greeks","exotics","derivatives","finance"],
            setup: `Explain VaR and its potential drawbacks for derivatives.`,
            solution: `**Definition:** VaR is the maximum loss over a target horizon such that there is a low, pre-specified probability that the actual loss will be larger.

Formally, for confidence level α: \`α = ∫_{-VaR}^{∞} f(x)dx\`

Typical values: α = 95% or 99%.

**Drawback 1 — Tail blindness:** VaR is a percentile measure — it doesn't capture the shape of the distribution beyond the threshold. For derivatives with fat-tailed or skewed payoffs, this is dangerously misleading.

**Example:** Short CDS on bond A (3% default probability, 100% loss given default, $1M notional). At 95% confidence: VaR(A) = 0 (since 3% < 5%). But we have real credit risk.

**Drawback 2 — Not sub-additive:** VaR violates \`VaR(A+B) ≤ VaR(A) + VaR(B)\`. Adding the same CDS on independent bond B: both VaR(A) = VaR(B) = 0, but combined portfolio has \`P(at least one default) = 1 - (0.97)² ≈ 5.9% > 5%\`, so VaR(A+B) = $1M > 0 + 0.

This contradicts the intuition that diversification reduces risk. **Conditional VaR (CVaR)** is a coherent risk measure that addresses this.`,
            hints: [],
          },
        },
        { kind: 'prose', markdown: `### Duration and Convexity

**Key formulas:**

\`\`\`
Duration: D = -(1/P)·(dP/dy)
Convexity: C = (1/P)·(d²P/dy²)
Dollar Duration: $D = -dP/dy = P × D
DV01 = -dP / (10,000 × dy)  [price change per 1 basis point]
\`\`\`

**Taylor approximation:** \`ΔP/P ≈ -D·Δy + ½·C·(Δy)²\`

**Portfolio:** Duration is value-weighted average; dollar duration is additive sum.` },
        {
          kind: 'problem',
          problem: {
            id: "ch6-6-4-03-other-finance-questions-problem-3",
            chapter: 6,
            section: "6.4",
            sectionTitle: "Other Finance Questions",
            title: "Other Finance Questions Problem 3",
            difficulty: "medium",
            keyTechnique: "",
            tags: ["options","black-scholes","greeks","exotics","derivatives","finance"],
            setup: `Price and duration of a 5-year inverse floater with face value $100, coupon rate \`30% - 3r\`, semiannual payments, flat yield curve at 7.5%.`,
            solution: `**Replication:** Decompose the inverse floater cash flows:
- Short 3 floating-rate bonds ($100 face each)
- Long 4 fixed-rate bonds (7.5% annual coupon, $100 face each)

**Cash flow verification:**

| Date | Short 3 Floaters | Long 4 Fixed | Total |
|------|-----------------|--------------|-------|
| 0 | +300 | -400 | -100 |
| 0.5 | -150r₀ | +15 | 15 - 150r₀ |
| … | … | … | 15 - 150r_t |
| 5 | -300-150r₄.₅ | 415 | 115 - 150r₄.₅ |

This matches the inverse floater coupon \`30% - 3r\` scaled by face value → **Price = $100**.

**Dollar Durations:**
- Floating bond: \`$D_floating = 0.5 × 103.75 / (1 + y/2)² ≈ $48.19\`
  *(Dollar duration = -dP/dy, where P = 103.75/(1+y/2); derivative gives 0.5×103.75/(1+y/2)²)*
- Fixed bond: \`$D_fixed ≈ $410.64\`

**Inverse floater:**
\`\`\`
$D_inverse = 4 × $D_fixed - 3 × $D_floating = 4(410.64) - 3(48.19) ≈ $1498
D_inverse = $D_inverse / P = 1498 / 100 ≈ 14.98
\`\`\``,
            hints: [],
          },
        },
        {
          kind: 'problem',
          problem: {
            id: "ch6-6-4-04-other-finance-questions-problem-4",
            chapter: 6,
            section: "6.4",
            sectionTitle: "Other Finance Questions",
            title: "Other Finance Questions Problem 4",
            difficulty: "medium",
            keyTechnique: "",
            tags: ["options","black-scholes","greeks","exotics","derivatives","finance"],
            setup: `Difference between futures and forwards? If asset price is strongly positively correlated with interest rates, which has higher price?`,
            solution: `| Feature | Futures | Forwards |
|---------|---------|---------|
| Trading venue | Exchange (standardized) | OTC (flexible) |
| Settlement | Marked-to-market daily | Settled at contract end |
| Counterparty risk | Cleared (low) | Bilateral (higher) |

**Pricing (deterministic rates):** Both have same theoretical price:
\`\`\`
F = S·e^((r + u - y)T)
\`\`\`
where u = storage costs, y = dividend/convenience yield.

**With stochastic interest rates:**

If futures price is **positively correlated** with interest rates → futures price > forward price.

**Reasoning (mark-to-market advantage):** When futures price rises (profit), interest rates tend to be high → profit can be reinvested at high rates. When futures price falls (loss), interest rates tend to be low → loss is financed at low rates. This asymmetry makes futures more valuable than forwards when correlation with rates is positive.`,
            hints: [],
          },
        },
        {
          kind: 'problem',
          problem: {
            id: "ch6-6-4-05-other-finance-questions-problem-5",
            chapter: 6,
            section: "6.4",
            sectionTitle: "Other Finance Questions",
            title: "Other Finance Questions Problem 5",
            difficulty: "medium",
            keyTechnique: "",
            tags: ["options","black-scholes","greeks","exotics","derivatives","finance"],
            setup: `Explain basic interest rate models and their differences.`,
            solution: `**Two classification axes:**
1. **Short-rate vs. forward-rate models** (e.g., HJM)
2. **Arbitrage-free vs. equilibrium models**`,
            hints: [],
          },
        },
        { kind: 'prose', markdown: `**Equilibrium short-rate models:**

**Vasicek model:**
\`\`\`
dR(t) = a(b - R(t))dt + σdW(t)
\`\`\`
- Mean-reverting toward long-term average b
- Weakness: Constant volatility allows negative rates (positive probability)

**Cox-Ingersoll-Ross (CIR) model:**
\`\`\`
dR(t) = a(b - R(t))dt + σ√R(t)·dW(t)
\`\`\`
- Keeps mean-reversion from Vasicek
- Diffusion term \`σ√R(t)\` ensures rates stay non-negative (when \`2ab ≥ σ²\`)` },
        { kind: 'prose', markdown: `**No-arbitrage short-rate models:**

**Ho-Lee model:**
\`\`\`
dr = θ(t)dt + σdz
\`\`\`
- Simplest no-arbitrage model
- Time-dependent drift \`θ(t)\` is calibrated to match current yield curve

**Hull-White model:**
\`\`\`
dR(t) = a(b(t) - R(t))dt + σdW(t)
\`\`\`
- Vasicek structure with time-dependent mean \`b(t)\`
- Calibrated to fit current term structure exactly` },
        { kind: 'prose', markdown: `*End of Chapter 6*` },
      ],
    },
  ],
};

export default chapter6;
