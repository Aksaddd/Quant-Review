'use client';

import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose-reading ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Tables
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="w-full text-sm border-collapse">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 text-left font-semibold border border-[var(--surface-border-strong)] bg-[var(--surface-3)]">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 border border-[var(--surface-border)] align-top">
              {children}
            </td>
          ),
          // Inline code
          code: ({ inline, children, ...props }: any) =>
            inline ? (
              <code className="px-1.5 py-0.5 rounded-md bg-[var(--surface-3)] font-mono text-[0.85em] text-brand-300">
                {children}
              </code>
            ) : (
              <code {...props}>{children}</code>
            ),
          // Block code
          pre: ({ children }) => (
            <pre className="p-4 rounded-xl bg-[var(--surface-3)] border border-[var(--surface-border)] overflow-x-auto font-mono text-sm">
              {children}
            </pre>
          ),
          // Blockquote
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-brand-500/50 pl-4 my-3 text-[var(--text-secondary)] italic">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
