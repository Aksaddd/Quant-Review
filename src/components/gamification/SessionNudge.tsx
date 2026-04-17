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

const SPRING = { type: 'spring' as const, stiffness: 380, damping: 28, mass: 0.9 };

export default function SessionNudge() {
  const sessionStart = useSessionStore((s) => s.sessionStart);
  const breakNudgeShown = useSessionStore((s) => s.breakNudgeShown);
  const showBreakNudge = useSessionStore((s) => s.showBreakNudge);
  const resetBreakNudge = useSessionStore((s) => s.resetBreakNudge);
  const startSession = useSessionStore((s) => s.startSession);

  const [showNudge, setShowNudge] = useState(false);

  useEffect(() => {
    if (!sessionStart) startSession();
  }, [sessionStart, startSession]);

  useEffect(() => {
    if (!sessionStart || breakNudgeShown) return;
    const check = () => {
      const elapsed = Date.now() - new Date(sessionStart).getTime();
      if (elapsed >= BREAK_THRESHOLD_MS) {
        setShowNudge(true);
        showBreakNudge();
      }
    };
    const interval = setInterval(check, 60_000);
    check();
    return () => clearInterval(interval);
  }, [sessionStart, breakNudgeShown, showBreakNudge]);

  const handleDismiss = () => {
    setShowNudge(false);
    setTimeout(() => {
      resetBreakNudge();
      startSession();
    }, 5 * 60 * 1000);
  };

  const { icon: TimeIcon, message } = getTimeOfDayMessage();

  return (
    <AnimatePresence>
      {showNudge && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={SPRING}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-md"
        >
          <div
            className="p-5"
            style={{
              background: 'var(--material-regular-light)',
              backdropFilter: 'var(--material-blur-strong)',
              WebkitBackdropFilter: 'var(--material-blur-strong)',
              border: '0.5px solid rgba(0,0,0,0.06)',
              borderRadius: 18,
              boxShadow: 'var(--shadow-hud)',
              color: '#1d1d1f',
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 flex items-center justify-center shrink-0"
                style={{
                  borderRadius: 12,
                  background: 'var(--eureka-accent-tint)',
                  border: '0.5px solid rgba(0,0,0,0.04)',
                }}
              >
                <Coffee size={20} style={{ color: 'var(--eureka-accent)' }} />
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-semibold tracking-tight text-[#1d1d1f] mb-1">
                  Time for a break
                </p>
                <p className="text-[12px] text-[#6e6e73] leading-relaxed mb-3">
                  You&apos;ve been studying for 45+ minutes. Your brain consolidates what you just learned during breaks. Take 10 minutes, then come back.
                </p>
                <div
                  className="flex items-start gap-2 p-2.5"
                  style={{
                    borderRadius: 10,
                    background: 'var(--eureka-accent-tint)',
                    border: '0.5px solid var(--eureka-accent-tint-strong)',
                  }}
                >
                  <TimeIcon size={14} style={{ color: 'var(--eureka-accent)' }} className="mt-0.5 shrink-0" />
                  <p className="text-[11px] leading-relaxed" style={{ color: 'var(--eureka-accent)' }}>
                    {message}
                  </p>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="text-[#86868b] hover:text-[#1d1d1f] transition-colors duration-200 shrink-0"
                style={{ transitionTimingFunction: 'var(--ease-standard)' }}
                aria-label="Dismiss"
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
