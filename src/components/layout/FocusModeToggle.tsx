'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Focus, X } from 'lucide-react';
import { useSessionStore } from '@/stores/useSessionStore';

/**
 * Floating button to toggle Focus Mode (distraction-free reading).
 * In focus mode: sidebar hidden, mobile nav hidden, top bar hidden.
 */
export default function FocusModeToggle() {
  const focusModeActive = useSessionStore((s) => s.focusModeActive);
  const toggleFocusMode = useSessionStore((s) => s.toggleFocusMode);

  return (
    <motion.button
      onClick={toggleFocusMode}
      className={`fixed z-50 flex items-center gap-2 rounded-full shadow-lg transition-colors ${
        focusModeActive
          ? 'bottom-6 right-6 px-4 py-2.5 bg-[#21242c] text-white hover:bg-[#363a42]'
          : 'bottom-24 lg:bottom-6 right-6 px-3 py-2.5 bg-white border border-[#e4e6ea] text-[#626975] hover:border-[#1865f2] hover:text-[#1865f2]'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={focusModeActive ? 'Exit focus mode' : 'Enter focus mode'}
    >
      {focusModeActive ? (
        <>
          <X size={16} />
          <span className="text-xs font-semibold">Exit focus</span>
        </>
      ) : (
        <>
          <Focus size={16} />
          <span className="text-xs font-semibold hidden sm:inline">Focus</span>
        </>
      )}
    </motion.button>
  );
}
