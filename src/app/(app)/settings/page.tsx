'use client';

import { useState, useMemo } from 'react';
import { Trash2, AlertTriangle, CalendarClock, CheckSquare, Square, Check } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { flashcardsById } from '@/data/flashcards';
import { problemsById } from '@/data/problems';
import type { ReviewGrade } from '@/lib/types';

// ── Reset section ─────────────────────────────────────────────────────────────

const STORAGE_KEYS = ['qr:problems', 'qr:sm2', 'qr-streak', 'qr-last-active', 'qr:settings'] as const;

type ResetTarget = 'progress' | 'flashcards' | 'all';
interface ResetOption { id: ResetTarget; label: string; description: string; keys: string[]; color: string; bg: string; border: string }

const RESET_OPTIONS: ResetOption[] = [
  { id: 'progress',  label: 'Problem Progress',  description: 'Clears all solved/attempted statuses. Flashcard history is kept.', keys: ['qr:problems'], color: '#f5a623', bg: '#fef9e7', border: '#fdd8a0' },
  { id: 'flashcards',label: 'Flashcard History', description: 'Resets all SM-2 intervals and review counts. Your streak is kept.',  keys: ['qr:sm2'],      color: '#1865f2', bg: '#e8f0fe', border: '#a8c4f8' },
  { id: 'all',       label: 'Everything',         description: 'Wipes all progress, flashcard history, streak, and preferences.',   keys: ['qr:problems','qr:sm2','qr-streak','qr-last-active','qr:settings'], color: '#d92916', bg: '#fce8e6', border: '#f5c6c0' },
];

// ── Due queue section ─────────────────────────────────────────────────────────

type MasteryFilter = 'all' | 'unseen' | ReviewGrade;

const FILTER_TABS: { id: MasteryFilter; label: string; color: string }[] = [
  { id: 'all',      label: 'All',       color: '#626975' },
  { id: 'unseen',   label: 'Not reviewed', color: '#9299a5' },
  { id: 'blackout', label: 'Blackout',  color: '#d92916' },
  { id: 'again',    label: 'Wrong',     color: '#e8591a' },
  { id: 'hard',     label: 'Hard',      color: '#f5a623' },
  { id: 'good',     label: 'Good',      color: '#1865f2' },
  { id: 'easy',     label: 'Easy',      color: '#1fab54' },
];

const GRADE_META: Record<ReviewGrade, { label: string; color: string; bg: string; border: string }> = {
  blackout: { label: 'Blackout', color: '#d92916', bg: '#fce8e6', border: '#f5c6c0' },
  again:    { label: 'Wrong',    color: '#e8591a', bg: '#fef0e7', border: '#fbc8a0' },
  hard:     { label: 'Hard',     color: '#f5a623', bg: '#fef9e7', border: '#fdd8a0' },
  good:     { label: 'Good',     color: '#1865f2', bg: '#e8f0fe', border: '#a8c4f8' },
  easy:     { label: 'Easy',     color: '#1fab54', bg: '#e6f4ea', border: '#a8d5b5' },
};

function cardTitle(cardId: string): string {
  const card = flashcardsById[cardId];
  if (!card) return cardId;
  if (card.type === 'problem' && card.problemId) {
    return problemsById[card.problemId]?.title ?? card.front.split('\n')[0];
  }
  return card.front.replace(/\*\*/g, '').split('\n')[0].slice(0, 70);
}

export default function SettingsPage() {
  const { sm2Cards, markCardsDue, dueCards } = useProgress();

  // ── Reset state ──────────────────────────────────────────────────────────
  const [confirming, setConfirming] = useState<ResetTarget | null>(null);

  function handleReset(opt: ResetOption) {
    opt.keys.forEach((k) => { try { localStorage.removeItem(k); } catch { /**/ } });
    window.location.reload();
  }

  // ── Due queue state ──────────────────────────────────────────────────────
  const [activeFilter, setActiveFilter] = useState<MasteryFilter>('all');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [markedDone, setMarkedDone] = useState(false);

  const dueIds = useMemo(() => new Set(dueCards.map((c) => c.cardId)), [dueCards]);

  const filteredCards = useMemo(() => {
    return Object.values(sm2Cards).filter((sm2) => {
      if (activeFilter === 'all')    return true;
      if (activeFilter === 'unseen') return sm2.repetitions === 0;
      return sm2.lastGrade === activeFilter;
    });
  }, [sm2Cards, activeFilter]);

  function toggleCard(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function selectAll() {
    setSelected(new Set(filteredCards.map((c) => c.cardId)));
  }

  function clearSelection() {
    setSelected(new Set());
  }

  function handleMarkDue() {
    if (selected.size === 0) return;
    markCardsDue([...selected]);
    setMarkedDone(true);
    setSelected(new Set());
    setTimeout(() => setMarkedDone(false), 3000);
  }

  const allSelected = filteredCards.length > 0 && filteredCards.every((c) => selected.has(c.cardId));

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      <div>
        <h1 className="text-2xl font-extrabold text-[#21242c] mb-0.5">Settings</h1>
        <p className="text-sm text-[#626975]">Manage your progress, review queue, and data.</p>
      </div>

      {/* ── Due Queue Manager ─────────────────────────────────────────────── */}
      <section>
        <div className="flex items-center gap-2 mb-1">
          <CalendarClock size={16} className="text-[var(--ka-blue)]" />
          <h2 className="text-base font-bold text-[#21242c]">Review Queue</h2>
        </div>
        <p className="text-sm text-[#626975] mb-4">
          Select cards by mastery level and schedule them for your next session.
          Currently <strong className="text-[#21242c]">{dueCards.length}</strong> card{dueCards.length !== 1 ? 's' : ''} due.
        </p>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {FILTER_TABS.map((tab) => {
            const count = tab.id === 'all'
              ? Object.keys(sm2Cards).length
              : tab.id === 'unseen'
                ? Object.values(sm2Cards).filter((c) => c.repetitions === 0).length
                : Object.values(sm2Cards).filter((c) => c.lastGrade === tab.id).length;

            return (
              <button
                key={tab.id}
                onClick={() => { setActiveFilter(tab.id); setSelected(new Set()); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                style={
                  activeFilter === tab.id
                    ? { backgroundColor: tab.color, color: '#fff', borderColor: tab.color }
                    : { backgroundColor: '#fff', color: tab.color, borderColor: '#e4e6ea' }
                }
              >
                {tab.label}
                <span
                  className="rounded-full px-1.5 py-0.5 text-[10px] font-bold"
                  style={
                    activeFilter === tab.id
                      ? { backgroundColor: 'rgba(255,255,255,0.25)', color: '#fff' }
                      : { backgroundColor: '#f0f1f3', color: '#626975' }
                  }
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={allSelected ? clearSelection : selectAll}
            className="flex items-center gap-1.5 text-xs font-semibold text-[var(--ka-blue)] hover:underline"
          >
            {allSelected
              ? <><CheckSquare size={13} /> Deselect all</>
              : <><Square size={13} /> Select all ({filteredCards.length})</>
            }
          </button>
          {selected.size > 0 && (
            <span className="text-xs text-[#9299a5]">{selected.size} selected</span>
          )}
        </div>

        {/* Card list */}
        <div className="bg-white border border-[#e4e6ea] rounded-lg overflow-hidden mb-3">
          {filteredCards.length === 0 ? (
            <p className="text-sm text-[#9299a5] text-center py-8">No cards in this category.</p>
          ) : (
            <div className="divide-y divide-[#f0f1f3] max-h-72 overflow-y-auto">
              {filteredCards.map((sm2) => {
                const isSelected = selected.has(sm2.cardId);
                const isDue = dueIds.has(sm2.cardId);
                const card = flashcardsById[sm2.cardId];
                const section = card?.section ?? '–';
                const grade = sm2.lastGrade;

                return (
                  <button
                    key={sm2.cardId}
                    onClick={() => toggleCard(sm2.cardId)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#f7f8fa] transition-colors text-left"
                  >
                    {/* Checkbox */}
                    <span className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                      isSelected ? 'bg-[var(--ka-blue)] border-[var(--ka-blue)]' : 'border-[#c8ccd4]'
                    }`}>
                      {isSelected && <Check size={10} className="text-white" strokeWidth={3} />}
                    </span>

                    {/* Title */}
                    <span className="flex-1 text-sm text-[#21242c] truncate">{cardTitle(sm2.cardId)}</span>

                    {/* Badges */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {isDue && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--ka-blue)] text-white">DUE</span>
                      )}
                      {grade && (
                        <span
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded-full border"
                          style={{ color: GRADE_META[grade].color, backgroundColor: GRADE_META[grade].bg, borderColor: GRADE_META[grade].border }}
                        >
                          {GRADE_META[grade].label}
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-[#9299a5]">§{section}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Action bar */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleMarkDue}
            disabled={selected.size === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--ka-blue)] text-white text-sm font-semibold hover:bg-[var(--ka-blue-dark)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <CalendarClock size={14} />
            Mark {selected.size > 0 ? selected.size : ''} card{selected.size !== 1 ? 's' : ''} as due
          </button>
          {markedDone && (
            <span className="flex items-center gap-1.5 text-sm text-[#1fab54] font-semibold">
              <Check size={14} /> Scheduled!
            </span>
          )}
        </div>
      </section>

      {/* ── Reset Progress ────────────────────────────────────────────────── */}
      <section>
        <h2 className="text-base font-bold text-[#21242c] mb-1">Reset Progress</h2>
        <p className="text-sm text-[#626975] mb-4">
          Permanently clear specific data. The page will reload to apply changes.
        </p>

        <div className="space-y-3">
          {RESET_OPTIONS.map((opt) => (
            <div key={opt.id} className="bg-white border border-[#e4e6ea] rounded-lg p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#21242c]">{opt.label}</p>
                  <p className="text-xs text-[#9299a5] mt-0.5">{opt.description}</p>
                </div>

                {confirming === opt.id ? (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setConfirming(null)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#e4e6ea] text-[#626975] hover:bg-[#f7f8fa] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleReset(opt)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg text-white"
                      style={{ backgroundColor: opt.color }}
                    >
                      Confirm
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirming(opt.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border shrink-0"
                    style={{ borderColor: opt.border, color: opt.color, backgroundColor: opt.bg }}
                  >
                    <Trash2 size={12} /> Reset
                  </button>
                )}
              </div>

              {confirming === opt.id && (
                <div
                  className="mt-3 flex items-start gap-2 p-3 rounded-lg text-xs border"
                  style={{ backgroundColor: opt.bg, borderColor: opt.border }}
                >
                  <AlertTriangle size={13} className="shrink-0 mt-0.5" style={{ color: opt.color }} />
                  <span style={{ color: opt.color }}>This cannot be undone.</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Storage info ──────────────────────────────────────────────────── */}
      <section>
        <h2 className="text-base font-bold text-[#21242c] mb-1">About Your Data</h2>
        <div className="bg-[#f7f8fa] border border-[#e4e6ea] rounded-lg p-4 text-sm text-[#626975] space-y-2">
          <p>All data is stored in your browser&apos;s <code className="text-xs bg-white border border-[#e4e6ea] px-1.5 py-0.5 rounded font-mono">localStorage</code> — nothing is sent to a server.</p>
          <div className="pt-2 border-t border-[#e4e6ea] space-y-1 font-mono text-xs">
            {STORAGE_KEYS.map((k) => <p key={k} className="text-[#9299a5]">{k}</p>)}
          </div>
        </div>
      </section>
    </div>
  );
}
