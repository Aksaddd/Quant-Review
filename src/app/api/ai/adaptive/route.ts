// ─────────────────────────────────────────────
// POST /api/ai/adaptive
// Adaptive difficulty: get recommendations.
// ─────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server';
import {
  computeSignals,
  recommend,
  recommendByTechnique,
} from '@/lib/ai';
import type {
  ProblemSession,
  ProblemError,
  ProblemSM2Card,
  WeaknessProfile,
} from '@/lib/ai';
import { chapter2Problems } from '@/data/problems';

const allProblems = [...chapter2Problems];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      sessions,
      errors,
      sm2States,
      weaknesses,
      currentDifficulty,
      windowDays,
    } = body as {
      sessions: ProblemSession[];
      errors?: ProblemError[];
      sm2States?: Record<string, ProblemSM2Card>;
      weaknesses?: WeaknessProfile[];
      currentDifficulty?: number;
      windowDays?: number;
    };

    if (!sessions) {
      return NextResponse.json(
        { error: 'sessions array is required.' },
        { status: 400 }
      );
    }

    // Compute overall signals
    const signals = computeSignals(
      sessions,
      errors ?? [],
      sm2States ?? {},
      windowDays
    );

    // Get overall recommendation
    const recommendation = recommend(
      signals,
      currentDifficulty,
      allProblems
    );

    // Get per-technique recommendations if weaknesses provided
    const techniqueRecommendations = weaknesses
      ? recommendByTechnique(weaknesses)
      : {};

    return NextResponse.json({
      signals,
      recommendation,
      techniqueRecommendations,
    });
  } catch (err) {
    console.error('[adaptive]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
