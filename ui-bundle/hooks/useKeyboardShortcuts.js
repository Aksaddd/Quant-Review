'use client';

/**
 * Keyboard-native shortcuts for the reading surface.
 *
 *   ⌘ / Ctrl + .        Toggle settings HUD
 *   ⌘ / Ctrl + K        Toggle command bar
 *   ⌘ / Ctrl + F        Toggle focus mode
 *   ⌘ / Ctrl + Shift + H  Highlight current selection (stub — wires to host)
 *   Esc                 Close any open chrome
 *
 * Usage:
 *   useKeyboardShortcuts({ onHighlight: () => { ... } });
 */
import { useEffect } from 'react';
import { useReadingSettings } from '../reading-settings/useReadingSettings';

export function useKeyboardShortcuts({ onHighlight } = {}) {
  const s = useReadingSettings();

  useEffect(() => {
    const handler = (e) => {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod && e.key !== 'Escape') return;

      // ⌘. — toggle settings HUD
      if (mod && e.key === '.') {
        e.preventDefault();
        s.togglePanel();
        return;
      }
      // ⌘K — toggle command bar
      if (mod && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        s.toggleCommandBar();
        return;
      }
      // ⌘F — toggle focus mode (intercepts browser find; use ⌘G for find if needed)
      if (mod && !e.shiftKey && (e.key === 'f' || e.key === 'F')) {
        e.preventDefault();
        s.toggleFocusMode();
        return;
      }
      // ⌘⇧H — highlight selection
      if (mod && e.shiftKey && (e.key === 'h' || e.key === 'H')) {
        e.preventDefault();
        onHighlight?.();
        return;
      }
      // Esc — close any open chrome
      if (e.key === 'Escape') {
        if (s.isPanelOpen)      s.closePanel();
        if (s.isCommandBarOpen) s.toggleCommandBar();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [s, onHighlight]);
}
