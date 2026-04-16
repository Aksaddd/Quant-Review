// ─────────────────────────────────────────────
// Socratic Simulation Layer
// AI/ML Engineer · Phase 1 Foundation
//
// AI interviewer mode for mock quant interviews.
// Uses Socratic questioning — guides through questions,
// never lectures directly.
//
// Success metric: ≥ 4.2/5 usefulness rating (beta users)
// ─────────────────────────────────────────────

import type { Problem } from '../types';
import type { SocraticMessage, SocraticScore, SocraticSession } from './types';
import { complete, stream, completeJSON, CLAUDE_MODEL_SONNET, type ClaudeMessage, type ClaudeStreamCallbacks } from './claude';
import { renderPrompt, SOCRATIC_INTERVIEWER } from './prompts';

// Socratic interviews are the ONE feature that requires Sonnet-level intelligence.
// Multi-turn persona consistency + mathematical reasoning + strategic hint management.
const SOCRATIC_MODEL = CLAUDE_MODEL_SONNET;

// ── Constants ───────────────────────────────────

const MAX_HINTS        = 3;
const MAX_TURNS        = 20;   // safety limit on conversation length
const SCORING_THRESHOLD = 3;   // min student messages before scoring is meaningful

// ── Session Management ──────────────────────────

/**
 * Start a new Socratic interview session.
 * Returns the initial interviewer message (problem presentation).
 */
export async function startSession(
  problem: Problem,
  userId: string
): Promise<{ session: SocraticSession; firstMessage: string }> {
  const systemPrompt = buildSystemPrompt(problem, 0);

  const response = await complete(
    systemPrompt,
    [{ role: 'user', content: 'I\'m ready for the interview. Please present the problem.' }],
    { model: SOCRATIC_MODEL, temperature: 0.5, maxTokens: 512 }
  );

  const now = new Date().toISOString();

  const firstMessage: SocraticMessage = {
    role:      'interviewer',
    content:   response.content,
    timestamp: now,
  };

  const session: SocraticSession = {
    id:              crypto.randomUUID(),
    userId,
    problemId:       problem.id,
    status:          'active',
    messages:        [firstMessage],
    hintsGiven:      0,
    startedAt:       now,
  };

  return { session, firstMessage: response.content };
}

/**
 * Send a student message and get the interviewer's response.
 * Manages hint counting and conversation flow.
 */
export async function sendMessage(
  session: SocraticSession,
  problem: Problem,
  studentMessage: string
): Promise<{
  response: string;
  session: SocraticSession;
  hintGiven: boolean;
  shouldEnd: boolean;
}> {
  if (session.status !== 'active') {
    throw new Error('Session is not active.');
  }

  if (session.messages.length >= MAX_TURNS * 2) {
    return {
      response:  'We\'ve had a thorough discussion. Let me score your performance.',
      session:   { ...session, status: 'completed' },
      hintGiven: false,
      shouldEnd: true,
    };
  }

  const now = new Date().toISOString();

  // Add student message
  const studentMsg: SocraticMessage = {
    role:      'student',
    content:   studentMessage,
    timestamp: now,
  };

  const updatedMessages = [...session.messages, studentMsg];

  // Build conversation for Claude
  const systemPrompt = buildSystemPrompt(problem, session.hintsGiven);
  const claudeMessages = messagesToClaude(updatedMessages);

  const response = await complete(
    systemPrompt,
    claudeMessages,
    { model: SOCRATIC_MODEL, temperature: 0.5, maxTokens: 512 }
  );

  // Detect if a hint was given (heuristic: look for hint-like language)
  const hintGiven = detectHintGiven(response.content, session.hintsGiven);
  const newHintCount = hintGiven ? session.hintsGiven + 1 : session.hintsGiven;

  // Check if session should end
  const shouldEnd = newHintCount >= MAX_HINTS
    || detectSolutionReached(response.content)
    || updatedMessages.filter((m) => m.role === 'student').length >= MAX_TURNS;

  const interviewerMsg: SocraticMessage = {
    role:      'interviewer',
    content:   response.content,
    timestamp: new Date().toISOString(),
    hintGiven,
  };

  const newSession: SocraticSession = {
    ...session,
    messages:   [...updatedMessages, interviewerMsg],
    hintsGiven: newHintCount,
    status:     shouldEnd ? 'completed' : 'active',
    endedAt:    shouldEnd ? new Date().toISOString() : undefined,
  };

  return {
    response:  response.content,
    session:   newSession,
    hintGiven,
    shouldEnd,
  };
}

/**
 * Stream the interviewer's response token-by-token.
 * Provides real-time conversational feel.
 */
export async function streamMessage(
  session: SocraticSession,
  problem: Problem,
  studentMessage: string,
  callbacks: ClaudeStreamCallbacks
): Promise<void> {
  const now = new Date().toISOString();

  const studentMsg: SocraticMessage = {
    role:      'student',
    content:   studentMessage,
    timestamp: now,
  };

  const updatedMessages = [...session.messages, studentMsg];
  const systemPrompt = buildSystemPrompt(problem, session.hintsGiven);
  const claudeMessages = messagesToClaude(updatedMessages);

  await stream(systemPrompt, claudeMessages, callbacks, {
    model:       SOCRATIC_MODEL,
    temperature: 0.5,
    maxTokens:   512,
  });
}

// ── Scoring ─────────────────────────────────────

/**
 * Score the student's interview performance.
 * Called when session completes (after solution reached or max hints).
 */
export async function scoreSession(
  session: SocraticSession,
  problem: Problem
): Promise<{ score: SocraticScore; tokensUsed: number }> {
  const studentMessages = session.messages
    .filter((m) => m.role === 'student')
    .map((m) => m.content);

  if (studentMessages.length < SCORING_THRESHOLD) {
    return {
      score: {
        clarity:        3,
        correctness:    3,
        communication:  3,
        problemSolving: 3,
        overall:        3,
        feedback: 'Session was too short for a meaningful evaluation. Try engaging more with the problem.',
      },
      tokensUsed: 0,
    };
  }

  const transcript = session.messages
    .map((m) => `${m.role === 'interviewer' ? 'Interviewer' : 'Candidate'}: ${m.content}`)
    .join('\n\n');

  const systemPrompt = `You are evaluating a mock quant interview transcript.

PROBLEM: ${problem.title}
SETUP: ${problem.setup}
OFFICIAL SOLUTION: ${problem.solution}
HINTS GIVEN: ${session.hintsGiven}/${MAX_HINTS}
DURATION: ${session.messages.length} messages

TRANSCRIPT:
${transcript}

Score the candidate on these dimensions (1-5 each):
- clarity: How clearly did they explain their thinking?
- correctness: How mathematically correct was their reasoning?
- communication: How well did they articulate their approach?
- problemSolving: How effective was their problem-solving strategy?
- overall: Holistic assessment

Respond with JSON:
{
  "clarity": <1-5>,
  "correctness": <1-5>,
  "communication": <1-5>,
  "problemSolving": <1-5>,
  "overall": <1-5>,
  "feedback": "<2-3 sentences of constructive feedback>"
}`;

  const { data, response } = await completeJSON<SocraticScore>(
    systemPrompt,
    [{ role: 'user', content: 'Score this interview.' }],
    { temperature: 0.2 }
  );

  return {
    score:      data,
    tokensUsed: response.inputTokens + response.outputTokens,
  };
}

// ── Helpers ─────────────────────────────────────

function buildSystemPrompt(problem: Problem, hintsGiven: number): string {
  return renderPrompt(SOCRATIC_INTERVIEWER, {
    problem_title:     problem.title,
    problem_setup:     problem.setup,
    official_solution: problem.solution,
    key_technique:     problem.keyTechnique,
    difficulty:        problem.difficulty,
    hints_given:       String(hintsGiven),
  });
}

function messagesToClaude(messages: SocraticMessage[]): ClaudeMessage[] {
  return messages.map((m) => ({
    role:    m.role === 'interviewer' ? 'assistant' as const : 'user' as const,
    content: m.content,
  }));
}

function detectHintGiven(response: string, currentHints: number): boolean {
  const hintIndicators = [
    'hint',
    'consider',
    'think about',
    'what if',
    'have you thought about',
    'try thinking about',
    'here\'s a nudge',
    'let me suggest',
  ];
  const lower = response.toLowerCase();
  return hintIndicators.some((indicator) => lower.includes(indicator));
}

function detectSolutionReached(response: string): boolean {
  const solutionIndicators = [
    'excellent',
    'that\'s correct',
    'well done',
    'you\'ve solved it',
    'great job',
    'perfect',
    'that\'s the right approach',
    'let me summarize your performance',
  ];
  const lower = response.toLowerCase();
  return solutionIndicators.some((indicator) => lower.includes(indicator));
}

/**
 * Get session statistics for display.
 */
export function getSessionStats(session: SocraticSession): {
  studentMessages: number;
  interviewerMessages: number;
  hintsGiven: number;
  maxHints: number;
  durationMinutes: number;
  isComplete: boolean;
} {
  const studentMessages = session.messages.filter((m) => m.role === 'student').length;
  const interviewerMessages = session.messages.filter((m) => m.role === 'interviewer').length;

  let durationMinutes = 0;
  if (session.startedAt) {
    const end = session.endedAt ? new Date(session.endedAt) : new Date();
    durationMinutes = Math.round((end.getTime() - new Date(session.startedAt).getTime()) / 60000);
  }

  return {
    studentMessages,
    interviewerMessages,
    hintsGiven:  session.hintsGiven,
    maxHints:    MAX_HINTS,
    durationMinutes,
    isComplete:  session.status === 'completed',
  };
}

export { MAX_HINTS, MAX_TURNS };
