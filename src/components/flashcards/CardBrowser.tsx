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
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--apple-grey-100, #f5f5f7)' }}>
      {/* Top bar */}
      <div
        className="px-4 sm:px-6 py-3 flex items-center gap-3"
        style={{
          background: 'var(--material-thin-light)',
          backdropFilter: 'var(--material-blur)',
          WebkitBackdropFilter: 'var(--material-blur)',
          borderBottom: '0.5px solid rgba(0,0,0,0.06)',
        }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors duration-200 shrink-0"
          style={{ transitionTimingFunction: 'var(--ease-standard)' }}
        >
          <ChevronLeft size={16} /> Back
        </button>
        {title && <span className="text-[13px] font-semibold tracking-tight text-[#1d1d1f] truncate">{title}</span>}
        <div className="flex-1" />
        <span className="text-[11px] text-[#86868b] font-medium whitespace-nowrap tabular-nums">{index + 1} / {cards.length}</span>
        <button
          onClick={() => onStudy(cards)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold tracking-tight text-white transition-all duration-200 active:scale-[0.97]"
          style={{
            borderRadius: 10,
            background: 'var(--eureka-accent)',
            transitionTimingFunction: 'var(--ease-standard)',
          }}
        >
          <Brain size={12} /> Study set
        </button>
      </div>

      {/* Thin progress bar */}
      <div style={{ height: 2, background: 'rgba(0,0,0,0.06)' }}>
        <div
          style={{
            height: '100%',
            width: `${((index + 1) / cards.length) * 100}%`,
            background: 'var(--eureka-accent)',
            transition: 'width 300ms var(--ease-standard)',
          }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center px-4 sm:px-6 py-8 max-w-3xl mx-auto w-full">
        {/* Metadata row */}
        <div className="flex flex-wrap items-center gap-2 mb-5 self-start">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5"
            style={{
              background: '#ffffff',
              border: '0.5px solid rgba(0,0,0,0.06)',
              borderRadius: 10,
            }}
          >
            <BookOpen size={12} className="text-[#86868b]" />
            <span className="text-[11px] font-semibold text-[#6e6e73] tabular-nums">{card.section}</span>
            <span className="text-[#d2d2d7]">·</span>
            <span className="text-[11px] font-semibold text-[#1d1d1f] tracking-tight">{secTitle}</span>
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
        <div
          className="w-full p-6 mb-4"
          style={{
            background: '#ffffff',
            border: '0.5px solid rgba(0,0,0,0.06)',
            borderRadius: 16,
            boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 6px 20px -12px rgba(0,0,0,0.08)',
          }}
        >
          {problem && (
            <h2
              className="text-[17px] font-semibold tracking-tight text-[#1d1d1f] mb-4 pb-3"
              style={{ borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}
            >
              {problem.title}
            </h2>
          )}
          <div className="prose-reading text-[#1d1d1f]">
            <MarkdownRenderer content={front} />
          </div>
        </div>

        {/* Answer toggle */}
        {!showBack ? (
          <button
            onClick={() => setShowBack(true)}
            className="w-full py-3 font-semibold text-[13px] tracking-tight transition-all duration-200 mb-4 active:scale-[0.99]"
            style={{
              borderRadius: 12,
              background: 'var(--eureka-accent-tint)',
              color: 'var(--eureka-accent)',
              border: '0.5px solid var(--eureka-accent-tint-strong)',
              transitionTimingFunction: 'var(--ease-standard)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--eureka-accent)';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--eureka-accent-tint)';
              e.currentTarget.style.color = 'var(--eureka-accent)';
            }}
          >
            Show answer <span className="text-[11px] opacity-60 ml-1">(Space)</span>
          </button>
        ) : (
          <div
            className="w-full p-6 mb-4 animate-fade-up"
            style={{
              background: '#ffffff',
              border: '0.5px solid var(--eureka-accent-tint-strong)',
              borderRadius: 16,
              boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 10px 32px -14px var(--eureka-accent-tint-strong)',
            }}
          >
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.08em] mb-4 pb-3"
              style={{ color: 'var(--eureka-accent)', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}
            >
              Answer
            </p>
            <div className="prose-reading text-[#1d1d1f]">
              <MarkdownRenderer content={back} />
            </div>
            <button
              onClick={() => setShowBack(false)}
              className="mt-4 text-[11px] text-[#86868b] hover:text-[#424245] transition-colors duration-200"
              style={{ transitionTimingFunction: 'var(--ease-standard)' }}
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
            className="flex items-center gap-1.5 px-5 py-2.5 text-[13px] font-semibold tracking-tight transition-all duration-200 active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100"
            style={{
              borderRadius: 12,
              background: '#ffffff',
              border: '0.5px solid rgba(0,0,0,0.08)',
              color: '#424245',
              transitionTimingFunction: 'var(--ease-standard)',
            }}
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
                  className="rounded-full"
                  style={{
                    width:  i === index ? 10 : 8,
                    height: i === index ? 10 : 8,
                    background: i === index ? 'var(--eureka-accent)' : 'rgba(0,0,0,0.12)',
                    transition: 'width 200ms var(--ease-standard), height 200ms var(--ease-standard), background 200ms var(--ease-standard)',
                  }}
                />
              ))}
            </div>
          )}

          <button
            onClick={() => go(1)}
            disabled={index === cards.length - 1}
            className="flex items-center gap-1.5 px-5 py-2.5 text-[13px] font-semibold tracking-tight transition-all duration-200 active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100"
            style={{
              borderRadius: 12,
              background: '#ffffff',
              border: '0.5px solid rgba(0,0,0,0.08)',
              color: '#424245',
              transitionTimingFunction: 'var(--ease-standard)',
            }}
          >
            Next <ChevronRight size={15} />
          </button>
        </div>

        <p className="text-[10px] text-[#a1a1a6] mt-4 tracking-tight">
          ← → to navigate · Space to flip
        </p>
      </div>
    </div>
  );
}
