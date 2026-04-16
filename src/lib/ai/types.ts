// ─────────────────────────────────────────────
// AI / ML Infrastructure — Shared Types
// AI/ML Engineer · Phase 1 Foundation
// ─────────────────────────────────────────────

import type { Difficulty } from '../types';

// ── Error Taxonomy ──────────────────────────────

export type ErrorType =
  | 'conceptual'
  | 'calculation'
  | 'misread'
  | 'forgot_formula'
  | 'wrong_technique'
  | 'incomplete'
  | 'other';

// ── Problem Session ─────────────────────────────

export interface ProblemSession {
  id: string;
  userId: string;
  problemId: string;
  startedAt: string;
  endedAt?: string;
  timeSpentSeconds?: number;
  hintsViewed: number;
  totalHints: number;
  solutionRevealed: boolean;
  approachSubmitted: boolean;
  outcome: 'solved' | 'gave_up' | 'timed_out' | 'in_progress';
}

// ── Problem SM-2 State ──────────────────────────

export type ProblemSM2State = 'new' | 'review' | 'mastered';

export interface ProblemSM2Card {
  problemId: string;
  state: ProblemSM2State;
  repetitions: number;
  intervalDays: number;
  easinessFactor: number;
  dueDate: string;         // ISO date
  lastReviewed?: string;
  firstReviewed?: string;
  lastGrade?: ReviewGradeAI;
  totalReviews: number;
}

export type ReviewGradeAI = 'blackout' | 'again' | 'hard' | 'good' | 'easy';

export const GRADE_QUALITY_MAP: Record<ReviewGradeAI, number> = {
  blackout: 0,
  again:    1,
  hard:     2,
  good:     4,
  easy:     5,
};

// ── Error Record ────────────────────────────────

export interface ProblemError {
  id: string;
  userId: string;
  problemId: string;
  sessionId?: string;
  errorType: ErrorType;
  notes?: string;
  createdAt: string;
}

// ── Student Approach (Generate-Before-Reveal) ───

export interface StudentApproach {
  id: string;
  userId: string;
  problemId: string;
  sessionId?: string;
  approachText: string;
  confidence: number;       // 1–5
  aiEvaluation?: ApproachEvaluation;
  score?: number;           // 0.0–1.0
  createdAt: string;
}

export interface ApproachEvaluation {
  score: number;            // 0.0–1.0
  correctElements: string[];
  missingElements: string[];
  feedback: string;
  techniqueIdentified: boolean;
  suggestedNextStep?: string;
}

// ── Technique Atlas ─────────────────────────────

export interface Technique {
  id: string;
  slug: string;
  name: string;
  description?: string;
  category?: string;
}

export interface ProblemTechnique {
  problemId: string;
  techniqueId: string;
  relevance: number;        // 0.0–1.0
  isPrimary: boolean;
}

// ── Weakness Profile ────────────────────────────

export interface WeaknessProfile {
  userId: string;
  techniqueId: string;
  techniqueName: string;
  attempts: number;
  successes: number;
  successRate: number;
  avgTimeSeconds?: number;
  avgHintsUsed?: number;
  hintDependency: number;
  errorDistribution: Record<ErrorType, number>;
  currentDifficulty: number;
}

// ── Adaptive Difficulty ─────────────────────────

export interface DifficultySignals {
  successRate: number;
  avgTimeSeconds: number;
  hintDependency: number;
  recentTrend: 'improving' | 'declining' | 'stable';
  streakLength: number;
}

export interface AdaptiveRecommendation {
  targetDifficulty: Difficulty;
  numericDifficulty: number;  // 0.0–1.0
  reasoning: string;
  suggestedProblems: string[];
}

// ── Interleaved Practice ────────────────────────

export interface InterleavedConfig {
  chapters: number[];         // which chapters to pull from
  problemCount: number;       // how many problems in the session
  avoidRecent: number;        // skip problems attempted in last N days
  weightWeakness: boolean;    // bias toward weak techniques
  mode: 'interleaved' | 'blocked';
}

export interface InterleavedSession {
  id: string;
  userId: string;
  mode: 'interleaved' | 'blocked';
  problemIds: string[];
  chaptersMixed: number[];
  completedCount: number;
  totalCorrect: number;
  startedAt: string;
  endedAt?: string;
}

// ── Socratic Session ────────────────────────────

export type SocraticRole = 'interviewer' | 'student';

export interface SocraticMessage {
  role: SocraticRole;
  content: string;
  timestamp: string;
  hintGiven?: boolean;
}

export interface SocraticScore {
  clarity: number;          // 1–5
  correctness: number;      // 1–5
  communication: number;    // 1–5
  problemSolving: number;   // 1–5
  overall: number;          // 1–5
  feedback: string;
}

export interface SocraticSession {
  id: string;
  userId: string;
  problemId: string;
  status: 'active' | 'completed' | 'abandoned';
  messages: SocraticMessage[];
  score?: SocraticScore;
  hintsGiven: number;
  durationSeconds?: number;
  startedAt: string;
  endedAt?: string;
}

// ── Prompt Version ──────────────────────────────

export interface PromptVersion {
  id: string;
  promptKey: string;
  version: number;
  template: string;
  model: string;
  parameters: Record<string, unknown>;
  isActive: boolean;
  evalScores: Record<string, number>;
  notes?: string;
  createdAt: string;
}

// ── Embedding ───────────────────────────────────

export type ContentType =
  | 'problem_setup'
  | 'problem_solution'
  | 'problem_hint'
  | 'flashcard_front'
  | 'flashcard_back'
  | 'prose'
  | 'technique';

export interface ContentEmbedding {
  id: string;
  contentType: ContentType;
  contentId: string;
  chunkIndex: number;
  contentText: string;
  embedding: number[];
  metadata: Record<string, unknown>;
}

export interface SimilarityResult {
  contentType: ContentType;
  contentId: string;
  contentText: string;
  metadata: Record<string, unknown>;
  similarity: number;
}
