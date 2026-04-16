// ─────────────────────────────────────────────
// Weakness Profile Generation Service
// AI/ML Engineer · Phase 1 Foundation
//
// "The OK Plateau — where learners stop improving —
//  is broken only through focused attention on
//  specific weaknesses with immediate feedback."
//  — Ericsson (cited in Make It Stick + Moonwalking)
//
// Aggregates performance signals into per-technique
// weakness profiles that power targeted review and
// adaptive difficulty.
// ─────────────────────────────────────────────

import type {
  WeaknessProfile,
  ProblemSession,
  ProblemError,
  ErrorType,
  ProblemSM2Card,
  ProblemTechnique,
  Technique,
} from './types';
import { completeJSON } from './claude';
import { renderPrompt, WEAKNESS_ANALYSIS } from './prompts';

// ── Profile Computation ─────────────────────────

/**
 * Compute weakness profiles from raw session + error data.
 * Groups by technique and computes aggregate metrics.
 */
export function computeWeaknessProfiles(
  sessions: ProblemSession[],
  errors: ProblemError[],
  sm2States: Record<string, ProblemSM2Card>,
  problemTechniques: ProblemTechnique[],
  techniques: Technique[],
  userId: string
): WeaknessProfile[] {
  // Build problem → technique mapping
  const problemToTechniques = new Map<string, string[]>();
  for (const pt of problemTechniques) {
    const existing = problemToTechniques.get(pt.problemId) ?? [];
    existing.push(pt.techniqueId);
    problemToTechniques.set(pt.problemId, existing);
  }

  // Build technique ID → name mapping
  const techniqueNames = new Map(techniques.map((t) => [t.id, t.name]));

  // Aggregate per-technique
  const profileMap = new Map<string, {
    attempts: number;
    successes: number;
    totalTime: number;
    timeCount: number;
    totalHints: number;
    hintSessions: number;
    errors: Record<ErrorType, number>;
  }>();

  // Initialize all techniques
  for (const tech of techniques) {
    profileMap.set(tech.id, {
      attempts:     0,
      successes:    0,
      totalTime:    0,
      timeCount:    0,
      totalHints:   0,
      hintSessions: 0,
      errors: {
        conceptual: 0, calculation: 0, misread: 0,
        forgot_formula: 0, wrong_technique: 0, incomplete: 0, other: 0,
      },
    });
  }

  // Process sessions
  for (const session of sessions) {
    const techIds = problemToTechniques.get(session.problemId) ?? [];
    for (const techId of techIds) {
      const profile = profileMap.get(techId);
      if (!profile) continue;

      profile.attempts++;
      if (session.outcome === 'solved') profile.successes++;
      if (session.timeSpentSeconds != null) {
        profile.totalTime += session.timeSpentSeconds;
        profile.timeCount++;
      }
      if (session.totalHints > 0) {
        profile.totalHints += session.hintsViewed / session.totalHints;
        profile.hintSessions++;
      }
    }
  }

  // Process errors
  for (const error of errors) {
    const techIds = problemToTechniques.get(error.problemId) ?? [];
    for (const techId of techIds) {
      const profile = profileMap.get(techId);
      if (!profile) continue;
      profile.errors[error.errorType]++;
    }
  }

  // Build final profiles
  const profiles: WeaknessProfile[] = [];

  for (const [techId, data] of profileMap) {
    if (data.attempts === 0) continue; // skip techniques with no data

    const successRate    = data.attempts > 0 ? data.successes / data.attempts : 0;
    const avgTimeSeconds = data.timeCount > 0 ? data.totalTime / data.timeCount : undefined;
    const hintDependency = data.hintSessions > 0 ? data.totalHints / data.hintSessions : 0;

    // Compute adaptive difficulty target (same formula as SQL function)
    let currentDifficulty = 0.5
      + (successRate - 0.7) * 0.5
      - hintDependency * 0.2;
    currentDifficulty = Math.max(0.1, Math.min(1.0, currentDifficulty));

    profiles.push({
      userId,
      techniqueId:       techId,
      techniqueName:     techniqueNames.get(techId) ?? 'Unknown',
      attempts:          data.attempts,
      successes:         data.successes,
      successRate,
      avgTimeSeconds,
      avgHintsUsed:      data.hintSessions > 0 ? data.totalHints / data.hintSessions : undefined,
      hintDependency,
      errorDistribution: { ...data.errors },
      currentDifficulty,
    });
  }

  // Sort by success rate ascending (weakest first)
  return profiles.sort((a, b) => a.successRate - b.successRate);
}

// ── LLM-Powered Analysis ────────────────────────

/**
 * Generate a natural-language weakness analysis using Claude.
 * Takes the computed profiles and produces actionable insights.
 */
export async function analyzeWeaknesses(
  profiles: WeaknessProfile[]
): Promise<{
  analysis: WeaknessAnalysis;
  tokensUsed: number;
}> {
  // Format performance data for the prompt
  const performanceData = profiles.map((p) => ({
    technique:       p.techniqueName,
    successRate:     `${Math.round(p.successRate * 100)}%`,
    attempts:        p.attempts,
    avgTimeSeconds:  p.avgTimeSeconds ? Math.round(p.avgTimeSeconds) : 'N/A',
    hintDependency:  `${Math.round(p.hintDependency * 100)}%`,
    topErrors:       Object.entries(p.errorDistribution)
      .filter(([, count]) => count > 0)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([type, count]) => `${type}: ${count}`),
  }));

  const systemPrompt = renderPrompt(WEAKNESS_ANALYSIS, {
    performance_data: JSON.stringify(performanceData, null, 2),
  });

  const { data, response } = await completeJSON<WeaknessAnalysis>(
    systemPrompt,
    [{ role: 'user', content: 'Analyze my performance and generate a weakness profile.' }],
    { temperature: 0.3 }
  );

  return {
    analysis:   data,
    tokensUsed: response.inputTokens + response.outputTokens,
  };
}

// ── Types ───────────────────────────────────────

export interface WeaknessAnalysis {
  weakestTechniques: Array<{
    technique: string;
    successRate: number;
    diagnosis: string;
    recommendation: string;
  }>;
  strongestTechniques: Array<{
    technique: string;
    successRate: number;
  }>;
  errorPatterns: Array<{
    pattern: string;
    frequency: 'high' | 'medium' | 'low';
    fix: string;
  }>;
  overallAssessment: string;
  priorityActions: string[];
}

// ── Derived Metrics ─────────────────────────────

/**
 * Compute overall readiness score (0–100) from weakness profiles.
 * Weights: technique coverage (40%), success rate (35%), mastery depth (25%).
 */
export function computeReadinessScore(
  profiles: WeaknessProfile[],
  totalTechniques: number
): {
  score: number;
  coverageScore: number;
  successScore: number;
  masteryScore: number;
  label: string;
} {
  if (profiles.length === 0 || totalTechniques === 0) {
    return { score: 0, coverageScore: 0, successScore: 0, masteryScore: 0, label: 'Not Started' };
  }

  // Coverage: what fraction of techniques has the student attempted?
  const coverageScore = Math.min(1, profiles.length / totalTechniques) * 100;

  // Success: weighted average success rate
  const totalAttempts = profiles.reduce((sum, p) => sum + p.attempts, 0);
  const weightedSuccess = totalAttempts > 0
    ? profiles.reduce((sum, p) => sum + p.successRate * p.attempts, 0) / totalAttempts
    : 0;
  const successScore = weightedSuccess * 100;

  // Mastery: fraction of techniques with success rate >= 70% and low hint dependency
  const mastered = profiles.filter(
    (p) => p.successRate >= 0.7 && p.hintDependency < 0.3 && p.attempts >= 3
  ).length;
  const masteryScore = (mastered / Math.max(1, profiles.length)) * 100;

  // Weighted composite
  const score = Math.round(
    coverageScore * 0.4 + successScore * 0.35 + masteryScore * 0.25
  );

  let label: string;
  if (score >= 80) label = 'Interview Ready';
  else if (score >= 60) label = 'Strong Foundation';
  else if (score >= 40) label = 'Building Skills';
  else if (score >= 20) label = 'Getting Started';
  else label = 'Not Started';

  return {
    score,
    coverageScore: Math.round(coverageScore),
    successScore:  Math.round(successScore),
    masteryScore:  Math.round(masteryScore),
    label,
  };
}

/**
 * Identify the top N weakest techniques for targeted practice.
 */
export function getWeakestTechniques(
  profiles: WeaknessProfile[],
  topN: number = 5
): WeaknessProfile[] {
  return profiles
    .filter((p) => p.attempts >= 2) // need enough data
    .sort((a, b) => a.successRate - b.successRate)
    .slice(0, topN);
}

/**
 * Identify techniques that are improving (success rate trending up).
 * Requires at least 5 attempts to be meaningful.
 */
export function getImprovingTechniques(
  profiles: WeaknessProfile[]
): WeaknessProfile[] {
  return profiles.filter(
    (p) => p.attempts >= 5 && p.successRate > 0.5 && p.currentDifficulty > 0.5
  );
}
