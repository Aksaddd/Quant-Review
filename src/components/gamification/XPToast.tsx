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

export default function XPToast() {
  const [notifications, setNotifications] = useState<XPNotification[]>([]);
  const events = useXPStore((s) => s.events);

  // Watch for new XP events
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
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 shadow-lg shadow-amber-100/50"
          >
            <Star size={16} className="text-amber-500 shrink-0" />
            <span className="text-sm font-extrabold text-amber-700">
              +{n.xp} XP
            </span>
            {n.detail && (
              <span className="text-xs text-amber-600">{n.detail}</span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
