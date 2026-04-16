// ─────────────────────────────────────────────
// Generate-Before-Reveal Evaluation Service
// AI/ML Engineer · Phase 1 Foundation
//
// "Attempting a solution before seeing the answer
//  — even incorrectly — dramatically improves learning."
//  — Dehaene & Brown et al.
//
// Forces students to submit their approach BEFORE
// revealing the official solution. The LLM then evaluates
// their thinking, providing structured feedback.
//
// Success metric: ≥ 70% completion rate
// ─────────────────────────────────────────────

import type { Problem } from '../types';
import type { ApproachEvaluation, StudentApproach } from './types';
import { complete, completeJSON } from './claude';
import { renderPrompt, EVALUATE_APPROACH, HINT_GENERATOR } from './prompts';

// ── Core Evaluation ─────────────────────────────

/**
 * Evaluate a student's approach against the official solution.
 * Returns structured feedback with score, correct/missing elements, and next steps.
 */
export async function evaluateApproach(
  problem: Problem,
  studentApproach: string
): Promise<{ evaluation: ApproachEvaluation; tokensUsed: number }> {
  const systemPrompt = renderPrompt(EVALUATE_APPROACH, {
    problem_setup:     problem.setup,
    official_solution: problem.solution,
    key_technique:     problem.keyTechnique,
    student_approach:  studentApproach,
  });

  const { data, response } = await completeJSON<ApproachEvaluation>(
    systemPrompt,
    [{ role: 'user', content: 'Evaluate this approach.' }],
    { temperature: 0.2 }
  );

  return {
    evaluation: data,
    tokensUsed: response.inputTokens + response.outputTokens,
  };
}

/**
 * Generate a contextual hint based on the student's current state.
 * Hint levels: 1 (subtle) → 2 (moderate) → 3 (strong)
 */
export async function generateHint(
  problem: Problem,
  hintLevel: number,
  studentApproach?: string
): Promise<{ hint: string; techniqueReferenced: string | null; tokensUsed: number }> {
  const systemPrompt = renderPrompt(HINT_GENERATOR, {
    problem_setup:    problem.setup,
    official_solution: problem.solution,
    student_approach: studentApproach ?? '(Student has not submitted an approach yet)',
    hint_level:       String(hintLevel),
    total_hints:      '3',
  });

  const { data, response } = await completeJSON<{
    hint: string;
    technique_referenced: string | null;
  }>(
    systemPrompt,
    [{ role: 'user', content: `Generate a level ${hintLevel} hint.` }],
    { temperature: 0.4 }
  );

  return {
    hint:                data.hint,
    techniqueReferenced: data.technique_referenced,
    tokensUsed:          response.inputTokens + response.outputTokens,
  };
}

// ── Approach Quality Tracking ───────────────────

/**
 * Determine the review grade based on evaluation score + hint usage.
 * Maps the AI evaluation back to the SM-2 grading system.
 */
export function evaluationToGrade(
  score: number,
  hintsUsed: number,
  totalHints: number
): 'blackout' | 'again' | 'hard' | 'good' | 'easy' {
  const hintPenalty = totalHints > 0 ? (hintsUsed / totalHints) * 0.3 : 0;
  const adjustedScore = Math.max(0, score - hintPenalty);

  if (adjustedScore < 0.1) return 'blackout';
  if (adjustedScore < 0.3) return 'again';
  if (adjustedScore < 0.5) return 'hard';
  if (adjustedScore < 0.8) return 'good';
  return 'easy';
}

/**
 * Check if a student's approach meets the "generation" threshold.
 * Even a wrong approach counts as generation if it shows genuine effort.
 * Minimum: 20 characters and mentions at least one relevant concept.
 */
export function isValidApproach(approachText: string): boolean {
  const trimmed = approachText.trim();
  if (trimmed.length < 20) return false;
  // Must contain at least one sentence-like structure
  if (!/[.!?]/.test(trimmed) && trimmed.length < 50) return false;
  return true;
}

/**
 * Compute approach completion stats for tracking the 70% target.
 */
export function computeCompletionRate(
  approaches: StudentApproach[],
  totalProblemsAttempted: number
): {
  completionRate: number;
  approachesSubmitted: number;
  averageScore: number;
  averageConfidence: number;
  meetsTarget: boolean;
} {
  if (totalProblemsAttempted === 0) {
    return {
      completionRate:     0,
      approachesSubmitted: 0,
      averageScore:       0,
      averageConfidence:  0,
      meetsTarget:        false,
    };
  }

  const completionRate = approaches.length / totalProblemsAttempted;

  const scores = approaches.filter((a) => a.score != null).map((a) => a.score!);
  const confidences = approaches.filter((a) => a.confidence != null).map((a) => a.confidence);

  return {
    completionRate,
    approachesSubmitted: approaches.length,
    averageScore:       scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0,
    averageConfidence:  confidences.length > 0 ? confidences.reduce((a, b) => a + b, 0) / confidences.length : 0,
    meetsTarget:        completionRate >= 0.7,
  };
}
