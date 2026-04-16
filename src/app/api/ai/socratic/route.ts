// ─────────────────────────────────────────────
// POST /api/ai/socratic
// Socratic interview: start session or send message.
//
// Actions:
//   { action: "start", problemId }
//   { action: "message", session, message }
//   { action: "score", session }
// ─────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server';
import {
  startSocraticSession,
  sendSocraticMessage,
  scoreSocraticSession,
} from '@/lib/ai';
import type { SocraticSession } from '@/lib/ai';
import { chapter2Problems } from '@/data/problems';

const problemMap = new Map(chapter2Problems.map((p) => [p.id, p]));

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body as { action: string };

    switch (action) {
      case 'start': {
        const { problemId, userId } = body as { problemId: string; userId?: string };
        const problem = problemMap.get(problemId);
        if (!problem) {
          return NextResponse.json({ error: `Problem not found: ${problemId}` }, { status: 404 });
        }

        const { session, firstMessage } = await startSocraticSession(
          problem,
          userId ?? 'anonymous'
        );

        return NextResponse.json({ session, firstMessage });
      }

      case 'message': {
        const { session, message } = body as { session: SocraticSession; message: string };
        if (!session || !message) {
          return NextResponse.json({ error: 'session and message are required.' }, { status: 400 });
        }

        const problem = problemMap.get(session.problemId);
        if (!problem) {
          return NextResponse.json({ error: `Problem not found: ${session.problemId}` }, { status: 404 });
        }

        const result = await sendSocraticMessage(session, problem, message);
        return NextResponse.json(result);
      }

      case 'score': {
        const { session } = body as { session: SocraticSession };
        if (!session) {
          return NextResponse.json({ error: 'session is required.' }, { status: 400 });
        }

        const problem = problemMap.get(session.problemId);
        if (!problem) {
          return NextResponse.json({ error: `Problem not found: ${session.problemId}` }, { status: 404 });
        }

        const { score, tokensUsed } = await scoreSocraticSession(session, problem);
        return NextResponse.json({ score, tokensUsed });
      }

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}. Use "start", "message", or "score".` },
          { status: 400 }
        );
    }
  } catch (err) {
    console.error('[socratic]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
