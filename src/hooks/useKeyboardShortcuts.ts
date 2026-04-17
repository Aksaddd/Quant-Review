'use client';

/**
 * Keyboard-native shortcuts for the reading surface.
 *
 *   ⌘/Ctrl + .        Toggle reading settings HUD  (host-wired)
 *   ⌘/Ctrl + K        Toggle command bar
 *   ⌘/Ctrl + F        Toggle focus mode
 *   ⌘/Ctrl + Shift H  Highlight selection (caller-provided)
 *   Esc               Close any open chrome
 */
import { useEffect } from 'react';
import { useReadingSettingsStore } from '@/stores/useReadingSettingsStore';
import { useSessionStore } from '@/stores/useSessionStore';

interface Options {
  onHighlight?: () => void;
  onOpenSettings?: () => void;
}

export function useKeyboardShortcuts({ onHighlight, onOpenSettings }: Options = {}) {
  const toggleFocusMode = useReadingSettingsStore((s) => s.toggleFocusMode);
  // Session's focus mode is what the AppShell actually hides chrome on, so
  // toggle both the reading-settings focusMode and session focusModeActive
  // for a unified ⌘F behavior.
  const toggleSessionFocus = useSessionStore((s) => s.toggleFocusMode);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod && e.key !== 'Escape') return;

      if (mod && e.key === '.') {
        e.preventDefault();
        onOpenSettings?.();
        return;
      }
      if (mod && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('eureka:toggle-command-bar'));
        return;
      }
      if (mod && !e.shiftKey && (e.key === 'f' || e.key === 'F')) {
        e.preventDefault();
        toggleFocusMode();
        toggleSessionFocus();
        return;
      }
      if (mod && e.shiftKey && (e.key === 'h' || e.key === 'H')) {
        e.preventDefault();
        onHighlight?.();
        return;
      }
      if (e.key === 'Escape') {
        window.dispatchEvent(new CustomEvent('eureka:escape'));
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onHighlight, onOpenSettings, toggleFocusMode, toggleSessionFocus]);
}
