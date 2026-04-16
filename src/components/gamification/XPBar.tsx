'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Star, TrendingUp } from 'lucide-react';
import { useXPStore, getLevelProgress } from '@/stores/useXPStore';

export default function XPBar() {
  const totalXP = useXPStore((s) => s.totalXP);
  const { level, title, progress, xpForNextLevel, currentXP } = getLevelProgress(totalXP);
  const isMaxLevel = level >= 10;

  return (
    <div className="bg-white border border-[#e4e6ea] rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
            <span className="text-xs font-extrabold text-white">{level}</span>
          </div>
          <div>
            <p className="text-sm font-bold text-[#21242c]">{title}</p>
            <p className="text-[10px] text-[#9299a5]">Level {level}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Star size={14} className="text-amber-500" />
          <motion.span
            key={currentXP}
            initial={{ scale: 1.3, color: '#f59e0b' }}
            animate={{ scale: 1, color: '#21242c' }}
            transition={{ duration: 0.4 }}
            className="text-lg font-extrabold"
          >
            {currentXP.toLocaleString()}
          </motion.span>
          <span className="text-xs text-[#9299a5]">XP</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative">
        <div className="h-2.5 bg-[#f0f1f3] rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500"
            initial={false}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
        {!isMaxLevel && (
          <div className="flex items-center justify-between mt-1">
            <span className="text-[10px] text-[#9299a5]">
              {Math.round(progress * 100)}%
            </span>
            <span className="text-[10px] text-[#9299a5] flex items-center gap-1">
              <TrendingUp size={9} />
              {xpForNextLevel - currentXP} XP to Level {level + 1}
            </span>
          </div>
        )}
        {isMaxLevel && (
          <p className="text-[10px] text-amber-600 font-semibold mt-1 text-center">
            Max level reached!
          </p>
        )}
      </div>
    </div>
  );
}
