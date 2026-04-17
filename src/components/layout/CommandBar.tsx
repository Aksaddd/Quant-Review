'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { useReadingSettingsStore, ACCENT_HUES, type AccentKey } from '@/stores/useReadingSettingsStore';
import { useSessionStore } from '@/stores/useSessionStore';

/**
 * Apple spotlight-style command palette.
 *
 * Opened by ⌘K (via useKeyboardShortcuts dispatching 'eureka:toggle-command-bar'),
 * dismissed by Escape, outside-tap, or Enter on a command.
 */
interface Command {
  id: string;
  label: string;
  hint?: string;
  run: () => void;
  group?: string;
}

const SPRING = { type: 'spring' as const, stiffness: 380, damping: 32, mass: 0.9 };

export default function CommandBar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const toggleFocus     = useReadingSettingsStore((s) => s.toggleFocusMode);
  const setTheme        = useReadingSettingsStore((s) => s.setTheme);
  const setAccent       = useReadingSettingsStore((s) => s.setAccent);
  const reset           = useReadingSettingsStore((s) => s.reset);
  const toggleSessionFocus = useSessionStore((s) => s.toggleFocusMode);

  useEffect(() => {
    const onToggle = () => setOpen((v) => !v);
    const onEscape = () => setOpen(false);
    window.addEventListener('eureka:toggle-command-bar', onToggle);
    window.addEventListener('eureka:escape', onEscape);
    return () => {
      window.removeEventListener('eureka:toggle-command-bar', onToggle);
      window.removeEventListener('eureka:escape', onEscape);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setIdx(0);
      queueMicrotask(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const commands: Command[] = useMemo(() => {
    const accentCommands: Command[] = (Object.keys(ACCENT_HUES) as AccentKey[]).map((key) => ({
      id: `accent-${key}`,
      label: `Accent: ${ACCENT_HUES[key].label}`,
      run: () => setAccent(key),
      group: 'Accent',
    }));
    return [
      { id: 'focus',     label: 'Toggle Focus Mode',     hint: '⌘F', run: () => { toggleFocus(); toggleSessionFocus(); }, group: 'View' },
      { id: 'theme-lt',  label: 'Switch to Light Theme', run: () => setTheme('light'), group: 'Theme' },
      { id: 'theme-dk',  label: 'Switch to Dark Theme',  run: () => setTheme('dark'),  group: 'Theme' },
      { id: 'theme-sp',  label: 'Switch to Sepia Theme', run: () => setTheme('sepia'), group: 'Theme' },
      { id: 'reset',     label: 'Reset Reading Settings', run: reset, group: 'View' },
      { id: 'nav-dash',  label: 'Go to Dashboard',       run: () => router.push('/dashboard'),  group: 'Navigate' },
      { id: 'nav-flash', label: 'Go to Flashcards',      run: () => router.push('/flashcards'), group: 'Navigate' },
      { id: 'nav-c1',    label: 'Go to Chapter 1',       run: () => router.push('/read/chapter-1'), group: 'Navigate' },
      { id: 'nav-c2',    label: 'Go to Chapter 2',       run: () => router.push('/read/chapter-2'), group: 'Navigate' },
      ...accentCommands,
    ];
  }, [router, toggleFocus, toggleSessionFocus, setTheme, setAccent, reset]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q));
  }, [query, commands]);

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx((i) => Math.min(i + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
    if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = filtered[idx];
      if (cmd) { cmd.run(); setOpen(false); }
    }
    if (e.key === 'Escape') setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[999]"
            style={{ background: 'rgba(0,0,0,0.12)', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)' }}
          />
          <motion.div
            ref={rootRef}
            role="dialog"
            aria-label="Command bar"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={SPRING}
            className="fixed left-1/2 top-[22%] w-[520px] max-w-[calc(100vw-32px)] -translate-x-1/2 overflow-hidden z-[1001]"
            style={{
              background: 'var(--material-regular-light)',
              backdropFilter: 'var(--material-blur-strong)',
              WebkitBackdropFilter: 'var(--material-blur-strong)',
              border: '0.5px solid rgba(0,0,0,0.06)',
              borderRadius: 16,
              boxShadow: 'var(--shadow-hud)',
              color: '#1d1d1f',
            }}
          >
            <div className="flex items-center gap-2.5 px-4 py-3.5" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
              <Search size={16} className="opacity-50" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setIdx(0); }}
                onKeyDown={onKey}
                placeholder="Search commands"
                className="flex-1 bg-transparent outline-none border-none text-[15px] font-normal tracking-tight"
                style={{ color: 'inherit' }}
              />
              <kbd className="text-[10px] opacity-40">esc</kbd>
            </div>
            <ul className="list-none m-0 p-1.5 max-h-[340px] overflow-y-auto">
              {filtered.length === 0 && (
                <li className="px-3 py-4 text-[13px] opacity-50 text-center">No matching commands</li>
              )}
              {filtered.map((cmd, i) => (
                <li
                  key={cmd.id}
                  onMouseEnter={() => setIdx(i)}
                  onClick={() => { cmd.run(); setOpen(false); }}
                  className="flex items-center justify-between px-3 py-2.5 text-[13px] tracking-tight cursor-pointer transition-colors duration-150"
                  style={{
                    borderRadius: 10,
                    background: i === idx ? 'var(--eureka-accent-tint-strong)' : 'transparent',
                    color: i === idx ? 'var(--eureka-accent)' : 'inherit',
                    transitionTimingFunction: 'var(--ease-standard)',
                  }}
                >
                  <span>{cmd.label}</span>
                  {cmd.hint && <kbd className="opacity-50 text-[11px]">{cmd.hint}</kbd>}
                </li>
              ))}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
