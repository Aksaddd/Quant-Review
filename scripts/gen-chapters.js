const fs = require('fs');
const path = require('path');

const CONFIGS = [
  {
    num: 3,
    mdFile: 'chapter_03_calculus_linear_algebra.md',
    outFile: 'src/data/chapters/chapter3.ts',
    title: 'Calculus and Linear Algebra',
    pageRange: '33–58',
    overview: 'Calculus and linear algebra lay the foundation for many advanced math topics used in quantitative finance. This chapter focuses on the core concepts frequently tested in quantitative interviews — derivatives, integration, multivariate calculus, ODEs, and matrix methods.',
    tags: ['calculus', 'linear-algebra', 'derivatives', 'integration', 'ode', 'matrices'],
  },
  {
    num: 4,
    mdFile: 'chapter_04_probability_theory.md',
    outFile: 'src/data/chapters/chapter4.ts',
    title: 'Probability Theory',
    pageRange: '59–103',
    overview: "Probability is the single most tested quantitative topic in finance interviews. This chapter moves from set theory and combinatorics through conditional probability and Bayes' rule into discrete/continuous distributions, moments, and order statistics.",
    tags: ['probability', 'combinatorics', 'bayes', 'distributions', 'expectation', 'variance'],
  },
  {
    num: 5,
    mdFile: 'chapter_05_stochastic_processes.md',
    outFile: 'src/data/chapters/chapter5.ts',
    title: 'Stochastic Processes and Stochastic Calculus',
    pageRange: '105–136',
    overview: "Stochastic processes model time-evolving randomness, which is at the heart of derivatives pricing. This chapter covers Markov chains, martingales, dynamic programming, Brownian motion, and Itô's lemma.",
    tags: ['markov-chains', 'martingales', 'brownian-motion', 'ito', 'sde', 'dp'],
  },
  {
    num: 6,
    mdFile: 'chapter_06_finance.md',
    outFile: 'src/data/chapters/chapter6.ts',
    title: 'Finance',
    pageRange: '137–169',
    overview: 'Options pricing, the Greeks, and exotic derivatives. This chapter develops Black–Scholes intuition from risk-neutral pricing, then walks through hedging, Greeks, exotic payoffs, and general finance interview questions.',
    tags: ['options', 'black-scholes', 'greeks', 'exotics', 'derivatives', 'finance'],
  },
  {
    num: 7,
    mdFile: 'chapter_07_algorithms_numerical_methods.md',
    outFile: 'src/data/chapters/chapter7.ts',
    title: 'Algorithms and Numerical Methods',
    pageRange: '171–200',
    overview: "Programming and numerical methods interviews focus on clean algorithmic thinking. This chapter covers sorting/searching/graph algorithms, the power-of-two bit tricks, and numerical methods like Newton's method and Monte Carlo simulation.",
    tags: ['algorithms', 'dp', 'bit-manipulation', 'numerical-methods', 'monte-carlo'],
  },
];

function escapeForTemplate(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

function countProblems(content) {
  // Count occurrences of **Question:** (how most chapters label problems)
  // plus standalone **Problem -** lines
  const questionMatches = content.match(/\*\*Question:\*\*/g) || [];
  const problemHeaderMatches = content.match(/^\*\*Problem\b[^*]*\*\*\s*$/gm) || [];
  // Heuristic: chapter 3 uses "**Problem — ...**" headers with their own Question lines,
  // so take the max to avoid double-counting.
  return Math.max(questionMatches.length, problemHeaderMatches.length);
}

function parseSections(md, chapNum) {
  const lines = md.split('\n');
  const sections = [];
  const headerPattern = new RegExp(`^## (${chapNum}\\.\\d+) (.+)$`);
  let current = null;
  let buffer = [];

  for (const line of lines) {
    const m = line.match(headerPattern);
    if (m) {
      if (current) {
        current.content = buffer.join('\n').trimEnd();
        current.problemCount = countProblems(current.content);
        sections.push(current);
      }
      current = { id: m[1], title: m[2].trim(), content: '', problemCount: 0 };
      buffer = [line];
    } else {
      if (current) buffer.push(line);
    }
  }
  if (current) {
    current.content = buffer.join('\n').trimEnd();
    current.problemCount = countProblems(current.content);
    sections.push(current);
  }

  return sections;
}

for (const cfg of CONFIGS) {
  const mdPath = path.join('/home/user/Quant-Review', cfg.mdFile);
  const outPath = path.join('/home/user/Quant-Review', cfg.outFile);
  const md = fs.readFileSync(mdPath, 'utf8');
  const sections = parseSections(md, cfg.num);

  let out = `import type { Chapter } from '@/lib/types';\n\n`;
  out += `/** Auto-generated from ${cfg.mdFile} — edit the .md then re-run scripts/gen-chapters.js */\n`;
  out += `const chapter${cfg.num}: Chapter = {\n`;
  out += `  id: 'chapter-${cfg.num}',\n`;
  out += `  number: ${cfg.num},\n`;
  out += `  title: ${JSON.stringify(cfg.title)},\n`;
  out += `  pageRange: ${JSON.stringify(cfg.pageRange)},\n`;
  out += `  overview: ${JSON.stringify(cfg.overview)},\n`;
  out += `  tags: ${JSON.stringify(cfg.tags)},\n`;
  out += `  sections: [\n`;
  for (const sec of sections) {
    out += `    {\n`;
    out += `      id: ${JSON.stringify(sec.id)},\n`;
    out += `      title: ${JSON.stringify(sec.title)},\n`;
    out += `      problemCount: ${sec.problemCount},\n`;
    out += `      content: \`${escapeForTemplate(sec.content)}\`,\n`;
    out += `    },\n`;
  }
  out += `  ],\n`;
  out += `};\n\n`;
  out += `export default chapter${cfg.num};\n`;

  fs.writeFileSync(outPath, out);
  const total = sections.reduce((a, s) => a + s.problemCount, 0);
  console.log(`Wrote ${cfg.outFile}: ${sections.length} sections, ${total} problems`);
}
