// ─────────────────────────────────────────────
// Claude API Service Layer
// AI/ML Engineer · Phase 1 Foundation
//
// Primary LLM backbone for all AI features.
// All calls go through this service for centralized
// logging, rate limiting, and eval tracking.
// ─────────────────────────────────────────────

import Anthropic from '@anthropic-ai/sdk';

// ── Configuration ───────────────────────────────

// Model tiers — route to cheapest viable model per task.
// Haiku: $1/$5 MTok — structured JSON, classification, evaluation
// Sonnet: $3/$15 MTok — multi-turn reasoning, persona consistency
// Opus: $5/$25 MTok — reserved for deep reasoning (not used at launch)
const CLAUDE_MODEL_HAIKU  = process.env.CLAUDE_MODEL_HAIKU  ?? 'claude-haiku-4-5-20251001';
const CLAUDE_MODEL_SONNET = process.env.CLAUDE_MODEL_SONNET ?? 'claude-sonnet-4-6-20260416';
const CLAUDE_MODEL        = process.env.CLAUDE_MODEL        ?? CLAUDE_MODEL_HAIKU; // default to cheapest
const MAX_RETRIES  = 3;

let _client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!_client) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error(
        'ANTHROPIC_API_KEY is not set. Add it to .env.local to enable AI features.'
      );
    }
    _client = new Anthropic({ apiKey, maxRetries: MAX_RETRIES });
  }
  return _client;
}

// ── Types ───────────────────────────────────────

export interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClaudeResponse {
  content: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens?: number;
  cacheWriteTokens?: number;
  latencyMs: number;
}

export interface ClaudeStreamCallbacks {
  onToken: (token: string) => void;
  onComplete: (response: ClaudeResponse) => void;
  onError: (error: Error) => void;
}

// ── Core API Calls ──────────────────────────────

/**
 * Send a single message to Claude and get a complete response.
 * Used for: approach evaluation, weakness profiling, technique classification.
 *
 * Prompt caching: system prompts are automatically cached (90% discount on
 * cache hits). The system prompt is marked with cache_control so repeated
 * calls with the same system prompt pay only 10% of input cost.
 */
export async function complete(
  systemPrompt: string,
  messages: ClaudeMessage[],
  options: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
    enableCaching?: boolean;
  } = {}
): Promise<ClaudeResponse> {
  const client = getClient();
  const start  = Date.now();
  const useCache = options.enableCaching !== false; // default ON

  // Build system prompt with caching. The cache_control block tells Anthropic
  // to cache this system prompt for 5 minutes — subsequent calls with the
  // same system prompt hit the cache at 90% discount.
  const systemContent = useCache
    ? [{ type: 'text' as const, text: systemPrompt, cache_control: { type: 'ephemeral' as const } }]
    : systemPrompt;

  const response = await client.messages.create({
    model:      options.model ?? CLAUDE_MODEL,
    max_tokens: options.maxTokens ?? 2048,
    temperature: options.temperature ?? 0.3,
    system:     systemContent,
    messages:   messages.map((m) => ({
      role:    m.role,
      content: m.content,
    })),
  });

  const latencyMs = Date.now() - start;
  const textBlock = response.content.find((b) => b.type === 'text');

  // Extract cache metrics from usage (available when prompt caching is active)
  const usage = response.usage as unknown as Record<string, number>;

  return {
    content:          textBlock?.text ?? '',
    model:            response.model,
    inputTokens:      usage.input_tokens,
    outputTokens:     usage.output_tokens,
    cacheReadTokens:  usage.cache_read_input_tokens ?? 0,
    cacheWriteTokens: usage.cache_creation_input_tokens ?? 0,
    latencyMs,
  };
}

/**
 * Stream a response from Claude token-by-token.
 * Used for: Socratic interviews (real-time conversational feel).
 */
export async function stream(
  systemPrompt: string,
  messages: ClaudeMessage[],
  callbacks: ClaudeStreamCallbacks,
  options: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
  } = {}
): Promise<void> {
  const client = getClient();
  const start  = Date.now();

  let inputTokens  = 0;
  let outputTokens = 0;
  let fullContent   = '';

  const response = client.messages.stream({
    model:      options.model ?? CLAUDE_MODEL,
    max_tokens: options.maxTokens ?? 2048,
    temperature: options.temperature ?? 0.5,
    system:     systemPrompt,
    messages:   messages.map((m) => ({
      role:    m.role,
      content: m.content,
    })),
  });

  response.on('text', (text) => {
    fullContent += text;
    callbacks.onToken(text);
  });

  response.on('message', (msg) => {
    inputTokens  = msg.usage.input_tokens;
    outputTokens = msg.usage.output_tokens;
  });

  response.on('error', (error) => {
    callbacks.onError(error instanceof Error ? error : new Error(String(error)));
  });

  response.on('end', () => {
    callbacks.onComplete({
      content:      fullContent,
      model:        options.model ?? CLAUDE_MODEL,
      inputTokens,
      outputTokens,
      latencyMs:    Date.now() - start,
    });
  });

  // Wait for the stream to finish
  await response.finalMessage();
}

/**
 * Parse a JSON response from Claude. Extracts JSON from markdown
 * code blocks if present, then parses.
 */
export function parseJSON<T>(content: string): T {
  // Strip markdown code fences if Claude wraps the JSON
  const cleaned = content
    .replace(/^```(?:json)?\s*\n?/m, '')
    .replace(/\n?```\s*$/m, '')
    .trim();

  return JSON.parse(cleaned) as T;
}

/**
 * Complete + parse JSON in one call. Includes a JSON instruction
 * in the system prompt to improve reliability.
 */
export async function completeJSON<T>(
  systemPrompt: string,
  messages: ClaudeMessage[],
  options: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
  } = {}
): Promise<{ data: T; response: ClaudeResponse }> {
  const jsonSystemPrompt = `${systemPrompt}\n\nIMPORTANT: Respond ONLY with valid JSON. No markdown, no explanation, no code fences.`;

  const response = await complete(jsonSystemPrompt, messages, {
    ...options,
    temperature: options.temperature ?? 0.1, // lower temp for structured output
  });

  const data = parseJSON<T>(response.content);
  return { data, response };
}

// ── Utility ─────────────────────────────────────

/** Check if the Claude API is configured and reachable. */
export async function healthCheck(): Promise<{
  ok: boolean;
  model: string;
  error?: string;
}> {
  try {
    const response = await complete(
      'You are a health check endpoint.',
      [{ role: 'user', content: 'Respond with exactly: OK' }],
      { maxTokens: 10 }
    );
    return { ok: response.content.includes('OK'), model: response.model };
  } catch (err) {
    return {
      ok:    false,
      model: CLAUDE_MODEL,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export { CLAUDE_MODEL, CLAUDE_MODEL_HAIKU, CLAUDE_MODEL_SONNET };
