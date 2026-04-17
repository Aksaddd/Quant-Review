import type { Choice } from '@/lib/types';

/**
 * Multiple-choice answers for Chapter 3 (Calculus and Linear Algebra).
 * Populated by generator — exactly one choice per problem has `correct: true`.
 */
const chapter3Choices: Record<string, Choice[]> = {
  'ch3-3-1-01-derivative-of-y-ln-x-ln-x': [
    { id: 'a', text: '`dy/dx = (ln x)^(ln x) · [ln(ln x) + 1] / x`', correct: true, rationale: 'Take ln of both sides, differentiate using product and chain rules, then multiply by y to recover dy/dx.' },
    { id: 'b', text: '`dy/dx = (ln x)^(ln x) · ln(ln x) / x`', correct: false, rationale: 'Drops the `+1` term coming from differentiating `ln(x)·ln(ln x)` in the second product-rule piece.' },
    { id: 'c', text: '`dy/dx = (ln x) · (ln x)^(ln x - 1) · (1/x)`', correct: false, rationale: 'Treats `ln x` as a constant exponent and applies the ordinary power rule, ignoring that the exponent also depends on x.' },
    { id: 'd', text: '`dy/dx = (ln x)^(ln x) · ln(ln x)`', correct: false, rationale: 'Forgets the `1/x` factor from differentiating `ln x` after logarithmic differentiation.' },
  ],
  'ch3-3-1-02-e-vs-e': [
    { id: 'a', text: '`eᵠ > πe` because `f(x) = ln(x)/x` is strictly decreasing for `x > e`.', correct: true, rationale: 'Comparing `π ln e` with `e ln π` reduces to comparing `f(e)` and `f(π)`, and `f` decreases beyond its maximum at `x = e`.' },
    { id: 'b', text: '`πe > eᵠ` because `π > e` so raising the larger base gives the larger value.', correct: false, rationale: 'Ignores that the exponent also differs; the question is about the exponent-base interaction, not which base is larger.' },
    { id: 'c', text: 'They are equal because `eᵠ` and `πe` are both "e and π swapped" expressions.', correct: false, rationale: 'There is no symmetry that makes `a^b = b^a` for generic `a, b`; taking logs shows the two sides differ.' },
    { id: 'd', text: '`eᵠ > πe` because the exponential function grows faster than any polynomial.', correct: false, rationale: 'Growth-rate intuition at infinity is irrelevant for a comparison of two specific constants; the correct argument is monotonicity of `ln(x)/x`.' },
  ],
  'ch3-3-1-03-two-limits': [
    { id: 'a', text: '`lim(x→∞) eˣ/x² = ∞` and `lim(x→0⁺) x² ln x = 0`.', correct: true, rationale: 'L\'Hôpital twice shows `eˣ` beats `x²`; rewriting `x² ln x` as `ln x / (1/x²)` and applying L\'Hôpital gives 0.' },
    { id: 'b', text: '`lim(x→∞) eˣ/x² = 0` and `lim(x→0⁺) x² ln x = 0`.', correct: false, rationale: 'Inverts the dominance: `eˣ` grows faster than any polynomial, so the ratio diverges to ∞, not 0.' },
    { id: 'c', text: '`lim(x→∞) eˣ/x² = ∞` and `lim(x→0⁺) x² ln x = -∞`.', correct: false, rationale: 'Treats the `0·(-∞)` form as `-∞`; L\'Hôpital on `ln x / (1/x²)` yields 0 because `x²` crushes `ln x`.' },
    { id: 'd', text: '`lim(x→∞) eˣ/x² = 1` and `lim(x→0⁺) x² ln x = 1`.', correct: false, rationale: 'Assumes both indeterminate forms evaluate to 1, which is not what L\'Hôpital\'s rule produces here.' },
  ],
};

export default chapter3Choices;
