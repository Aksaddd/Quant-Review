'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  ChevronLeft, CheckCircle2, RotateCcw, Brain, Sparkles,
  ChevronRight, CalendarClock, Star, BookOpen, LayoutList,
} from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { useFlashcards, type FlashcardFilter } from '@/hooks/useFlashcards';
import { useStreak } from '@/hooks/useStreak';
import { flashcardsById, allFlashcards } from '@/data/flashcards';
import MarkdownRenderer from '@/components/reader/MarkdownRenderer';
import FilterBar from '@/components/flashcards/FilterBar';
import DeckProgress from '@/components/flashcards/DeckProgress';
import RatingButtons from '@/components/flashcards/RatingButtons';
import { TypeBadge, DifficultyBadge } from '@/components/ui/Badge';
import { problemsById, SECTIONS } from '@/data/problems';
import type { ReviewGrade, Flashcard } from '@/lib/types';
import { resolveState, isMastered, isDue } from '@/lib/sm2';

/* ── Helpers ─────────────────────────────────────────────────────────────── */
const SECTION_MAP = Object.fromEntries(SECTIONS.map((s) => [s.id, s.title]));

function cardTitle(card: Flashcard): string {
  const problem = card.type === 'problem' && card.problemId ? problemsById[card.problemId] : null;
  if (problem) return problem.title;
  return card.front.replace(/\*\*/g, '').split('\n')[0].slice(0, 72);
}

type BrowseTab = 'all' | 'sections';

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function FlashcardsPage() {
  const {
    reviewCard, reviewDue, newCardsQueue,
    newIntroducedToday, newCardsPerDay, masteredCount, sm2Cards,
  } = useProgress();
  const { recordActivity } = useStreak();

  const [filter, setFilter]       = useState<FlashcardFilter>({ type: 'all', dueOnly: false });
  const [browseTab, setBrowseTab] = useState<BrowseTab>('all');
  const { cards, stats }          = useFlashcards(filter);

  // Session state
  const [sessionCards, setSessionCards]             = useState<Flashcard[] | null>(null);
  const [sessionNewIds, setSessionNewIds]           = useState<Set<string>>(new Set());
  const [sessionIndex, setSessionIndex]             = useState(0);
  const [sessionReviewed, setSessionReviewed]       = useState(0);
  const [sessionNewLearned, setSessionNewLearned]   = useState(0);
  const [sessionComplete, setSessionComplete]       = useState(false);
  const [showAnswer, setShowAnswer]                 = useState(false);
  const [lastGrade, setLastGrade]                   = useState<ReviewGrade | null>(null);
  const [ratingDisabled, setRatingDisabled]         = useState(false);

  // Today's session (review due + new queue)
  const todaySessionFlashcards = useMemo(() => {
    const rev = reviewDue.map((c) => flashcardsById[c.cardId]).filter(Boolean) as Flashcard[];
    const nw  = newCardsQueue.map((c) => flashcardsById[c.cardId]).filter(Boolean) as Flashcard[];
    return [...rev, ...nw];
  }, [reviewDue, newCardsQueue]);

  const startSession = useCallback((cardList: Flashcard[], newIds: Set<string> = new Set()) => {
    if (cardList.length === 0) return;
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
    startSession(todaySessionFlashcards, new Set(newCardsQueue.map((c) => c.cardId)));
  }, [todaySessionFlashcards, newCardsQueue, startSession]);

  const handleRate = useCallback((grade: ReviewGrade) => {
    if (!sessionCards || ratingDisabled) return;
    setRatingDisabled(true);
    const card   = sessionCards[sessionIndex];
    const wasNew = sessionNewIds.has(card.id);
    reviewCard(card.id, grade);
    recordActivity();
    setLastGrade(grade);
    setTimeout(() => {
      const next = sessionIndex + 1;
      setSessionReviewed((r) => r + 1);
      if (wasNew) setSessionNewLearned((n) => n + 1);
      if (next >= sessionCards.length) {
        setSessionComplete(true);
      } else {
        setSessionIndex(next);
        setShowAnswer(false);
        setLastGrade(null);
        setRatingDisabled(false);
      }
    }, 600);
  }, [sessionCards, sessionIndex, sessionNewIds, ratingDisabled, reviewCard, recordActivity]);

  // ── Session active ───────────────────────────────────────────────────────
  if (sessionCards && sessionCards.length > 0 && !sessionComplete) {
    const card      = sessionCards[sessionIndex];
    const isNewCard = sessionNewIds.has(card.id);
    const secTitle  = SECTION_MAP[card.section] ?? '';
    const problem   = card.type === 'problem' && card.problemId ? problemsById[card.problemId] : null;
    const front     = problem ? problem.setup : card.front;
    const back      = problem
      ? problem.solution + (problem.finalAnswer ? `\n\n**Answer:** ${problem.finalAnswer}` : '')
      : card.back;

    return (
      <div className="min-h-screen bg-[#f7f8fa] flex flex-col">
        {/* Top bar */}
        <div className="bg-white border-b border-[#e4e6ea] px-4 sm:px-6 py-3 flex items-center gap-4">
          <button
            onClick={() => setSessionCards(null)}
            className="flex items-center gap-1.5 text-sm text-[#626975] hover:text-[#21242c] transition-colors shrink-0"
          >
            <ChevronLeft size={16} /> Back
          </button>
          <div className="flex-1">
            <DeckProgress current={sessionIndex + 1} total={sessionCards.length} reviewed={sessionReviewed} />
          </div>
          <span className="text-xs text-[#9299a5] font-medium whitespace-nowrap">
            {sessionIndex + 1} / {sessionCards.length}
          </span>
        </div>

        <div className="flex-1 flex flex-col items-center px-4 sm:px-6 py-8 max-w-3xl mx-auto w-full">

          {/* Section + status pills */}
          <div className="flex flex-wrap items-center gap-2 mb-5 self-start">
            {/* Section — most prominent */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#e4e6ea]">
              <BookOpen size={12} className="text-[#9299a5]" />
              <span className="text-[11px] font-bold text-[#626975]">§{card.section}</span>
              <span className="text-[#c8ccd4]">·</span>
              <span className="text-[11px] font-semibold text-[#21242c]">{secTitle}</span>
            </div>
            {/* New / Review status */}
            {isNewCard ? (
              <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-[#fef9e7] text-[#f5a623] border border-[#fdd8a0]">
                <Star size={9} /> NEW
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-[#e8f0fe] text-[#1865f2] border border-[#a8c4f8]">
                <CalendarClock size={9} /> REVIEW
              </span>
            )}
            <TypeBadge type={card.type} />
            <DifficultyBadge difficulty={card.difficulty} />
          </div>

          {/* Question */}
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

          {!showAnswer && !lastGrade && (
            <button
              onClick={() => setShowAnswer(true)}
              className="w-full py-3 rounded-lg border-2 border-[var(--ka-blue)] text-[var(--ka-blue)] font-semibold text-sm hover:bg-[var(--ka-blue)] hover:text-white transition-all duration-150 mb-4"
            >
              Show answer
            </button>
          )}

          {showAnswer && !lastGrade && (
            <div className="w-full animate-fade-up space-y-4">
              <div className="w-full bg-white border border-[#e4e6ea] rounded-lg shadow-sm p-6">
                <p className="text-xs font-bold text-[#626975] uppercase tracking-wider mb-4 pb-3 border-b border-[#e4e6ea]">
                  Answer
                </p>
                <div className="prose-reading text-[#21242c]">
                  <MarkdownRenderer content={back} />
                </div>
              </div>
              <div className="bg-white border border-[#e4e6ea] rounded-lg p-5">
                <RatingButtons onRate={handleRate} disabled={ratingDisabled} />
              </div>
            </div>
          )}

          {lastGrade && (
            <div className={`w-full rounded-lg p-4 border-t-4 animate-fade-up flex items-center gap-4 ${
              lastGrade === 'easy' || lastGrade === 'good' ? 'exercise-correct' : 'exercise-incorrect'
            }`}>
              {lastGrade === 'easy' || lastGrade === 'good' ? (
                <>
                  <CheckCircle2 size={28} className="text-[#1fab54] shrink-0 animate-check-pop" />
                  <div>
                    <p className="font-bold text-[#0d652d] text-sm">{lastGrade === 'easy' ? 'Excellent!' : 'Nice work!'}</p>
                    <p className="text-xs text-[#1fab54]">{isNewCard ? 'Added to your review rotation.' : 'Interval extended.'}</p>
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
    return (
      <div className="min-h-screen bg-[#f7f8fa] flex items-center justify-center px-4">
        <div className="bg-white border border-[#e4e6ea] rounded-lg shadow-sm p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-[#e6f4ea] border border-[#a8d5b5] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-[#1fab54] animate-check-pop" />
          </div>
          <h2 className="text-xl font-extrabold text-[#21242c] mb-1">Session complete!</h2>
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
            {reviewDue.length > 0
              ? `${reviewDue.length} card${reviewDue.length !== 1 ? 's' : ''} still due for review.`
              : 'All caught up for today! Come back tomorrow.'}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setSessionCards(null)}
              className="flex-1 py-2.5 rounded-lg border border-[#e4e6ea] text-sm font-semibold text-[#626975] hover:border-[#c8ccd4] transition-colors"
            >
              Back to deck
            </button>
            {reviewDue.length > 0 && (
              <button
                onClick={() => startSession(reviewDue.map((c) => flashcardsById[c.cardId]).filter(Boolean) as Flashcard[])}
                className="flex-1 py-2.5 rounded-lg bg-[var(--ka-blue)] text-white text-sm font-semibold hover:bg-[var(--ka-blue-dark)] transition-colors"
              >
                Review remaining ({reviewDue.length})
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
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#21242c]">Flashcards</h1>
          <p className="text-sm text-[#626975] mt-0.5">
            {stats.total} cards across {SECTIONS.length} sections · {stats.mastered} mastered
          </p>
        </div>
        <button
          onClick={() => startSession([...allFlashcards])}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#c8ccd4] text-sm font-semibold text-[#626975] hover:border-[var(--ka-blue)] hover:text-[var(--ka-blue)] transition-colors shrink-0"
        >
          <Sparkles size={14} /> Study all {allFlashcards.length}
        </button>
      </div>

      {/* Today's session */}
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
              <Brain size={15} /> Start ({totalSessionSize})
            </button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#e6f4ea] text-[#1fab54] text-sm font-semibold">
              <CheckCircle2 size={15} /> All done today!
            </div>
          )}
        </div>
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

      {/* Browse tabs */}
      <div className="flex gap-1 p-1 bg-[#f0f1f3] rounded-lg w-fit">
        <button
          onClick={() => setBrowseTab('all')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
            browseTab === 'all'
              ? 'bg-white text-[#21242c] shadow-sm'
              : 'text-[#626975] hover:text-[#21242c]'
          }`}
        >
          <LayoutList size={12} /> All cards
        </button>
        <button
          onClick={() => setBrowseTab('sections')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
            browseTab === 'sections'
              ? 'bg-white text-[#21242c] shadow-sm'
              : 'text-[#626975] hover:text-[#21242c]'
          }`}
        >
          <BookOpen size={12} /> By section
        </button>
      </div>

      {/* ── All cards view ─────────────────────────────────────────────────── */}
      {browseTab === 'all' && (
        <>
          <FilterBar filter={filter} onChange={setFilter} dueCount={stats.due} totalCount={stats.total} />

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

          <div>
            <p className="text-xs font-semibold text-[#9299a5] uppercase tracking-wider mb-3">
              {cards.length} card{cards.length !== 1 ? 's' : ''}
            </p>
            {cards.length === 0 ? (
              <div className="text-center py-12 bg-white border border-[#e4e6ea] rounded-lg">
                <Brain size={28} className="text-[#9299a5] mx-auto mb-2" />
                <p className="text-sm text-[#626975]">No cards match this filter.</p>
              </div>
            ) : (
              <div className="space-y-1">
                {cards.map((card) => {
                  const sm2   = sm2Cards[card.id];
                  const state = sm2 ? resolveState(sm2) : 'new';
                  const due   = sm2 ? isDue(sm2) : false;
                  const isNew = state === 'new';
                  const title = cardTitle(card);

                  return (
                    <button
                      key={card.id}
                      onClick={() => startSession([card])}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-[#e4e6ea] rounded-lg hover:border-[var(--ka-blue)] hover:bg-[var(--ka-blue-light)] transition-all duration-150 text-left group"
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: due ? '#1865f2' : isNew ? '#f5a623' : '#e4e6ea' }}
                        title={due ? 'Due for review' : isNew ? 'New card' : 'Scheduled'}
                      />
                      <p className="flex-1 text-sm font-medium text-[#21242c] truncate">{title}</p>
                      {/* Section label — prominently shown */}
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#f0f1f3] text-[#626975] shrink-0">
                        §{card.section} {SECTION_MAP[card.section] ? `· ${SECTION_MAP[card.section]}` : ''}
                      </span>
                      <ChevronRight size={13} className="text-[#9299a5] group-hover:text-[var(--ka-blue)] transition-colors shrink-0" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      {/* ── By section view ────────────────────────────────────────────────── */}
      {browseTab === 'sections' && (
        <div className="space-y-3">
          {SECTIONS.map((sec) => {
            const secCards   = allFlashcards.filter((c) => c.section === sec.id);
            const secSm2     = secCards.map((c) => sm2Cards[c.id]).filter(Boolean);
            const reviewed   = secSm2.filter((c) => resolveState(c) === 'review').length;
            const mastered   = secSm2.filter(isMastered).length;
            const dueCount   = secSm2.filter(isDue).length;
            const newCount   = secCards.length - reviewed;
            const reviewedPct = secCards.length > 0 ? Math.round((reviewed / secCards.length) * 100) : 0;

            return (
              <div key={sec.id} className="bg-white border border-[#e4e6ea] rounded-lg p-4">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold text-[var(--ka-blue)] uppercase tracking-wider">§{sec.id}</span>
                      {dueCount > 0 && (
                        <span className="flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#e8f0fe] text-[#1865f2]">
                          <CalendarClock size={8} /> {dueCount} due
                        </span>
                      )}
                      {newCount > 0 && (
                        <span className="flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#fef9e7] text-[#f5a623]">
                          <Star size={8} /> {newCount} new
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-[#21242c]">{sec.title}</h3>
                    <p className="text-xs text-[#9299a5] mt-0.5">
                      {secCards.length} cards · {mastered} mastered
                    </p>
                  </div>
                  <button
                    onClick={() => startSession(secCards)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#c8ccd4] text-xs font-semibold text-[#626975] hover:border-[var(--ka-blue)] hover:text-[var(--ka-blue)] transition-colors shrink-0"
                  >
                    <Sparkles size={11} /> Study §{sec.id}
                  </button>
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-[#e4e6ea] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${reviewedPct}%`,
                        backgroundColor: reviewedPct === 100 ? '#1fab54' : '#1865f2',
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-[#9299a5] shrink-0">
                    {reviewed}/{secCards.length} reviewed
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
