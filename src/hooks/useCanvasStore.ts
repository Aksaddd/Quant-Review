'use client';

import { useCallback } from 'react';
import type { CanvasSnapshot } from '@/components/reader/ApproachCanvas';

const STORAGE_KEY_PREFIX = 'qr_canvas_';

/**
 * Hook to save and load Excalidraw canvas snapshots per problem.
 * Uses localStorage for now — swap to Supabase when user auth is wired up.
 */
export function useCanvasStore() {
  const saveCanvas = useCallback((problemId: string, snapshot: CanvasSnapshot) => {
    try {
      const key = `${STORAGE_KEY_PREFIX}${problemId}`;
      // Only store elements and files — appState contains transient UI state
      const data = {
        elements: snapshot.elements,
        files: snapshot.files,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save canvas snapshot:', e);
    }
  }, []);

  const loadCanvas = useCallback((problemId: string): CanvasSnapshot | null => {
    try {
      const key = `${STORAGE_KEY_PREFIX}${problemId}`;
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const data = JSON.parse(raw);
      return {
        elements: data.elements || [],
        appState: {},
        files: data.files || {},
      };
    } catch (e) {
      console.warn('Failed to load canvas snapshot:', e);
      return null;
    }
  }, []);

  const clearCanvas = useCallback((problemId: string) => {
    try {
      const key = `${STORAGE_KEY_PREFIX}${problemId}`;
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('Failed to clear canvas snapshot:', e);
    }
  }, []);

  return { saveCanvas, loadCanvas, clearCanvas };
}
