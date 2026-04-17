'use client';

import { motion } from 'framer-motion';
import { Star, TrendingUp } from 'lucide-react';
import { useXPStore, getLevelProgress } from '@/stores/useXPStore';

export default function XPBar() {
  const totalXP = useXPStore((s) => s.totalXP);
  const { level, title, progress, xpForNextLevel, currentXP } = getLevelProgress(totalXP);
  const isMaxLevel = level >= 10;

  return (
    <div
      className="p-4"
      style={{
        background: '#ffffff',
        border: '0.5px solid rgba(0,0,0,0.06)',
        borderRadius: 14,
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 flex items-center justify-center"
            style={{
              borderRadius: 10,
              background: 'var(--eureka-accent)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
            }}
          >
            <span className="text-[11px] font-semibold text-white tabular-nums">{level}</span>
          </div>
          <div>
            <p className="text-[13px] font-semibold tracking-tight text-[#1d1d1f]">{title}</p>
            <p className="text-[10px] text-[#86868b] tabular-nums">Level {level}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Star size={14} style={{ color: '#ff9f0a' }} />
          <motion.span
            key={currentXP}
            initial={{ scale: 1.25 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 26, mass: 0.8 }}
            className="text-[16px] font-semibold tracking-tight tabular-nums text-[#1d1d1f]"
          >
            {currentXP.toLocaleString()}
          </motion.span>
          <span className="text-[11px] text-[#86868b]">XP</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative">
        <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'var(--eureka-accent)' }}
            initial={false}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        {!isMaxLevel && (
          <div className="flex items-center justify-between mt-1">
            <span className="text-[10px] text-[#86868b] tabular-nums">
              {Math.round(progress * 100)}%
            </span>
            <span className="text-[10px] text-[#86868b] flex items-center gap-1 tabular-nums">
              <TrendingUp size={9} />
              {xpForNextLevel - currentXP} XP to Level {level + 1}
            </span>
          </div>
        )}
        {isMaxLevel && (
          <p className="text-[10px] font-semibold mt-1 text-center tracking-tight" style={{ color: 'var(--eureka-accent)' }}>
            Max level reached
          </p>
        )}
      </div>
    </div>
  );
}
