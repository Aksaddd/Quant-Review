'use client';

/**
 * Per-session state for the interactive walkthrough player.
 * Persists to localStorage so refresh / nav-away doesn't lose progress.
 *
 * State shape: keyed by docId, then by stageId. The current-stage cursor is
 * also per-doc so multiple walkthroughs can be in flight simultaneously.
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { StageAnswer } from '@/types/interactive';

interface DocSession {
  cursor: number;                              // index into stages[]
  answers: Record<string, StageAnswer>;        // stageId -> answer
  revealed: Record<string, boolean>;           // stageId -> explanation revealed?
  hintsUsed: Record<string, number>;           // stageId -> hint count
  committedEarly: boolean;                     // user clicked skip-to-commit
  startedAt: number;
  completedAt?: number;
}

interface InteractiveSessionState {
  sessions: Record<string, DocSession>;

  ensureSession: (docId: string) => void;
  getSession: (docId: string) => DocSession | undefined;
  setCursor: (docId: string, cursor: number) => void;
  recordAnswer: (docId: string, stageId: string, answer: StageAnswer) => void;
  reveal: (docId: string, stageId: string) => void;
  bumpHint: (docId: string, stageId: string) => void;
  markCommittedEarly: (docId: string) => void;
  markCompleted: (docId: string) => void;
  resetDoc: (docId: string) => void;
}

function freshSession(): DocSession {
  return {
    cursor: 0,
    answers: {},
    revealed: {},
    hintsUsed: {},
    committedEarly: false,
    startedAt: Date.now(),
  };
}

export const useInteractiveSessionStore = create<InteractiveSessionState>()(
  persist(
    (set, get) => ({
      sessions: {},

      ensureSession: (docId) => {
        if (get().sessions[docId]) return;
        set((s) => ({ sessions: { ...s.sessions, [docId]: freshSession() } }));
      },

      getSession: (docId) => get().sessions[docId],

      setCursor: (docId, cursor) => set((s) => {
        const sess = s.sessions[docId] ?? freshSession();
        return { sessions: { ...s.sessions, [docId]: { ...sess, cursor } } };
      }),

      recordAnswer: (docId, stageId, answer) => set((s) => {
        const sess = s.sessions[docId] ?? freshSession();
        return {
          sessions: {
            ...s.sessions,
            [docId]: { ...sess, answers: { ...sess.answers, [stageId]: answer } },
          },
        };
      }),

      reveal: (docId, stageId) => set((s) => {
        const sess = s.sessions[docId] ?? freshSession();
        return {
          sessions: {
            ...s.sessions,
            [docId]: { ...sess, revealed: { ...sess.revealed, [stageId]: true } },
          },
        };
      }),

      bumpHint: (docId, stageId) => set((s) => {
        const sess = s.sessions[docId] ?? freshSession();
        const next = (sess.hintsUsed[stageId] ?? 0) + 1;
        return {
          sessions: {
            ...s.sessions,
            [docId]: { ...sess, hintsUsed: { ...sess.hintsUsed, [stageId]: next } },
          },
        };
      }),

      markCommittedEarly: (docId) => set((s) => {
        const sess = s.sessions[docId] ?? freshSession();
        return { sessions: { ...s.sessions, [docId]: { ...sess, committedEarly: true } } };
      }),

      markCompleted: (docId) => set((s) => {
        const sess = s.sessions[docId] ?? freshSession();
        return {
          sessions: { ...s.sessions, [docId]: { ...sess, completedAt: Date.now() } },
        };
      }),

      resetDoc: (docId) => set((s) => ({
        sessions: { ...s.sessions, [docId]: freshSession() },
      })),
    }),
    { name: 'qr:interactive-sessions', version: 1 }
  )
);
