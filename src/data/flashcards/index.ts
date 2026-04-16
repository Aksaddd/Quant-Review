import { Flashcard } from '@/lib/types';

// ── Problem cards (37) ──────────────────────────────────────────────────────
import fcP01 from './problems/fc-p-01-screwy-pirates';
import fcP02 from './problems/fc-p-02-tiger-and-sheep';
import fcP03 from './problems/fc-p-03-river-crossing';
import fcP04 from './problems/fc-p-04-birthday-problem';
import fcP05 from './problems/fc-p-05-card-game';
import fcP06 from './problems/fc-p-06-burning-ropes';
import fcP07 from './problems/fc-p-07-defective-ball';
import fcP08 from './problems/fc-p-08-trailing-zeros';
import fcP09 from './problems/fc-p-09-horse-race';
import fcP10 from './problems/fc-p-10-infinite-sequence';
import fcP11 from './problems/fc-p-11-box-packing';
import fcP12 from './problems/fc-p-12-calendar-cubes';
import fcP13 from './problems/fc-p-13-door-to-offer';
import fcP14 from './problems/fc-p-14-message-delivery';
import fcP15 from './problems/fc-p-15-last-ball';
import fcP16 from './problems/fc-p-16-light-switches';
import fcP17 from './problems/fc-p-17-quant-salary';
import fcP18 from './problems/fc-p-18-coin-piles';
import fcP19 from './problems/fc-p-19-mislabeled-bags';
import fcP20 from './problems/fc-p-20-wise-men';
import fcP21 from './problems/fc-p-21-clock-pieces';
import fcP22 from './problems/fc-p-22-missing-integers';
import fcP23 from './problems/fc-p-23-counterfeit-coins-i';
import fcP24 from './problems/fc-p-24-glass-balls';
import fcP25 from './problems/fc-p-25-matching-socks';
import fcP26 from './problems/fc-p-26-handshakes';
import fcP27 from './problems/fc-p-27-have-we-met';
import fcP28 from './problems/fc-p-28-ants-on-square';
import fcP29 from './problems/fc-p-29-counterfeit-coins-ii';
import fcP30 from './problems/fc-p-30-prisoner-problem';
import fcP31 from './problems/fc-p-31-division-by-9';
import fcP32 from './problems/fc-p-32-chameleon-colors';
import fcP33 from './problems/fc-p-33-coin-split';
import fcP34 from './problems/fc-p-34-chocolate-bar';
import fcP35 from './problems/fc-p-35-race-track';
import fcP36 from './problems/fc-p-36-irrational-number';
import fcP37 from './problems/fc-p-37-rainbow-hats';

// ── Concept cards (9 ch1-2 + 20 ch3-7 = 29) ────────────────────────────────
import fcC01 from './concepts/fc-c-01-problem-simplification';
import fcC02 from './concepts/fc-c-02-logic-reasoning';
import fcC03 from './concepts/fc-c-03-thinking-outside-box';
import fcC04 from './concepts/fc-c-04-symmetry';
import fcC05 from './concepts/fc-c-05-series-summation';
import fcC06 from './concepts/fc-c-06-pigeon-hole';
import fcC07 from './concepts/fc-c-07-modular-arithmetic';
import fcC08 from './concepts/fc-c-08-math-induction';
import fcC09 from './concepts/fc-c-09-proof-by-contradiction';
// Ch 3 — Calculus & Linear Algebra
import fcC10 from './concepts/fc-c-10-lhospitals-rule';
import fcC11 from './concepts/fc-c-11-logarithmic-differentiation';
import fcC12 from './concepts/fc-c-12-integration-by-parts';
import fcC13 from './concepts/fc-c-13-taylor-series';
import fcC14 from './concepts/fc-c-14-newtons-method';
import fcC15 from './concepts/fc-c-15-lagrange-multipliers';
import fcC16 from './concepts/fc-c-16-cholesky-decomposition';
// Ch 4 — Probability Theory
import fcC17 from './concepts/fc-c-17-indicator-variables';
import fcC18 from './concepts/fc-c-18-conditional-expectation';
import fcC19 from './concepts/fc-c-19-gamblers-ruin';
// Ch 5 — Stochastic Processes
import fcC20 from './concepts/fc-c-20-markov-chains';
import fcC21 from './concepts/fc-c-21-martingales';
import fcC22 from './concepts/fc-c-22-dynamic-programming';
import fcC23 from './concepts/fc-c-23-conway-leading-number';
// Ch 6 — Finance
import fcC24 from './concepts/fc-c-24-american-options';
import fcC25 from './concepts/fc-c-25-volatility-smile';
// Ch 7 — Algorithms & Numerical Methods
import fcC26 from './concepts/fc-c-26-knuth-shuffle';
import fcC27 from './concepts/fc-c-27-bit-manipulation';
import fcC28 from './concepts/fc-c-28-monte-carlo';
import fcC29 from './concepts/fc-c-29-finite-difference';

// ── Formula cards (5 ch1-2 + 18 ch3-7 = 23) ────────────────────────────────
import fcF01 from './formulas/fc-f-01-legendres-formula';
import fcF02 from './formulas/fc-f-02-triangular-numbers';
import fcF03 from './formulas/fc-f-03-sum-of-powers';
import fcF04 from './formulas/fc-f-04-defective-ball-formula';
import fcF05 from './formulas/fc-f-05-ramsey-theorem';
// Ch 3 — Calculus & Linear Algebra
import fcF06 from './formulas/fc-f-06-derivative-rules';
import fcF07 from './formulas/fc-f-07-integration-formulas';
import fcF08 from './formulas/fc-f-08-ode-solution-methods';
import fcF09 from './formulas/fc-f-09-eigenvalues-eigenvectors';
// Ch 4 — Probability Theory
import fcF10 from './formulas/fc-f-10-bayes-formula';
import fcF11 from './formulas/fc-f-11-inclusion-exclusion';
import fcF12 from './formulas/fc-f-12-combinatorics';
import fcF13 from './formulas/fc-f-13-distributions';
import fcF14 from './formulas/fc-f-14-variance-covariance';
import fcF15 from './formulas/fc-f-15-order-statistics';
// Ch 5 — Stochastic Processes
import fcF16 from './formulas/fc-f-16-brownian-motion';
import fcF17 from './formulas/fc-f-17-itos-lemma';
// Ch 6 — Finance
import fcF18 from './formulas/fc-f-18-black-scholes';
import fcF19 from './formulas/fc-f-19-put-call-parity';
import fcF20 from './formulas/fc-f-20-greeks';
import fcF21 from './formulas/fc-f-21-var-duration';
// Ch 7 — Algorithms & Numerical Methods
import fcF22 from './formulas/fc-f-22-sorting-complexity';
import fcF23 from './formulas/fc-f-23-fibonacci';

// ── Principle cards (5) ─────────────────────────────────────────────────────
import fcPr01 from './principles/fc-pr-01-broad-knowledge';
import fcPr02 from './principles/fc-pr-02-practice-interview-skills';
import fcPr03 from './principles/fc-pr-03-listen-carefully';
import fcPr04 from './principles/fc-pr-04-speak-your-mind';
import fcPr05 from './principles/fc-pr-05-reasonable-assumptions';

// ── Master export ───────────────────────────────────────────────────────────

export const allFlashcards: Flashcard[] = [
  // Problem cards
  fcP01, fcP02, fcP03, fcP04, fcP05, fcP06, fcP07, fcP08, fcP09, fcP10,
  fcP11, fcP12, fcP13, fcP14, fcP15, fcP16, fcP17, fcP18, fcP19, fcP20,
  fcP21, fcP22, fcP23, fcP24, fcP25, fcP26, fcP27, fcP28, fcP29, fcP30,
  fcP31, fcP32, fcP33, fcP34, fcP35, fcP36, fcP37,
  // Concept cards (ch 1-2)
  fcC01, fcC02, fcC03, fcC04, fcC05, fcC06, fcC07, fcC08, fcC09,
  // Concept cards (ch 3-7)
  fcC10, fcC11, fcC12, fcC13, fcC14, fcC15, fcC16,
  fcC17, fcC18, fcC19,
  fcC20, fcC21, fcC22, fcC23,
  fcC24, fcC25,
  fcC26, fcC27, fcC28, fcC29,
  // Formula cards (ch 1-2)
  fcF01, fcF02, fcF03, fcF04, fcF05,
  // Formula cards (ch 3-7)
  fcF06, fcF07, fcF08, fcF09,
  fcF10, fcF11, fcF12, fcF13, fcF14, fcF15,
  fcF16, fcF17,
  fcF18, fcF19, fcF20, fcF21,
  fcF22, fcF23,
  // Principle cards
  fcPr01, fcPr02, fcPr03, fcPr04, fcPr05,
];

/** O(1) lookup by card id */
export const flashcardsById: Record<string, Flashcard> = Object.fromEntries(
  allFlashcards.map((fc) => [fc.id, fc])
);

/** Cards grouped by section */
export const flashcardsBySection: Record<string, Flashcard[]> = allFlashcards.reduce(
  (acc, fc) => {
    if (!acc[fc.section]) acc[fc.section] = [];
    acc[fc.section].push(fc);
    return acc;
  },
  {} as Record<string, Flashcard[]>
);

/** Cards grouped by type */
export const flashcardsByType = {
  problem:   allFlashcards.filter((fc) => fc.type === 'problem'),
  concept:   allFlashcards.filter((fc) => fc.type === 'concept'),
  formula:   allFlashcards.filter((fc) => fc.type === 'formula'),
  principle: allFlashcards.filter((fc) => fc.type === 'principle'),
} as const;

/** Cards grouped by difficulty */
export const flashcardsByDifficulty = {
  easy:   allFlashcards.filter((fc) => fc.difficulty === 'easy'),
  medium: allFlashcards.filter((fc) => fc.difficulty === 'medium'),
  hard:   allFlashcards.filter((fc) => fc.difficulty === 'hard'),
} as const;
