// ─────────────────────────────────────────────
// useInterleaved — Interleaved Practice Hook
// AI/ML Engineer · Phase 1 Foundation
//
// Frontend hook for generating and managing
// cross-chapter interleaved practice sessions.
// ─────────────────────────────────────────────

'use client';

import { useState, useCallback } from 'react';
import type { Problem } from '@/lib/types';
import type { InterleavedConfig, ProblemSM2Card, InterleavedSession } from '@/lib/ai/types';
import {
  selectInterleaved,
  DEFAULT_INTERLEAVED_CONFIG,
  analyzeDifficultyDistribution,
  analyzeChapterDistribution,
} from '@/lib/ai/interleave';

const STORAGE_KEY = 'qr:interleaved-sessions';

function loadHistory(): InterleavedSession[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(sessions: InterleavedSession[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch { /* quota */ }
}

export function useInterleaved(allProblems: Problem[]) {
  const [currentSession, setCurrentSession] = useState<InterleavedSession | null>(null);
  const [sessionProblems, setSessionProblems] = useState<Problem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  /** Start a new practice session with the given config. */
  const startSession = useCallback((
    config: Partial<InterleavedConfig> = {},
    sm2States?: Record<string, ProblemSM2Card>
  ) => {
    const mergedConfig: InterleavedConfig = {
      ...DEFAULT_INTERLEAVED_CONFIG,
      ...config,
    };

    const selected = selectInterleaved(allProblems, mergedConfig, sm2States);

    const session: InterleavedSession = {
      id:             crypto.randomUUID(),
      userId:         '',
      mode:           mergedConfig.mode,
      problemIds:     selected.map((p) => p.id),
      chaptersMixed:  [...new Set(selected.map((p) => p.chapter))],
      completedCount: 0,
      totalCorrect:   0,
      startedAt:      new Date().toISOString(),
    };

    setCurrentSession(session);
    setSessionProblems(selected);
    setCurrentIndex(0);

    return { session, problems: selected };
  }, [allProblems]);

  /** Record the result for the current problem and advance. */
  const recordResult = useCallback((correct: boolean) => {
    if (!currentSession) return;

    const updated: InterleavedSession = {
      ...currentSession,
      completedCount: currentSession.completedCount + 1,
      totalCorrect:   currentSession.totalCorrect + (correct ? 1 : 0),
    };

    setCurrentSession(updated);

    if (currentIndex < sessionProblems.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Session complete
      updated.endedAt = new Date().toISOString();
      setCurrentSession(updated);

      // Persist to history
      const history = loadHistory();
      history.push(updated);
      saveHistory(history);
    }

    return updated;
  }, [currentSession, currentIndex, sessionProblems]);

  /** End the session early. */
  const endSessionEarly = useCallback(() => {
    if (!currentSession) return;

    const updated: InterleavedSession = {
      ...currentSession,
      endedAt: new Date().toISOString(),
    };

    const history = loadHistory();
    history.push(updated);
    saveHistory(history);

    setCurrentSession(null);
    setSessionProblems([]);
    setCurrentIndex(0);

    return updated;
  }, [currentSession]);

  /** Get session history for analytics. */
  const getHistory = useCallback((): InterleavedSession[] => {
    return loadHistory();
  }, []);

  // Current problem
  const currentProblem = sessionProblems[currentIndex] ?? null;
  const isComplete     = currentSession
    ? currentSession.completedCount >= sessionProblems.length
    : false;
  const progress       = sessionProblems.length > 0
    ? (currentSession?.completedCount ?? 0) / sessionProblems.length
    : 0;

  // Session analytics
  const difficultyDist = analyzeDifficultyDistribution(sessionProblems);
  const chapterDist    = analyzeChapterDistribution(sessionProblems);

  return {
    // Session state
    currentSession,
    currentProblem,
    currentIndex,
    sessionProblems,
    isComplete,
    progress,

    // Actions
    startSession,
    recordResult,
    endSessionEarly,
    getHistory,

    // Analytics
    difficultyDist,
    chapterDist,
  };
}
