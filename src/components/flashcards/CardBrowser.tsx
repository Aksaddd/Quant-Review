'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Brain, BookOpen } from 'lucide-react';
import type { Flashcard, CustomSet } from '@/lib/types';
import MarkdownRenderer from '@/components/reader/MarkdownRenderer';
import { TypeBadge, DifficultyBadge } from '@/components/ui/Badge';
import AddToSetButton from './AddToSetButton';
import { SECTIONS, problemsById } from '@/data/problems';

const SECTION_MAP = Object.fromEntries(SECTIONS.map((s) => [s.id, s.title]));

interface Props {
  cards: Flashcard[];
  initialIndex?: number;
  title?: string;
  onBack: () => void;
  onStudy: (cards: Flashcard[]) => void;
  sets: CustomSet[];
  isCardInSet: (setId: string, cardId: string) => boolean;
  onAddToSet: (setId: string, cardId: string) => void;
  onRemoveFromSet: (setId: string, cardId: string) => void;
  onCreateSet: (title: string, cardId: string) => void;
}

export default function CardBrowser({
  cards, initialIndex = 0, title, onBack, onStudy,
  sets, isCardInSet, onAddToSet, onRemoveFromSet, onCreateSet,
}: Props) {
  const [index, setIndex] = useState(initialIndex);
  const [showBack, setShowBack] = useState(false);

  const card = cards[index];
  const problem = card.type === 'problem' && card.problemId ? problemsById[card.problemId] : null;
  const front = problem ? problem.setup : card.front;
  const back = problem
    ? problem.solution + (problem.finalAnswer ? `\n\n**Answer:** ${problem.finalAnswer}` : '')
    : card.back;
  const secTitle = SECTION_MAP[card.section] ?? '';

  function go(dir: 1 | -1) {
    setIndex((i) => Math.max(0, Math.min(cards.length - 1, i + dir)));
    setShowBack(false);
  }

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowLeft')  go(-1);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setShowBack((v) => !v); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, cards.length]);

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-[#e4e6ea] px-4 sm:px-6 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-[#626975] hover:text-[#21242c] transition-colors shrink-0"
        >
          <ChevronLeft size={16} /> Back
        </button>
        {title && <span className="text-sm font-semibold text-[#21242c] truncate">{title}</span>}
        <div className="flex-1" />
        <span className="text-xs text-[#9299a5] font-medium whitespace-nowrap">{index + 1} / {cards.length}</span>
        <button
          onClick={() => onStudy(cards)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--ka-blue)] text-white text-xs font-semibold hover:bg-[var(--ka-blue-dark)] transition-colors"
        >
          <Brain size={12} /> Study set
        </button>
      </div>

      {/* Thin progress bar */}
      <div className="h-0.5 bg-[#e4e6ea]">
        <div
          className="h-full bg-[var(--ka-blue)] transition-all duration-300"
          style={{ width: `${((index + 1) / cards.length) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center px-4 sm:px-6 py-8 max-w-3xl mx-auto w-full">
        {/* Metadata row */}
        <div className="flex flex-wrap items-center gap-2 mb-5 self-start">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#e4e6ea]">
            <BookOpen size={12} className="text-[#9299a5]" />
            <span className="text-[11px] font-bold text-[#626975]">§{card.section}</span>
            <span className="text-[#c8ccd4]">·</span>
            <span className="text-[11px] font-semibold text-[#21242c]">{secTitle}</span>
          </div>
          <TypeBadge type={card.type} />
          <DifficultyBadge difficulty={card.difficulty} />
          <AddToSetButton
            cardId={card.id}
            sets={sets}
            isCardInSet={isCardInSet}
            onAddToSet={onAddToSet}
            onRemoveFromSet={onRemoveFromSet}
            onCreateSet={onCreateSet}
            align="left"
          />
        </div>

        {/* Front */}
        <div className="w-full bg-white border border-[#e4e6ea] rounded-lg shadow-sm p-6 mb-4">
          {problem && (
            <h2 className="text-lg font-bold text-[#21242c] mb-4 pb-3 border-b border-[#e4e6ea]">
              {problem.title}
            </h2>
          )}
          <div className="prose-reading text-[#21242c]">
            <MarkdownRenderer content={front} />
          </div>
        </div>

        {/* Answer toggle */}
        {!showBack ? (
          <button
            onClick={() => setShowBack(true)}
            className="w-full py-3 rounded-lg border-2 border-[var(--ka-blue)] text-[var(--ka-blue)] font-semibold text-sm hover:bg-[var(--ka-blue)] hover:text-white transition-all duration-150 mb-4"
          >
            Show answer <span className="text-[11px] opacity-60 ml-1">(Space)</span>
          </button>
        ) : (
          <div className="w-full bg-white border border-[#e4e6ea] rounded-lg shadow-sm p-6 mb-4 animate-fade-up">
            <p className="text-xs font-bold text-[#626975] uppercase tracking-wider mb-4 pb-3 border-b border-[#e4e6ea]">
              Answer
            </p>
            <div className="prose-reading text-[#21242c]">
              <MarkdownRenderer content={back} />
            </div>
            <button
              onClick={() => setShowBack(false)}
              className="mt-4 text-xs text-[#9299a5] hover:text-[#626975] transition-colors"
            >
              Hide answer
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="w-full flex items-center justify-between gap-3 mt-2">
          <button
            onClick={() => go(-1)}
            disabled={index === 0}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-[#e4e6ea] text-sm font-semibold text-[#626975] hover:border-[#c8ccd4] hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={15} /> Previous
          </button>

          {/* Dot nav (only for small decks) */}
          {cards.length <= 15 && (
            <div className="flex gap-1.5 flex-wrap justify-center">
              {cards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setIndex(i); setShowBack(false); }}
                  className={`rounded-full transition-all duration-200 ${
                    i === index
                      ? 'w-2.5 h-2.5 bg-[var(--ka-blue)]'
                      : 'w-2 h-2 bg-[#e4e6ea] hover:bg-[#c8ccd4]'
                  }`}
                />
              ))}
            </div>
          )}

          <button
            onClick={() => go(1)}
            disabled={index === cards.length - 1}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-[#e4e6ea] text-sm font-semibold text-[#626975] hover:border-[#c8ccd4] hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next <ChevronRight size={15} />
          </button>
        </div>

        <p className="text-[10px] text-[#c8ccd4] mt-4">
          ← → to navigate · Space to flip
        </p>
      </div>
    </div>
  );
}
