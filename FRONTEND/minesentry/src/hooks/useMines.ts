
import {
  useState,
  useEffect,
  useCallback
} from 'react';

import type { Mine } from '../types';
import { mineService } from '../services/mineService';

export function useMines() {
  const [mines, setMines] = useState<Mine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMines = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await mineService.getMines();
      setMines(data);

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to fetch mines'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchMines();
  }, [fetchMines]);

  return {
    mines,
    loading,
    error,
    refetch: fetchMines
  };
}

export function useMine(id?: string) {
  const [mine, setMine] = useState<Mine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMine = useCallback(async () => {
    if (!id || !/^[1-9]\d*$/.test(id)) {
      setMine(null);
      setError('Invalid mine ID');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setMine(null);

      const data = await mineService.getMineById(
        Number(id)
      );

      setMine(data);
    } catch (err) {
      setMine(null);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to fetch mine details'
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void fetchMine();
  }, [fetchMine]);

  return {
    mine,
    loading,
    error,
    refetch: fetchMine
  };
}
