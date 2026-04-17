'use client';

import { motion } from 'framer-motion';
import { Focus, X } from 'lucide-react';
import { useSessionStore } from '@/stores/useSessionStore';

/**
 * Floating button to toggle Focus Mode (distraction-free reading).
 * In focus mode: sidebar hidden, mobile nav hidden, top bar hidden.
 *
 * Apple treatment: translucent material pill, spring press, accent
 * hover tint. Keyboard shortcut (⌘F) wired in useKeyboardShortcuts.
 */
export default function FocusModeToggle() {
  const focusModeActive = useSessionStore((s) => s.focusModeActive);
  const toggleFocusMode = useSessionStore((s) => s.toggleFocusMode);

  const offStyle: React.CSSProperties = {
    background: 'var(--material-regular-light)',
    backdropFilter: 'var(--material-blur)',
    WebkitBackdropFilter: 'var(--material-blur)',
    border: '0.5px solid rgba(0,0,0,0.08)',
    color: '#1d1d1f',
    boxShadow: 'var(--shadow-hud)',
  };

  const onStyle: React.CSSProperties = {
    background: 'rgba(28,28,30,0.92)',
    backdropFilter: 'var(--material-blur)',
    WebkitBackdropFilter: 'var(--material-blur)',
    border: '0.5px solid rgba(255,255,255,0.1)',
    color: '#ffffff',
    boxShadow: 'var(--shadow-hud-dark)',
  };

  return (
    <motion.button
      onClick={toggleFocusMode}
      className={`fixed z-50 flex items-center gap-2 rounded-full ${
        focusModeActive
          ? 'bottom-6 right-6 px-4 py-2.5'
          : 'bottom-24 lg:bottom-6 right-6 px-3.5 py-2.5'
      }`}
      style={focusModeActive ? onStyle : offStyle}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.8 }}
      title={focusModeActive ? 'Exit focus mode (⌘F)' : 'Enter focus mode (⌘F)'}
      aria-pressed={focusModeActive}
    >
      {focusModeActive ? (
        <>
          <X size={16} />
          <span className="text-xs font-semibold tracking-tight">Exit focus</span>
        </>
      ) : (
        <>
          <Focus size={16} />
          <span className="text-xs font-semibold tracking-tight hidden sm:inline">Focus</span>
        </>
      )}
    </motion.button>
  );
}
