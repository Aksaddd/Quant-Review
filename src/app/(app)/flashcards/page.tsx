'use client';

import { useState, useCallback } from 'react';
import { Brain, Check, RotateCcw, Sparkles } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { useFlashcards, type FlashcardFilter } from '@/hooks/useFlashcards';
import { useStreak } from '@/hooks/useStreak';
import { allFlashcards, flashcardsById } from '@/data/flashcards';
import FlashcardCard from '@/components/flashcards/FlashcardCard';
import RatingButtons from '@/components/flashcards/RatingButtons';
import DeckProgress from '@/components/flashcards/DeckProgress';
import FilterBar from '@/components/flashcards/FilterBar';
import Button from '@/components/ui/Button';
import type { ReviewGrade } from '@/lib/types';

export default function FlashcardsPage() {
  const { reviewCard, dueCards, masteredCount, sm2Cards } = useProgress();
  const { recordActivity } = useStreak();

  const [filter, setFilter] = useState<FlashcardFilter>({ type: 'all', dueOnly: false });
  const { cards, stats } = useFlashcards(filter);

  // Session state
  const [sessionCards, setSessionCards] = useState<typeof cards | null>(null);
  const [sessionIndex, setSessionIndex] = useState(0);
  const [sessionReviewed, setSessionReviewed] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [ratingDisabled, setRatingDisabled] = useState(false);

  const startSession = useCallback(() => {
    setSessionCards([...cards]);
    setSessionIndex(0);
    setSessionReviewed(0);
    setSessionComplete(false);
    setFlipped(false);
  }, [cards]);

  const handleRate = useCallback(
    (grade: ReviewGrade) => {
      if (!sessionCards || ratingDisabled) return;

      setRatingDisabled(true);
      const card = sessionCards[sessionIndex];
      reviewCard(card.id, grade);
      recordActivity();

      const nextIndex = sessionIndex + 1;
      const newReviewed = sessionReviewed + 1;
      setSessionReviewed(newReviewed);

      if (nextIndex >= sessionCards.length) {
        setSessionComplete(true);
      } else {
        setSessionIndex(nextIndex);
        setFlipped(false);
        setTimeout(() => setRatingDisabled(false), 100);
      }
    },
    [sessionCards, sessionIndex, sessionReviewed, ratingDisabled, reviewCard, recordActivity]
  );

  const resetSession = useCallback(() => {
    setSessionCards(null);
    setSessionComplete(false);
    setFlipped(false);
  }, []);

  // ── Session active ───────────────────────────────────────────
  if (sessionCards && !sessionComplete) {
    const currentCard = flashcardsById[sessionCards[sessionIndex].id];

    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={resetSession}
            className="text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors flex items-center gap-1.5"
          >
            ← Back to deck
          </button>
          <span className="text-xs text-[var(--text-muted)]">
            {sessionIndex + 1} / {sessionCards.length}
          </span>
        </div>

        {/* Progress */}
        <DeckProgress
          current={sessionIndex + 1}
          total={sessionCards.length}
          reviewed={sessionReviewed}
        />

        {/* Card */}
        <FlashcardCard
          card={currentCard}
          onFlip={() => setFlipped(true)}
        />

        {/* Rating buttons — only shown after flip */}
        <div className={`transition-all duration-300 ${flipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
          <RatingButtons onRate={handleRate} disabled={ratingDisabled} />
        </div>

        {!flipped && (
          <p className="text-center text-xs text-[var(--text-muted)]">
            Click the card to reveal the answer, then rate how well you remembered.
          </p>
        )}
      </div>
    );
  }

  // ── Session complete ─────────────────────────────────────────
  if (sessionComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[var(--success-bg)] border border-[var(--success)]/25 flex items-center justify-center mx-auto mb-2">
            <Check size={28} className="text-[var(--success)]" />
          </div>
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">Session complete!</h2>
          <p className="text-[var(--text-muted)] text-sm">
            You reviewed <strong className="text-[var(--text-primary)]">{sessionReviewed}</strong> card{sessionReviewed !== 1 ? 's' : ''}.
            {' '}{dueCards.length > 0 ? `${dueCards.length} more due.` : 'All caught up!'}
          </p>
          <div className="flex gap-3 justify-center mt-4">
            <Button variant="secondary" onClick={resetSession} iconRight={<RotateCcw size={14} />}>
              Back to Deck
            </Button>
            {dueCards.length > 0 && (
              <Button onClick={() => { setSessionCards(dueCards.map(c => flashcardsById[c.id])); setSessionIndex(0); setSessionReviewed(0); setSessionComplete(false); setFlipped(false); }}>
                Review Due ({dueCards.length})
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Deck browser ─────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">Flashcards</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">
            {stats.total} cards · {stats.due} due · {stats.mastered} mastered
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          {dueCards.length > 0 && (
            <Button
              size="sm"
              onClick={() => { setFilter({ ...filter, dueOnly: true }); startSession(); }}
              iconRight={<Brain size={14} />}
            >
              Review Due ({dueCards.length})
            </Button>
          )}
          <Button
            size="sm"
            variant="secondary"
            onClick={startSession}
            iconRight={<Sparkles size={14} />}
          >
            Study All
          </Button>
        </div>
      </div>

      {/* Filter bar */}
      <FilterBar
        filter={filter}
        onChange={setFilter}
        dueCount={stats.due}
        totalCount={stats.total}
      />

      {/* Stats overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Problems', count: stats.byType.problem, color: 'text-brand-400' },
          { label: 'Concepts', count: stats.byType.concept, color: 'text-purple-400' },
          { label: 'Formulas', count: stats.byType.formula, color: 'text-blue-400' },
          { label: 'Principles', count: stats.byType.principle, color: 'text-emerald-400' },
        ].map(({ label, count, color }) => (
          <div key={label} className="bg-[var(--surface-2)] border border-[var(--surface-border)] rounded-xl p-3">
            <p className={`text-xl font-bold ${color}`}>{count}</p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Card grid preview */}
      <div>
        <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
          {cards.length} card{cards.length !== 1 ? 's' : ''} in current selection
        </p>

        {cards.length === 0 ? (
          <div className="text-center py-12 bg-[var(--surface-2)] border border-[var(--surface-border)] rounded-2xl">
            <Brain size={28} className="text-[var(--text-muted)] mx-auto mb-2" />
            <p className="text-sm text-[var(--text-secondary)]">No cards match this filter.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {cards.slice(0, 12).map((card) => {
              const sm2 = sm2Cards[card.id];
              const isDue = sm2 && new Date(sm2.dueDate) <= new Date();
              return (
                <button
                  key={card.id}
                  onClick={() => { setSessionCards([card]); setSessionIndex(0); setSessionReviewed(0); setSessionComplete(false); setFlipped(false); }}
                  className="text-left p-4 bg-[var(--surface-2)] hover:bg-[var(--surface-3)] border border-[var(--surface-border)] hover:border-[var(--surface-border-strong)] rounded-xl transition-all duration-150"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">§{card.section}</span>
                    {isDue && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-brand-400 shrink-0" title="Due for review" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-[var(--text-primary)] line-clamp-2 leading-snug">
                    {card.front.replace(/\*\*/g, '').split('\n')[0]}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {cards.length > 12 && (
          <p className="text-center text-xs text-[var(--text-muted)] mt-3">
            Showing 12 of {cards.length}. Start a session to study all.
          </p>
        )}
      </div>
    </div>
  );
}
