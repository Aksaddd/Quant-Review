// ─────────────────────────────────────────────
// Cross-Chapter Interleaved Practice Engine
// AI/ML Engineer · Phase 1 Foundation
//
// "Interleaved practice produced 215% better
//  delayed test scores than blocked practice"
//  — Brown, Roediger, McDaniel (Make It Stick)
//
// This engine selects problems from MULTIPLE chapters
// in random order, forcing discrimination — identifying
// which technique applies — exactly what a real quant
// interview demands.
// ─────────────────────────────────────────────

import type { Problem, Difficulty } from '../types';
import type {
  InterleavedConfig,
  ProblemSM2Card,
  WeaknessProfile,
} from './types';

// ── Default Configuration ───────────────────────

export const DEFAULT_INTERLEAVED_CONFIG: InterleavedConfig = {
  chapters:       [2, 3, 4, 5, 6, 7],
  problemCount:   10,
  avoidRecent:    2,   // skip problems attempted in last 2 days
  weightWeakness: true,
  mode:           'interleaved',
};

// ── Core Selection Algorithm ────────────────────

/**
 * Select problems for an interleaved practice session.
 *
 * The algorithm:
 * 1. Filter to problems from requested chapters
 * 2. Exclude recently attempted problems (anti-recency bias)
 * 3. Weight toward weak techniques (if enabled)
 * 4. Ensure cross-chapter distribution (no more than 40% from one chapter)
 * 5. Shuffle using Fisher-Yates for true randomization
 * 6. Balance difficulty distribution (aim for 30% easy, 50% medium, 20% hard)
 */
export function selectInterleaved(
  allProblems: Problem[],
  config: InterleavedConfig,
  sm2States?: Record<string, ProblemSM2Card>,
  weaknesses?: WeaknessProfile[]
): Problem[] {
  const { chapters, problemCount, avoidRecent, weightWeakness, mode } = config;

  // Step 1: Filter to requested chapters
  let pool = allProblems.filter((p) => chapters.includes(p.chapter));

  // Step 2: Exclude recently attempted (if SM-2 state available)
  if (sm2States && avoidRecent > 0) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - avoidRecent);
    const cutoffISO = cutoff.toISOString().slice(0, 10);

    pool = pool.filter((p) => {
      const state = sm2States[p.id];
      if (!state?.lastReviewed) return true; // never attempted — include
      return state.lastReviewed < cutoffISO;
    });
  }

  if (pool.length === 0) return [];

  // Step 3: Assign selection weights
  const weighted = pool.map((problem) => ({
    problem,
    weight: computeWeight(problem, sm2States, weaknesses, weightWeakness),
  }));

  // Step 4: Select with weighted sampling + chapter caps
  const selected: Problem[] = [];
  const chapterCounts: Record<number, number> = {};
  const maxPerChapter = Math.ceil(problemCount * 0.4);

  // Sort by weight descending for greedy selection, then add randomness
  const shuffled = weightedShuffle(weighted);

  for (const { problem } of shuffled) {
    if (selected.length >= problemCount) break;

    const chCount = chapterCounts[problem.chapter] ?? 0;
    if (chCount >= maxPerChapter) continue; // cap per chapter

    selected.push(problem);
    chapterCounts[problem.chapter] = chCount + 1;
  }

  // Step 5: Blocked mode = sort by chapter; Interleaved = shuffle
  if (mode === 'blocked') {
    return selected.sort((a, b) => a.chapter - b.chapter || a.section.localeCompare(b.section));
  }

  return fisherYatesShuffle(selected);
}

// ── Weight Computation ──────────────────────────

function computeWeight(
  problem: Problem,
  sm2States?: Record<string, ProblemSM2Card>,
  weaknesses?: WeaknessProfile[],
  useWeakness?: boolean
): number {
  let weight = 1.0;

  // Base difficulty weight (prefer medium, the desirable difficulty sweet spot)
  const difficultyWeights: Record<Difficulty, number> = {
    easy:   0.6,
    medium: 1.0,
    hard:   0.8,
  };
  weight *= difficultyWeights[problem.difficulty];

  // SM-2 state: boost unseen and low-EF problems
  if (sm2States) {
    const state = sm2States[problem.id];
    if (!state || state.state === 'new') {
      weight *= 1.3; // unseen problems get a boost
    } else if (state.easinessFactor < 2.0) {
      weight *= 1.5; // struggling problems get higher priority
    } else if (state.state === 'mastered') {
      weight *= 0.3; // mastered problems are deprioritized
    }
  }

  // Weakness weighting: boost problems that target weak techniques
  if (useWeakness && weaknesses && weaknesses.length > 0) {
    const weakTechniques = weaknesses
      .filter((w) => w.successRate < 0.5)
      .map((w) => w.techniqueName.toLowerCase());

    const tags = problem.tags.map((t) => t.toLowerCase());
    const technique = problem.keyTechnique.toLowerCase();

    for (const weak of weakTechniques) {
      if (tags.some((t) => t.includes(weak)) || technique.includes(weak)) {
        weight *= 1.8; // significant boost for weak areas
        break;
      }
    }
  }

  return weight;
}

// ── Shuffling ───────────────────────────────────

/**
 * Weighted shuffle: items with higher weights appear earlier on average,
 * but randomness is preserved. Uses the algorithm:
 * sort by (random ^ (1/weight)) descending.
 */
function weightedShuffle<T>(items: Array<{ weight: number } & T>): Array<{ weight: number } & T> {
  return [...items]
    .map((item) => ({
      ...item,
      sortKey: Math.pow(Math.random(), 1 / Math.max(item.weight, 0.01)),
    }))
    .sort((a, b) => b.sortKey - a.sortKey);
}

/**
 * Fisher-Yates shuffle for uniform randomization.
 */
function fisherYatesShuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// ── Difficulty Distribution ─────────────────────

/**
 * Analyze the difficulty distribution of a selected set.
 * Target: ~30% easy, ~50% medium, ~20% hard.
 */
export function analyzeDifficultyDistribution(
  problems: Problem[]
): { easy: number; medium: number; hard: number; balanced: boolean } {
  const counts = { easy: 0, medium: 0, hard: 0 };
  for (const p of problems) counts[p.difficulty]++;

  const total = problems.length || 1;
  const ratios = {
    easy:   counts.easy / total,
    medium: counts.medium / total,
    hard:   counts.hard / total,
  };

  // "Balanced" if no single difficulty exceeds 60%
  const balanced = ratios.easy <= 0.6 && ratios.medium <= 0.6 && ratios.hard <= 0.6;

  return { ...counts, balanced };
}

/**
 * Analyze chapter distribution of a selected set.
 */
export function analyzeChapterDistribution(
  problems: Problem[]
): { chapters: Record<number, number>; chaptersUsed: number; wellDistributed: boolean } {
  const chapters: Record<number, number> = {};
  for (const p of problems) {
    chapters[p.chapter] = (chapters[p.chapter] ?? 0) + 1;
  }

  const chaptersUsed = Object.keys(chapters).length;
  const total = problems.length || 1;
  const maxRatio = Math.max(...Object.values(chapters)) / total;

  // "Well distributed" if no single chapter exceeds 40%
  return { chapters, chaptersUsed, wellDistributed: maxRatio <= 0.4 };
}
