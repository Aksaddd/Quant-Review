'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, Lightbulb, CheckCircle2, XCircle, RotateCcw, Brain, Sparkles, ChevronRight } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { useFlashcards, type FlashcardFilter } from '@/hooks/useFlashcards';
import { useStreak } from '@/hooks/useStreak';
import { flashcardsById } from '@/data/flashcards';
import MarkdownRenderer from '@/components/reader/MarkdownRenderer';
import FilterBar from '@/components/flashcards/FilterBar';
import DeckProgress from '@/components/flashcards/DeckProgress';
import RatingButtons from '@/components/flashcards/RatingButtons';
import { TypeBadge, DifficultyBadge } from '@/components/ui/Badge';
import { problemsById } from '@/data/problems';
import type { ReviewGrade, Flashcard } from '@/lib/types';

export default function FlashcardsPage() {
  const { reviewCard, dueCards, masteredCount, sm2Cards } = useProgress();
  const { recordActivity } = useStreak();

  const [filter, setFilter] = useState<FlashcardFilter>({ type: 'all', dueOnly: false });
  const { cards, stats } = useFlashcards(filter);

  // Session state
  const [sessionCards, setSessionCards] = useState<Flashcard[] | null>(null);
  const [sessionIndex, setSessionIndex] = useState(0);
  const [sessionReviewed, setSessionReviewed] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [lastGrade, setLastGrade] = useState<ReviewGrade | null>(null);
  const [ratingDisabled, setRatingDisabled] = useState(false);

  const startSession = useCallback((cardList: Flashcard[]) => {
    setSessionCards(cardList);
    setSessionIndex(0);
    setSessionReviewed(0);
    setSessionComplete(false);
    setShowAnswer(false);
    setLastGrade(null);
  }, []);

  const handleRate = useCallback((grade: ReviewGrade) => {
    if (!sessionCards || ratingDisabled) return;
    setRatingDisabled(true);

    const card = sessionCards[sessionIndex];
    reviewCard(card.id, grade);
    recordActivity();

    setLastGrade(grade);

    setTimeout(() => {
      const nextIndex = sessionIndex + 1;
      setSessionReviewed((r) => r + 1);
      if (nextIndex >= sessionCards.length) {
        setSessionComplete(true);
      } else {
        setSessionIndex(nextIndex);
        setShowAnswer(false);
        setLastGrade(null);
        setRatingDisabled(false);
      }
    }, 600);
  }, [sessionCards, sessionIndex, ratingDisabled, reviewCard, recordActivity]);

  // ── Session active ────────────────────────────────────────────────────────
  if (sessionCards && !sessionComplete) {
    const cardMeta = sessionCards[sessionIndex];
    const card = flashcardsById[cardMeta.id];

    // Resolve content
    const problem = card.type === 'problem' && card.problemId ? problemsById[card.problemId] : null;
    const frontContent = problem ? problem.setup : card.front;
    const backContent = problem
      ? problem.solution + (problem.finalAnswer ? `\n\n**Answer:** ${problem.finalAnswer}` : '')
      : card.back;
    const cardTitle = problem ? problem.title : null;

    return (
      <div className="min-h-screen bg-[#f7f8fa] flex flex-col">
        {/* Exercise top bar */}
        <div className="bg-white border-b border-[#e4e6ea] px-4 sm:px-6 py-3 flex items-center gap-4">
          <button
            onClick={() => setSessionCards(null)}
            className="flex items-center gap-1.5 text-sm text-[#626975] hover:text-[#21242c] transition-colors"
          >
            <ChevronLeft size={16} /> Back
          </button>
          <div className="flex-1">
            <DeckProgress
              current={sessionIndex + 1}
              total={sessionCards.length}
              reviewed={sessionReviewed}
            />
          </div>
          <span className="text-xs text-[#9299a5] font-medium whitespace-nowrap">
            {sessionIndex + 1} / {sessionCards.length}
          </span>
        </div>

        {/* Main exercise area */}
        <div className="flex-1 flex flex-col items-center px-4 sm:px-6 py-8 max-w-3xl mx-auto w-full">

          {/* Card type + difficulty */}
          <div className="flex items-center gap-2 mb-5 self-start">
            <TypeBadge type={card.type} />
            <DifficultyBadge difficulty={card.difficulty} />
            <span className="text-xs text-[#9299a5] font-mono">§{card.section}</span>
          </div>

          {/* Question card */}
          <div className="w-full bg-white border border-[#e4e6ea] rounded-lg shadow-sm p-6 mb-4">
            {cardTitle && (
              <h2 className="text-lg font-bold text-[#21242c] mb-4 pb-3 border-b border-[#e4e6ea]">
                {cardTitle}
              </h2>
            )}
            <div className="prose-reading text-[#21242c]">
              <MarkdownRenderer content={frontContent} />
            </div>
          </div>

          {/* Answer reveal */}
          {!showAnswer && !lastGrade && (
            <button
              onClick={() => setShowAnswer(true)}
              className="w-full py-3 rounded-lg border-2 border-[var(--ka-blue)] text-[var(--ka-blue)] font-semibold text-sm
                hover:bg-[var(--ka-blue)] hover:text-white transition-all duration-150 mb-4"
            >
              Show answer
            </button>
          )}

          {/* Answer content */}
          {showAnswer && !lastGrade && (
            <div className="w-full animate-fade-up space-y-4">
              <div className="w-full bg-white border border-[#e4e6ea] rounded-lg shadow-sm p-6">
                <p className="text-xs font-bold text-[#626975] uppercase tracking-wider mb-4 pb-3 border-b border-[#e4e6ea]">
                  Answer
                </p>
                <div className="prose-reading text-[#21242c]">
                  <MarkdownRenderer content={backContent} />
                </div>
              </div>

              {/* 5-level rating */}
              <div className="bg-white border border-[#e4e6ea] rounded-lg p-5">
                <RatingButtons onRate={handleRate} disabled={ratingDisabled} />
              </div>
            </div>
          )}

          {/* Post-rating feedback */}
          {lastGrade && (
            <div
              className={`w-full rounded-lg p-4 border-t-4 animate-fade-up flex items-center gap-4 ${
                lastGrade === 'easy' || lastGrade === 'good'
                  ? 'exercise-correct'
                  : 'exercise-incorrect'
              }`}
            >
              {(lastGrade === 'easy' || lastGrade === 'good') ? (
                <>
                  <CheckCircle2 size={28} className="text-[#1fab54] shrink-0 animate-check-pop" />
                  <div>
                    <p className="font-bold text-[#0d652d] text-sm">
                      {lastGrade === 'easy' ? 'Excellent!' : 'Nice work!'}
                    </p>
                    <p className="text-xs text-[#1fab54]">This card is scheduled further out.</p>
                  </div>
                </>
              ) : (
                <>
                  <RotateCcw size={28} className="text-[#f5a623] shrink-0" />
                  <div>
                    <p className="font-bold text-[#7a4e00] text-sm">Keep practicing!</p>
                    <p className="text-xs text-[#9299a5]">This card will come back sooner.</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Session complete ──────────────────────────────────────────────────────
  if (sessionComplete) {
    return (
      <div className="min-h-screen bg-[#f7f8fa] flex items-center justify-center px-4">
        <div className="bg-white border border-[#e4e6ea] rounded-lg shadow-sm p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-[#e6f4ea] border border-[#a8d5b5] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-[#1fab54] animate-check-pop" />
          </div>
          <h2 className="text-xl font-extrabold text-[#21242c] mb-1">Session complete!</h2>
          <p className="text-sm text-[#626975] mb-6">
            You reviewed <strong className="text-[#21242c]">{sessionReviewed}</strong> card{sessionReviewed !== 1 ? 's' : ''}.
            {dueCards.length > 0
              ? ` ${dueCards.length} more still due.`
              : ' All caught up!'}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setSessionCards(null)}
              className="flex-1 py-2.5 rounded-lg border border-[#e4e6ea] text-sm font-semibold text-[#626975] hover:border-[#c8ccd4] hover:text-[#21242c] transition-colors"
            >
              Back to deck
            </button>
            {dueCards.length > 0 && (
              <button
                onClick={() => startSession(dueCards.map((c) => flashcardsById[c.id]).filter(Boolean))}
                className="flex-1 py-2.5 rounded-lg bg-[var(--ka-blue)] text-white text-sm font-semibold hover:bg-[var(--ka-blue-dark)] transition-colors"
              >
                Review due ({dueCards.length})
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Deck browser ──────────────────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#21242c]">Flashcards</h1>
          <p className="text-sm text-[#626975] mt-0.5">
            {stats.total} cards · {stats.due} due · {stats.mastered} mastered
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          {dueCards.length > 0 && (
            <button
              onClick={() => startSession(dueCards.map((c) => flashcardsById[c.id]).filter(Boolean))}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--ka-blue)] text-white text-sm font-semibold hover:bg-[var(--ka-blue-dark)] transition-colors"
            >
              <Brain size={15} /> Review due ({dueCards.length})
            </button>
          )}
          <button
            onClick={() => startSession([...cards])}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#c8ccd4] text-sm font-semibold text-[#626975] hover:border-[var(--ka-blue)] hover:text-[var(--ka-blue)] transition-colors"
          >
            <Sparkles size={15} /> Study all
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <FilterBar filter={filter} onChange={setFilter} dueCount={stats.due} totalCount={stats.total} />

      {/* Type breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Problems',   count: stats.byType.problem,   color: '#1865f2', bg: '#e8f0fe' },
          { label: 'Concepts',   count: stats.byType.concept,   color: '#9059ff', bg: '#f3effe' },
          { label: 'Formulas',   count: stats.byType.formula,   color: '#1fab54', bg: '#e6f4ea' },
          { label: 'Principles', count: stats.byType.principle, color: '#f5a623', bg: '#fef9e7' },
        ].map(({ label, count, color, bg }) => (
          <div key={label} className="bg-white border border-[#e4e6ea] rounded-lg p-4">
            <p className="text-2xl font-extrabold" style={{ color }}>{count}</p>
            <p className="text-xs text-[#9299a5] font-medium mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Card list */}
      <div>
        <p className="text-xs font-semibold text-[#9299a5] uppercase tracking-wider mb-3">
          {cards.length} card{cards.length !== 1 ? 's' : ''} in selection
        </p>

        {cards.length === 0 ? (
          <div className="text-center py-12 bg-white border border-[#e4e6ea] rounded-lg">
            <Brain size={28} className="text-[#9299a5] mx-auto mb-2" />
            <p className="text-sm text-[#626975]">No cards match this filter.</p>
          </div>
        ) : (
          <div className="space-y-1">
            {cards.slice(0, 20).map((card) => {
              const sm2 = sm2Cards[card.id];
              const isDue = sm2 && new Date(sm2.dueDate ?? sm2.nextReview) <= new Date();
              const problem = card.type === 'problem' && card.problemId ? problemsById[card.problemId] : null;
              const title = problem ? problem.title : card.front.replace(/\*\*/g, '').split('\n')[0];

              return (
                <button
                  key={card.id}
                  onClick={() => startSession([card])}
                  className="w-full flex items-center gap-4 px-4 py-3 bg-white border border-[#e4e6ea] rounded-lg hover:border-[var(--ka-blue)] hover:bg-[var(--ka-blue-light)] transition-all duration-150 text-left group"
                >
                  {isDue && (
                    <span className="w-2 h-2 rounded-full bg-[var(--ka-blue)] shrink-0" />
                  )}
                  {!isDue && (
                    <span className="w-2 h-2 rounded-full bg-[#e4e6ea] shrink-0" />
                  )}
                  <p className="flex-1 text-sm font-medium text-[#21242c] truncate">{title}</p>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-[#9299a5] font-mono">§{card.section}</span>
                    <ChevronRight size={13} className="text-[#9299a5] group-hover:text-[var(--ka-blue)] transition-colors" />
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {cards.length > 20 && (
          <p className="text-center text-xs text-[#9299a5] mt-3">
            Showing 20 of {cards.length} — start a session to practice all.
          </p>
        )}
      </div>
    </div>
  );
}
