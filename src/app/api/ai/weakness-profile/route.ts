// ─────────────────────────────────────────────
// POST /api/ai/weakness-profile
// Generate or analyze weakness profiles.
//
// Actions:
//   { action: "compute" }  — compute profiles from raw data
//   { action: "analyze" }  — LLM-powered analysis of profiles
// ─────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server';
import {
  computeWeaknessProfiles,
  analyzeWeaknesses,
  computeReadinessScore,
  getWeakestTechniques,
} from '@/lib/ai';
import type {
  ProblemSession,
  ProblemError,
  ProblemSM2Card,
  ProblemTechnique,
  Technique,
  WeaknessProfile,
} from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body as { action: string };

    switch (action) {
      case 'compute': {
        const {
          sessions,
          errors,
          sm2States,
          problemTechniques,
          techniques,
          userId,
        } = body as {
          sessions: ProblemSession[];
          errors: ProblemError[];
          sm2States: Record<string, ProblemSM2Card>;
          problemTechniques: ProblemTechnique[];
          techniques: Technique[];
          userId: string;
        };

        const profiles = computeWeaknessProfiles(
          sessions, errors, sm2States, problemTechniques, techniques, userId
        );

        const readiness = computeReadinessScore(profiles, techniques.length);
        const weakest   = getWeakestTechniques(profiles);

        return NextResponse.json({ profiles, readiness, weakest });
      }

      case 'analyze': {
        const { profiles } = body as { profiles: WeaknessProfile[] };
        if (!profiles || profiles.length === 0) {
          return NextResponse.json(
            { error: 'No profiles provided for analysis.' },
            { status: 400 }
          );
        }

        const { analysis, tokensUsed } = await analyzeWeaknesses(profiles);
        return NextResponse.json({ analysis, tokensUsed });
      }

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}. Use "compute" or "analyze".` },
          { status: 400 }
        );
    }
  } catch (err) {
    console.error('[weakness-profile]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
