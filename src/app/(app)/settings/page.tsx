'use client';

import { useState } from 'react';
import { Trash2, RotateCcw, AlertTriangle } from 'lucide-react';

const STORAGE_KEYS = ['qr:problems', 'qr:sm2', 'qr-streak', 'qr-last-active', 'qr:settings'] as const;

type ResetTarget = 'progress' | 'flashcards' | 'all';

interface ResetOption {
  id: ResetTarget;
  label: string;
  description: string;
  keys: string[];
  color: string;
  bg: string;
  border: string;
}

const RESET_OPTIONS: ResetOption[] = [
  {
    id: 'progress',
    label: 'Problem Progress',
    description: 'Clears all solved/attempted problem statuses. Flashcard review history is kept.',
    keys: ['qr:problems'],
    color: '#f5a623',
    bg: '#fef9e7',
    border: '#fdd8a0',
  },
  {
    id: 'flashcards',
    label: 'Flashcard History',
    description: 'Resets all SM-2 intervals and review counts. Your streak is kept.',
    keys: ['qr:sm2'],
    color: '#1865f2',
    bg: '#e8f0fe',
    border: '#a8c4f8',
  },
  {
    id: 'all',
    label: 'Everything',
    description: 'Wipes all progress, flashcard history, streak, and reading preferences.',
    keys: ['qr:problems', 'qr:sm2', 'qr-streak', 'qr-last-active', 'qr:settings'],
    color: '#d92916',
    bg: '#fce8e6',
    border: '#f5c6c0',
  },
];

export default function SettingsPage() {
  const [confirming, setConfirming] = useState<ResetTarget | null>(null);
  const [done, setDone] = useState<ResetTarget | null>(null);

  function handleReset(option: ResetOption) {
    option.keys.forEach((key) => {
      try { localStorage.removeItem(key); } catch { /* ignore */ }
    });
    setConfirming(null);
    setDone(option.id);
    setTimeout(() => setDone(null), 3000);
    // Force a page reload so provider re-hydrates with cleared state
    window.location.reload();
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-extrabold text-[#21242c] mb-1">Settings</h1>
      <p className="text-sm text-[#626975] mb-8">Manage your local progress and reading preferences.</p>

      {/* Reset section */}
      <section className="mb-8">
        <h2 className="text-base font-bold text-[#21242c] mb-1">Reset Progress</h2>
        <p className="text-sm text-[#626975] mb-4">
          All data is stored locally in your browser. Use these options to reset specific parts.
        </p>

        <div className="space-y-3">
          {RESET_OPTIONS.map((opt) => (
            <div
              key={opt.id}
              className="bg-white border border-[#e4e6ea] rounded-lg p-4"
            >
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
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg text-white transition-colors"
                      style={{ backgroundColor: opt.color }}
                    >
                      Confirm reset
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirming(opt.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors shrink-0"
                    style={{ borderColor: opt.border, color: opt.color, backgroundColor: opt.bg }}
                  >
                    <Trash2 size={12} />
                    Reset
                  </button>
                )}
              </div>

              {confirming === opt.id && (
                <div
                  className="mt-3 flex items-start gap-2 p-3 rounded-lg text-xs"
                  style={{ backgroundColor: opt.bg, borderColor: opt.border, border: `1px solid ${opt.border}` }}
                >
                  <AlertTriangle size={13} className="shrink-0 mt-0.5" style={{ color: opt.color }} />
                  <span style={{ color: opt.color }}>
                    This cannot be undone. The page will reload to apply the reset.
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Storage info */}
      <section>
        <h2 className="text-base font-bold text-[#21242c] mb-1">About Your Data</h2>
        <div className="bg-[#f7f8fa] border border-[#e4e6ea] rounded-lg p-4 text-sm text-[#626975] space-y-2">
          <p>Progress is saved to your browser&apos;s <code className="text-xs bg-white border border-[#e4e6ea] px-1.5 py-0.5 rounded font-mono text-[#626975]">localStorage</code>. It is private to this device and browser — nothing is sent to a server.</p>
          <p>Clearing your browser data or using a different browser will reset all progress.</p>
          <div className="pt-2 border-t border-[#e4e6ea] space-y-1 font-mono text-xs">
            {STORAGE_KEYS.map((k) => (
              <p key={k} className="text-[#9299a5]">{k}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
