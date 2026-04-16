// ─────────────────────────────────────────────
// Adaptive Difficulty Engine
// AI/ML Engineer · Phase 1 Foundation
//
// Targets ~70% success rate — the "desirable difficulty"
// sweet spot identified across all six research books.
//
// Signals used:
// 1. Time-to-solution (fast = easy, slow = hard)
// 2. Error taxonomy (what kind of mistakes)
// 3. Hint consumption (high dependency = lower mastery)
// 4. SM-2 interval (longer = more consolidated)
// 5. Recent trend (improving / declining / stable)
// ─────────────────────────────────────────────

import type { Problem, Difficulty } from '../types';
import type {
  DifficultySignals,
  AdaptiveRecommendation,
  ProblemSession,
  ProblemError,
  WeaknessProfile,
  ProblemSM2Card,
} from './types';

// ── Constants ───────────────────────────────────

// Target success rate: 70% (desirable difficulty)
const TARGET_SUCCESS_RATE = 0.7;
// Tolerance band: 60–80% is "in the zone"
const LOWER_BOUND = 0.6;
const UPPER_BOUND = 0.8;

// Time benchmarks (seconds) per difficulty
const TIME_BENCHMARKS: Record<Difficulty, { fast: number; expected: number; slow: number }> = {
  easy:   { fast: 30,  expected: 120,  slow: 300  },
  medium: { fast: 60,  expected: 300,  slow: 600  },
  hard:   { fast: 120, expected: 600,  slow: 1200 },
};

// Difficulty numeric mapping
const DIFFICULTY_NUMERIC: Record<Difficulty, number> = {
  easy:   0.25,
  medium: 0.5,
  hard:   0.85,
};

// ── Signal Computation ──────────────────────────

/**
 * Compute difficulty signals from a student's recent performance.
 * These signals feed into the adaptive recommendation.
 */
export function computeSignals(
  sessions: ProblemSession[],
  errors: ProblemError[],
  sm2States: Record<string, ProblemSM2Card>,
  windowDays: number = 14
): DifficultySignals {
  // Filter to recent sessions
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - windowDays);
  const cutoffISO = cutoff.toISOString();

  const recentSessions = sessions.filter((s) => s.startedAt >= cutoffISO);

  if (recentSessions.length === 0) {
    return {
      successRate:    0.5,
      avgTimeSeconds: 0,
      hintDependency: 0,
      recentTrend:    'stable',
      streakLength:   0,
    };
  }

  // Success rate
  const solved = recentSessions.filter((s) => s.outcome === 'solved').length;
  const successRate = solved / recentSessions.length;

  // Average time
  const timeSessions = recentSessions.filter((s) => s.timeSpentSeconds != null);
  const avgTimeSeconds = timeSessions.length > 0
    ? timeSessions.reduce((sum, s) => sum + (s.timeSpentSeconds ?? 0), 0) / timeSessions.length
    : 0;

  // Hint dependency: ratio of hints used to hints available
  const hintSessions = recentSessions.filter((s) => s.totalHints > 0);
  const hintDependency = hintSessions.length > 0
    ? hintSessions.reduce((sum, s) => sum + s.hintsViewed / s.totalHints, 0) / hintSessions.length
    : 0;

  // Recent trend: compare first half vs second half of window
  const mid = Math.floor(recentSessions.length / 2);
  let recentTrend: 'improving' | 'declining' | 'stable' = 'stable';

  if (recentSessions.length >= 4) {
    const firstHalf  = recentSessions.slice(0, mid);
    const secondHalf = recentSessions.slice(mid);

    const firstRate  = firstHalf.filter((s) => s.outcome === 'solved').length / firstHalf.length;
    const secondRate = secondHalf.filter((s) => s.outcome === 'solved').length / secondHalf.length;

    if (secondRate - firstRate > 0.1)      recentTrend = 'improving';
    else if (firstRate - secondRate > 0.1) recentTrend = 'declining';
  }

  // Current success streak
  let streakLength = 0;
  for (let i = recentSessions.length - 1; i >= 0; i--) {
    if (recentSessions[i].outcome === 'solved') streakLength++;
    else break;
  }

  return {
    successRate,
    avgTimeSeconds,
    hintDependency,
    recentTrend,
    streakLength,
  };
}

// ── Adaptive Recommendation ─────────────────────

/**
 * Generate an adaptive difficulty recommendation.
 *
 * Core logic:
 * - If success rate > 80%: increase difficulty (too easy, student bored)
 * - If success rate < 60%: decrease difficulty (too hard, student frustrated)
 * - If 60-80%: stay in the zone (desirable difficulty)
 * - Hint dependency lowers effective mastery
 * - Improving trend → can push slightly harder
 * - Declining trend → ease off
 */
export function recommend(
  signals: DifficultySignals,
  currentDifficulty: number = 0.5,
  availableProblems?: Problem[]
): AdaptiveRecommendation {
  // Base adjustment from success rate
  let targetNumeric = currentDifficulty;
  const effectiveRate = signals.successRate * (1 - signals.hintDependency * 0.3);

  if (effectiveRate > UPPER_BOUND) {
    // Too easy — push harder
    const push = (effectiveRate - UPPER_BOUND) * 0.5;
    targetNumeric = Math.min(1.0, targetNumeric + push);
  } else if (effectiveRate < LOWER_BOUND) {
    // Too hard — ease off
    const ease = (LOWER_BOUND - effectiveRate) * 0.5;
    targetNumeric = Math.max(0.1, targetNumeric - ease);
  }

  // Trend adjustment
  if (signals.recentTrend === 'improving') {
    targetNumeric = Math.min(1.0, targetNumeric + 0.05);
  } else if (signals.recentTrend === 'declining') {
    targetNumeric = Math.max(0.1, targetNumeric - 0.05);
  }

  // Streak bonus: 5+ correct in a row → significant push
  if (signals.streakLength >= 5) {
    targetNumeric = Math.min(1.0, targetNumeric + 0.1);
  }

  // Map numeric difficulty to categorical
  let targetDifficulty: Difficulty;
  if (targetNumeric < 0.35)      targetDifficulty = 'easy';
  else if (targetNumeric < 0.7)  targetDifficulty = 'medium';
  else                           targetDifficulty = 'hard';

  // Generate reasoning
  const reasoning = buildReasoning(signals, currentDifficulty, targetNumeric);

  // Suggest problems if available
  const suggestedProblems = availableProblems
    ? selectByDifficulty(availableProblems, targetDifficulty, 5)
    : [];

  return {
    targetDifficulty,
    numericDifficulty: Math.round(targetNumeric * 100) / 100,
    reasoning,
    suggestedProblems: suggestedProblems.map((p) => p.id),
  };
}

// ── Per-Technique Recommendations ───────────────

/**
 * Generate difficulty recommendations per technique.
 * Used to personalize the interleaved practice selection.
 */
export function recommendByTechnique(
  weaknesses: WeaknessProfile[]
): Record<string, AdaptiveRecommendation> {
  const recommendations: Record<string, AdaptiveRecommendation> = {};

  for (const wp of weaknesses) {
    const signals: DifficultySignals = {
      successRate:    wp.successRate,
      avgTimeSeconds: wp.avgTimeSeconds ?? 0,
      hintDependency: wp.hintDependency,
      recentTrend:    'stable',
      streakLength:   0,
    };

    recommendations[wp.techniqueId] = recommend(signals, wp.currentDifficulty);
  }

  return recommendations;
}

// ── Helpers ─────────────────────────────────────

function selectByDifficulty(
  problems: Problem[],
  target: Difficulty,
  count: number
): Problem[] {
  // Prioritize exact matches, then adjacent difficulties
  const exact    = problems.filter((p) => p.difficulty === target);
  const adjacent = problems.filter((p) => p.difficulty !== target);

  const pool = [...exact, ...adjacent];
  // Shuffle and take top N
  const shuffled = pool.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function buildReasoning(
  signals: DifficultySignals,
  current: number,
  target: number
): string {
  const parts: string[] = [];

  if (signals.successRate > UPPER_BOUND) {
    parts.push(`Success rate (${Math.round(signals.successRate * 100)}%) is above the 80% ceiling — increasing challenge.`);
  } else if (signals.successRate < LOWER_BOUND) {
    parts.push(`Success rate (${Math.round(signals.successRate * 100)}%) is below the 60% floor — reducing difficulty.`);
  } else {
    parts.push(`Success rate (${Math.round(signals.successRate * 100)}%) is in the desirable difficulty zone (60-80%).`);
  }

  if (signals.hintDependency > 0.5) {
    parts.push(`High hint dependency (${Math.round(signals.hintDependency * 100)}%) suggests lower effective mastery.`);
  }

  if (signals.recentTrend === 'improving') {
    parts.push('Recent trend is improving — slight difficulty increase applied.');
  } else if (signals.recentTrend === 'declining') {
    parts.push('Recent trend is declining — slight difficulty decrease applied.');
  }

  if (signals.streakLength >= 5) {
    parts.push(`${signals.streakLength}-problem success streak — bonus difficulty push.`);
  }

  return parts.join(' ');
}

/**
 * Evaluate whether a time-to-solution is fast, expected, or slow
 * for the given difficulty level.
 */
export function evaluateTime(
  seconds: number,
  difficulty: Difficulty
): 'fast' | 'expected' | 'slow' {
  const bench = TIME_BENCHMARKS[difficulty];
  if (seconds <= bench.fast)      return 'fast';
  if (seconds <= bench.expected)  return 'expected';
  return 'slow';
}

export { TARGET_SUCCESS_RATE, DIFFICULTY_NUMERIC };
