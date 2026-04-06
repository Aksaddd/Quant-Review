'use client';

import { useState, useCallback, useEffect } from 'react';
import { loadCustomSets, saveCustomSets } from '@/lib/storage';
import type { CustomSet } from '@/lib/types';

export function useCustomSets() {
  const [sets, setSets] = useState<CustomSet[]>([]);

  useEffect(() => { setSets(loadCustomSets()); }, []);

  const persistUpdate = useCallback((updater: (prev: CustomSet[]) => CustomSet[]) => {
    setSets((prev) => {
      const next = updater(prev);
      saveCustomSets(next);
      return next;
    });
  }, []);

  /** Creates a new set and optionally seeds it with one card. Returns the new set id. */
  const createSet = useCallback((title: string, initialCardId?: string): string => {
    const id = `set-${Date.now()}`;
    const now = new Date().toISOString();
    persistUpdate((prev) => [
      ...prev,
      { id, title: title.trim(), cardIds: initialCardId ? [initialCardId] : [], createdAt: now, updatedAt: now },
    ]);
    return id;
  }, [persistUpdate]);

  const renameSet = useCallback((id: string, title: string) => {
    persistUpdate((prev) =>
      prev.map((s) => s.id === id ? { ...s, title: title.trim(), updatedAt: new Date().toISOString() } : s)
    );
  }, [persistUpdate]);

  const deleteSet = useCallback((id: string) => {
    persistUpdate((prev) => prev.filter((s) => s.id !== id));
  }, [persistUpdate]);

  const addCardToSet = useCallback((setId: string, cardId: string) => {
    persistUpdate((prev) =>
      prev.map((s) =>
        s.id !== setId || s.cardIds.includes(cardId) ? s
          : { ...s, cardIds: [...s.cardIds, cardId], updatedAt: new Date().toISOString() }
      )
    );
  }, [persistUpdate]);

  const removeCardFromSet = useCallback((setId: string, cardId: string) => {
    persistUpdate((prev) =>
      prev.map((s) =>
        s.id !== setId ? s
          : { ...s, cardIds: s.cardIds.filter((id) => id !== cardId), updatedAt: new Date().toISOString() }
      )
    );
  }, [persistUpdate]);

  const isCardInSet = useCallback((setId: string, cardId: string) =>
    sets.find((s) => s.id === setId)?.cardIds.includes(cardId) ?? false
  , [sets]);

  return { sets, createSet, renameSet, deleteSet, addCardToSet, removeCardFromSet, isCardInSet };
}
