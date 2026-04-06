'use client';

import { useContext } from 'react';
import { ProgressContext } from '@/components/providers/ProgressProvider';

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider');
  return ctx;
}
