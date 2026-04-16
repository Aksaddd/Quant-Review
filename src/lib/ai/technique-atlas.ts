// ─────────────────────────────────────────────
// Technique Atlas
// AI/ML Engineer · Phase 1 Foundation
//
// Cross-cutting index linking all problems that
// share a technique (Bayes, martingales, etc.).
//
// "Memory is like a spiderweb — the more it catches,
//  the bigger it grows." — Joshua Foer
//
// When a student struggles with Bayes' theorem, the
// Atlas surfaces every problem across chapters 2–7
// that uses it, building the associative web that
// is the foundation of expert memory.
// ─────────────────────────────────────────────

import type { Problem } from '../types';
import type { Technique, ProblemTechnique, ContentType } from './types';
import { completeJSON } from './claude';
import { renderPrompt, TECHNIQUE_CLASSIFIER } from './prompts';
import { generateEmbedding, findSimilar } from './embeddings';

// ── Technique Seed Data ─────────────────────────
// Core techniques across all 7 chapters.
// This seeds the techniques table; LLM classification adds more.

export const SEED_TECHNIQUES: Omit<Technique, 'id'>[] = [
  { slug: 'bayes-theorem',         name: "Bayes' Theorem",          category: 'probability',           description: 'Updating probabilities given new evidence via conditional probability.' },
  { slug: 'conditional-probability', name: 'Conditional Probability', category: 'probability',          description: 'Computing probability of events given that another event has occurred.' },
  { slug: 'symmetry-arguments',    name: 'Symmetry Arguments',       category: 'symmetry',             description: 'Exploiting symmetry to simplify problems or prove invariants.' },
  { slug: 'parity-invariants',     name: 'Parity Invariants',        category: 'symmetry',             description: 'Using odd/even properties to prove impossibility or determine outcomes.' },
  { slug: 'pigeonhole-principle',  name: 'Pigeonhole Principle',     category: 'combinatorics',        description: 'If n+1 items are put into n containers, at least one container has two items.' },
  { slug: 'proof-by-contradiction', name: 'Proof by Contradiction',  category: 'logic',                description: 'Assume the opposite and derive a logical contradiction.' },
  { slug: 'mathematical-induction', name: 'Mathematical Induction',  category: 'logic',                description: 'Prove base case, then prove that case k implies case k+1.' },
  { slug: 'modular-arithmetic',    name: 'Modular Arithmetic',       category: 'symmetry',             description: 'Working with remainders after division to find invariants.' },
  { slug: 'backward-induction',    name: 'Backward Induction',       category: 'game_theory',          description: 'Solving sequential games by reasoning backward from the end.' },
  { slug: 'problem-simplification', name: 'Problem Simplification',  category: 'logic',                description: 'Reducing a complex problem to a simpler equivalent.' },
  { slug: 'expected-value',        name: 'Expected Value',           category: 'probability',           description: 'Computing the weighted average of all possible outcomes.' },
  { slug: 'indicator-variables',   name: 'Indicator Variables',      category: 'probability',           description: 'Using 0/1 random variables to decompose complex expectations.' },
  { slug: 'generating-functions',  name: 'Generating Functions',     category: 'combinatorics',        description: 'Encoding sequences as coefficients of power series.' },
  { slug: 'markov-chains',         name: 'Markov Chains',            category: 'stochastic_processes', description: 'Memoryless stochastic processes with transition probabilities.' },
  { slug: 'martingales',           name: 'Martingales',              category: 'stochastic_processes', description: 'Fair game processes where expected future value equals current value.' },
  { slug: 'random-walks',          name: 'Random Walks',             category: 'stochastic_processes', description: 'Sequential random steps; models for stock prices and diffusion.' },
  { slug: 'brownian-motion',       name: 'Brownian Motion',          category: 'stochastic_processes', description: 'Continuous-time random walk; foundation of financial modeling.' },
  { slug: 'itos-lemma',            name: "Ito's Lemma",              category: 'stochastic_processes', description: 'Chain rule for stochastic calculus; transforms of Brownian motion.' },
  { slug: 'black-scholes',         name: 'Black-Scholes Model',      category: 'finance',              description: 'Option pricing via risk-neutral valuation and geometric Brownian motion.' },
  { slug: 'risk-neutral-valuation', name: 'Risk-Neutral Valuation',  category: 'finance',              description: 'Pricing derivatives by assuming all assets earn the risk-free rate.' },
  { slug: 'monte-carlo',           name: 'Monte Carlo Simulation',   category: 'numerical_methods',    description: 'Estimating quantities through random sampling.' },
  { slug: 'dynamic-programming',   name: 'Dynamic Programming',      category: 'numerical_methods',    description: 'Breaking problems into overlapping subproblems with optimal substructure.' },
  { slug: 'greeks',                name: 'The Greeks',                category: 'finance',              description: 'Sensitivity measures for option prices (delta, gamma, theta, vega, rho).' },
  { slug: 'optimization',          name: 'Optimization',             category: 'calculus',             description: 'Finding maxima/minima using derivatives and constraints.' },
  { slug: 'integration-techniques', name: 'Integration Techniques',  category: 'calculus',             description: 'Integration by parts, substitution, partial fractions, and special integrals.' },
];

// ── LLM-Powered Technique Classification ────────

/**
 * Classify a problem's techniques using the LLM.
 * Returns technique tags with relevance scores.
 */
export async function classifyProblemTechniques(
  problem: Problem
): Promise<{
  techniques: Array<{
    slug: string;
    name: string;
    category: string;
    relevance: number;
    isPrimary: boolean;
    reasoning: string;
  }>;
  tokensUsed: number;
}> {
  const systemPrompt = renderPrompt(TECHNIQUE_CLASSIFIER, {
    problem_title:     problem.title,
    problem_setup:     problem.setup,
    official_solution: problem.solution,
  });

  const { data, response } = await completeJSON<{
    techniques: Array<{
      slug: string;
      name: string;
      category: string;
      relevance: number;
      isPrimary: boolean;
      reasoning: string;
    }>;
  }>(
    systemPrompt,
    [{ role: 'user', content: 'Classify the techniques used in this problem.' }],
    { temperature: 0.1 }
  );

  return {
    techniques: data.techniques,
    tokensUsed: response.inputTokens + response.outputTokens,
  };
}

// ── Atlas Queries ───────────────────────────────

/**
 * Find all problems that share a technique with the given problem.
 * Uses the problem_techniques junction table.
 */
export function findRelatedByTechnique(
  problemId: string,
  allProblems: Problem[],
  problemTechniques: ProblemTechnique[]
): Array<{ problem: Problem; sharedTechniques: string[]; maxRelevance: number }> {
  // Get techniques for the source problem
  const sourceTechniques = problemTechniques
    .filter((pt) => pt.problemId === problemId)
    .map((pt) => pt.techniqueId);

  if (sourceTechniques.length === 0) return [];

  // Find other problems that share techniques
  const related = new Map<string, { techniqueIds: string[]; maxRelevance: number }>();

  for (const pt of problemTechniques) {
    if (pt.problemId === problemId) continue;
    if (!sourceTechniques.includes(pt.techniqueId)) continue;

    const existing = related.get(pt.problemId);
    if (existing) {
      existing.techniqueIds.push(pt.techniqueId);
      existing.maxRelevance = Math.max(existing.maxRelevance, pt.relevance);
    } else {
      related.set(pt.problemId, {
        techniqueIds:  [pt.techniqueId],
        maxRelevance:  pt.relevance,
      });
    }
  }

  // Map to problems and sort by number of shared techniques
  const results: Array<{ problem: Problem; sharedTechniques: string[]; maxRelevance: number }> = [];
  const problemMap = new Map(allProblems.map((p) => [p.id, p]));

  for (const [pid, data] of related) {
    const problem = problemMap.get(pid);
    if (problem) {
      results.push({
        problem,
        sharedTechniques: data.techniqueIds,
        maxRelevance:     data.maxRelevance,
      });
    }
  }

  return results.sort((a, b) =>
    b.sharedTechniques.length - a.sharedTechniques.length
    || b.maxRelevance - a.maxRelevance
  );
}

/**
 * Find problems similar to a query using semantic search.
 * Searches embeddings of problem setups and solutions.
 */
export async function findSimilarProblems(
  queryText: string,
  supabaseClient: {
    rpc: (fn: string, args: Record<string, unknown>) => Promise<{ data: unknown[] | null; error: unknown }>;
  },
  options: { matchCount?: number; matchThreshold?: number } = {}
): Promise<Array<{ contentId: string; similarity: number; contentText: string }>> {
  const results = await findSimilar(queryText, supabaseClient as Parameters<typeof findSimilar>[1], {
    matchCount:     options.matchCount ?? 10,
    matchThreshold: options.matchThreshold ?? 0.7,
    filterType:     'problem_setup',
  });

  return results.map((r) => ({
    contentId:   r.contentId,
    similarity:  r.similarity,
    contentText: r.contentText,
  }));
}

/**
 * Build the Technique Atlas index: for each technique,
 * list all problems that use it with relevance scores.
 */
export function buildAtlasIndex(
  techniques: Technique[],
  problemTechniques: ProblemTechnique[],
  allProblems: Problem[]
): Map<string, Array<{ problem: Problem; relevance: number; isPrimary: boolean }>> {
  const atlas = new Map<string, Array<{ problem: Problem; relevance: number; isPrimary: boolean }>>();
  const problemMap = new Map(allProblems.map((p) => [p.id, p]));

  for (const tech of techniques) {
    const entries = problemTechniques
      .filter((pt) => pt.techniqueId === tech.id)
      .map((pt) => ({
        problem:   problemMap.get(pt.problemId)!,
        relevance: pt.relevance,
        isPrimary: pt.isPrimary,
      }))
      .filter((e) => e.problem != null)
      .sort((a, b) => b.relevance - a.relevance);

    atlas.set(tech.id, entries);
  }

  return atlas;
}

/**
 * Get technique statistics: how many problems use each technique,
 * across how many chapters, at what difficulties.
 */
export function getTechniqueStats(
  techniques: Technique[],
  problemTechniques: ProblemTechnique[],
  allProblems: Problem[]
): Array<{
  technique: Technique;
  problemCount: number;
  chapters: number[];
  difficulties: Record<string, number>;
}> {
  const problemMap = new Map(allProblems.map((p) => [p.id, p]));

  return techniques.map((tech) => {
    const linkedProblems = problemTechniques
      .filter((pt) => pt.techniqueId === tech.id)
      .map((pt) => problemMap.get(pt.problemId))
      .filter((p): p is Problem => p != null);

    const chapters = [...new Set(linkedProblems.map((p) => p.chapter))].sort();
    const difficulties: Record<string, number> = { easy: 0, medium: 0, hard: 0 };
    for (const p of linkedProblems) difficulties[p.difficulty]++;

    return {
      technique:    tech,
      problemCount: linkedProblems.length,
      chapters,
      difficulties,
    };
  }).sort((a, b) => b.problemCount - a.problemCount);
}
