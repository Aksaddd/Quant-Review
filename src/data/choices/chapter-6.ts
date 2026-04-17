import type { Choice } from '@/lib/types';

/**
 * Multiple-choice answers for Chapter 6.
 * Populated by generator — exactly one choice per problem has `correct: true`.
 */
const chapter6Choices: Record<string, Choice[]> = {
  'ch6-6-1-01-option-pricing-problem-1': [
    { id: 'a', text: 'A higher risk-free rate raises European call prices and lowers European put prices, while the effect of maturity on European options is ambiguous.', correct: true, rationale: 'Rate increases make the discounted strike worth less, helping calls and hurting puts; large interim dividends can make a shorter-maturity call worth more than a longer one.' },
    { id: 'b', text: 'A higher risk-free rate lowers European call prices and raises European put prices because the discounted strike rises.', correct: false, rationale: 'This inverts the sign; a higher r reduces K·e^(-rT) and therefore helps calls and hurts puts.' },
    { id: 'c', text: 'Longer time to maturity always raises the price of any European call or put, just as it does for American options.', correct: false, rationale: 'For European options the effect is ambiguous: an intervening dividend can make a shorter-dated call or put more valuable.' },
    { id: 'd', text: 'Higher volatility raises call prices but lowers put prices because puts benefit only from downside moves.', correct: false, rationale: 'Higher volatility raises both call and put prices since optionality is convex in the underlying for each payoff.' },
  ],
  'ch6-6-1-02-formula-european-options-with-dividends': [
    { id: 'a', text: 'c + K·e^(-rT) = p + S, proven by showing both portfolios have terminal payoff max(S_T, K).', correct: true, rationale: 'Long call plus bond and long put plus stock both pay max(S_T, K) at T, so no-arbitrage forces equal values today.' },
    { id: 'b', text: 'c + K = p + S, because the strike K should be compared to the current stock price directly.', correct: false, rationale: 'The strike must be discounted to present value at the risk-free rate; otherwise the identity violates no-arbitrage.' },
    { id: 'c', text: 'c + S = p + K·e^(-rT), since both the call and stock form the long "protective" leg.', correct: false, rationale: 'This swaps the two portfolios; the protective put pairs the put with the stock, not the call.' },
    { id: 'd', text: 'c - p = K·e^(-rT) - S, so a long call plus short put replicates a short forward on the stock.', correct: false, rationale: 'The sign is reversed: c - p = S - K·e^(-rT), which is a long forward with delivery price K.' },
  ],
  'ch6-6-1-03-option-pricing-problem-3': [
    { id: 'a', text: 'Yes: the put is convex in strike with P(0)=0, so P(80) ≤ (80/90)·P(90) = 8, meaning the $80 put is overpriced; short 9 of them and long 8 of the $90 puts.', correct: true, rationale: 'Convexity of put price in strike gives the bound exactly 8, and the 9-to-8 portfolio produces a non-negative payoff with strictly positive probability.' },
    { id: 'b', text: 'No arbitrage exists because the $80 put is cheaper than the $90 put in absolute dollars, consistent with monotonicity in strike.', correct: false, rationale: 'Monotonicity alone is not enough; convexity of put price in strike is violated here, creating arbitrage.' },
    { id: 'c', text: 'Yes: long the $80 put and short the $90 put one-for-one, collecting $1 today with no downside.', correct: false, rationale: 'A 1-for-1 spread can have negative payoff when 80 < S_T < 90; the correct ratio uses the convexity bound.' },
    { id: 'd', text: 'No arbitrage exists because with no stock price specified we cannot compare the two put values.', correct: false, rationale: 'The convexity argument uses only the strikes and P(0)=0, so it applies for any positive stock price.' },
  ],
  'ch6-6-1-04-option-pricing-problem-4': [
    { id: 'a', text: '∂V/∂t + rS·∂V/∂S + ½σ²S²·∂²V/∂S² = rV, derived by forming a delta-hedged portfolio Π = V − (∂V/∂S)·S that must earn the risk-free rate.', correct: true, rationale: 'Cancelling the dW term with the delta hedge removes risk, so no-arbitrage forces the portfolio to drift at r, yielding exactly this PDE.' },
    { id: 'b', text: '∂V/∂t + μS·∂V/∂S + ½σ²S²·∂²V/∂S² = rV, since the Itô expansion has drift μ for the stock.', correct: false, rationale: 'The real-world drift μ is replaced by r in the BSM PDE because the hedged portfolio is risk-free.' },
    { id: 'c', text: '∂V/∂t + rS·∂V/∂S + ½σS·∂²V/∂S² = rV, using a linear diffusion coefficient on the second derivative.', correct: false, rationale: 'The diffusion term for geometric Brownian motion is ½σ²S² multiplying ∂²V/∂S², not ½σS.' },
    { id: 'd', text: '∂V/∂t + ½σ²S²·∂²V/∂S² = rV, since the delta hedge eliminates the drift term entirely.', correct: false, rationale: 'The delta hedge removes the Brownian noise but leaves a deterministic rS·∂V/∂S term in the PDE.' },
  ],
  'ch6-6-1-05-option-pricing-problem-5': [
    { id: 'a', text: 'The option is worth $1/H today, obtained either from the exponential martingale giving P·H = 1 or from replication by holding 1/H shares.', correct: true, rationale: 'Under zero rates the stock is a martingale, so the probability of first hitting H starting from 1 is 1/H, which matches the no-arbitrage replication cost.' },
    { id: 'b', text: 'The option is worth $1 today because the payoff is guaranteed to be $1 whenever the stock ever touches H.', correct: false, rationale: 'The stock is not guaranteed to hit H; with zero drift the first-passage probability is only 1/H.' },
    { id: 'c', text: 'The option is worth 1/H² today because the martingale argument squares the level.', correct: false, rationale: 'The exponential martingale yields P·H = 1, not P·H² = 1, so the value is 1/H.' },
    { id: 'd', text: 'The option is worth e^(−σ²T/2)/H because a volatility drag must be applied to the risk-neutral measure.', correct: false, rationale: 'Under r=0 the stock itself is already a martingale, so no extra discounting beyond 1/H is needed.' },
  ],
  'ch6-6-1-06-option-pricing-problem-6': [
    { id: 'a', text: 'V = (1/S)·e^(−2rT + σ²T), obtained by applying Itô to 1/S, discounting the risk-neutral expectation.', correct: true, rationale: 'Itô on 1/S shows it is a GBM with drift (−r + σ²), so E[1/S_T] = (1/S)·e^((−r+σ²)T); discounting by e^(−rT) gives the stated value.' },
    { id: 'b', text: 'V = 1/S, by Jensen\'s inequality combined with the fact that S is a martingale under Q.', correct: false, rationale: 'Under Q the stock drifts at r (not zero), and Jensen gives inequality not equality; the correct answer has explicit r and σ² factors.' },
    { id: 'c', text: 'V = e^(−rT)/S, treating 1/S_T like a constant payoff discounted at the risk-free rate.', correct: false, rationale: '1/S_T is a random variable with a convexity adjustment; the discount factor alone omits the e^(−rT+σ²T) term from Itô.' },
    { id: 'd', text: 'V = (1/S)·e^(σ²T), ignoring the r-dependent discounting that remains after taking expectations.', correct: false, rationale: 'The formula needs both the drift correction from Itô and the e^(−rT) discount factor, giving e^(−2rT + σ²T).' },
  ],
  'ch6-6-2-01-the-greeks-problem-1': [
    { id: 'a', text: 'Δ = N(d₁), because the extra terms from differentiating N(d₁) and N(d₂) through S cancel via the identity S·N\'(d₁) = K·e^(−rT)·N\'(d₂).', correct: true, rationale: 'Direct differentiation of c = S·N(d₁) − K·e^(−rT)·N(d₂) produces cross terms that cancel exactly using that identity, leaving N(d₁).' },
    { id: 'b', text: 'Δ = N(d₂), because N(d₂) is the risk-neutral probability the call finishes in the money.', correct: false, rationale: 'N(d₂) is the ITM probability but the delta is N(d₁); the two differ by the σ√T factor in d₁ vs d₂.' },
    { id: 'c', text: 'Δ = N(d₁) − K·e^(−rT)·N(d₂)/S, because both N(d₁) and N(d₂) depend on S through the chain rule.', correct: false, rationale: 'The chain-rule terms collapse to zero by S·N\'(d₁) = K·e^(−rT)·N\'(d₂), so the extra term vanishes.' },
    { id: 'd', text: 'Δ = N\'(d₁)/(σ√T), the derivative of the call\'s N(d₁) term with respect to S.', correct: false, rationale: 'That expression is proportional to gamma, not delta; delta is the level N(d₁), not its density.' },
  ],
  'ch6-6-2-02-the-greeks-problem-2': [
    { id: 'a', text: 'Delta is greater than 0.5 for an at-the-money call; as maturity approaches, d₁ → 0 so Δ → N(0) = 0.5.', correct: true, rationale: 'At S = K, d₁ = (r/σ + σ/2)√T > 0, so N(d₁) > 0.5; shrinking T drives d₁ to zero and delta to 0.5.' },
    { id: 'b', text: 'Delta is exactly 0.5 for any at-the-money call regardless of maturity.', correct: false, rationale: 'At S = K the term (r/σ + σ/2)√T is strictly positive, so delta exceeds 0.5 except in the T → 0 limit.' },
    { id: 'c', text: 'Delta is less than 0.5 for an at-the-money call because the strike still exceeds the discounted stock price.', correct: false, rationale: 'S = K means the stock is above its discounted strike after accounting for r > 0, so d₁ > 0 and N(d₁) > 0.5.' },
    { id: 'd', text: 'Delta approaches 1 for an at-the-money call as maturity approaches, because short maturity makes exercise nearly certain.', correct: false, rationale: 'Exercise is not nearly certain at S = K; as T → 0, delta converges to 0.5 (the coin-flip boundary).' },
  ],
  'ch6-6-2-03-the-greeks-problem-3': [
    { id: 'a', text: 'Short Δ = e^(−yT)·N(d₁) shares per call and lend cash; if the stock price rises, d₁ rises so Δ rises, and you must short more stock and lend more cash.', correct: true, rationale: 'Delta is an increasing function of d₁ (and hence of S), so a price rise forces an increase in the short-stock position to stay delta-neutral.' },
    { id: 'b', text: 'Go long Δ shares of the stock per call, and after a price rise sell some of that stock since delta has fallen.', correct: false, rationale: 'To hedge a long call you must short stock, not go long; also delta increases with S, it does not fall.' },
    { id: 'c', text: 'Short N(d₂) shares per call and rebalance only when the option moves into the money.', correct: false, rationale: 'The hedge ratio for a call is N(d₁) (with the dividend adjustment), not N(d₂); and continuous rebalancing is required.' },
    { id: 'd', text: 'Hold the initial short of Δ shares fixed since self-financing means no rebalancing is needed for small moves.', correct: false, rationale: 'Self-financing still requires continuous rebalancing because delta itself changes with S (gamma risk).' },
  ],
  'ch6-6-2-04-the-greeks-problem-4': [
    { id: 'a', text: 'c ≈ 0.4·σ·S·√T, obtained by expanding N(d₁) − N(d₂) ≈ (σ√T)/√(2π) at d₁ ≈ d₂ ≈ 0.', correct: true, rationale: 'With S = K, r ≈ 0, and small T, N(d₁) − N(d₂) ≈ N\'(0)·σ√T = σ√T/√(2π) ≈ 0.4·σ√T, giving c ≈ 0.4σS√T.' },
    { id: 'b', text: 'c ≈ σ·S·√T, since the call payoff is roughly one standard deviation of the lognormal return times S.', correct: false, rationale: 'This drops the factor 1/√(2π) ≈ 0.4 that comes from the standard normal density at zero.' },
    { id: 'c', text: 'c ≈ 0.4·σ²·S·T, applying a variance rather than standard-deviation scaling.', correct: false, rationale: 'The ATM short-maturity price scales with σ√T (standard deviation), not σ²T (variance).' },
    { id: 'd', text: 'c ≈ 0.5·S, since with S = K the payoff is like a 50/50 bet on max(S_T − K, 0).', correct: false, rationale: 'The value is not half the stock price; the correct leading order goes to zero as T → 0, proportional to σ√T.' },
  ],
  'ch6-6-2-05-formula-european-call-put-with-dividend-yield-y': [
    { id: 'a', text: 'Gamma goes to infinity for an at-the-money option as maturity approaches, because delta transitions sharply from 0 to 1 at expiry.', correct: true, rationale: 'At S = K with T − t → 0, N\'(d₁) → 1/√(2π) while the denominator S·σ·√T → 0, so gamma diverges.' },
    { id: 'b', text: 'Gamma goes to zero for an at-the-money option near maturity because there is little time left for convexity to matter.', correct: false, rationale: 'Gamma peaks (and blows up) precisely at the ATM strike near expiry; it is deep ITM/OTM options whose gamma goes to zero.' },
    { id: 'c', text: 'Gamma stays roughly constant because it depends only on volatility, not on the time to maturity.', correct: false, rationale: 'Gamma has an explicit √T in its denominator, so it changes sharply with maturity, especially ATM.' },
    { id: 'd', text: 'Gamma is highest for long-maturity at-the-money options and falls as time passes.', correct: false, rationale: 'For ATM options, gamma rises as maturity shortens (opposite of deep-ITM/OTM behavior).' },
  ],
  'ch6-6-2-06-the-greeks-problem-6': [
    { id: 'a', text: 'Any immediate stock move raises portfolio value because it is long gamma, but this is not an arbitrage since the BSM PDE Θ + ½σ²S²Γ = rV implies theta offsets gamma.', correct: true, rationale: 'Positive gamma is paid for by negative theta under BSM, so the convexity benefit is priced into time decay, leaving no arbitrage.' },
    { id: 'b', text: 'The portfolio is a risk-free arbitrage because it gains whether the stock goes up or down, regardless of time decay.', correct: false, rationale: 'The BSM PDE shows theta is negative when gamma is positive, so expected P&L over time is zero, not strictly positive.' },
    { id: 'c', text: 'The portfolio loses value for any stock move because a delta-neutral book has no directional exposure.', correct: false, rationale: 'A long call delta-hedged is long gamma, so it gains from movement in either direction, not loses.' },
    { id: 'd', text: 'The portfolio behavior depends only on interest rates, not on gamma or theta.', correct: false, rationale: 'The gamma/theta balance from the BSM PDE is the key mechanism; rates enter through the rV term but do not replace the gamma-theta offset.' },
  ],
  'ch6-6-2-07-the-greeks-problem-7': [
    { id: 'a', text: 'Usually the random-vol call is more expensive (volga d₁·d₂/σ > 0 makes c convex in σ), but for certain near-ATM strikes where d₁>0 and d₂<0 the constant-vol call is worth more.', correct: true, rationale: 'Convexity in σ is controlled by volga ∝ d₁·d₂, which is positive for most ITM/OTM strikes but can be negative near ATM, flipping Jensen\'s inequality.' },
    { id: 'b', text: 'The random-vol call is always more expensive by Jensen\'s inequality because the call payoff is convex in S.', correct: false, rationale: 'Convexity in σ, not S, is what matters for stochastic vol; volga can be negative near ATM, breaking the inequality.' },
    { id: 'c', text: 'The two calls have the same price because Jensen\'s inequality requires E[σ] = 30%.', correct: false, rationale: 'Equality holds only when the mapping σ ↦ c(σ) is affine; generally volga ≠ 0, so prices differ.' },
    { id: 'd', text: 'The constant-vol call is always more expensive because averaging volatility reduces its effective level.', correct: false, rationale: 'This is backwards for most strikes; positive volga makes stochastic-vol calls more expensive, with only a narrow near-ATM exception.' },
  ],
  'ch6-6-2-08-the-greeks-problem-8': [
    { id: 'a', text: 'Yes: differentiating c with respect to K twice gives ∂²c/∂K² = e^(−rT)·f_{S_T}(K), so f_{S_T}(K) = e^(rT)·∂²c/∂K².', correct: true, rationale: 'This is the Breeden–Litzenberger identity obtained directly from c = e^(−rT)·∫(s−K)⁺ f(s) ds by differentiating twice in K.' },
    { id: 'b', text: 'Yes, and the density is simply ∂c/∂K evaluated at K = S_T (the first derivative is the CDF\'s complement).', correct: false, rationale: 'The first K-derivative gives −e^(−rT) times the complementary CDF, not the density; the density requires a second derivative.' },
    { id: 'c', text: 'No: option prices alone cannot identify the risk-neutral density without also specifying interest rates and drift.', correct: false, rationale: 'Once r is observed (it enters the discount factor), option prices across all K do uniquely determine the risk-neutral density.' },
    { id: 'd', text: 'Yes, but only for a finite grid of strikes giving a histogram, not a continuous density.', correct: false, rationale: 'With prices at all continuous strikes, the second derivative yields the full continuous risk-neutral density.' },
  ],
  'ch6-6-3-01-option-portfolios-and-exotic-options-problem-1': [
    { id: 'a', text: 'The maximum payoff is K₂ − K₁, so c₁ − c₂ ≤ e^(−rT)·(K₂ − K₁); a second bound follows from the payoff being ≤ (K₂ − K₁)/K₂ · S_T.', correct: true, rationale: 'The spread\'s capped payoff discounts back to e^(−rT)·(K₂−K₁), and dominating by the linear function (K₂−K₁)/K₂·S_T provides a tighter stock-based bound.' },
    { id: 'b', text: 'The spread must satisfy c₁ − c₂ = K₂ − K₁ because that is the maximum payoff at T.', correct: false, rationale: 'This ignores discounting; the inequality is ≤ e^(−rT)·(K₂ − K₁), not equality with the undiscounted maximum.' },
    { id: 'c', text: 'The spread value is bounded above by c₁ alone, so c₂ = 0 is required for no-arbitrage.', correct: false, rationale: 'c₂ > 0 in general; the correct bound is on the difference c₁ − c₂, not on c₂ individually.' },
    { id: 'd', text: 'The spread price is unbounded above because the short call has unlimited risk.', correct: false, rationale: 'The bull call spread caps its own payoff at K₂ − K₁, which makes its price strictly bounded above.' },
  ],
  'ch6-6-3-02-option-portfolios-and-exotic-options-problem-2': [
    { id: 'a', text: 'A straddle is a long call + long put at the same strike and maturity; buy it when you expect realized volatility to exceed implied volatility.', correct: true, rationale: 'The |S_T − K| payoff profits on large moves in either direction, which translates to a volatility bet comparing realized to implied vol.' },
    { id: 'b', text: 'A straddle is a long call + short put at the same strike; buy it when you expect the stock to rise sharply.', correct: false, rationale: 'A long call + short put is a synthetic forward, not a straddle; a straddle combines long call and long put.' },
    { id: 'c', text: 'A straddle is a long call at K₁ and long put at K₂ with K₁ > K₂; buy it when you are strongly bullish.', correct: false, rationale: 'That is a strangle with unusual strike ordering; a straddle uses the same strike and is direction-neutral, not bullish.' },
    { id: 'd', text: 'A straddle is a long call and short call at different strikes; buy it to collect premium when volatility is low.', correct: false, rationale: 'That describes a call spread, not a straddle, and it is sold (not bought) when expecting low volatility.' },
  ],
  'ch6-6-3-03-option-portfolios-and-exotic-options-problem-3': [
    { id: 'a', text: 'Price = e^(−rT)·N(d₂); hedge either with delta e^(−rT)·N\'(d₂)/(Sσ√T) or with a tight bull call spread around K, knowing delta becomes unstable near expiry when S ≈ K.', correct: true, rationale: 'N(d₂) is the risk-neutral ITM probability so discounting gives the cash-or-nothing value; the bull-spread approximation converges to the digital as the spread width shrinks.' },
    { id: 'b', text: 'Price = e^(−rT)·N(d₁); delta hedge using Δ = N(d₁) as in a vanilla call.', correct: false, rationale: 'The digital pays a fixed $1, not S, so its value uses N(d₂), and its delta has a different form involving N\'(d₂).' },
    { id: 'c', text: 'Price = e^(−rT); the probability of finishing ITM is one under risk-neutral pricing.', correct: false, rationale: 'Risk-neutral ITM probability is N(d₂) < 1 in general, not 1.' },
    { id: 'd', text: 'Price = S·N(d₁) − K·e^(−rT)·N(d₂); hedge the digital exactly like a vanilla call.', correct: false, rationale: 'That is the vanilla call formula, not the digital\'s; the digital pays $1, not max(S_T − K, 0).' },
  ],
  'ch6-6-3-04-option-portfolios-and-exotic-options-problem-4': [
    { id: 'a', text: 'C = S₂·N(d₁) − S₁·N(d₂) with σ_f = √(σ₁² − 2ρσ₁σ₂ + σ₂²), obtained by using S₁ as numeraire.', correct: true, rationale: 'Under the S₁-numeraire measure, S₂/S₁ is a driftless GBM with volatility σ_f, reducing the problem to a zero-rate vanilla call with strike 1.' },
    { id: 'b', text: 'C = S₂·N(d₁) − S₁·N(d₂) with σ_f = σ₁ + σ₂, adding the volatilities directly because both assets are stochastic.', correct: false, rationale: 'The correct combined volatility uses σ_f² = σ₁² − 2ρσ₁σ₂ + σ₂²; linear addition of σ\'s ignores the correlation term.' },
    { id: 'c', text: 'C = e^(−rT)·(S₂·N(d₁) − S₁·N(d₂)), because exchange options still need a risk-free-rate discount factor.', correct: false, rationale: 'Using S₁ as numeraire eliminates the discount factor from the formula; no e^(−rT) appears in the Margrabe formula.' },
    { id: 'd', text: 'C = max(S₂ − S₁, 0), the intrinsic value today, because correlated GBMs admit only their current payoff as price.', correct: false, rationale: 'Intrinsic value ignores time value from optionality; the Margrabe formula captures the time-value contribution via σ_f√T.' },
  ],
  'ch6-6-4-01-other-finance-questions-problem-1': [
    { id: 'a', text: 'Invest 6/7 (≈ 85.7%) in stock A and 1/7 (≈ 14.3%) in stock B.', correct: true, rationale: 'Minimizing portfolio variance with w_B = 1 − w_A gives w_A = (σ_B² − ρσ_Aσ_B)/(σ_A² − 2ρσ_Aσ_B + σ_B²) = 0.06/0.07 = 6/7.' },
    { id: 'b', text: 'Invest 50% in each stock since the two assets share the same expected return.', correct: false, rationale: 'Equal weights ignore the different variances; the min-variance portfolio weights toward the lower-variance asset A.' },
    { id: 'c', text: 'Invest 1/7 in stock A and 6/7 in stock B, weighting the higher-volatility asset more heavily.', correct: false, rationale: 'The formula minimizes variance by down-weighting the higher-variance asset; weights are inverted here.' },
    { id: 'd', text: 'Invest 100% in stock A because it has strictly lower variance and equal return.', correct: false, rationale: 'With correlation less than 1, diversification into B still reduces variance; the optimum is an interior allocation 6/7–1/7.' },
  ],
  'ch6-6-4-02-other-finance-questions-problem-2': [
    { id: 'a', text: 'VaR is the maximum loss at a given confidence level; its main drawbacks are ignoring tail shape beyond the threshold and failing sub-additivity, so diversified portfolios can appear riskier than individual positions.', correct: true, rationale: 'As a quantile it says nothing about tail severity, and the CDS example shows two uncorrelated positions with VaR = 0 combining into VaR > 0, breaking sub-additivity.' },
    { id: 'b', text: 'VaR measures average loss in the tail and always satisfies sub-additivity, making it a coherent risk measure.', correct: false, rationale: 'That describes CVaR, not VaR; VaR is a quantile and is known to violate sub-additivity.' },
    { id: 'c', text: 'VaR captures loss given default precisely and is therefore ideal for credit derivatives with binary payoffs.', correct: false, rationale: 'VaR can report zero even when a nontrivial default probability exists below the threshold (e.g. 3% < 5%), hiding real credit risk.' },
    { id: 'd', text: 'VaR is the standard deviation of losses, so for Gaussian returns it is perfectly informative about tail risk.', correct: false, rationale: 'VaR is a quantile, not a standard deviation, and real derivative P&L distributions are far from Gaussian, making tail shape matter.' },
  ],
  'ch6-6-4-03-other-finance-questions-problem-3': [
    { id: 'a', text: 'Replicate as long 4 fixed-rate bonds minus short 3 floaters, giving price = $100 and duration ≈ 14.98 years.', correct: true, rationale: 'Cash-flow matching with that 4-long/3-short mix reproduces the 30% − 3r coupon, and its dollar duration is 4·$D_fixed − 3·$D_floating ≈ $1498 on $100 face.' },
    { id: 'b', text: 'Price = $100 and duration = 5 years since it is a 5-year bond with a flat 7.5% curve.', correct: false, rationale: 'An inverse floater has leveraged rate exposure; 4·fixed − 3·floating gives duration near 15, far above its 5-year maturity.' },
    { id: 'c', text: 'Price = $100 and duration ≈ 3.5 years because the inverse floater responds like a short floater plus a small fixed leg.', correct: false, rationale: 'The replication requires 4 long fixed bonds against only 3 short floaters, giving a much larger duration than 3.5.' },
    { id: 'd', text: 'Price = $300 since the coupon exceeds the yield, and duration equals the floater\'s 0.5 years.', correct: false, rationale: 'The replication shows price = $100; also, inverse floaters are leveraged fixed bonds, not floaters, so their duration is much larger.' },
  ],
  'ch6-6-4-04-other-finance-questions-problem-4': [
    { id: 'a', text: 'Futures are exchange-traded and marked-to-market daily while forwards are OTC and settled at maturity; with positive correlation between price and rates, futures are more valuable than forwards.', correct: true, rationale: 'Daily settlement lets gains be reinvested at now-higher rates and losses financed at now-lower rates, giving futures an advantage when price and rates co-move positively.' },
    { id: 'b', text: 'Futures and forwards are economically identical, so even with stochastic rates their prices match exactly.', correct: false, rationale: 'They match only under deterministic rates; with rate/price correlation the mark-to-market feature creates a price wedge.' },
    { id: 'c', text: 'Forwards are more valuable when futures prices are positively correlated with rates because forward holders avoid reinvestment risk.', correct: false, rationale: 'Positive correlation favors futures due to the reinvestment benefit; forwards lose this optionality.' },
    { id: 'd', text: 'Forwards are always more valuable because they avoid the counterparty risk of a clearing house.', correct: false, rationale: 'Forwards actually carry higher bilateral counterparty risk than futures; the correlation question is about rate dynamics, not credit.' },
  ],
};

export default chapter6Choices;
