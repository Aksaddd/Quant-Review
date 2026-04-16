// ─────────────────────────────────────────────
// LLM Router — Provider-Agnostic Model Selection
// AI/ML Engineer · Phase 1 Foundation
//
// Routes each feature to the cheapest capable model.
// Gemini primary (10x cheaper), Claude as fallback.
//
// Cost comparison per session:
//   All-Gemini:         $0.012/session
//   Haiku+Sonnet:       $0.052/session
//   All-Sonnet:         $0.220/session
// ─────────────────────────────────────────────

import { complete, completeJSON, CLAUDE_MODEL_HAIKU, CLAUDE_MODEL_SONNET, type ClaudeMessage, type ClaudeResponse } from './claude';
import { geminiComplete, geminiCompleteJSON, geminiChat, GEMINI_MODEL_LITE, GEMINI_MODEL_FLASH, type GeminiResponse } from './gemini';

// ── Types ───────────────────────────────────────

export type LLMProvider = 'gemini' | 'claude';

export interface LLMResponse {
  content: string;
  model: string;
  provider: LLMProvider;
  inputTokens: number;
  outputTokens: number;
  latencyMs: number;
}

export type TaskTier = 'simple' | 'reasoning' | 'complex';

// ── Configuration ───────────────────────────────

// Override provider globally: set LLM_PROVIDER=claude to disable Gemini
const DEFAULT_PROVIDER: LLMProvider =
  (process.env.LLM_PROVIDER as LLMProvider) ?? 'gemini';

// Model routing table
const MODEL_MAP: Record<LLMProvider, Record<TaskTier, string>> = {
  gemini: {
    simple:    GEMINI_MODEL_LITE,   // $0.10/$0.40  — JSON eval, hints, scoring, classification
    reasoning: GEMINI_MODEL_FLASH,  // $0.30/$2.50  — Socratic interviews (multi-turn)
    complex:   GEMINI_MODEL_FLASH,  // $0.30/$2.50  — reserved for future deep reasoning
  },
  claude: {
    simple:    CLAUDE_MODEL_HAIKU,  // $1.00/$5.00  — fallback for structured tasks
    reasoning: CLAUDE_MODEL_SONNET, // $3.00/$15.00 — fallback for Socratic
    complex:   CLAUDE_MODEL_SONNET, // $3.00/$15.00 — fallback for complex reasoning
  },
};

// Feature → tier mapping (determines which model tier is used)
const FEATURE_TIERS: Record<string, TaskTier> = {
  evaluate_approach:     'simple',
  hint_generator:        'simple',
  socratic_interviewer:  'reasoning',
  socratic_scoring:      'simple',
  technique_classifier:  'simple',
  weakness_analysis:     'simple',
};

// ── Router Functions ────────────────────────────

/**
 * Get the recommended model for a feature.
 */
export function getModelForFeature(
  feature: string,
  provider?: LLMProvider
): { model: string; provider: LLMProvider; tier: TaskTier } {
  const tier = FEATURE_TIERS[feature] ?? 'simple';
  const prov = provider ?? DEFAULT_PROVIDER;
  return {
    model:    MODEL_MAP[prov][tier],
    provider: prov,
    tier,
  };
}

/**
 * Route a completion request to the optimal provider.
 * Falls back to Claude if Gemini fails.
 */
export async function routedComplete(
  systemPrompt: string,
  userMessage: string,
  options: {
    feature?: string;
    provider?: LLMProvider;
    tier?: TaskTier;
    maxTokens?: number;
    temperature?: number;
  } = {}
): Promise<LLMResponse> {
  const tier = options.tier ?? FEATURE_TIERS[options.feature ?? ''] ?? 'simple';
  const provider = options.provider ?? DEFAULT_PROVIDER;
  const model = MODEL_MAP[provider][tier];

  try {
    if (provider === 'gemini') {
      const response = await geminiComplete(systemPrompt, userMessage, {
        model,
        maxTokens:   options.maxTokens,
        temperature: options.temperature,
      });
      return { ...response, provider: 'gemini' };
    }

    // Claude path
    const response = await complete(systemPrompt, [{ role: 'user', content: userMessage }], {
      model,
      maxTokens:   options.maxTokens,
      temperature: options.temperature,
    });
    return toUnified(response, 'claude');

  } catch (err) {
    // Fallback: try the other provider
    if (provider === 'gemini') {
      console.warn(`[llm-router] Gemini failed, falling back to Claude: ${err}`);
      const fallbackModel = MODEL_MAP.claude[tier];
      const response = await complete(systemPrompt, [{ role: 'user', content: userMessage }], {
        model: fallbackModel,
        maxTokens:   options.maxTokens,
        temperature: options.temperature,
      });
      return toUnified(response, 'claude');
    }
    throw err; // If Claude itself fails, let it propagate
  }
}

/**
 * Route a JSON completion request to the optimal provider.
 */
export async function routedCompleteJSON<T>(
  systemPrompt: string,
  userMessage: string,
  options: {
    feature?: string;
    provider?: LLMProvider;
    tier?: TaskTier;
    maxTokens?: number;
    temperature?: number;
  } = {}
): Promise<{ data: T; response: LLMResponse }> {
  const tier = options.tier ?? FEATURE_TIERS[options.feature ?? ''] ?? 'simple';
  const provider = options.provider ?? DEFAULT_PROVIDER;
  const model = MODEL_MAP[provider][tier];

  try {
    if (provider === 'gemini') {
      const { data, response } = await geminiCompleteJSON<T>(
        systemPrompt, userMessage,
        { model, maxTokens: options.maxTokens, temperature: options.temperature }
      );
      return { data, response: { ...response, provider: 'gemini' } };
    }

    // Claude path
    const jsonSystemPrompt = `${systemPrompt}\n\nIMPORTANT: Respond ONLY with valid JSON. No markdown, no explanation, no code fences.`;
    const { data, response } = await completeJSON<T>(
      jsonSystemPrompt, [{ role: 'user', content: userMessage }],
      { model, maxTokens: options.maxTokens, temperature: options.temperature }
    );
    return { data, response: toUnified(response, 'claude') };

  } catch (err) {
    if (provider === 'gemini') {
      console.warn(`[llm-router] Gemini JSON failed, falling back to Claude: ${err}`);
      const fallbackModel = MODEL_MAP.claude[tier];
      const jsonSystemPrompt = `${systemPrompt}\n\nIMPORTANT: Respond ONLY with valid JSON. No markdown, no explanation, no code fences.`;
      const { data, response } = await completeJSON<T>(
        jsonSystemPrompt, [{ role: 'user', content: userMessage }],
        { model: fallbackModel, maxTokens: options.maxTokens, temperature: options.temperature }
      );
      return { data, response: toUnified(response, 'claude') };
    }
    throw err;
  }
}

/**
 * Route a multi-turn chat (for Socratic interviews).
 */
export async function routedChat(
  systemPrompt: string,
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  options: {
    provider?: LLMProvider;
    maxTokens?: number;
    temperature?: number;
  } = {}
): Promise<LLMResponse> {
  const provider = options.provider ?? DEFAULT_PROVIDER;
  const model = MODEL_MAP[provider].reasoning;

  try {
    if (provider === 'gemini') {
      // Convert assistant → model for Gemini's expected format
      const geminiMessages = messages.map((m) => ({
        role: (m.role === 'assistant' ? 'model' : 'user') as 'user' | 'model',
        content: m.content,
      }));

      const response = await geminiChat(systemPrompt, geminiMessages, {
        model,
        maxTokens:   options.maxTokens,
        temperature: options.temperature,
      });
      return { ...response, provider: 'gemini' };
    }

    // Claude path
    const claudeMessages: ClaudeMessage[] = messages.map((m) => ({
      role: m.role === 'assistant' ? 'assistant' as const : 'user' as const,
      content: m.content,
    }));

    const response = await complete(systemPrompt, claudeMessages, {
      model,
      maxTokens:   options.maxTokens,
      temperature: options.temperature,
    });
    return toUnified(response, 'claude');

  } catch (err) {
    if (provider === 'gemini') {
      console.warn(`[llm-router] Gemini chat failed, falling back to Claude: ${err}`);
      const claudeMessages: ClaudeMessage[] = messages.map((m) => ({
        role: m.role === 'assistant' ? 'assistant' as const : 'user' as const,
        content: m.content,
      }));
      const response = await complete(systemPrompt, claudeMessages, {
        model: MODEL_MAP.claude.reasoning,
        maxTokens: options.maxTokens,
        temperature: options.temperature,
      });
      return toUnified(response, 'claude');
    }
    throw err;
  }
}

// ── Helpers ─────────────────────────────────────

function toUnified(response: ClaudeResponse, provider: LLMProvider): LLMResponse {
  return {
    content:      response.content,
    model:        response.model,
    provider,
    inputTokens:  response.inputTokens,
    outputTokens: response.outputTokens,
    latencyMs:    response.latencyMs,
  };
}

/**
 * Get cost estimate for a given provider/tier combination.
 * Returns cost in USD.
 */
export function estimateCost(
  inputTokens: number,
  outputTokens: number,
  provider: LLMProvider,
  tier: TaskTier
): number {
  const rates: Record<LLMProvider, Record<TaskTier, { input: number; output: number }>> = {
    gemini: {
      simple:    { input: 0.10, output: 0.40 },  // Flash Lite
      reasoning: { input: 0.30, output: 2.50 },  // Flash
      complex:   { input: 0.30, output: 2.50 },
    },
    claude: {
      simple:    { input: 1.00, output: 5.00 },   // Haiku
      reasoning: { input: 3.00, output: 15.00 },  // Sonnet
      complex:   { input: 3.00, output: 15.00 },
    },
  };

  const rate = rates[provider][tier];
  return (inputTokens * rate.input + outputTokens * rate.output) / 1_000_000;
}

export { DEFAULT_PROVIDER, FEATURE_TIERS };
