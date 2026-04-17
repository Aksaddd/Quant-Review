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
  'ch3-3-2-01-volume-of-intersecting-cylinders': [
    { id: 'a', text: '`V = 16/3`.', correct: true, rationale: 'Horizontal slices at height z are squares of side `2√(1-z²)`; integrating `4(1-z²)` from -1 to 1 gives 16/3.' },
    { id: 'b', text: '`V = 4π/3`.', correct: false, rationale: 'This is the volume of the inscribed unit sphere, which is strictly smaller than the Steinmetz solid enclosing it.' },
    { id: 'c', text: '`V = 2π`.', correct: false, rationale: 'Uses circular cross-sections of area `π(1-z²)` instead of square cross-sections, ignoring that only one cylinder constrains y, the other constrains x.' },
    { id: 'd', text: '`V = 8/3`.', correct: false, rationale: 'Integrates from 0 to 1 but forgets the factor of 2 from the symmetry about z = 0.' },
  ],
  'ch3-3-2-02-snow-plow-problem': [
    { id: 'a', text: 'About `(√5 − 1)/2` hours (≈ 37 minutes) before noon.', correct: true, rationale: 'Plow speed is `c/(t+T)`; integrating distances at t=1 and t=2 and eliminating c gives `k² − k − 1 = 0`, so `T = 1/k = (√5 − 1)/2`.' },
    { id: 'b', text: 'Exactly 30 minutes before noon.', correct: false, rationale: '30 minutes is a round guess; the ODE forces the golden-ratio relation `k² = k + 1`, giving `T ≈ 0.618` hours, not 0.5.' },
    { id: 'c', text: 'Exactly 1 hour before noon.', correct: false, rationale: 'Ignores that the plow moves faster when snow is shallower; treating depth as constant violates the `v = c/A(t)` relation.' },
    { id: 'd', text: 'About 1 hour and 37 minutes before noon.', correct: false, rationale: 'Sets `T = 1 + (√5 − 1)/2` by mis-indexing the time variable; the integral bounds already start at noon, so no extra hour is added.' },
  ],
  'ch3-3-2-03-e-x-x-0-for-a-standard-normal': [
    { id: 'a', text: '`E[X | X > 0] = √(2/π) ≈ 0.7979`.', correct: true, rationale: 'Integrate `x·φ(x)` over (0,∞) to get `1/√(2π)`, then divide by `P(X>0) = 1/2`.' },
    { id: 'b', text: '`E[X | X > 0] = 0`.', correct: false, rationale: 'Confuses the conditional mean with the unconditional mean; the distribution of `X | X > 0` is truncated and not symmetric.' },
    { id: 'c', text: '`E[X | X > 0] = 1/√(2π) ≈ 0.399`.', correct: false, rationale: 'Forgets to divide by `P(X > 0) = 1/2`; this value is just the numerator integral, not the conditional expectation.' },
    { id: 'd', text: '`E[X | X > 0] = 1`.', correct: false, rationale: 'Arbitrary guess — does not come from any integration, and it exceeds the true value `√(2/π) ≈ 0.798`.' },
  ],
  'ch3-3-4-01-bernoulli-s-inequality': [
    { id: 'a', text: 'Taylor-expand `(1+x)ⁿ` around 0 with remainder; the quadratic remainder `n(n−1)(1+x̄)^(n−2)x²/2` is strictly positive, so `(1+x)ⁿ > 1 + nx`.', correct: true, rationale: 'For `n ≥ 2` and `x > −1`, all factors of the remainder term are positive, giving the strict inequality.' },
    { id: 'b', text: 'Apply L\'Hôpital\'s rule to `(1+x)ⁿ − (1+nx)` as `x → 0` to show the expression is positive.', correct: false, rationale: 'L\'Hôpital evaluates indeterminate limits, not signs of differences over an interval; it cannot establish a global inequality.' },
    { id: 'c', text: 'AM-GM inequality on `1, 1+x, 1+x, ..., 1+x` yields `(1+x)ⁿ ≥ (1 + nx/n)ⁿ`.', correct: false, rationale: 'The right-hand side simplifies to `(1+x)ⁿ`, producing a tautology; AM-GM does not give the required lower bound `1+nx`.' },
    { id: 'd', text: 'Since `(1+x)ⁿ` is convex and `1+nx` is its tangent line at 0, they are equal everywhere.', correct: false, rationale: 'A convex function lies above — not on — its tangent line except at the point of tangency; equality holds only at `x = 0`.' },
  ],
  'ch3-3-4-02-root-finding-algorithms': [
    { id: 'a', text: 'Newton (quadratic, needs `f\'`), secant (superlinear ≈ 1.618, no derivative), bisection (linear, guaranteed given a sign-change bracket).', correct: true, rationale: 'These three algorithms trade off derivative availability, convergence speed, and guaranteed convergence.' },
    { id: 'b', text: 'Newton, gradient descent, and simulated annealing.', correct: false, rationale: 'Gradient descent and simulated annealing minimize functions; they do not directly solve `f(x) = 0` and have different convergence behavior.' },
    { id: 'c', text: 'Newton\'s method only — all other methods require knowing the root in advance.', correct: false, rationale: 'Bisection and secant work without knowing the root; bisection only needs a sign-change bracket.' },
    { id: 'd', text: 'Newton, bisection, secant — and bisection has quadratic convergence like Newton.', correct: false, rationale: 'Bisection is linear (error halves each step), not quadratic; only Newton achieves quadratic convergence.' },
  ],
  'ch3-3-4-03-distance-from-origin-to-a-plane': [
    { id: 'a', text: '`D = 12/√29`.', correct: true, rationale: 'Using Lagrange multipliers (or the standard formula `|d|/√(a²+b²+c²)`), with `a²+b²+c² = 4+9+16 = 29`, gives `12/√29`.' },
    { id: 'b', text: '`D = 12/9`.', correct: false, rationale: 'Divides by `a+b+c = 9` instead of `√(a²+b²+c²)`; the normal-vector length involves squared coefficients.' },
    { id: 'c', text: '`D = 12`.', correct: false, rationale: 'Reads off the constant on the right side of the plane equation; that is not the distance unless the normal vector is a unit vector.' },
    { id: 'd', text: '`D = √29/12`.', correct: false, rationale: 'Inverts the formula; the distance has `|d|` in the numerator and `√(a²+b²+c²)` in the denominator, not the other way around.' },
  ],
  'ch3-3-5-01-separable-ode-with-initial-condition': [
    { id: 'a', text: '`y = e^(-3x²)`.', correct: true, rationale: 'Separating `dy/y = -6x dx` and integrating gives `ln y = -3x² + c`; the initial condition `y(0) = 1` fixes the constant to 0.' },
    { id: 'b', text: '`y = e^(-6x)`.', correct: false, rationale: 'Integrates `-6x` as if `x` were the independent constant, giving `-6x` instead of `-3x²`; misses the factor of 1/2 from `∫x dx`.' },
    { id: 'c', text: '`y = e^(3x²)`.', correct: false, rationale: 'Sign error: the ODE `y\' = -6xy` integrates to `-3x²`, not `+3x²`, in the exponent.' },
    { id: 'd', text: '`y = 1 - 3x²`.', correct: false, rationale: 'Takes only the first-order Taylor approximation of `e^(-3x²)` instead of the full exponential solution.' },
  ],
  'ch3-3-5-02-change-of-variable': [
    { id: 'a', text: '`y² + 2xy − x² = C`.', correct: true, rationale: 'With `z = x + y`, the ODE becomes `z dz = 2x dx`; integrating gives `z² = 2x² + C`, which rearranges to `y² + 2xy − x² = C`.' },
    { id: 'b', text: '`y² − 2xy + x² = C`.', correct: false, rationale: 'Wrong sign on the cross term; expanding `(x+y)² − 2x² = C` gives `y² + 2xy − x²`, not `y² − 2xy + x²`.' },
    { id: 'c', text: '`y = x + C`.', correct: false, rationale: 'Treats `(x − y)/(x + y)` as constant; this ignores that the equation is implicit and does not separate in the original variables.' },
    { id: 'd', text: '`y² + x² = Cxy`.', correct: false, rationale: 'Uses the substitution `y = xv` and stops too early, without solving the resulting separable ODE in `v`.' },
  ],
  'ch3-3-5-03-first-order-linear-ode': [
    { id: 'a', text: '`y = (ln x + 1)/x`.', correct: true, rationale: 'Integrating factor `I(x) = x` turns the ODE into `(xy)\' = 1/x`; integrating gives `xy = ln x + c`, and `y(1) = 1` sets `c = 1`.' },
    { id: 'b', text: '`y = ln x / x`.', correct: false, rationale: 'Omits the constant of integration; without the `+1`, the initial condition `y(1) = 1` is not satisfied.' },
    { id: 'c', text: '`y = x(ln x + 1)`.', correct: false, rationale: 'Multiplies instead of dividing by the integrating factor at the final step; the correct form is `y = (∫ I·Q dx)/I`.' },
    { id: 'd', text: '`y = e^(-1/x) · (ln x + 1)`.', correct: false, rationale: 'Computes the integrating factor as `e^(∫P dx)` but integrates `1/x` incorrectly as `-1/x`.' },
  ],
  'ch3-3-5-04-complex-roots-ode': [
    { id: 'a', text: '`y = e^(-x/2) [c₁ cos(√3 x/2) + c₂ sin(√3 x/2)]`.', correct: true, rationale: 'Characteristic roots `r = -1/2 ± i√3/2` give damped oscillation with `α = -1/2`, `β = √3/2`.' },
    { id: 'b', text: '`y = c₁ e^x + c₂ e^(-x)`.', correct: false, rationale: 'Ignores the discriminant `b² − 4ac = -3 < 0`; uses real roots ±1 that do not satisfy `r² + r + 1 = 0`.' },
    { id: 'c', text: '`y = e^(x/2) [c₁ cos(√3 x/2) + c₂ sin(√3 x/2)]`.', correct: false, rationale: 'Sign error on the real part `α`; the characteristic root is `-1/2 ± i√3/2`, not `+1/2 ± i√3/2`.' },
    { id: 'd', text: '`y = c₁ cos(x) + c₂ sin(x)`.', correct: false, rationale: 'Treats the ODE as `y\'\' + y = 0`, ignoring the `y\'` term that produces the exponential damping factor.' },
  ],
  'ch3-3-5-05-two-nonhomogeneous-odes': [
    { id: 'a', text: 'First: `y = yₕ + 1`; second: `y = yₕ + (x − 1)`, where `yₕ = e^(-x/2)[c₁ cos(√3 x/2) + c₂ sin(√3 x/2)]`.', correct: true, rationale: 'Try constant and linear particular solutions respectively; matching coefficients gives `yₚ = 1` and `yₚ = x − 1`.' },
    { id: 'b', text: 'First: `y = yₕ + x`; second: `y = yₕ + x²/2`.', correct: false, rationale: 'Picks the wrong degree for each particular solution; for constant RHS `yₚ` should be constant, not linear.' },
    { id: 'c', text: 'First: `y = 1`; second: `y = x − 1`.', correct: false, rationale: 'Omits the homogeneous solution; the general solution of a nonhomogeneous linear ODE is `yₕ + yₚ`, not just `yₚ`.' },
    { id: 'd', text: 'First: `y = yₕ + x`; second: `y = yₕ + x`.', correct: false, rationale: 'Uses the same `yₚ = x` for both equations; substituting shows `yₚ = x` satisfies neither RHS.' },
  ],
  'ch3-3-6-01-maximum-and-minimum-correlation-vector-approach': [
    { id: 'a', text: 'Maximum `ρ_yz = 1`, minimum `ρ_yz = 0.28`.', correct: true, rationale: 'Viewed as unit vectors, y and z coincide when aligned (ρ = 1) and the extreme-opposite case uses `cos(2θ) = 2·0.8² − 1 = 0.28`.' },
    { id: 'b', text: 'Maximum `ρ_yz = 0.8`, minimum `ρ_yz = -0.8`.', correct: false, rationale: 'Confuses the bound with the given pairwise correlation; the range of `ρ_yz` depends on `cos(2θ)`, not on the other correlations symmetrically.' },
    { id: 'c', text: 'Maximum `ρ_yz = 1`, minimum `ρ_yz = -1`.', correct: false, rationale: 'Ignores the constraint `ρ_xy = ρ_xz = 0.8`; the triangle-inequality-like PSD constraint rules out the full `[-1, 1]` range.' },
    { id: 'd', text: 'Maximum `ρ_yz = 0.64`, minimum `ρ_yz = 0`.', correct: false, rationale: 'Uses `cos²θ = 0.64` and `cos(π/2) = 0`, but does not correspond to any geometric configuration satisfying the given angles.' },
  ],
  'ch3-3-6-02-linear-least-squares-regression': [
    { id: 'a', text: 'Form the normal equations `(XᵀX)β = XᵀY` and solve by QR decomposition of `X` (preferred for numerical stability).', correct: true, rationale: 'Setting the gradient of `(Y − Xβ)ᵀ(Y − Xβ)` to zero yields the normal equations; QR avoids the conditioning problems of direct inversion.' },
    { id: 'b', text: 'Invert the data matrix `X` directly: `β = X⁻¹Y`.', correct: false, rationale: 'This only works when `X` is square and nonsingular; in general `X` is `n × p` with `n > p`, so `X⁻¹` does not exist.' },
    { id: 'c', text: 'Solve `β = (XXᵀ)⁻¹XY` — the transpose order does not matter.', correct: false, rationale: 'Order matters: `XXᵀ` is `n × n` (singular when `n > p`), whereas `XᵀX` is `p × p` and invertible under full column rank.' },
    { id: 'd', text: 'Use gradient descent on `||Y − Xβ||²` without any matrix factorization.', correct: false, rationale: 'Gradient descent works but is slower and needs step-size tuning; the closed-form normal equations with QR are standard and far more reliable.' },
  ],
  'ch3-3-6-03-eigenvalues-and-eigenvectors-of-a-2-2-matrix': [
    { id: 'a', text: 'Eigenvalues `λ = 1, 3`; eigenvectors `[1, -1]ᵀ/√2` and `[1, 1]ᵀ/√2`.', correct: true, rationale: 'Characteristic equation `(2−λ)² − 1 = 0` gives `λ = 1, 3`; substituting into `(A−λI)x = 0` yields the two orthogonal eigenvectors.' },
    { id: 'b', text: 'Eigenvalues `λ = 2, 2` (repeated); eigenvectors `[1, 0]ᵀ` and `[0, 1]ᵀ`.', correct: false, rationale: 'Reads eigenvalues as diagonal entries and eigenvectors as standard basis; this is only valid for diagonal matrices.' },
    { id: 'c', text: 'Eigenvalues `λ = 1, 3`; eigenvector for `λ = 3` is `[1, -1]ᵀ/√2` and for `λ = 1` is `[1, 1]ᵀ/√2`.', correct: false, rationale: 'Right eigenvalues but eigenvectors are swapped; `λ = 3` requires `x₁ = x₂`, so its eigenvector is `[1, 1]ᵀ/√2`, not `[1, -1]ᵀ/√2`.' },
    { id: 'd', text: 'Eigenvalues `λ = 0, 4`; eigenvectors `[1, 1]ᵀ/√2` and `[1, -1]ᵀ/√2`.', correct: false, rationale: 'Uses `trace = 4` but wrong determinant: `det(A) = 3`, not 0, so the product of eigenvalues must be 3.' },
  ],
  'ch3-3-6-04-correlation-bounds-psd-approach': [
    { id: 'a', text: 'Maximum `ρ_yz = 1`, minimum `ρ_yz = 0.28`.', correct: true, rationale: 'Requiring the 3×3 correlation matrix to be PSD gives `det(P) = -p² + 1.28p − 0.28 ≥ 0`, i.e., `0.28 ≤ p ≤ 1`.' },
    { id: 'b', text: 'Maximum `ρ_yz = 1`, minimum `ρ_yz = -1`.', correct: false, rationale: 'Ignores the PSD constraint imposed by `ρ_xy = ρ_xz = 0.8`; pairwise bounds alone do not capture joint consistency.' },
    { id: 'c', text: 'Maximum `ρ_yz = 0.8`, minimum `ρ_yz = 0.8`.', correct: false, rationale: 'Assumes transitivity of correlation; correlation is not transitive, so `ρ_yz` is not determined by `ρ_xy` and `ρ_xz` alone.' },
    { id: 'd', text: 'Maximum `ρ_yz = 0.64`, minimum `ρ_yz = -0.64`.', correct: false, rationale: 'Uses `ρ_yz = ρ_xy · ρ_xz = 0.64`, which is the conditional-independence lower bound (not upper) and does not bound the general range.' },
  ],
  'ch3-3-6-05-generating-correlated-normal-random-variables': [
    { id: 'a', text: 'Draw independent `z₁, z₂ ~ N(0,1)`; set `x₁ = z₁` and `x₂ = ρ z₁ + √(1 − ρ²) z₂`.', correct: true, rationale: 'This is the Cholesky factorization of `[[1, ρ], [ρ, 1]]`; it makes both `xᵢ` standard normal with `Cov(x₁, x₂) = ρ`.' },
    { id: 'b', text: 'Draw independent `z₁, z₂ ~ N(0,1)`; set `x₁ = z₁` and `x₂ = ρ z₁ + (1 − ρ) z₂`.', correct: false, rationale: 'The coefficient on `z₂` should be `√(1 − ρ²)` so that `Var(x₂) = 1`; `(1 − ρ)` gives the wrong variance.' },
    { id: 'c', text: 'Draw `z ~ N(0,1)` once and set `x₁ = z`, `x₂ = ρ · z`.', correct: false, rationale: 'This makes `x₂` perfectly correlated with `x₁` (correlation ±1) and with `Var(x₂) = ρ² ≠ 1`, failing both requirements.' },
    { id: 'd', text: 'Draw independent `z₁, z₂ ~ N(0,1)`; set `x₁ = ρ z₁` and `x₂ = ρ z₂`.', correct: false, rationale: 'Independent rescaling of independent normals yields zero correlation; the correlation between `x₁` and `x₂` would be 0, not ρ.' },
  ],
};

export default chapter3Choices;
