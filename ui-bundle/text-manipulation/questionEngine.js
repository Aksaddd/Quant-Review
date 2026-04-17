/**
 * Question engine — heuristic question generator from a text chunk.
 *
 * Generates up to 5 questions per chunk, each with a stable id derived
 * from chunkId + type so persistence is idempotent.
 *
 *   • flashcard     — "Define X"
 *   • fill-blank    — cloze on a keyword
 *   • mcq           — 4-option multiple choice with distractors
 *   • short-answer  — open-ended
 *   • summary       — single-sentence gist
 */

// ---------- Public API ----------

export function analyzeChunk({ id, text }) {
  const sentences = splitSentences(text);
  const keywords = extractKeywords(text);
  const definitions = extractDefinitions(sentences);
  return { id, text, sentences, keywords, definitions };
}

export function generateQuestions({ id, text }) {
  const analyzed = analyzeChunk({ id, text });
  const out = [];

  const flash = buildFlashcard(analyzed);
  if (flash) out.push(flash);

  const blank = buildFillBlank(analyzed);
  if (blank) out.push(blank);

  const mcq = buildMcq(analyzed);
  if (mcq) out.push(mcq);

  const sa = buildShortAnswer(analyzed);
  if (sa) out.push(sa);

  const sum = buildSummary(analyzed);
  if (sum) out.push(sum);

  return out.slice(0, 5);
}

export function checkAnswer(question, userAnswer) {
  if (!question || userAnswer == null) return { correct: false, feedback: 'No answer' };
  const norm = (s) => String(s).toLowerCase().trim().replace(/[.,!?;:]/g, '');
  switch (question.type) {
    case 'mcq':
      return { correct: userAnswer === question.correctIndex, feedback: question.explanation };
    case 'fill-blank':
    case 'flashcard': {
      const expected = norm(question.answer);
      const given = norm(userAnswer);
      const ok = expected === given || expected.includes(given) || given.includes(expected);
      return { correct: ok, feedback: ok ? 'Correct' : `Expected: ${question.answer}` };
    }
    case 'short-answer': {
      // Heuristic: count overlapping content words.
      const expected = new Set(norm(question.answer).split(/\s+/).filter((w) => w.length > 3));
      const given = new Set(norm(userAnswer).split(/\s+/).filter((w) => w.length > 3));
      const overlap = [...expected].filter((w) => given.has(w)).length;
      const ratio = expected.size ? overlap / expected.size : 0;
      return {
        correct: ratio >= 0.5,
        feedback: ratio >= 0.5 ? 'Close match' : 'Try covering more of the key points',
        score: ratio,
      };
    }
    case 'summary':
      return { correct: true, feedback: 'Summary is self-graded' };
    default:
      return { correct: false, feedback: 'Unknown question type' };
  }
}

// ---------- Builders ----------

function buildFlashcard({ id, definitions }) {
  if (!definitions.length) return null;
  const def = definitions[0];
  return {
    id: `${id}:flashcard`,
    type: 'flashcard',
    prompt: `Define: ${def.term}`,
    answer: def.definition,
  };
}

function buildFillBlank({ id, sentences, keywords }) {
  if (!sentences.length || !keywords.length) return null;
  // Pick a sentence that contains a strong keyword.
  const best = keywords
    .map((kw) => ({ kw, sent: sentences.find((s) => s.toLowerCase().includes(kw.toLowerCase())) }))
    .find((x) => x.sent);
  if (!best || !best.sent) return null;
  const re = new RegExp(`\\b${escapeReg(best.kw)}\\b`, 'i');
  const blanked = best.sent.replace(re, '_____');
  return {
    id: `${id}:fill-blank`,
    type: 'fill-blank',
    prompt: blanked,
    answer: best.kw,
  };
}

function buildMcq({ id, definitions, keywords }) {
  const def = definitions[0];
  if (!def) return null;
  const distractors = keywords.filter((k) => k.toLowerCase() !== def.term.toLowerCase()).slice(0, 3);
  if (distractors.length < 3) return null;
  const options = shuffle([def.term, ...distractors]);
  const correctIndex = options.findIndex((o) => o === def.term);
  return {
    id: `${id}:mcq`,
    type: 'mcq',
    prompt: `Which term best matches: "${truncate(def.definition, 120)}"?`,
    options,
    correctIndex,
    explanation: `"${def.term}" is defined as: ${def.definition}`,
  };
}

function buildShortAnswer({ id, sentences }) {
  if (sentences.length < 2) return null;
  return {
    id: `${id}:short-answer`,
    type: 'short-answer',
    prompt: `In your own words, explain the main idea of this passage.`,
    answer: sentences.slice(0, 2).join(' '),
  };
}

function buildSummary({ id, sentences }) {
  if (!sentences.length) return null;
  return {
    id: `${id}:summary`,
    type: 'summary',
    prompt: `Write a one-sentence summary of this passage.`,
    answer: sentences[0],
  };
}

// ---------- Heuristics ----------

function splitSentences(text) {
  return String(text)
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map((s) => s.trim())
    .filter(Boolean);
}

const STOPWORDS = new Set([
  'the','a','an','of','to','in','on','for','with','by','as','is','are','was','were','be','been',
  'being','it','its','this','that','these','those','and','or','but','if','then','than','so','at',
  'from','into','about','which','who','whom','whose','what','when','where','why','how','we','you',
  'they','them','their','our','us','he','she','his','her','him','can','could','may','might','will',
  'would','shall','should','have','has','had','not','no','yes','do','does','did','also','such',
]);

function extractKeywords(text) {
  // Score by capitalized multi-word phrases + content-word frequency.
  const freq = new Map();
  const words = String(text)
    .replace(/[^A-Za-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  for (const w of words) {
    const lw = w.toLowerCase();
    if (lw.length < 4 || STOPWORDS.has(lw)) continue;
    freq.set(w, (freq.get(w) || 0) + 1);
  }

  // Prefer Capitalized phrases as likely terms.
  const phraseRe = /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})\b/g;
  const phrases = [...String(text).matchAll(phraseRe)].map((m) => m[1]);
  phrases.forEach((p) => freq.set(p, (freq.get(p) || 0) + 3));

  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([w]) => w)
    .slice(0, 8);
}

function extractDefinitions(sentences) {
  // Patterns: "X is …", "X refers to …", "X, …, is called …".
  const out = [];
  const patterns = [
    /^([A-Z][A-Za-z0-9 -]{2,40})\s+is\s+(?:the\s+|a\s+|an\s+)?(.{10,200})/,
    /^([A-Z][A-Za-z0-9 -]{2,40})\s+refers\s+to\s+(.{10,200})/,
    /^([A-Z][A-Za-z0-9 -]{2,40}),\s+[^,]+,\s+is\s+(.{10,200})/,
  ];
  for (const s of sentences) {
    for (const re of patterns) {
      const m = s.match(re);
      if (m) {
        out.push({ term: m[1].trim(), definition: m[2].trim().replace(/\.$/, '') });
        break;
      }
    }
  }
  return out;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function truncate(s, n) {
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}

function escapeReg(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
