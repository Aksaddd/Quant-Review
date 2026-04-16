'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

interface CollapsibleSolutionProps {
  solution: string;
  finalAnswer?: string;
}

/**
 * Breaks a monolithic solution into collapsible steps.
 *
 * Splitting heuristic:
 * 1. Splits on markdown headers (## or ###)
 * 2. If no headers, splits on double-newline paragraphs with "Step" prefix
 * 3. If neither, splits on double-newline paragraphs (groups of ~3)
 * 4. Falls back to showing the whole solution as one block
 */
function splitIntoSteps(solution: string): { title: string; content: string }[] {
  // Try splitting on markdown headers
  const headerSplit = solution.split(/^(#{2,3}\s+.+)$/m);
  if (headerSplit.length > 2) {
    const steps: { title: string; content: string }[] = [];
    // headerSplit: [prelude, header1, content1, header2, content2, ...]
    const prelude = headerSplit[0].trim();
    if (prelude) {
      steps.push({ title: 'Overview', content: prelude });
    }
    for (let i = 1; i < headerSplit.length; i += 2) {
      const title = headerSplit[i].replace(/^#{2,3}\s+/, '').trim();
      const content = (headerSplit[i + 1] || '').trim();
      if (content) {
        steps.push({ title, content });
      }
    }
    if (steps.length > 1) return steps;
  }

  // Try splitting on numbered steps or "Step N" patterns
  const stepPattern = /^(?:(?:\*\*)?Step\s+\d+[:.]\*?\*?|^\d+[.)]\s)/m;
  const paragraphs = solution.split(/\n{2,}/);
  if (paragraphs.length >= 3) {
    const hasStepLabels = paragraphs.some((p) => stepPattern.test(p.trim()));
    if (hasStepLabels) {
      return paragraphs
        .filter((p) => p.trim())
        .map((p, i) => {
          const match = p.trim().match(/^(?:\*\*)?(?:Step\s+(\d+)[:.]\*?\*?\s*([\s\S]*)|\d+[.)]\s*([\s\S]*))/)
          if (match) {
            const num = match[1] || `${i + 1}`;
            const rest = (match[2] || match[3] || '').trim();
            const firstLine = rest.split('\n')[0].slice(0, 60);
            return {
              title: `Step ${num}${firstLine ? ': ' + firstLine : ''}`,
              content: p.trim(),
            };
          }
          return { title: `Part ${i + 1}`, content: p.trim() };
        });
    }

    // Group paragraphs into chunks of ~2-3
    const chunkSize = Math.max(2, Math.ceil(paragraphs.length / 4));
    const steps: { title: string; content: string }[] = [];
    for (let i = 0; i < paragraphs.length; i += chunkSize) {
      const chunk = paragraphs.slice(i, i + chunkSize).join('\n\n');
      if (chunk.trim()) {
        steps.push({
          title: `Part ${steps.length + 1}`,
          content: chunk.trim(),
        });
      }
    }
    if (steps.length > 1) return steps;
  }

  // Fallback: single block
  return [{ title: 'Solution', content: solution }];
}

export default function CollapsibleSolution({ solution, finalAnswer }: CollapsibleSolutionProps) {
  const steps = splitIntoSteps(solution);
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());
  const isSingleBlock = steps.length === 1;

  const toggleStep = (index: number) => {
    setExpandedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const expandAll = () => setExpandedSteps(new Set(steps.map((_, i) => i)));
  const collapseAll = () => setExpandedSteps(new Set());
  const allExpanded = expandedSteps.size === steps.length;

  // If only one block, just render it flat
  if (isSingleBlock) {
    return (
      <div>
        <div className="prose-reading text-[#21242c]">
          <MarkdownRenderer content={solution} />
        </div>
        {finalAnswer && <FinalAnswerBox answer={finalAnswer} />}
      </div>
    );
  }

  return (
    <div>
      {/* Controls */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold text-[#9299a5] uppercase tracking-wider">
          {steps.length} steps
        </span>
        <button
          onClick={allExpanded ? collapseAll : expandAll}
          className="text-[10px] font-semibold text-[#1865f2] hover:underline"
        >
          {allExpanded ? 'Collapse all' : 'Expand all'}
        </button>
      </div>

      {/* Steps */}
      <div className="space-y-2">
        {steps.map((step, i) => {
          const isOpen = expandedSteps.has(i);
          return (
            <div
              key={i}
              className={`border rounded-lg overflow-hidden transition-colors ${
                isOpen ? 'border-[#1865f2]/30 bg-[#fafbff]' : 'border-[#e4e6ea]'
              }`}
            >
              <button
                onClick={() => toggleStep(i)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#f7f8fa] transition-colors"
              >
                <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <ChevronRight size={14} className="text-[#9299a5]" />
                </motion.div>
                <span className="w-6 h-6 rounded-full bg-[#f0f1f3] flex items-center justify-center text-[10px] font-bold text-[#626975] shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm font-semibold text-[#21242c] flex-1 truncate">
                  {step.title}
                </span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-1 ml-[52px]">
                      <div className="prose-reading text-[#21242c]">
                        <MarkdownRenderer content={step.content} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {finalAnswer && <FinalAnswerBox answer={finalAnswer} />}
    </div>
  );
}

function FinalAnswerBox({ answer }: { answer: string }) {
  return (
    <div className="mt-4 p-3 rounded-lg bg-[#e6f4ea] border border-[#a8d5b5] flex items-start gap-2">
      <CheckCircle2 size={16} className="text-[#1fab54] mt-0.5 shrink-0" />
      <div>
        <p className="text-[10px] font-bold text-[#1fab54] uppercase tracking-wider mb-0.5">
          Final Answer
        </p>
        <p className="text-sm font-semibold text-[#0d652d]">{answer}</p>
      </div>
    </div>
  );
}
