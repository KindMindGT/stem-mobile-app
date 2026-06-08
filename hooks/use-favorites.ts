import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

// Key format: favorites_<userId>
// Using a fixed demo user for now; swap for real user ID when auth is implemented.
const DEMO_USER = 'mateo.ramirez@apex.gt';

function storageKey(userId: string) {
  return `favorites_${userId}`;
}

export function useFavorites(userId: string = DEMO_USER) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  // Load persisted favorites on mount
  useEffect(() => {
    AsyncStorage.getItem(storageKey(userId))
      .then((raw) => {
        if (raw) {
          const ids: string[] = JSON.parse(raw);
          setFavorites(new Set(ids));
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [userId]);

  // Persist whenever favorites change (after initial load)
  const persist = useCallback(
    (next: Set<string>) => {
      AsyncStorage.setItem(storageKey(userId), JSON.stringify([...next])).catch(() => {});
    },
    [userId],
  );

  const toggle = useCallback(
    (productId: string) => {
      setFavorites((prev) => {
        const next = new Set(prev);
        if (next.has(productId)) {
          next.delete(productId);
        } else {
          next.add(productId);
        }
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const isFavorite = useCallback((productId: string) => favorites.has(productId), [favorites]);

  return { favorites, isFavorite, toggle, loaded };
}
