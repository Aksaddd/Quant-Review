'use client';

import { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
  ChevronLeft, CheckCircle2, RotateCcw, Brain, Sparkles,
  ChevronRight, CalendarClock, Star,
} from 'lucide-react';
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
import type { ReviewGrade, Flashcard, SM2Card } from '@/lib/types';
import { resolveState } from '@/lib/sm2';

export default function FlashcardsPage() {
  const {
    reviewCard, reviewDue, newCardsQueue,
    newIntroducedToday, newCardsPerDay, masteredCount, sm2Cards,
  } = useProgress();
  const { recordActivity } = useStreak();

  const [filter, setFilter] = useState<FlashcardFilter>({ type: 'all', dueOnly: false });
  const { cards, stats } = useFlashcards(filter);

  // Session state
  const [sessionCards, setSessionCards]       = useState<Flashcard[] | null>(null);
  const [sessionNewIds, setSessionNewIds]     = useState<Set<string>>(new Set());
  const [sessionIndex, setSessionIndex]       = useState(0);
  const [sessionReviewed, setSessionReviewed] = useState(0);
  const [sessionNewLearned, setSessionNewLearned] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [showAnswer, setShowAnswer]           = useState(false);
  const [lastGrade, setLastGrade]             = useState<ReviewGrade | null>(null);
  const [ratingDisabled, setRatingDisabled]   = useState(false);

  // Build the today's session card list (review due + new queue)
  const todaySessionFlashcards = useMemo(() => {
    const reviewCards = reviewDue
      .map((c) => flashcardsById[c.cardId])
      .filter(Boolean) as Flashcard[];
    const newCards = newCardsQueue
      .map((c) => flashcardsById[c.cardId])
      .filter(Boolean) as Flashcard[];
    return [...reviewCards, ...newCards];
  }, [reviewDue, newCardsQueue]);

  const startSession = useCallback((cardList: Flashcard[], newIds: Set<string> = new Set()) => {
    setSessionCards(cardList);
    setSessionNewIds(newIds);
    setSessionIndex(0);
    setSessionReviewed(0);
    setSessionNewLearned(0);
    setSessionComplete(false);
    setShowAnswer(false);
    setLastGrade(null);
    setRatingDisabled(false);
  }, []);

  const startTodaySession = useCallback(() => {
    const newIds = new Set(newCardsQueue.map((c) => c.cardId));
    startSession(todaySessionFlashcards, newIds);
  }, [todaySessionFlashcards, newCardsQueue, startSession]);

  const handleRate = useCallback((grade: ReviewGrade) => {
    if (!sessionCards || ratingDisabled) return;
    setRatingDisabled(true);

    const card = sessionCards[sessionIndex];
    const wasNew = sessionNewIds.has(card.id);
    reviewCard(card.id, grade);
    recordActivity();
    setLastGrade(grade);

    setTimeout(() => {
      const nextIndex = sessionIndex + 1;
      setSessionReviewed((r) => r + 1);
      if (wasNew) setSessionNewLearned((n) => n + 1);

      if (nextIndex >= sessionCards.length) {
        setSessionComplete(true);
      } else {
        setSessionIndex(nextIndex);
        setShowAnswer(false);
        setLastGrade(null);
        setRatingDisabled(false);
      }
    }, 600);
  }, [sessionCards, sessionIndex, sessionNewIds, ratingDisabled, reviewCard, recordActivity]);

  // ── Session active ───────────────────────────────────────────────────────
  if (sessionCards && sessionCards.length > 0 && !sessionComplete) {
    const cardMeta = sessionCards[sessionIndex];
    const card = flashcardsById[cardMeta.id];
    const isNewCard = sessionNewIds.has(cardMeta.id);

    const problem = card.type === 'problem' && card.problemId ? problemsById[card.problemId] : null;
    const frontContent = problem ? problem.setup : card.front;
    const backContent  = problem
      ? problem.solution + (problem.finalAnswer ? `\n\n**Answer:** ${problem.finalAnswer}` : '')
      : card.back;
    const cardTitle = problem ? problem.title : null;

    return (
      <div className="min-h-screen bg-[#f7f8fa] flex flex-col">
        {/* Top bar */}
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

        <div className="flex-1 flex flex-col items-center px-4 sm:px-6 py-8 max-w-3xl mx-auto w-full">

          {/* Card type row */}
          <div className="flex items-center gap-2 mb-5 self-start">
            {isNewCard ? (
              <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fef9e7] text-[#f5a623] border border-[#fdd8a0]">
                <Star size={9} /> NEW
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#e8f0fe] text-[#1865f2] border border-[#a8c4f8]">
                <CalendarClock size={9} /> REVIEW
              </span>
            )}
            <TypeBadge type={card.type} />
            <DifficultyBadge difficulty={card.difficulty} />
            <span className="text-xs text-[#9299a5] font-mono">§{card.section}</span>
          </div>

          {/* Question */}
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

          {/* Show answer */}
          {!showAnswer && !lastGrade && (
            <button
              onClick={() => setShowAnswer(true)}
              className="w-full py-3 rounded-lg border-2 border-[var(--ka-blue)] text-[var(--ka-blue)] font-semibold text-sm hover:bg-[var(--ka-blue)] hover:text-white transition-all duration-150 mb-4"
            >
              Show answer
            </button>
          )}

          {/* Answer + rating */}
          {showAnswer && !lastGrade && (
            <div className="w-full animate-fade-up space-y-4">
              <div className="w-full bg-white border border-[#e4e6ea] rounded-lg shadow-sm p-6">
                <p className="text-xs font-bold text-[#626975] uppercase tracking-wider mb-4 pb-3 border-b border-[#e4e6ea]">Answer</p>
                <div className="prose-reading text-[#21242c]">
                  <MarkdownRenderer content={backContent} />
                </div>
              </div>
              <div className="bg-white border border-[#e4e6ea] rounded-lg p-5">
                <RatingButtons onRate={handleRate} disabled={ratingDisabled} />
              </div>
            </div>
          )}

          {/* Post-rating feedback */}
          {lastGrade && (
            <div className={`w-full rounded-lg p-4 border-t-4 animate-fade-up flex items-center gap-4 ${
              lastGrade === 'easy' || lastGrade === 'good' ? 'exercise-correct' : 'exercise-incorrect'
            }`}>
              {(lastGrade === 'easy' || lastGrade === 'good') ? (
                <>
                  <CheckCircle2 size={28} className="text-[#1fab54] shrink-0 animate-check-pop" />
                  <div>
                    <p className="font-bold text-[#0d652d] text-sm">
                      {lastGrade === 'easy' ? 'Excellent!' : 'Nice work!'}
                    </p>
                    <p className="text-xs text-[#1fab54]">
                      {isNewCard ? 'Card added to your review rotation.' : 'Interval extended.'}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <RotateCcw size={28} className="text-[#f5a623] shrink-0" />
                  <div>
                    <p className="font-bold text-[#7a4e00] text-sm">Keep practicing!</p>
                    <p className="text-xs text-[#9299a5]">Card will come back soon.</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Session complete ─────────────────────────────────────────────────────
  if (sessionComplete) {
    const nextReviewDue = reviewDue.length; // updated after ratings

    return (
      <div className="min-h-screen bg-[#f7f8fa] flex items-center justify-center px-4">
        <div className="bg-white border border-[#e4e6ea] rounded-lg shadow-sm p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-[#e6f4ea] border border-[#a8d5b5] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-[#1fab54] animate-check-pop" />
          </div>
          <h2 className="text-xl font-extrabold text-[#21242c] mb-1">Session complete!</h2>

          {/* Session breakdown */}
          <div className="flex items-center justify-center gap-6 my-4 py-4 border-y border-[#e4e6ea]">
            <div className="text-center">
              <p className="text-2xl font-extrabold text-[#1865f2]">{sessionReviewed - sessionNewLearned}</p>
              <p className="text-xs text-[#9299a5] mt-0.5">Reviewed</p>
            </div>
            <div className="w-px h-8 bg-[#e4e6ea]" />
            <div className="text-center">
              <p className="text-2xl font-extrabold text-[#f5a623]">{sessionNewLearned}</p>
              <p className="text-xs text-[#9299a5] mt-0.5">New cards</p>
            </div>
            <div className="w-px h-8 bg-[#e4e6ea]" />
            <div className="text-center">
              <p className="text-2xl font-extrabold text-[#1fab54]">{masteredCount}</p>
              <p className="text-xs text-[#9299a5] mt-0.5">Mastered</p>
            </div>
          </div>

          <p className="text-sm text-[#626975] mb-6">
            {nextReviewDue > 0
              ? `${nextReviewDue} card${nextReviewDue !== 1 ? 's' : ''} still due for review.`
              : 'All caught up for today! Come back tomorrow.'}
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => setSessionCards(null)}
              className="flex-1 py-2.5 rounded-lg border border-[#e4e6ea] text-sm font-semibold text-[#626975] hover:border-[#c8ccd4] hover:text-[#21242c] transition-colors"
            >
              Back to deck
            </button>
            {nextReviewDue > 0 && (
              <button
                onClick={() => startSession(
                  reviewDue.map((c) => flashcardsById[c.cardId]).filter(Boolean) as Flashcard[]
                )}
                className="flex-1 py-2.5 rounded-lg bg-[var(--ka-blue)] text-white text-sm font-semibold hover:bg-[var(--ka-blue-dark)] transition-colors"
              >
                Review remaining ({nextReviewDue})
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Deck browser ─────────────────────────────────────────────────────────
  const totalSessionSize = todaySessionFlashcards.length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#21242c]">Flashcards</h1>
        <p className="text-sm text-[#626975] mt-0.5">
          {stats.total} cards · {stats.mastered} mastered
        </p>
      </div>

      {/* Today's session card */}
      <div className="bg-white border border-[#e4e6ea] rounded-lg p-5">
        <p className="text-xs font-bold text-[#9299a5] uppercase tracking-wider mb-4">Today&apos;s Session</p>

        <div className="flex items-center gap-6 mb-5">
          <div className="text-center">
            <p className="text-3xl font-extrabold text-[#1865f2]">{reviewDue.length}</p>
            <p className="text-xs text-[#9299a5] mt-0.5 flex items-center gap-1 justify-center">
              <CalendarClock size={10} /> Due for review
            </p>
          </div>
          <div className="text-[#e4e6ea] text-2xl font-thin">+</div>
          <div className="text-center">
            <p className="text-3xl font-extrabold text-[#f5a623]">{newCardsQueue.length}</p>
            <p className="text-xs text-[#9299a5] mt-0.5 flex items-center gap-1 justify-center">
              <Star size={10} /> New today
              <span className="text-[#c8ccd4]">({newIntroducedToday}/{newCardsPerDay})</span>
            </p>
          </div>
          <div className="flex-1" />
          {totalSessionSize > 0 ? (
            <button
              onClick={startTodaySession}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--ka-blue)] text-white text-sm font-semibold hover:bg-[var(--ka-blue-dark)] transition-colors"
            >
              <Brain size={15} />
              Start ({totalSessionSize})
            </button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#e6f4ea] text-[#1fab54] text-sm font-semibold">
              <CheckCircle2 size={15} />
              All done today!
            </div>
          )}
        </div>

        {/* Progress bar: new cards introduced today */}
        {newCardsPerDay > 0 && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-[#9299a5]">New cards introduced today</span>
              <span className="text-[10px] font-semibold text-[#9299a5]">{newIntroducedToday} / {newCardsPerDay}</span>
            </div>
            <div className="h-1.5 bg-[#e4e6ea] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#f5a623] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (newIntroducedToday / newCardsPerDay) * 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Filter + browse */}
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
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-[#9299a5] uppercase tracking-wider">
            {cards.length} card{cards.length !== 1 ? 's' : ''} in selection
          </p>
          <button
            onClick={() => startSession([...cards])}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#626975] hover:text-[var(--ka-blue)] transition-colors"
          >
            <Sparkles size={12} /> Study all
          </button>
        </div>

        {cards.length === 0 ? (
          <div className="text-center py-12 bg-white border border-[#e4e6ea] rounded-lg">
            <Brain size={28} className="text-[#9299a5] mx-auto mb-2" />
            <p className="text-sm text-[#626975]">No cards match this filter.</p>
          </div>
        ) : (
          <div className="space-y-1">
            {cards.slice(0, 20).map((card) => {
              const sm2 = sm2Cards[card.id];
              const state = sm2 ? (sm2.state ?? (sm2.repetitions > 0 ? 'review' : 'new')) : 'new';
              const isDue = state === 'review' && sm2 && sm2.nextReview <= new Date().toISOString().split('T')[0];
              const isNew = state === 'new';
              const problem = card.type === 'problem' && card.problemId ? problemsById[card.problemId] : null;
              const title = problem ? problem.title : card.front.replace(/\*\*/g, '').split('\n')[0];

              return (
                <button
                  key={card.id}
                  onClick={() => startSession([card])}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-[#e4e6ea] rounded-lg hover:border-[var(--ka-blue)] hover:bg-[var(--ka-blue-light)] transition-all duration-150 text-left group"
                >
                  {isDue && <span className="w-2 h-2 rounded-full bg-[var(--ka-blue)] shrink-0" title="Due for review" />}
                  {isNew && <span className="w-2 h-2 rounded-full bg-[#f5a623] shrink-0" title="New card" />}
                  {!isDue && !isNew && <span className="w-2 h-2 rounded-full bg-[#e4e6ea] shrink-0" />}
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
