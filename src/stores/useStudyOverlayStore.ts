'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Light active-recall overlay store.
 *
 * Drives the reader-level Study Overlay: when `enabled`, content wrapped in
 * <RecallMask/> is hidden behind a "try to recall" gate that forces generation
 * before reveal — the strongest single intervention identified in
 * content/Research/Synthesis (retrieval practice, generation effect).
 *
 * Only the toggle is persisted. Per-card recall ratings live in session
 * counters so each reading session starts fresh, matching the "one sitting =
 * one retrieval round" framing in the Make It Stick / How We Learn sources.
 */

export type RecallOutcome = 'got' | 'partial' | 'blank';

interface StudyOverlayState {
  enabled: boolean;
  /** ISO timestamp of the current session's first recall — null if none yet. */
  sessionStartedAt: string | null;
  counts: { got: number; partial: number; blank: number };
  /** Mask ids already revealed in the current session (prevents double-counting). */
  revealed: string[];
}

interface StudyOverlayActions {
  toggle: () => void;
  setEnabled: (enabled: boolean) => void;
  markRevealed: (id: string, outcome: RecallOutcome) => void;
  resetSession: () => void;
}

export const useStudyOverlayStore = create<StudyOverlayState & StudyOverlayActions>()(
  persist(
    (set, get) => ({
      enabled: false,
      sessionStartedAt: null,
      counts: { got: 0, partial: 0, blank: 0 },
      revealed: [],

      toggle: () => set({ enabled: !get().enabled }),
      setEnabled: (enabled) => set({ enabled }),

      markRevealed: (id, outcome) => {
        const s = get();
        if (s.revealed.includes(id)) return;
        set({
          revealed: [...s.revealed, id],
          counts: { ...s.counts, [outcome]: s.counts[outcome] + 1 },
          sessionStartedAt: s.sessionStartedAt ?? new Date().toISOString(),
        });
      },

      resetSession: () =>
        set({
          sessionStartedAt: null,
          counts: { got: 0, partial: 0, blank: 0 },
          revealed: [],
        }),
    }),
    {
      name: 'qr:study-overlay',
      // Only persist the toggle across reloads; session counts stay in-memory
      // so each study session is a clean retrieval round.
      partialize: (s) => ({ enabled: s.enabled }),
    },
  ),
);
