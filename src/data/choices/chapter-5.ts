import type { Choice } from '@/lib/types';

/**
 * Multiple-choice answers for Chapter 5.
 * Populated by generator — exactly one choice per problem has `correct: true`.
 */
const chapter5Choices: Record<string, Choice[]> = {
  "ch5-5-1-01-gambler-s-ruin-markov-chain-approach": [
    {
      id: 'a',
      text: 'P(M wins) = 4/7',
      correct: true,
      rationale: 'Solving the absorption equations a₁ = (2/3)a₂ and a₂ = (1/3)a₁ + 2/3 gives a₂ = 6/7 and a₁ = 4/7.',
    },
    {
      id: 'b',
      text: 'P(M wins) = 2/3',
      correct: false,
      rationale: 'This ignores M\'s starting disadvantage (only $1 vs $2) and just quotes the single-game win probability.',
    },
    {
      id: 'c',
      text: 'P(M wins) = 1/3',
      correct: false,
      rationale: 'Sign/direction inversion — this is effectively the probability M loses a single game, not the overall ruin probability.',
    },
    {
      id: 'd',
      text: 'P(M wins) = 1/2',
      correct: false,
      rationale: 'This is the symmetric-walk answer that ignores the 2/3 per-game edge M has; the biased walk heavily favors M reaching $3.',
    },
  ],
  "ch5-5-1-02-dice-question-12-vs-7-7": [
    {
      id: 'a',
      text: 'P(A wins) = 7/13',
      correct: true,
      rationale: 'Solving the Markov absorption equations (or conditional expectation on the first two rolls) gives 42/78 = 7/13.',
    },
    {
      id: 'b',
      text: 'P(A wins) = 6/13',
      correct: false,
      rationale: 'This is 1 − 7/13 — the inverted answer corresponding to the opposite player B winning.',
    },
    {
      id: 'c',
      text: 'P(A wins) = 1/7',
      correct: false,
      rationale: 'This naively uses only a per-roll ratio, ignoring that two consecutive 7s are required, not a single 7.',
    },
    {
      id: 'd',
      text: 'P(A wins) = 1/36',
      correct: false,
      rationale: 'This is just P(12) on a single roll, ignoring that the game continues indefinitely until an absorbing event occurs.',
    },
  ],
  "ch5-5-1-03-markov-chain-problem-3": [
    {
      id: 'a',
      text: 'E[Nₙ] = (n − 1)²',
      correct: true,
      rationale: 'Using Bayes\' theorem to form conditional transition probabilities given the final color, the absorption-time recursion solves to Z₁ = (n−1)².',
    },
    {
      id: 'b',
      text: 'E[Nₙ] = n²',
      correct: false,
      rationale: 'Off-by-one error on the absorbing boundary; correctly accounting for Zₙ = 0 shifts the index by 1 to give (n−1)².',
    },
    {
      id: 'c',
      text: 'E[Nₙ] = n(n − 1)',
      correct: false,
      rationale: 'This confuses the coupon-collector style n(n−1) term that appears in unconditional transition rates with the final conditional expectation.',
    },
    {
      id: 'd',
      text: 'E[Nₙ] = n log n',
      correct: false,
      rationale: 'This is the coupon-collector asymptotic for a different Markov chain with different dynamics.',
    },
  ],
  "ch5-5-2-01-drunk-man-on-bridge": [
    {
      id: 'a',
      text: 'P(reaches end) = 0.17, E[N] = 1411',
      correct: true,
      rationale: 'For a symmetric walk from 0 with barriers α = 83, −β = −17: P = β/(α+β) = 17/100 and E[N] = αβ = 1411.',
    },
    {
      id: 'b',
      text: 'P(reaches end) = 0.83, E[N] = 1411',
      correct: false,
      rationale: 'The expected steps is right but the probability is inverted — 83/100 is the probability of reaching position 0 first (closer barrier).',
    },
    {
      id: 'c',
      text: 'P(reaches end) = 0.5, E[N] = 10000',
      correct: false,
      rationale: 'Assumes a symmetric barrier and E[N] = (distance)², ignoring that the man starts at 17, not at the midpoint.',
    },
    {
      id: 'd',
      text: 'P(reaches end) = 0.17, E[N] = 100',
      correct: false,
      rationale: 'The probability is correct but E[N] = αβ = 83·17 = 1411, not the total bridge length.',
    },
  ],
  "ch5-5-2-02-dice-game-wald-s-equality": [
    {
      id: 'a',
      text: 'E[total payoff] = 7',
      correct: true,
      rationale: 'By Wald\'s equality E[S_N] = E[X]·E[N] = 3.5 · 2 = 7, with N ~ Geometric(1/2) giving E[N] = 2.',
    },
    {
      id: 'b',
      text: 'E[total payoff] = 3.5',
      correct: false,
      rationale: 'This is E[X] for a single roll — ignores the option to reroll on {4,5,6} (E[N] > 1).',
    },
    {
      id: 'c',
      text: 'E[total payoff] = 5',
      correct: false,
      rationale: 'Averages only the continuation faces (4+5+6)/3 = 5, mis-applying expectation conditioning.',
    },
    {
      id: 'd',
      text: 'E[total payoff] = 10.5',
      correct: false,
      rationale: 'Uses E[N] = 3 (assumes three rolls on average) instead of the correct Geometric mean E[N] = 1/(1/2) = 2.',
    },
  ],
  "ch5-5-2-03-ticket-line-ballot-problem": [
    {
      id: 'a',
      text: 'P = 1/(n + 1)',
      correct: true,
      rationale: 'By reflection the valid path count is the Catalan number C(2n,n)/(n+1), giving P = [C(2n,n)/(n+1)]/C(2n,n) = 1/(n+1).',
    },
    {
      id: 'b',
      text: 'P = 1/n',
      correct: false,
      rationale: 'Off-by-one error; the Catalan denominator is n+1, not n.',
    },
    {
      id: 'c',
      text: 'P = 1/2',
      correct: false,
      rationale: 'Naive symmetry — treats +1 and −1 people as interchangeable, ignoring the nonnegative-partial-sum constraint.',
    },
    {
      id: 'd',
      text: 'P = C(2n,n) / 2^(2n)',
      correct: false,
      rationale: 'This is the probability that a random walk of length 2n returns to 0 — unrelated to requiring all partial sums to stay nonnegative.',
    },
  ],
  "ch5-5-2-04-coin-sequence-expected-tosses-for-n-heads-in-a-row": [
    {
      id: 'a',
      text: 'E[tosses] = 2^(n+1) − 2',
      correct: true,
      rationale: 'The martingale/Conway argument gives a fixed total payout of 2ⁿ + 2ⁿ⁻¹ + ... + 2 = 2^(n+1) − 2, which equals the expected stopping time.',
    },
    {
      id: 'b',
      text: 'E[tosses] = 2ⁿ',
      correct: false,
      rationale: 'This is only the full-pattern term in the Conway sum; it omits the shorter self-overlap terms 2^(n−1) + ... + 2.',
    },
    {
      id: 'c',
      text: 'E[tosses] = 2n',
      correct: false,
      rationale: 'Linear scaling ignores the exponential blow-up — any tail resets the count, requiring a run of all heads without interruption.',
    },
    {
      id: 'd',
      text: 'E[tosses] = 2^(n+1)',
      correct: false,
      rationale: 'Forgets the −2 correction from the boundary term in the recurrence E[f(n+1)] = 2·E[f(n)] + 2.',
    },
  ],
  "ch5-5-3-01-dp-dice-game-up-to-3-rolls": [
    {
      id: 'a',
      text: 'Value ≈ \\$4.67; stop at ≥5 on roll 1, ≥4 on roll 2, accept roll 3.',
      correct: true,
      rationale: 'Backward induction: E[stage 3] = 3.5 ⇒ keep ≥4 on stage 2 (E = 4.25) ⇒ keep ≥5 on stage 1, giving E = 14/3 ≈ 4.67.',
    },
    {
      id: 'b',
      text: 'Value = \\$3.50; always reroll when possible to maximize chance of a 6.',
      correct: false,
      rationale: 'Ignores the optionality of stopping — rerolling a guaranteed 5 or 6 has negative expected gain.',
    },
    {
      id: 'c',
      text: 'Value = \\$4.25; stop at ≥4 on both rolls 1 and 2.',
      correct: false,
      rationale: 'Applies the stage-2 threshold to stage 1; the correct stage-1 threshold is ≥5 because the continuation value is 4.25, not 3.5.',
    },
    {
      id: 'd',
      text: 'Value = \\$6.00; stop only on a 6 at each decision.',
      correct: false,
      rationale: 'Requiring a 6 misunderstands the DP threshold: compare against E[continuation], not against the maximum possible face.',
    },
  ],
  "ch5-5-3-02-world-series-betting": [
    {
      id: 'a',
      text: 'Bet \\$31.25 at state (0,0); in general bet y = [f(i+1,j) − f(i,j+1)]/2 with f(i,j) = [f(i+1,j) + f(i,j+1)]/2.',
      correct: true,
      rationale: 'Backward induction from f(4,j)=+100 and f(i,4)=−100 replicates a binary option payoff; the delta-hedge bet at (0,0) is \\$31.25.',
    },
    {
      id: 'b',
      text: 'Bet \\$100 on Game 1; if Red Sox win, stop; otherwise bet \\$100 each subsequent game until series ends.',
      correct: false,
      rationale: 'A fixed \\$100 wager can exceed the \\$100 bankroll after a loss and does not replicate the +\\$100 / −\\$100 terminal payoffs.',
    },
    {
      id: 'c',
      text: 'Bet \\$25 on each of the first four games, then adjust; this covers all sweep scenarios.',
      correct: false,
      rationale: 'Equal bets ignore the DP recursion; bet size must depend on state (i,j), not be constant across games.',
    },
    {
      id: 'd',
      text: 'Bet \\$14.29 (= \\$100/7) on each potential game, since there are at most 7 games.',
      correct: false,
      rationale: 'Naively dividing the budget by max games ignores the path-dependent terminal payoff structure.',
    },
  ],
  "ch5-5-3-03-dynamic-dice-game": [
    {
      id: 'a',
      text: 'f(0) ≈ \\$6.15; keep rolling while accumulated n < 15, stop when n ≥ 15.',
      correct: true,
      rationale: 'Continuation value (n/6 + 2.5) exceeds n iff n < 15; backward recursion from f(n)=n for n ≥ 15 gives f(0) ≈ \\$6.15.',
    },
    {
      id: 'b',
      text: 'f(0) = \\$2.50; stop after the first roll since E[one roll | no 6] = 2.5.',
      correct: false,
      rationale: 'Ignores the option to continue — the first-roll value (5/6)·3 = 2.5 is dominated by rerolling from low accumulated totals.',
    },
    {
      id: 'c',
      text: 'f(0) = \\$15; the game value equals the stopping threshold.',
      correct: false,
      rationale: 'Confuses the stopping threshold (15) with the game value; the probability of ever reaching 15 without a 6 is well below 1.',
    },
    {
      id: 'd',
      text: 'f(0) = \\$3.00; stop as soon as accumulated total exceeds 3.',
      correct: false,
      rationale: 'Uses the single-roll non-6 mean as the stopping threshold — but the continuation value at low n is well above 3.',
    },
  ],
  "ch5-5-3-04-dynamic-card-game": [
    {
      id: 'a',
      text: 'E[payoff] ≈ \\$2.62; stop when (b − r) exceeds the continuation value from the DP recursion.',
      correct: true,
      rationale: 'Backward induction on (b,r) with boundaries f(0,r)=0 and f(b,0)=b yields E[f(26,26)] ≈ \\$2.62.',
    },
    {
      id: 'b',
      text: 'E[payoff] = \\$0; the expected net through the full deck is zero by symmetry.',
      correct: false,
      rationale: 'Symmetry applies only to drawing the full deck; the optional stopping right creates positive value — this is the no-stopping answer.',
    },
    {
      id: 'c',
      text: 'E[payoff] = \\$1; stop as soon as the first red card is drawn.',
      correct: false,
      rationale: 'Partial reasoning ignoring option value — stopping at +1 foregoes much larger future gains when reds are exhausted late.',
    },
    {
      id: 'd',
      text: 'E[payoff] = \\$26; one can guarantee drawing all reds first.',
      correct: false,
      rationale: 'Ignores randomness — draw order is uncontrollable; max possible net is bounded by the random excess of blacks remaining.',
    },
  ],
  "ch5-5-4-01-a-correlation-of-brownian-motion-and-its-square": [
    {
      id: 'a',
      text: 'Corr(Bₜ, Bₜ²) = 0',
      correct: true,
      rationale: 'E[Bₜ] = 0 and E[Bₜ³] = 0 (odd moment of N(0,t)), so Cov(Bₜ, Bₜ²) = E[Bₜ³] − E[Bₜ]E[Bₜ²] = 0.',
    },
    {
      id: 'b',
      text: 'Corr(Bₜ, Bₜ²) = 1',
      correct: false,
      rationale: 'Treats Bₜ² as a monotonic function of Bₜ; it is not (Bₜ² is even in Bₜ, so + and − values contribute the same Bₜ²).',
    },
    {
      id: 'c',
      text: 'Corr(Bₜ, Bₜ²) = 1/√t',
      correct: false,
      rationale: 'Mis-applied scaling — correlation is dimensionless in t and the covariance is identically zero regardless of t.',
    },
    {
      id: 'd',
      text: 'Corr(Bₜ, Bₜ²) = 1/2',
      correct: false,
      rationale: 'No valid identity yields this; the third moment of any symmetric distribution is zero, forcing the correlation to zero.',
    },
  ],
  "ch5-5-4-02-d-probability-of-ever-reaching-1-with-positive-drift": [
    {
      id: 'a',
      text: 'P(X ever reaches −1) = e^(−2) ≈ 0.135',
      correct: true,
      rationale: 'Using the exponential martingale exp(−2m·X(t)) with m = 1 and upper barrier at +∞: P·e² = 1 gives P = e⁻².',
    },
    {
      id: 'b',
      text: 'P(X ever reaches −1) = 1',
      correct: false,
      rationale: 'Applies the no-drift recurrence result; with positive drift the process drifts to +∞, so hitting a negative level has probability < 1.',
    },
    {
      id: 'c',
      text: 'P(X ever reaches −1) = e^(−1) ≈ 0.368',
      correct: false,
      rationale: 'Uses λ = −m instead of λ = −2m in the exponential martingale — the Itô correction doubles the exponent.',
    },
    {
      id: 'd',
      text: 'P(X ever reaches −1) = e² ≈ 7.39',
      correct: false,
      rationale: 'Sign error on the exponent; a probability cannot exceed 1, indicating the exponent was flipped.',
    },
  ],
};

export default chapter5Choices;
