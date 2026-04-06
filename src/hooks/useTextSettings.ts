'use client';

import { useContext } from 'react';
import { TextSettingsContext } from '@/components/providers/TextSettingsProvider';

export function useTextSettings() {
  const ctx = useContext(TextSettingsContext);
  if (!ctx) throw new Error('useTextSettings must be used inside TextSettingsProvider');
  return ctx;
}
