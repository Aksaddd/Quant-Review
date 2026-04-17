'use client';

/**
 * CommandBar — ⌘K spotlight-style palette.
 *
 * Floating translucent HUD centered near top-third of viewport.
 * Filters a command list by fuzzy substring; Enter runs, Esc/outside dismisses.
 *
 * Usage:
 *   <CommandBar commands={[
 *     { id: 'focus',    label: 'Toggle Focus Mode', run: () => s.toggleFocusMode() },
 *     { id: 'settings', label: 'Open Display Settings', run: () => s.openPanel() },
 *   ]} />
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { useReadingSettings, resolveTheme } from '../reading-settings/useReadingSettings';
import { motion as motionTokens } from '../design-system/designSystem';
import { useHaptics } from '../hooks/useHaptics';

export default function CommandBar({ commands = [] }) {
  const open = useReadingSettings((s) => s.isCommandBarOpen);
  const toggle = useReadingSettings((s) => s.toggleCommandBar);
  const theme = useReadingSettings((s) => s.theme);
  const isDark = resolveTheme(theme) === 'dark';
  const haptic = useHaptics();

  const [query, setQuery] = useState('');
  const [idx, setIdx] = useState(0);
  const inputRef = useRef(null);
  const rootRef = useRef(null);

  const defaultCommands = useMemo(() => {
    const s = useReadingSettings.getState();
    return [
      { id: 'focus',    label: 'Toggle Focus Mode',       hint: '⌘F', run: () => s.toggleFocusMode() },
      { id: 'settings', label: 'Open Display Settings',   hint: '⌘.', run: () => s.openPanel() },
      { id: 'theme-dark',  label: 'Switch to Dark Theme',  run: () => s.setTheme('dark') },
      { id: 'theme-light', label: 'Switch to Light Theme', run: () => s.setTheme('light') },
      { id: 'theme-sepia', label: 'Switch to Sepia Theme', run: () => s.setTheme('sepia') },
      { id: 'reset',    label: 'Reset Reading Settings',  run: () => s.resetSettings() },
    ];
  }, []);

  const allCommands = commands.length ? commands : defaultCommands;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allCommands;
    return allCommands.filter((c) => c.label.toLowerCase().includes(q));
  }, [query, allCommands]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setIdx(0);
      queueMicrotask(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        toggle();
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open, toggle]);

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx((i) => Math.min(i + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
    if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = filtered[idx];
      if (cmd) {
        haptic.tap();
        cmd.run();
        toggle();
      }
    }
    if (e.key === 'Escape') toggle();
  };

  const bg = isDark ? 'rgba(28, 28, 30, 0.82)' : 'rgba(255, 255, 255, 0.82)';
  const fg = isDark ? '#f2f2f7' : '#1d1d1f';
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: 'rgba(0,0,0,0.08)',
              backdropFilter: 'blur(2px)',
            }}
          />
          <motion.div
            ref={rootRef}
            role="dialog"
            aria-label="Command bar"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={motionTokens.spring.default}
            style={{
              position: 'fixed',
              top: '22%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 520, maxWidth: 'calc(100vw - 32px)',
              background: bg,
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              borderRadius: 16,
              border: `0.5px solid ${border}`,
              boxShadow: isDark
                ? '0 0 0 0.5px rgba(255,255,255,0.08), 0 20px 60px -20px rgba(0,0,0,0.7)'
                : '0 0 0 0.5px rgba(0,0,0,0.08), 0 20px 60px -20px rgba(0,0,0,0.3)',
              color: fg,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", system-ui, sans-serif',
              zIndex: 1001,
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderBottom: `0.5px solid ${border}` }}>
              <Search size={16} style={{ opacity: 0.45 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setIdx(0); }}
                onKeyDown={onKey}
                placeholder="Search commands"
                style={{
                  flex: 1, border: 'none', outline: 'none',
                  background: 'transparent', color: 'inherit',
                  fontSize: 15, fontWeight: 400,
                }}
              />
              <kbd style={{ fontSize: 10, opacity: 0.4, fontFamily: 'inherit' }}>esc</kbd>
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 6, maxHeight: 340, overflowY: 'auto' }}>
              {filtered.length === 0 && (
                <li style={{ padding: '16px 12px', opacity: 0.5, fontSize: 13, textAlign: 'center' }}>
                  No matching commands
                </li>
              )}
              {filtered.map((cmd, i) => (
                <li
                  key={cmd.id}
                  onMouseEnter={() => setIdx(i)}
                  onClick={() => { haptic.tap(); cmd.run(); toggle(); }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 12px', borderRadius: 10, cursor: 'pointer', fontSize: 14,
                    background: i === idx ? 'var(--eureka-accent-tint-strong)' : 'transparent',
                    color: i === idx ? 'var(--eureka-accent)' : 'inherit',
                    transition: 'background 120ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  <span>{cmd.label}</span>
                  {cmd.hint && <kbd style={{ opacity: 0.5, fontSize: 11 }}>{cmd.hint}</kbd>}
                </li>
              ))}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
