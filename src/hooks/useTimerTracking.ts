// ─────────────────────────────────────────────
// useTimerTracking — Problem Session Timer
// AI/ML Engineer · Phase 1 Foundation
//
// Tracks time spent on each problem attempt.
// "Track data in spreadsheets. Analyze errors
//  systematically." — Ericsson (via Foer)
// ─────────────────────────────────────────────

'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import type { ProblemSession } from '@/lib/ai/types';

interface TimerState {
  problemId: string | null;
  isRunning: boolean;
  startedAt: string | null;
  elapsedSeconds: number;
  hintsViewed: number;
  totalHints: number;
  solutionRevealed: boolean;
  approachSubmitted: boolean;
}

const STORAGE_KEY = 'qr:sessions';

function loadSessions(): ProblemSession[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSessions(sessions: ProblemSession[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch { /* quota */ }
}

export function useTimerTracking() {
  const [state, setState] = useState<TimerState>({
    problemId:        null,
    isRunning:        false,
    startedAt:        null,
    elapsedSeconds:   0,
    hintsViewed:      0,
    totalHints:       0,
    solutionRevealed: false,
    approachSubmitted: false,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Tick every second
  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
          setState((prev) => ({ ...prev, elapsedSeconds: elapsed }));
        }
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state.isRunning]);

  /** Start timing a new problem attempt. */
  const startTimer = useCallback((problemId: string, totalHints: number) => {
    startTimeRef.current = Date.now();
    setState({
      problemId,
      isRunning:        true,
      startedAt:        new Date().toISOString(),
      elapsedSeconds:   0,
      hintsViewed:      0,
      totalHints,
      solutionRevealed: false,
      approachSubmitted: false,
    });
  }, []);

  /** Record that a hint was viewed. */
  const recordHint = useCallback(() => {
    setState((prev) => ({
      ...prev,
      hintsViewed: Math.min(prev.hintsViewed + 1, prev.totalHints),
    }));
  }, []);

  /** Record that the student submitted their approach. */
  const recordApproach = useCallback(() => {
    setState((prev) => ({ ...prev, approachSubmitted: true }));
  }, []);

  /** Record that the solution was revealed. */
  const recordReveal = useCallback(() => {
    setState((prev) => ({ ...prev, solutionRevealed: true }));
  }, []);

  /** End the session and persist the record. */
  const endSession = useCallback((
    outcome: 'solved' | 'gave_up' | 'timed_out'
  ): ProblemSession | null => {
    if (!state.problemId || !state.startedAt) return null;

    if (intervalRef.current) clearInterval(intervalRef.current);

    const session: ProblemSession = {
      id:                crypto.randomUUID(),
      userId:            '', // set by caller or auth context
      problemId:         state.problemId,
      startedAt:         state.startedAt,
      endedAt:           new Date().toISOString(),
      timeSpentSeconds:  state.elapsedSeconds,
      hintsViewed:       state.hintsViewed,
      totalHints:        state.totalHints,
      solutionRevealed:  state.solutionRevealed,
      approachSubmitted: state.approachSubmitted,
      outcome,
    };

    // Persist to localStorage
    const sessions = loadSessions();
    sessions.push(session);
    saveSessions(sessions);

    // Reset state
    startTimeRef.current = null;
    setState({
      problemId:        null,
      isRunning:        false,
      startedAt:        null,
      elapsedSeconds:   0,
      hintsViewed:      0,
      totalHints:       0,
      solutionRevealed: false,
      approachSubmitted: false,
    });

    return session;
  }, [state]);

  /** Get all stored sessions. */
  const getSessions = useCallback((): ProblemSession[] => {
    return loadSessions();
  }, []);

  /** Get sessions for a specific problem. */
  const getSessionsForProblem = useCallback((problemId: string): ProblemSession[] => {
    return loadSessions().filter((s) => s.problemId === problemId);
  }, []);

  /** Format elapsed time as MM:SS. */
  const formattedTime = `${Math.floor(state.elapsedSeconds / 60).toString().padStart(2, '0')}:${(state.elapsedSeconds % 60).toString().padStart(2, '0')}`;

  return {
    ...state,
    formattedTime,
    startTimer,
    recordHint,
    recordApproach,
    recordReveal,
    endSession,
    getSessions,
    getSessionsForProblem,
  };
}
