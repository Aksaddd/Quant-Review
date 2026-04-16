'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Coffee, Moon, Sun, X } from 'lucide-react';
import { useSessionStore } from '@/stores/useSessionStore';

const BREAK_THRESHOLD_MS = 45 * 60 * 1000; // 45 minutes

function getTimeOfDayMessage(): { icon: typeof Sun; message: string } {
  const hour = new Date().getHours();
  if (hour >= 21 || hour < 5) {
    return {
      icon: Moon,
      message: "Studying before bed? Your brain will replay these problems during sleep — optimal timing for consolidation.",
    };
  }
  if (hour < 12) {
    return {
      icon: Sun,
      message: "Great morning session. Your brain will consolidate this while you sleep tonight.",
    };
  }
  return {
    icon: Coffee,
    message: "Solid study session. Remember: your brain keeps learning even after you stop — take breaks to let it process.",
  };
}

export default function SessionNudge() {
  const sessionStart = useSessionStore((s) => s.sessionStart);
  const breakNudgeShown = useSessionStore((s) => s.breakNudgeShown);
  const showBreakNudge = useSessionStore((s) => s.showBreakNudge);
  const resetBreakNudge = useSessionStore((s) => s.resetBreakNudge);
  const startSession = useSessionStore((s) => s.startSession);

  const [showNudge, setShowNudge] = useState(false);

  // Start session tracking on mount
  useEffect(() => {
    if (!sessionStart) startSession();
  }, [sessionStart, startSession]);

  // Check elapsed time periodically
  useEffect(() => {
    if (!sessionStart || breakNudgeShown) return;

    const check = () => {
      const elapsed = Date.now() - new Date(sessionStart).getTime();
      if (elapsed >= BREAK_THRESHOLD_MS) {
        setShowNudge(true);
        showBreakNudge();
      }
    };

    const interval = setInterval(check, 60_000); // check every minute
    check(); // immediate check

    return () => clearInterval(interval);
  }, [sessionStart, breakNudgeShown, showBreakNudge]);

  const handleDismiss = () => {
    setShowNudge(false);
    // Reset so it can trigger again after another 45 min
    setTimeout(() => {
      resetBreakNudge();
      startSession();
    }, 5 * 60 * 1000); // reset after 5 more minutes
  };

  const { icon: TimeIcon, message } = getTimeOfDayMessage();

  return (
    <AnimatePresence>
      {showNudge && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-md"
        >
          <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-xl shadow-blue-100/30">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Coffee size={20} className="text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#21242c] mb-1">
                  Time for a break
                </p>
                <p className="text-xs text-[#626975] leading-relaxed mb-3">
                  You&apos;ve been studying for 45+ minutes. Your brain consolidates what you just learned during breaks. Take 10 minutes, then come back.
                </p>
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-blue-50 border border-blue-100">
                  <TimeIcon size={14} className="text-blue-500 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-blue-700 leading-relaxed">
                    {message}
                  </p>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="text-[#9299a5] hover:text-[#626975] transition-colors shrink-0"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
