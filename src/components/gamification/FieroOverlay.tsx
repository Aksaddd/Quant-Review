'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { Trophy, Sparkles } from 'lucide-react';
import { useXPStore } from '@/stores/useXPStore';

/** Generates random confetti particles */
function generateParticles(count: number) {
  // iOS-hue palette: cleaner + more harmonious than the old rainbow
  const palette = ['#0A84FF', '#5E5CE6', '#BF5AF2', '#FF9F0A', '#30D158', '#FF375F'];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    color: palette[Math.floor(Math.random() * palette.length)],
    size: 4 + Math.random() * 6,
    rotation: Math.random() * 360,
  }));
}

export default function FieroOverlay() {
  const fieroTriggeredAt = useXPStore((s) => s.fieroTriggeredAt);
  const clearFiero = useXPStore((s) => s.clearFiero);
  const lastLevelUp = useXPStore((s) => s.lastLevelUp);
  const clearLastLevelUp = useXPStore((s) => s.clearLastLevelUp);

  const showFiero = !!fieroTriggeredAt;
  const showLevelUp = !!lastLevelUp;
  const particles = generateParticles(24);

  useEffect(() => {
    if (!showFiero) return;
    const timer = setTimeout(clearFiero, 3000);
    return () => clearTimeout(timer);
  }, [showFiero, clearFiero]);

  useEffect(() => {
    if (!showLevelUp) return;
    const timer = setTimeout(clearLastLevelUp, 4000);
    return () => clearTimeout(timer);
  }, [showLevelUp, clearLastLevelUp]);

  return (
    <>
      {/* Fiero celebration */}
      <AnimatePresence>
        {showFiero && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] pointer-events-none flex items-center justify-center"
          >
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 1, x: '50vw', y: '50vh', scale: 0, rotate: 0 }}
                animate={{
                  opacity: [1, 1, 0],
                  x: `${p.x}vw`,
                  y: `${20 + Math.random() * 60}vh`,
                  scale: [0, 1.4, 1],
                  rotate: p.rotation,
                }}
                transition={{
                  duration: 1.5 + Math.random(),
                  delay: p.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute rounded-sm"
                style={{
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                }}
              />
            ))}

            {/* Central trophy — bouncy spring */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 14, mass: 0.9 }}
              className="relative"
            >
              <div
                className="w-24 h-24 flex items-center justify-center"
                style={{
                  borderRadius: 9999,
                  background: 'var(--eureka-accent)',
                  boxShadow: '0 12px 40px -8px var(--eureka-accent-tint-strong), 0 0 0 0.5px rgba(0,0,0,0.08)',
                }}
              >
                <Trophy size={40} className="text-white" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap"
              >
                <p className="text-[17px] font-semibold tracking-tight" style={{ color: 'var(--eureka-accent)' }}>
                  Brilliant
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level up overlay */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] pointer-events-none flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}
              className="p-8 text-center"
              style={{
                background: 'var(--material-regular-light)',
                backdropFilter: 'var(--material-blur-strong)',
                WebkitBackdropFilter: 'var(--material-blur-strong)',
                border: '0.5px solid var(--eureka-accent-tint-strong)',
                borderRadius: 24,
                boxShadow: '0 20px 60px -20px var(--eureka-accent-tint-strong), 0 0 0 0.5px rgba(0,0,0,0.08)',
              }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <Sparkles size={40} style={{ color: 'var(--eureka-accent)' }} className="mx-auto mb-3" />
              </motion.div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-1" style={{ color: 'var(--eureka-accent)' }}>
                Level Up
              </p>
              <p className="text-[40px] font-semibold tracking-[-0.02em] text-[#1d1d1f] tabular-nums">
                Level {lastLevelUp}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
