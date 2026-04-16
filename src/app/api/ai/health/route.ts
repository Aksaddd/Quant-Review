// ─────────────────────────────────────────────
// GET /api/ai/health
// Health check for all AI services.
// ─────────────────────────────────────────────

import { NextResponse } from 'next/server';
import { healthCheck, CLAUDE_MODEL, EMBEDDING_MODEL, DEFAULT_PROVIDER } from '@/lib/ai';
import { geminiHealthCheck, GEMINI_MODEL_LITE } from '@/lib/ai';

export async function GET() {
  // Run health checks in parallel
  const [claude, gemini] = await Promise.allSettled([
    healthCheck(),
    geminiHealthCheck(),
  ]);

  const claudeResult = claude.status === 'fulfilled'
    ? claude.value
    : { ok: false, model: CLAUDE_MODEL, error: 'Health check failed' };

  const geminiResult = gemini.status === 'fulfilled'
    ? gemini.value
    : { ok: false, model: GEMINI_MODEL_LITE, error: 'Health check failed' };

  const allOk = claudeResult.ok || geminiResult.ok; // at least one provider up

  return NextResponse.json({
    status:          allOk ? 'healthy' : 'degraded',
    defaultProvider: DEFAULT_PROVIDER,
    services: {
      gemini: {
        ok:    geminiResult.ok,
        model: geminiResult.model,
        error: geminiResult.error,
        configured: !!process.env.GOOGLE_API_KEY,
      },
      claude: {
        ok:    claudeResult.ok,
        model: claudeResult.model,
        error: claudeResult.error,
        configured: !!process.env.ANTHROPIC_API_KEY,
      },
      embeddings: {
        model:      EMBEDDING_MODEL,
        configured: !!process.env.GOOGLE_API_KEY || !!process.env.OPENAI_API_KEY,
      },
    },
    timestamp: new Date().toISOString(),
  });
}
