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
          // Inline AoPS figure crops and source-page thumbnails. Figure crops
          // (/aops-figures/) render at natural aspect ratio with a 340px cap
          // and no caption (the figure's own labels speak for themselves).
          // Source-page thumbnails (/api/aops-vol1/page/) get a caption with
          // the page numbers since they're not self-labeled.
          img: ({ src, alt }: any) => {
            if (typeof src === 'string' && src.startsWith('/aops-figures/')) {
              return (
                <a
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                  className="not-prose block my-5 mx-auto w-fit hover:opacity-90 transition-opacity"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={alt ?? ''}
                    loading="lazy"
                    className="block max-w-[340px] max-h-[280px] w-auto h-auto rounded-md border border-[#e4e6ea] shadow-sm"
                  />
                </a>
              );
            }
            if (typeof src === 'string' && src.startsWith('/api/aops-vol1/page/')) {
              return (
                <a
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                  className="not-prose block my-6 mx-auto w-fit text-center group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={alt ?? ''}
                    loading="lazy"
                    className="block w-[260px] max-w-full h-auto rounded-md border border-[#e4e6ea] shadow-sm group-hover:shadow-md group-hover:border-[#1865f2] transition-all"
                  />
                  {alt && (
                    <span className="block mt-2 text-[11px] text-[#9299a5] italic">
                      {alt}
                    </span>
                  )}
                </a>
              );
            }
            // Fallback for any other markdown images
            // eslint-disable-next-line @next/next/no-img-element
            return <img src={src} alt={alt ?? ''} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
