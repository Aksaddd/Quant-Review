/* eslint-disable */
/**
 * Chapter data generator.
 *
 * Parses the source markdown (chapter_0X_*.md) and produces structured
 * TypeScript data that matches chapter 2's Problem shape. Each section is
 * split into an ordered list of ContentBlocks (prose | problem) so the reader
 * can render textbook prose around the same interactive ProblemBlock UI used
 * for chapter 2.
 *
 * Usage: `node scripts/gen-chapters.js`
 */
const fs = require('fs');
const path = require('path');

const CONFIGS = [
  {
    num: 3,
    mdFile: 'chapter_03_calculus_linear_algebra.md',
    outFile: 'src/data/chapters/chapter3.ts',
    title: 'Calculus and Linear Algebra',
    pageRange: '33–58',
    overview:
      'Calculus and linear algebra lay the foundation for many advanced math topics used in quantitative finance. This chapter focuses on the core concepts frequently tested in quantitative interviews — derivatives, integration, multivariate calculus, ODEs, and matrix methods.',
    tags: ['calculus', 'linear-algebra', 'derivatives', 'integration', 'ode', 'matrices'],
    defaultDifficulty: 'medium',
  },
  {
    num: 4,
    mdFile: 'chapter_04_probability_theory.md',
    outFile: 'src/data/chapters/chapter4.ts',
    title: 'Probability Theory',
    pageRange: '59–103',
    overview:
      "Probability is the single most tested quantitative topic in finance interviews. This chapter moves from set theory and combinatorics through conditional probability and Bayes' rule into discrete/continuous distributions, moments, and order statistics.",
    tags: ['probability', 'combinatorics', 'bayes', 'distributions', 'expectation', 'variance'],
    defaultDifficulty: 'medium',
  },
  {
    num: 5,
    mdFile: 'chapter_05_stochastic_processes.md',
    outFile: 'src/data/chapters/chapter5.ts',
    title: 'Stochastic Processes and Stochastic Calculus',
    pageRange: '105–136',
    overview:
      "Stochastic processes model time-evolving randomness, which is at the heart of derivatives pricing. This chapter covers Markov chains, martingales, dynamic programming, Brownian motion, and Itô's lemma.",
    tags: ['markov-chains', 'martingales', 'brownian-motion', 'ito', 'sde', 'dp'],
    defaultDifficulty: 'hard',
  },
  {
    num: 6,
    mdFile: 'chapter_06_finance.md',
    outFile: 'src/data/chapters/chapter6.ts',
    title: 'Finance',
    pageRange: '137–169',
    overview:
      'Options pricing, the Greeks, and exotic derivatives. This chapter develops Black–Scholes intuition from risk-neutral pricing, then walks through hedging, Greeks, exotic payoffs, and general finance interview questions.',
    tags: ['options', 'black-scholes', 'greeks', 'exotics', 'derivatives', 'finance'],
    defaultDifficulty: 'medium',
  },
  {
    num: 7,
    mdFile: 'chapter_07_algorithms_numerical_methods.md',
    outFile: 'src/data/chapters/chapter7.ts',
    title: 'Algorithms and Numerical Methods',
    pageRange: '171–200',
    overview:
      "Programming and numerical methods interviews focus on clean algorithmic thinking. This chapter covers sorting/searching/graph algorithms, the power-of-two bit tricks, and numerical methods like Newton's method and Monte Carlo simulation.",
    tags: ['algorithms', 'dp', 'bit-manipulation', 'numerical-methods', 'monte-carlo'],
    defaultDifficulty: 'medium',
  },
];

/* ── Utilities ──────────────────────────────────────────────────────────── */

function escapeForTemplate(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

function slugify(s) {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

/* ── Section splitter ───────────────────────────────────────────────────── */

function splitSections(md, chapNum) {
  const lines = md.split('\n');
  const sections = [];
  const headerPattern = new RegExp(`^## (${chapNum}\\.\\d+) (.+)$`);
  let current = null;
  let buffer = [];

  for (const line of lines) {
    const m = line.match(headerPattern);
    if (m) {
      if (current) {
        current.rawContent = buffer.join('\n').trim();
        sections.push(current);
      }
      current = { id: m[1], title: m[2].trim(), rawContent: '' };
      buffer = [];
    } else if (current) {
      buffer.push(line);
    }
  }
  if (current) {
    current.rawContent = buffer.join('\n').trim();
    sections.push(current);
  }
  return sections;
}

/* ── Problem detector ───────────────────────────────────────────────────── */

function looksLikeProblem(chunk) {
  return /\*\*Question:?\*\*/.test(chunk) && /\*\*Solution[^*]{0,40}\*\*/.test(chunk);
}

function extractProblemTitle(chunk, fallback) {
  const lines = chunk.split('\n').map((l) => l.trim()).filter(Boolean);
  for (const line of lines) {
    if (line.startsWith('>')) continue;
    if (line.startsWith('**Question')) break;
    const m = line.match(/^\*\*(.+?)\*\*\s*$/);
    if (m) {
      let title = m[1].trim();
      title = title.replace(/^Problem\s*[A-Z]?\s*[—-]\s*/i, '');
      title = title.replace(/^Problem\s*[A-Z]?\s*:\s*/i, '');
      return title.trim() || fallback;
    }
  }
  return fallback;
}

function splitProblemChunk(chunk) {
  const questionMatch = chunk.match(/\*\*Question:?\*\*/);
  const solutionMatch = chunk.match(/\*\*Solution[^*]{0,40}\*\*/);

  const qIdx = questionMatch ? questionMatch.index : -1;
  const sIdx = solutionMatch ? solutionMatch.index : -1;

  const titleBlock = qIdx >= 0 ? chunk.slice(0, qIdx).trim() : '';
  let question = '';
  let solution = '';

  if (qIdx >= 0) {
    const qEnd = sIdx >= 0 && sIdx > qIdx ? sIdx : chunk.length;
    question = chunk
      .slice(qIdx, qEnd)
      .replace(/^\*\*Question:?\*\*\s*/, '')
      .trim();
  }
  if (sIdx >= 0) {
    solution = chunk.slice(sIdx).trim();
    solution = solution.replace(/^\*\*Solution[^*]{0,40}\*\*\s*:?\s*/, '').trim();
  }

  // Extract `> **Hint:** ...` blockquote hints
  const hints = [];
  const hintRe = />\s*\*\*Hints?:?\*\*\s*([^\n]+(?:\n>[^\n]+)*)/g;
  let hm;
  while ((hm = hintRe.exec(question)) !== null) {
    const hint = hm[1]
      .split('\n')
      .map((l) => l.replace(/^>\s?/, '').trim())
      .join(' ')
      .trim();
    hints.push(hint);
  }

  question = question
    .replace(/>\s*\*\*Hints?:?\*\*[^\n]*(\n>[^\n]*)*/g, '')
    .trim();

  return { titleBlock, question, solution, hints };
}

function extractFinalAnswer(solution) {
  const patterns = [
    /\*\*(?:Final Answer|Answer|Result|Therefore)\s*:\s*([^*\n]+?)\*\*/i,
    /\*\*(?:Final Answer|Answer|Result)\s*:?\*\*\s*([^\n]+)/i,
    /\*\*Therefore[:,]?\s*([^*\n]+?)\*\*/i,
  ];
  for (const re of patterns) {
    const m = solution.match(re);
    if (m && m[1]) {
      return m[1]
        .trim()
        .replace(/[.]+$/, '')
        .slice(0, 240);
    }
  }
  return undefined;
}

/* ── Section → blocks ───────────────────────────────────────────────────── */

function parseBlocks({ sectionId, sectionTitle, rawContent, chapNum, defaultDifficulty, tags }) {
  const blocks = [];
  const chunks = rawContent
    .split(/\n---+\n/)
    .map((c) => c.trim())
    .filter(Boolean);

  let problemIndex = 0;
  for (const chunk of chunks) {
    if (looksLikeProblem(chunk)) {
      problemIndex++;
      const { titleBlock, question, solution, hints } = splitProblemChunk(chunk);
      const titleFallback = `${sectionTitle} Problem ${problemIndex}`;
      const title = extractProblemTitle(titleBlock || chunk, titleFallback);
      const id = `ch${chapNum}-${sectionId.replace('.', '-')}-${String(problemIndex).padStart(
        2,
        '0'
      )}-${slugify(title)}`;
      const finalAnswer = extractFinalAnswer(solution);

      const problem = {
        id,
        chapter: chapNum,
        section: sectionId,
        sectionTitle,
        title,
        difficulty: defaultDifficulty,
        keyTechnique: '',
        tags,
        setup: question || '_No question text extracted._',
        solution: solution || '_No solution text extracted._',
        hints,
        finalAnswer,
      };
      blocks.push({ kind: 'problem', problem });
    } else {
      blocks.push({ kind: 'prose', markdown: chunk });
    }
  }

  return blocks;
}

/* ── Emitter ────────────────────────────────────────────────────────────── */

function emitProblem(p, indent = '        ') {
  const lines = [];
  lines.push(`${indent}{`);
  lines.push(`${indent}  kind: 'problem',`);
  lines.push(`${indent}  problem: {`);
  lines.push(`${indent}    id: ${JSON.stringify(p.id)},`);
  lines.push(`${indent}    chapter: ${p.chapter},`);
  lines.push(`${indent}    section: ${JSON.stringify(p.section)},`);
  lines.push(`${indent}    sectionTitle: ${JSON.stringify(p.sectionTitle)},`);
  lines.push(`${indent}    title: ${JSON.stringify(p.title)},`);
  lines.push(`${indent}    difficulty: ${JSON.stringify(p.difficulty)},`);
  lines.push(`${indent}    keyTechnique: ${JSON.stringify(p.keyTechnique)},`);
  lines.push(`${indent}    tags: ${JSON.stringify(p.tags)},`);
  lines.push(`${indent}    setup: \`${escapeForTemplate(p.setup)}\`,`);
  lines.push(`${indent}    solution: \`${escapeForTemplate(p.solution)}\`,`);
  const hintsList = p.hints.map((h) => `\`${escapeForTemplate(h)}\``).join(', ');
  lines.push(`${indent}    hints: [${hintsList}],`);
  if (p.finalAnswer) {
    lines.push(`${indent}    finalAnswer: ${JSON.stringify(p.finalAnswer)},`);
  }
  lines.push(`${indent}  },`);
  lines.push(`${indent}},`);
  return lines.join('\n');
}

function emitProse(text, indent = '        ') {
  return `${indent}{ kind: 'prose', markdown: \`${escapeForTemplate(text)}\` },`;
}

function buildChapterFile(cfg) {
  const mdPath = path.join('/home/user/Quant-Review', cfg.mdFile);
  const md = fs.readFileSync(mdPath, 'utf8');
  const sections = splitSections(md, cfg.num);

  const sectionOutputs = [];
  let totalProblems = 0;

  for (const sec of sections) {
    const blocks = parseBlocks({
      sectionId: sec.id,
      sectionTitle: sec.title,
      rawContent: sec.rawContent,
      chapNum: cfg.num,
      defaultDifficulty: cfg.defaultDifficulty,
      tags: cfg.tags,
    });

    const problemCount = blocks.filter((b) => b.kind === 'problem').length;
    totalProblems += problemCount;

    const blockLines = blocks
      .map((b) => (b.kind === 'problem' ? emitProblem(b.problem) : emitProse(b.markdown)))
      .join('\n');

    sectionOutputs.push(
      [
        `    {`,
        `      id: ${JSON.stringify(sec.id)},`,
        `      title: ${JSON.stringify(sec.title)},`,
        `      problemCount: ${problemCount},`,
        `      blocks: [`,
        blockLines,
        `      ],`,
        `    },`,
      ].join('\n')
    );
  }

  const out = [
    `import type { Chapter } from '@/lib/types';`,
    ``,
    `/** Auto-generated from ${cfg.mdFile} — run \`node scripts/gen-chapters.js\` after editing. */`,
    `const chapter${cfg.num}: Chapter = {`,
    `  id: 'chapter-${cfg.num}',`,
    `  number: ${cfg.num},`,
    `  title: ${JSON.stringify(cfg.title)},`,
    `  pageRange: ${JSON.stringify(cfg.pageRange)},`,
    `  overview: ${JSON.stringify(cfg.overview)},`,
    `  tags: ${JSON.stringify(cfg.tags)},`,
    `  sections: [`,
    sectionOutputs.join('\n'),
    `  ],`,
    `};`,
    ``,
    `export default chapter${cfg.num};`,
    ``,
  ].join('\n');

  fs.writeFileSync(path.join('/home/user/Quant-Review', cfg.outFile), out);
  return { sections: sections.length, totalProblems };
}

for (const cfg of CONFIGS) {
  const { sections, totalProblems } = buildChapterFile(cfg);
  console.log(
    `✔ ${cfg.outFile.padEnd(36)}  ${sections} sections  ${totalProblems} problems extracted`
  );
}
