// ─────────────────────────────────────────────
// useErrorTracking — Error Taxonomy Hook
// AI/ML Engineer · Phase 1 Foundation
//
// Tracks categorized mistakes to build weakness profiles.
// ─────────────────────────────────────────────

'use client';

import { useState, useCallback, useEffect } from 'react';
import type { ProblemError, ErrorType } from '@/lib/ai/types';

const STORAGE_KEY = 'qr:errors';

function loadErrors(): ProblemError[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveErrors(errors: ProblemError[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(errors));
  } catch { /* quota */ }
}

export function useErrorTracking() {
  const [errors, setErrors] = useState<ProblemError[]>([]);

  // Hydrate from localStorage
  useEffect(() => {
    setErrors(loadErrors());
  }, []);

  /** Record a new error. */
  const recordError = useCallback((
    problemId: string,
    errorType: ErrorType,
    sessionId?: string,
    notes?: string
  ): ProblemError => {
    const error: ProblemError = {
      id:        crypto.randomUUID(),
      userId:    '',
      problemId,
      sessionId,
      errorType,
      notes,
      createdAt: new Date().toISOString(),
    };

    setErrors((prev) => {
      const next = [...prev, error];
      saveErrors(next);
      return next;
    });

    return error;
  }, []);

  /** Get errors for a specific problem. */
  const getErrorsForProblem = useCallback((problemId: string): ProblemError[] => {
    return errors.filter((e) => e.problemId === problemId);
  }, [errors]);

  /** Get error distribution across all problems. */
  const getErrorDistribution = useCallback((): Record<ErrorType, number> => {
    const dist: Record<ErrorType, number> = {
      conceptual: 0,
      calculation: 0,
      misread: 0,
      forgot_formula: 0,
      wrong_technique: 0,
      incomplete: 0,
      other: 0,
    };
    for (const error of errors) {
      dist[error.errorType]++;
    }
    return dist;
  }, [errors]);

  /** Get the most common error type. */
  const getMostCommonError = useCallback((): ErrorType | null => {
    const dist = getErrorDistribution();
    let maxType: ErrorType | null = null;
    let maxCount = 0;
    for (const [type, count] of Object.entries(dist)) {
      if (count > maxCount) {
        maxCount = count;
        maxType = type as ErrorType;
      }
    }
    return maxType;
  }, [getErrorDistribution]);

  return {
    errors,
    recordError,
    getErrorsForProblem,
    getErrorDistribution,
    getMostCommonError,
    totalErrors: errors.length,
  };
}
