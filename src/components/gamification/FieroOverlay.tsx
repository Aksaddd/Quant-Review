'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { Trophy, Sparkles } from 'lucide-react';
import { useXPStore } from '@/stores/useXPStore';

/** Generates random confetti particles */
function generateParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    color: ['#f59e0b', '#1865f2', '#1fab54', '#9059ff', '#f43f5e'][Math.floor(Math.random() * 5)],
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

  // Auto-dismiss fiero after 3 seconds
  useEffect(() => {
    if (!showFiero) return;
    const timer = setTimeout(clearFiero, 3000);
    return () => clearTimeout(timer);
  }, [showFiero, clearFiero]);

  // Auto-dismiss level-up after 4 seconds
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] pointer-events-none flex items-center justify-center"
          >
            {/* Confetti */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{
                  opacity: 1,
                  x: '50vw',
                  y: '50vh',
                  scale: 0,
                  rotate: 0,
                }}
                animate={{
                  opacity: [1, 1, 0],
                  x: `${p.x}vw`,
                  y: `${20 + Math.random() * 60}vh`,
                  scale: [0, 1.5, 1],
                  rotate: p.rotation,
                }}
                transition={{
                  duration: 1.5 + Math.random(),
                  delay: p.delay,
                  ease: 'easeOut',
                }}
                className="absolute rounded-sm"
                style={{
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                }}
              />
            ))}

            {/* Central trophy */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: [0, 1.3, 1], rotate: [-20, 10, 0] }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-xl shadow-amber-300/50">
                <Trophy size={40} className="text-white" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap"
              >
                <p className="text-lg font-extrabold text-amber-600 drop-shadow-sm">
                  Brilliant!
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
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="bg-white border-2 border-amber-300 rounded-2xl p-8 shadow-2xl shadow-amber-200/30 text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Sparkles size={40} className="text-amber-500 mx-auto mb-3" />
              </motion.div>
              <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">
                Level Up!
              </p>
              <p className="text-4xl font-extrabold text-[#21242c]">
                Level {lastLevelUp}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
