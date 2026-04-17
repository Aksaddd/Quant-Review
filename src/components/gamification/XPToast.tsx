'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Star } from 'lucide-react';
import { useXPStore } from '@/stores/useXPStore';

interface XPNotification {
  id: string;
  xp: number;
  detail?: string;
}

const SPRING = { type: 'spring' as const, stiffness: 380, damping: 28, mass: 0.9 };

export default function XPToast() {
  const [notifications, setNotifications] = useState<XPNotification[]>([]);
  const events = useXPStore((s) => s.events);

  const lastEventRef = useCallback(() => {
    return events.length > 0 ? events[events.length - 1] : null;
  }, [events]);

  useEffect(() => {
    const lastEvent = lastEventRef();
    if (!lastEvent) return;

    const id = `${lastEvent.timestamp}-${lastEvent.type}`;
    setNotifications((prev) => {
      if (prev.some((n) => n.id === id)) return prev;
      return [...prev, { id, xp: lastEvent.xp, detail: lastEvent.detail }];
    });

    const timer = setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 2500);

    return () => clearTimeout(timer);
  }, [lastEventRef]);

  return (
    <div className="fixed top-4 right-4 z-[60] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.96 }}
            transition={SPRING}
            className="flex items-center gap-2 px-4 py-2.5"
            style={{
              background: 'var(--material-thin-light)',
              backdropFilter: 'var(--material-blur)',
              WebkitBackdropFilter: 'var(--material-blur)',
              border: '0.5px solid rgba(0,0,0,0.06)',
              borderRadius: 14,
              boxShadow: 'var(--shadow-hud)',
              color: '#1d1d1f',
            }}
          >
            <Star size={16} style={{ color: '#ff9f0a' }} className="shrink-0" />
            <span className="text-[14px] font-semibold tracking-tight tabular-nums text-[#1d1d1f]">
              +{n.xp} XP
            </span>
            {n.detail && (
              <span className="text-[11px] text-[#6e6e73]">{n.detail}</span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
