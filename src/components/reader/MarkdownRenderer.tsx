'use client';

import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Heuristic: does this code block contain mathematical notation?
 * If so, we apply the math-display treatment (.math-display class) which
 * styles via globals.css — larger font, accent border, math-tuned typography.
 *
 * The book's source uses fenced ``` blocks for both code and math; we detect
 * math by looking for unicode operators, Greek letters, or formula-like
 * symbols common to the textbook chapters.
 */
const MATH_SIGNAL = /[∑∫√≤≥≠≈∞∂∇∈∉⊂⊆⊕⊗→⇒↔π·×÷±√^∏ΣΘΩαβγδεζηθλμνξρσφψωΔ]|\^[0-9]|_\{|\\frac|\\sqrt|≪|≫|⌈|⌉|⌊|⌋|⊥|∥|∀|∃|∝|≡|≅|→|↦|⟶|ₑ|ₓ|ᵢ|ⁿ|⁻¹|₀|₁|₂|₃|ₙ|⁺|⁻/;

function isMathBlock(node: any): boolean {
  // Walk the children and concatenate text content
  const text = extractText(node);
  return MATH_SIGNAL.test(text);
}

function extractText(node: any): string {
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (node?.props?.children) return extractText(node.props.children);
  return '';
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose-reading ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Tables — prose-reading css handles internal styling
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table>{children}</table>
            </div>
          ),
          // Inline code — let .prose-reading code handle styling
          code: ({ inline, className: codeClassName, children, ...props }: any) => {
            if (inline) {
              return <code {...props}>{children}</code>;
            }
            // Block code: pass through; <pre> wrapper handles container styling
            return (
              <code className={codeClassName} {...props}>
                {children}
              </code>
            );
          },
          // Block code wrapper — auto-detect math content for richer styling
          pre: ({ children, ...props }: any) => {
            const looksLikeMath = isMathBlock(children);
            return (
              <pre
                {...props}
                className={looksLikeMath ? 'math-display' : ''}
                data-math={looksLikeMath ? 'true' : 'false'}
              >
                {children}
              </pre>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
