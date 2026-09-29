"use client";

import { useEffect, useState } from "react";

const SCORE_CACHE_KEY = "poc_offline_score_queue";

export function useOfflineScoreCache() {
  const [cachedScores, setCachedScores] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(SCORE_CACHE_KEY);
    if (stored) {
      try {
        setCachedScores(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse cached scores", e);
      }
    }
  }, []);

  const cacheScore = (scoreInput: any) => {
    const updated = [...cachedScores, { ...scoreInput, cachedAt: new Date().toISOString() }];
    setCachedScores(updated);
    localStorage.setItem(SCORE_CACHE_KEY, JSON.stringify(updated));
  };

  const clearCache = () => {
    setCachedScores([]);
    localStorage.removeItem(SCORE_CACHE_KEY);
  };

  return { cachedScores, cacheScore, clearCache };
}
