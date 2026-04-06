// ─────────────────────────────────────────────
// Core domain types for Quant Review platform
// ─────────────────────────────────────────────

export type Difficulty = 'easy' | 'medium' | 'hard';

export type ProblemStatus = 'unseen' | 'reading' | 'solved';

export type FlashcardType = 'problem' | 'concept' | 'formula';

// ── Problem ──────────────────────────────────

export interface Problem {
  id: string;            // e.g. "ch2-screwy-pirates"
  chapter: number;       // 2
  section: string;       // "2.1"
  sectionTitle: string;  // "Problem Simplification"
  title: string;
  setup: string;         // word-for-word problem statement (markdown)
  solution: string;      // full solution (markdown)
  hints: string[];       // progressive hints
  tags: string[];        // e.g. ["game-theory","logic"]
  difficulty: Difficulty;
  keyTechnique: string;  // one-liner, e.g. "Problem simplification, game theory"
  finalAnswer?: string;  // short answer for quick reference
}

// ── Flashcard ────────────────────────────────

export interface Flashcard {
  id: string;
  type: FlashcardType;
  chapter: number;
  section: string;
  difficulty: Difficulty;
  tags: string[];
  front: string;         // question / prompt (markdown)
  back: string;          // answer / explanation (markdown)
  problemId?: string;    // linked problem, if type === 'problem'
}

// ── SM-2 progress ────────────────────────────

export interface SM2Card {
  cardId: string;
  repetitions: number;   // times reviewed successfully (>=3)
  interval: number;      // days until next review
  easinessFactor: number;// default 2.5
  nextReview: string;    // ISO date string
  lastReviewed?: string; // ISO date string
}

// SM-2 quality grades shown to the user
export type ReviewGrade = 'again' | 'hard' | 'good' | 'easy';

// Map user-visible grades to SM-2 quality scores (0–5)
export const GRADE_QUALITY: Record<ReviewGrade, number> = {
  again: 1,
  hard:  3,
  good:  4,
  easy:  5,
};

// ── User progress ────────────────────────────

export interface ProblemProgress {
  problemId: string;
  status: ProblemStatus;
  lastVisited?: string;  // ISO date string
}

// ── Reading preferences ───────────────────────

export type FontFamily = 'inter' | 'lora' | 'georgia' | 'mono';

export interface TextSettings {
  fontSize: number;       // 14–24 px
  fontFamily: FontFamily;
  lineHeight: number;     // 1.4–2.4
  letterSpacing: number;  // 0–0.1 em
  theme: 'dark' | 'sepia' | 'light';
}

export const DEFAULT_TEXT_SETTINGS: TextSettings = {
  fontSize: 17,
  fontFamily: 'inter',
  lineHeight: 1.8,
  letterSpacing: 0.01,
  theme: 'dark',
};

// ── Aggregate stats ───────────────────────────

export interface SectionStats {
  section: string;
  sectionTitle: string;
  total: number;
  solved: number;
  cardsReviewed: number;
  cardsMastered: number;  // interval >= 21 days
}
