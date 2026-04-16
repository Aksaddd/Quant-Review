// ─────────────────────────────────────────────
// Gemini API Service Layer
// AI/ML Engineer · Phase 1 Foundation
//
// Primary LLM provider — 10x cheaper than Claude Haiku
// for structured output tasks.
//
// Gemini 2.5 Flash Lite: $0.10/$0.40 MTok (simple tasks)
// Gemini 2.5 Flash:      $0.30/$2.50 MTok (reasoning tasks)
// ─────────────────────────────────────────────

import { GoogleGenAI } from '@google/genai';

// ── Configuration ───────────────────────────────

const GEMINI_MODEL_LITE = process.env.GEMINI_MODEL_LITE ?? 'gemini-2.5-flash-lite';
const GEMINI_MODEL_FLASH = process.env.GEMINI_MODEL_FLASH ?? 'gemini-2.5-flash';

let _client: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  if (!_client) {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error(
        'GOOGLE_API_KEY is not set. Add it to .env.local to enable Gemini.'
      );
    }
    _client = new GoogleGenAI({ apiKey });
  }
  return _client;
}

// ── Types (shared with claude.ts) ───────────────

export interface GeminiResponse {
  content: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  latencyMs: number;
}

// ── Core API Calls ──────────────────────────────

/**
 * Send a message to Gemini and get a complete response.
 * Uses system instruction + user message pattern.
 */
export async function geminiComplete(
  systemPrompt: string,
  userMessage: string,
  options: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
    jsonMode?: boolean;
  } = {}
): Promise<GeminiResponse> {
  const client = getClient();
  const start = Date.now();
  const modelId = options.model ?? GEMINI_MODEL_LITE;

  const config: Record<string, unknown> = {
    maxOutputTokens: options.maxTokens ?? 2048,
    temperature: options.temperature ?? 0.3,
  };

  // JSON mode: force valid JSON output via response schema
  if (options.jsonMode) {
    config.responseMimeType = 'application/json';
  }

  const response = await client.models.generateContent({
    model: modelId,
    contents: userMessage,
    config: {
      ...config,
      systemInstruction: systemPrompt,
    },
  });

  const latencyMs = Date.now() - start;
  const text = response.text ?? '';

  // Extract token usage from response metadata
  const usage = response.usageMetadata;

  return {
    content: text,
    model: modelId,
    inputTokens: usage?.promptTokenCount ?? 0,
    outputTokens: usage?.candidatesTokenCount ?? 0,
    latencyMs,
  };
}

/**
 * Complete + parse JSON in one call.
 * Uses Gemini's native JSON mode for reliable structured output.
 */
export async function geminiCompleteJSON<T>(
  systemPrompt: string,
  userMessage: string,
  options: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
  } = {}
): Promise<{ data: T; response: GeminiResponse }> {
  const response = await geminiComplete(
    systemPrompt,
    userMessage,
    {
      ...options,
      temperature: options.temperature ?? 0.1,
      jsonMode: true,
    }
  );

  // Parse JSON (Gemini with responseMimeType should return clean JSON)
  let data: T;
  try {
    data = JSON.parse(response.content) as T;
  } catch {
    // Fallback: strip markdown fences if present
    const cleaned = response.content
      .replace(/^```(?:json)?\s*\n?/m, '')
      .replace(/\n?```\s*$/m, '')
      .trim();
    data = JSON.parse(cleaned) as T;
  }

  return { data, response };
}

/**
 * Multi-turn conversation with Gemini.
 * Used for Socratic interviews.
 */
export async function geminiChat(
  systemPrompt: string,
  messages: Array<{ role: 'user' | 'model'; content: string }>,
  options: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
  } = {}
): Promise<GeminiResponse> {
  const client = getClient();
  const start = Date.now();
  const modelId = options.model ?? GEMINI_MODEL_FLASH;

  // Build Gemini content format
  const contents = messages.map((m) => ({
    role: m.role,
    parts: [{ text: m.content }],
  }));

  const response = await client.models.generateContent({
    model: modelId,
    contents,
    config: {
      systemInstruction: systemPrompt,
      maxOutputTokens: options.maxTokens ?? 512,
      temperature: options.temperature ?? 0.5,
    },
  });

  const latencyMs = Date.now() - start;
  const usage = response.usageMetadata;

  return {
    content: response.text ?? '',
    model: modelId,
    inputTokens: usage?.promptTokenCount ?? 0,
    outputTokens: usage?.candidatesTokenCount ?? 0,
    latencyMs,
  };
}

/** Check if Gemini API is configured and reachable. */
export async function geminiHealthCheck(): Promise<{
  ok: boolean;
  model: string;
  error?: string;
}> {
  try {
    const response = await geminiComplete(
      'You are a health check endpoint.',
      'Respond with exactly: OK',
      { maxTokens: 10 }
    );
    return { ok: response.content.includes('OK'), model: response.model };
  } catch (err) {
    return {
      ok: false,
      model: GEMINI_MODEL_LITE,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export { GEMINI_MODEL_LITE, GEMINI_MODEL_FLASH };
