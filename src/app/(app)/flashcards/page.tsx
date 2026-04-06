'use client';

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import {
  ChevronLeft, CheckCircle2, RotateCcw, Brain, Sparkles,
  ChevronRight, CalendarClock, Star, BookOpen, LayoutList,
  FolderOpen, Trash2, Pencil, List, X,
} from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { useFlashcards, type FlashcardFilter } from '@/hooks/useFlashcards';
import { useStreak } from '@/hooks/useStreak';
import { useCustomSets } from '@/hooks/useCustomSets';
import { flashcardsById, allFlashcards } from '@/data/flashcards';
import MarkdownRenderer from '@/components/reader/MarkdownRenderer';
import FilterBar from '@/components/flashcards/FilterBar';
import DeckProgress from '@/components/flashcards/DeckProgress';
import RatingButtons from '@/components/flashcards/RatingButtons';
import AddToSetButton from '@/components/flashcards/AddToSetButton';
import { TypeBadge, DifficultyBadge } from '@/components/ui/Badge';
import { problemsById, SECTIONS } from '@/data/problems';
import type { ReviewGrade, Flashcard } from '@/lib/types';
import { resolveState, isMastered, isDue } from '@/lib/sm2';

/* ── Helpers ─────────────────────────────────────────────────────────────── */
const CH1_SECTIONS = [
  { id: '1.1', title: 'Build a Broad Knowledge Base' },
  { id: '1.2', title: 'Practice Interview Skills' },
  { id: '1.3', title: 'Listen Carefully' },
  { id: '1.4', title: 'Speak Your Mind' },
  { id: '1.5', title: 'Make Reasonable Assumptions' },
] as const;

const ALL_SECTIONS = [...CH1_SECTIONS, ...SECTIONS];
const SECTION_MAP = Object.fromEntries(ALL_SECTIONS.map((s) => [s.id, s.title]));

function cardTitle(card: Flashcard): string {
  const problem = card.type === 'problem' && card.problemId ? problemsById[card.problemId] : null;
  if (problem) return problem.title;
  return card.front.replace(/\*\*/g, '').split('\n')[0].slice(0, 72);
}

type BrowseTab = 'all' | 'sections' | 'sets';

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function FlashcardsPage() {
  const {
    reviewCard, reviewDue, newCardsQueue,
    newIntroducedToday, newCardsPerDay, masteredCount, sm2Cards,
  } = useProgress();
  const { recordActivity } = useStreak();
  const { sets, createSet, renameSet, deleteSet, addCardToSet, removeCardFromSet, isCardInSet } = useCustomSets();

  const [filter, setFilter]       = useState<FlashcardFilter>({ type: 'all', dueOnly: false });
  const [browseTab, setBrowseTab] = useState<BrowseTab>('all');
  const { cards, stats }          = useFlashcards(filter);

  // Session state
  type SessionMode = 'review' | 'browse';
  const [sessionMode, setSessionMode]               = useState<SessionMode>('review');
  const [sessionCards, setSessionCards]             = useState<Flashcard[] | null>(null);
  const [sessionNewIds, setSessionNewIds]           = useState<Set<string>>(new Set());
  const [sessionIndex, setSessionIndex]             = useState(0);
  const [sessionReviewed, setSessionReviewed]       = useState(0);
  const [sessionNewLearned, setSessionNewLearned]   = useState(0);
  const [sessionComplete, setSessionComplete]       = useState(false);
  const [showAnswer, setShowAnswer]                 = useState(false);
  const [lastGrade, setLastGrade]                   = useState<ReviewGrade | null>(null);
  const [ratingDisabled, setRatingDisabled]         = useState(false);
  const [spineOpen, setSpineOpen]                   = useState(true);

  // Today's session (review due + new queue)
  const todaySessionFlashcards = useMemo(() => {
    const rev = reviewDue.map((c) => flashcardsById[c.cardId]).filter(Boolean) as Flashcard[];
    const nw  = newCardsQueue.map((c) => flashcardsById[c.cardId]).filter(Boolean) as Flashcard[];
    return [...rev, ...nw];
  }, [reviewDue, newCardsQueue]);

  const startSession = useCallback((cardList: Flashcard[], newIds: Set<string> = new Set(), mode: SessionMode = 'review', startIndex = 0) => {
    if (cardList.length === 0) return;
    setSessionMode(mode);
    setSessionCards(cardList);
    setSessionNewIds(newIds);
    setSessionIndex(Math.min(startIndex, cardList.length - 1));
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
      setSessionReviewed((r) => r + 1);
      if (wasNew) setSessionNewLearned((n) => n + 1);
      if (sessionMode === 'browse') {
        // Stay on current card — user navigates freely
        setRatingDisabled(false);
      } else {
        const next = sessionIndex + 1;
        if (next >= sessionCards.length) {
          setSessionComplete(true);
        } else {
          setSessionIndex(next);
          setShowAnswer(false);
          setLastGrade(null);
          setRatingDisabled(false);
        }
      }
    }, 600);
  }, [sessionCards, sessionIndex, sessionNewIds, sessionMode, ratingDisabled, reviewCard, recordActivity]);

  const navigateTo = useCallback((index: number) => {
    if (!sessionCards || index < 0 || index >= sessionCards.length) return;
    setSessionIndex(index);
    setShowAnswer(false);
    setLastGrade(null);
    setRatingDisabled(false);
  }, [sessionCards]);

  // Keyboard navigation for browse mode
  useEffect(() => {
    if (sessionMode !== 'browse' || !sessionCards || sessionComplete) return;
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowLeft')  { e.preventDefault(); navigateTo(sessionIndex - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); navigateTo(sessionIndex + 1); }
      if (e.key === ' ') { e.preventDefault(); setShowAnswer((v) => !v); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sessionMode, sessionCards, sessionComplete, sessionIndex, navigateTo]);

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

    // Group session cards by section for the spine
    const spineSections = ALL_SECTIONS
      .map((sec) => {
        const entries: { card: Flashcard; globalIdx: number }[] = [];
        sessionCards.forEach((c, i) => { if (c.section === sec.id) entries.push({ card: c, globalIdx: i }); });
        return entries.length > 0 ? { ...sec, entries } : null;
      })
      .filter(Boolean) as { id: string; title: string; entries: { card: Flashcard; globalIdx: number }[] }[];

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
          {sessionMode === 'browse' && (
            <button
              onClick={() => setSpineOpen((v) => !v)}
              className="flex items-center gap-1.5 text-sm text-[#626975] hover:text-[#21242c] transition-colors shrink-0"
              title={spineOpen ? 'Hide card list' : 'Show card list'}
            >
              <List size={16} />
            </button>
          )}
          <div className="flex-1">
            <DeckProgress current={sessionIndex + 1} total={sessionCards.length} reviewed={sessionReviewed} />
          </div>
          <span className="text-xs text-[#9299a5] font-medium whitespace-nowrap">
            {sessionIndex + 1} / {sessionCards.length}
          </span>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* ── Spine sidebar ──────────────────────────────────────────── */}
          {sessionMode === 'browse' && spineOpen && (
            <div className="w-64 shrink-0 bg-white border-r border-[#e4e6ea] overflow-y-auto hidden sm:block">
              <div className="p-3 border-b border-[#e4e6ea] flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#9299a5] uppercase tracking-wider">Card list</span>
                <button onClick={() => setSpineOpen(false)} className="text-[#9299a5] hover:text-[#626975] transition-colors">
                  <X size={13} />
                </button>
              </div>
              {spineSections.map((sec) => (
                <div key={sec.id}>
                  <div className="px-3 pt-3 pb-1 flex items-center gap-1.5">
                    <span className="text-[9px] font-bold text-[var(--ka-blue)] uppercase tracking-wider">§{sec.id}</span>
                    <span className="text-[9px] font-semibold text-[#626975] truncate">{sec.title}</span>
                  </div>
                  {sec.entries.map(({ card: sc, globalIdx }) => {
                    const isCurrent = globalIdx === sessionIndex;
                    const scSm2 = sm2Cards[sc.id];
                    const scState = scSm2 ? resolveState(scSm2) : 'new';
                    const scDue = scSm2 ? isDue(scSm2) : false;
                    return (
                      <button
                        key={sc.id}
                        ref={isCurrent ? (el) => { el?.scrollIntoView({ block: 'nearest' }); } : undefined}
                        onClick={() => navigateTo(globalIdx)}
                        className={`w-full text-left px-3 py-1.5 flex items-center gap-2 transition-colors ${
                          isCurrent
                            ? 'bg-[var(--ka-blue-light,#e8f0fe)] border-l-2 border-[var(--ka-blue)]'
                            : 'hover:bg-[#f7f8fa] border-l-2 border-transparent'
                        }`}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{
                            backgroundColor: scDue ? '#1865f2' : scState === 'new' ? '#f5a623' : '#e4e6ea',
                          }}
                        />
                        <span className={`text-[11px] truncate ${isCurrent ? 'font-bold text-[#21242c]' : 'text-[#626975]'}`}>
                          {cardTitle(sc)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {/* ── Main content ───────────────────────────────────────────── */}
          <div className="flex-1 flex flex-col items-center px-4 sm:px-6 py-8 max-w-3xl mx-auto w-full overflow-y-auto">

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
              <AddToSetButton
                cardId={card.id}
                sets={sets}
                isCardInSet={isCardInSet}
                onAddToSet={addCardToSet}
                onRemoveFromSet={removeCardFromSet}
                onCreateSet={createSet}
                align="left"
              />
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

            {!showAnswer && (sessionMode === 'review' ? !lastGrade : true) && (
              <button
                onClick={() => setShowAnswer(true)}
                className="w-full py-3 rounded-lg border-2 border-[var(--ka-blue)] text-[var(--ka-blue)] font-semibold text-sm hover:bg-[var(--ka-blue)] hover:text-white transition-all duration-150 mb-4"
              >
                Show answer{sessionMode === 'browse' ? ' (Space)' : ''}
              </button>
            )}

            {showAnswer && (sessionMode === 'review' ? !lastGrade : true) && (
              <div className="w-full animate-fade-up space-y-4">
                <div className="w-full bg-white border border-[#e4e6ea] rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#e4e6ea]">
                    <p className="text-xs font-bold text-[#626975] uppercase tracking-wider">
                      Answer
                    </p>
                    {sessionMode === 'browse' && (
                      <button
                        onClick={() => setShowAnswer(false)}
                        className="text-xs text-[#9299a5] hover:text-[#626975] transition-colors"
                      >
                        Hide answer
                      </button>
                    )}
                  </div>
                  <div className="prose-reading text-[#21242c]">
                    <MarkdownRenderer content={back} />
                  </div>
                </div>
                {!lastGrade && (
                  <div className="bg-white border border-[#e4e6ea] rounded-lg p-5">
                    <RatingButtons onRate={handleRate} disabled={ratingDisabled} />
                  </div>
                )}
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

            {/* Browse-mode navigation */}
            {sessionMode === 'browse' && (
              <div className="w-full mt-6 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={() => navigateTo(sessionIndex - 1)}
                    disabled={sessionIndex === 0}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-[#e4e6ea] text-sm font-semibold text-[#626975] hover:border-[#c8ccd4] hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={15} /> Previous
                  </button>

                  <span className="text-xs text-[#9299a5] font-medium">
                    {sessionIndex + 1} of {sessionCards.length}
                  </span>

                  <button
                    onClick={() => navigateTo(sessionIndex + 1)}
                    disabled={sessionIndex === sessionCards.length - 1}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-[#e4e6ea] text-sm font-semibold text-[#626975] hover:border-[#c8ccd4] hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    Next <ChevronRight size={15} />
                  </button>
                </div>
                <p className="text-[10px] text-[#c8ccd4] text-center">
                  ← → to navigate · Space to flip
                </p>
              </div>
            )}
          </div>
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
              onClick={() => { setSessionCards(null); setSessionComplete(false); }}
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
          onClick={() => startSession([...allFlashcards], new Set(), 'browse')}
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
        <button
          onClick={() => setBrowseTab('sets')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
            browseTab === 'sets'
              ? 'bg-white text-[#21242c] shadow-sm'
              : 'text-[#626975] hover:text-[#21242c]'
          }`}
        >
          <FolderOpen size={12} /> My sets{sets.length > 0 ? ` (${sets.length})` : ''}
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
            {(() => {
              // Build ordered card list grouped by section for consistent indexing
              const orderedCards = ALL_SECTIONS.flatMap((sec) =>
                cards.filter((c) => c.section === sec.id)
              );

              if (orderedCards.length === 0) return (
                <div className="text-center py-12 bg-white border border-[#e4e6ea] rounded-lg">
                  <Brain size={28} className="text-[#9299a5] mx-auto mb-2" />
                  <p className="text-sm text-[#626975]">No cards match this filter.</p>
                </div>
              );

              let runningIdx = 0;
              return (
                <div className="space-y-5">
                  {ALL_SECTIONS
                    .map((sec) => {
                      const secCards = orderedCards.filter((c) => c.section === sec.id);
                      if (secCards.length === 0) return null;
                      const sectionStartIdx = runningIdx;
                      runningIdx += secCards.length;
                      return (
                        <div key={sec.id}>
                          {/* Section header */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-[var(--ka-blue)] uppercase tracking-wider">§{sec.id}</span>
                              <h3 className="text-xs font-bold text-[#21242c]">{sec.title}</h3>
                              <span className="text-[10px] text-[#9299a5]">({secCards.length})</span>
                            </div>
                            <button
                              onClick={() => startSession(orderedCards, new Set(), 'browse', sectionStartIdx)}
                              className="flex items-center gap-1 text-[10px] font-semibold text-[#626975] hover:text-[var(--ka-blue)] transition-colors"
                            >
                              <Sparkles size={10} /> Study section
                            </button>
                          </div>
                          {/* Cards in section */}
                          <div className="space-y-1">
                            {secCards.map((card, localIdx) => {
                              const globalIdx = sectionStartIdx + localIdx;
                              const sm2   = sm2Cards[card.id];
                              const state = sm2 ? resolveState(sm2) : 'new';
                              const due   = sm2 ? isDue(sm2) : false;
                              const isNew = state === 'new';
                              const title = cardTitle(card);

                              return (
                                <button
                                  key={card.id}
                                  onClick={() => startSession(orderedCards, new Set(), 'browse', globalIdx)}
                                  className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-[#e4e6ea] rounded-lg hover:border-[var(--ka-blue)] hover:bg-[var(--ka-blue-light)] transition-all duration-150 text-left group"
                                >
                                  <span
                                    className="w-2 h-2 rounded-full shrink-0"
                                    style={{ backgroundColor: due ? '#1865f2' : isNew ? '#f5a623' : '#e4e6ea' }}
                                    title={due ? 'Due for review' : isNew ? 'New card' : 'Scheduled'}
                                  />
                                  <p className="flex-1 text-sm font-medium text-[#21242c] truncate">{title}</p>
                                  <TypeBadge type={card.type} />
                                  <AddToSetButton
                                    cardId={card.id}
                                    sets={sets}
                                    isCardInSet={isCardInSet}
                                    onAddToSet={addCardToSet}
                                    onRemoveFromSet={removeCardFromSet}
                                    onCreateSet={createSet}
                                  />
                                  <ChevronRight size={13} className="text-[#9299a5] group-hover:text-[var(--ka-blue)] transition-colors shrink-0" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })
                    .filter(Boolean)}
                </div>
              );
            })()}
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
                    onClick={() => startSession(secCards, new Set(), 'browse')}
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

      {/* ── My sets view ───────────────────────────────────────────────── */}
      {browseTab === 'sets' && (
        <MySetsView
          sets={sets}
          createSet={createSet}
          renameSet={renameSet}
          deleteSet={deleteSet}
          removeCardFromSet={removeCardFromSet}
          sm2Cards={sm2Cards}
          onStudy={(cards) => startSession(cards, new Set(), 'browse')}
        />
      )}
    </div>
  );
}

/* ── My Sets sub-component ─────────────────────────────────────────────── */

function MySetsView({
  sets, createSet, renameSet, deleteSet, removeCardFromSet, sm2Cards, onStudy,
}: {
  sets: ReturnType<typeof import('@/hooks/useCustomSets').useCustomSets>['sets'];
  createSet: (title: string) => string;
  renameSet: (id: string, title: string) => void;
  deleteSet: (id: string) => void;
  removeCardFromSet: (setId: string, cardId: string) => void;
  sm2Cards: Record<string, import('@/lib/types').SM2Card>;
  onStudy: (cards: Flashcard[]) => void;
}) {
  const [newSetTitle, setNewSetTitle] = useState('');
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameTitle, setRenameTitle] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  function handleCreate() {
    if (!newSetTitle.trim()) return;
    createSet(newSetTitle.trim());
    setNewSetTitle('');
  }

  function handleRename(id: string) {
    if (!renameTitle.trim()) return;
    renameSet(id, renameTitle.trim());
    setRenamingId(null);
    setRenameTitle('');
  }

  function handleStudySet(set: typeof sets[number]) {
    const setCards = set.cardIds
      .map((id) => flashcardsById[id])
      .filter(Boolean) as Flashcard[];
    if (setCards.length > 0) onStudy(setCards);
  }

  return (
    <div className="space-y-4">
      {/* Create new set */}
      <div className="flex gap-2">
        <input
          value={newSetTitle}
          onChange={(e) => setNewSetTitle(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleCreate(); }}
          placeholder="New set name..."
          className="flex-1 text-sm border border-[#c8ccd4] rounded-lg px-3 py-2 outline-none focus:border-[var(--ka-blue)] bg-white"
        />
        <button
          onClick={handleCreate}
          disabled={!newSetTitle.trim()}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--ka-blue)] text-white text-sm font-semibold hover:bg-[var(--ka-blue-dark)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <FolderOpen size={13} /> Create
        </button>
      </div>

      {sets.length === 0 ? (
        <div className="text-center py-12 bg-white border border-[#e4e6ea] rounded-lg">
          <FolderOpen size={28} className="text-[#9299a5] mx-auto mb-2" />
          <p className="text-sm text-[#626975]">No custom sets yet.</p>
          <p className="text-xs text-[#9299a5] mt-1">Create a set above, then add cards from the &quot;All cards&quot; tab.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sets.map((set) => {
            const setCards = set.cardIds.map((id) => flashcardsById[id]).filter(Boolean) as Flashcard[];
            const reviewedCount = setCards.filter((c) => sm2Cards[c.id] && resolveState(sm2Cards[c.id]) === 'review').length;
            const masteredInSet = setCards.filter((c) => sm2Cards[c.id] && isMastered(sm2Cards[c.id])).length;
            const dueInSet = setCards.filter((c) => sm2Cards[c.id] && isDue(sm2Cards[c.id])).length;
            const isExpanded = expandedId === set.id;

            return (
              <div key={set.id} className="bg-white border border-[#e4e6ea] rounded-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      {renamingId === set.id ? (
                        <div className="flex gap-1.5 items-center">
                          <input
                            value={renameTitle}
                            onChange={(e) => setRenameTitle(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleRename(set.id);
                              if (e.key === 'Escape') { setRenamingId(null); setRenameTitle(''); }
                            }}
                            autoFocus
                            className="flex-1 text-sm border border-[#c8ccd4] rounded px-2 py-1 outline-none focus:border-[var(--ka-blue)]"
                          />
                          <button onClick={() => handleRename(set.id)} className="text-xs text-[var(--ka-blue)] font-semibold">Save</button>
                          <button onClick={() => { setRenamingId(null); setRenameTitle(''); }} className="text-xs text-[#9299a5]">Cancel</button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : set.id)}
                            className="text-sm font-bold text-[#21242c] hover:text-[var(--ka-blue)] transition-colors truncate"
                          >
                            {set.title}
                          </button>
                          {dueInSet > 0 && (
                            <span className="flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#e8f0fe] text-[#1865f2]">
                              <CalendarClock size={8} /> {dueInSet} due
                            </span>
                          )}
                        </div>
                      )}
                      <p className="text-xs text-[#9299a5] mt-0.5">
                        {setCards.length} card{setCards.length !== 1 ? 's' : ''} · {masteredInSet} mastered · {reviewedCount} reviewed
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => { setRenamingId(set.id); setRenameTitle(set.title); }}
                        className="p-1.5 rounded-md border border-[#e4e6ea] text-[#9299a5] hover:text-[#626975] hover:border-[#c8ccd4] transition-colors"
                        title="Rename set"
                      >
                        <Pencil size={11} />
                      </button>
                      {confirmDeleteId === set.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => { deleteSet(set.id); setConfirmDeleteId(null); }}
                            className="text-[10px] font-semibold text-red-600 hover:text-red-700 px-1.5 py-1 rounded border border-red-200 bg-red-50"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="text-[10px] text-[#9299a5] px-1.5 py-1"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(set.id)}
                          className="p-1.5 rounded-md border border-[#e4e6ea] text-[#9299a5] hover:text-red-500 hover:border-red-200 transition-colors"
                          title="Delete set"
                        >
                          <Trash2 size={11} />
                        </button>
                      )}
                      <button
                        onClick={() => handleStudySet(set)}
                        disabled={setCards.length === 0}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#c8ccd4] text-xs font-semibold text-[#626975] hover:border-[var(--ka-blue)] hover:text-[var(--ka-blue)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Sparkles size={11} /> Study
                      </button>
                    </div>
                  </div>

                  {/* Progress bar */}
                  {setCards.length > 0 && (
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex-1 h-1.5 bg-[#e4e6ea] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.round((reviewedCount / setCards.length) * 100)}%`,
                            backgroundColor: reviewedCount === setCards.length ? '#1fab54' : '#1865f2',
                          }}
                        />
                      </div>
                      <span className="text-[10px] font-semibold text-[#9299a5] shrink-0">
                        {reviewedCount}/{setCards.length} reviewed
                      </span>
                    </div>
                  )}
                </div>

                {/* Expanded card list */}
                {isExpanded && setCards.length > 0 && (
                  <div className="border-t border-[#e4e6ea]">
                    {setCards.map((card) => (
                      <div key={card.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#f7f8fa] transition-colors">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{
                            backgroundColor: sm2Cards[card.id] && isDue(sm2Cards[card.id]) ? '#1865f2'
                              : !sm2Cards[card.id] || resolveState(sm2Cards[card.id]) === 'new' ? '#f5a623'
                              : '#e4e6ea',
                          }}
                        />
                        <p className="flex-1 text-xs text-[#21242c] truncate">{cardTitle(card)}</p>
                        <TypeBadge type={card.type} />
                        <button
                          onClick={() => removeCardFromSet(set.id, card.id)}
                          className="text-[#9299a5] hover:text-red-500 transition-colors p-1"
                          title="Remove from set"
                        >
                          <Trash2 size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {isExpanded && setCards.length === 0 && (
                  <div className="border-t border-[#e4e6ea] px-4 py-4 text-center">
                    <p className="text-xs text-[#9299a5]">No cards in this set. Add cards from the &quot;All cards&quot; tab.</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
