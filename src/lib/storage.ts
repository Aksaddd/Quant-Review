// ─────────────────────────────────────────────
// localStorage persistence layer
// Used as fallback when Supabase is not configured (guest / demo mode).
// All data is JSON-serialised under namespaced keys.
// ─────────────────────────────────────────────
import { SM2Card, ProblemProgress, TextSettings, DEFAULT_TEXT_SETTINGS, CustomSet } from './types';

const KEYS = {
  sm2:       'qr:sm2',
  problems:  'qr:problems',
  settings:  'qr:settings',
} as const;

function load<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch { /* quota exceeded – ignore */ }
}

// ── SM-2 cards ───────────────────────────────

export function loadSM2Cards(): Record<string, SM2Card> {
  return load<Record<string, SM2Card>>(KEYS.sm2, {});
}

export function saveSM2Cards(cards: Record<string, SM2Card>): void {
  save(KEYS.sm2, cards);
}

export function upsertSM2Card(card: SM2Card): void {
  const all = loadSM2Cards();
  all[card.cardId] = card;
  saveSM2Cards(all);
}

// ── Problem progress ─────────────────────────

export function loadProblemProgress(): Record<string, ProblemProgress> {
  return load<Record<string, ProblemProgress>>(KEYS.problems, {});
}

export function saveProblemProgress(p: Record<string, ProblemProgress>): void {
  save(KEYS.problems, p);
}

export function upsertProblemProgress(prog: ProblemProgress): void {
  const all = loadProblemProgress();
  all[prog.problemId] = { ...all[prog.problemId], ...prog };
  saveProblemProgress(all);
}

// ── Text settings ────────────────────────────

export function loadTextSettings(): TextSettings {
  return load<TextSettings>(KEYS.settings, DEFAULT_TEXT_SETTINGS);
}

export function saveTextSettings(s: TextSettings): void {
  save(KEYS.settings, s);
}

// ── Study settings ───────────────────────────

export interface StudySettings {
  newCardsPerDay: number;
}

export const DEFAULT_STUDY_SETTINGS: StudySettings = {
  newCardsPerDay: 10,
};

export function loadStudySettings(): StudySettings {
  return load<StudySettings>('qr:study', DEFAULT_STUDY_SETTINGS);
}

export function saveStudySettings(s: StudySettings): void {
  save('qr:study', s);
}

// ── Custom flashcard sets ────────────────────

export function loadCustomSets(): CustomSet[] {
  return load<CustomSet[]>('qr:sets', []);
}

export function saveCustomSets(sets: CustomSet[]): void {
  save('qr:sets', sets);
}
