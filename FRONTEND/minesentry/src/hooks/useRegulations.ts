import { useState, useEffect, useCallback } from 'react';
import { Regulation } from '../types';
import { regulationService } from '../services/regulationService';

export function useRegulations(searchQuery?: string) {
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRegulations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = searchQuery
        ? await regulationService.searchRegulations(searchQuery)
        : await regulationService.getRegulations();
      setRegulations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch regulations');
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchRegulations();
  }, [fetchRegulations]);

  return { regulations, loading, error, refetch: fetchRegulations };
}

export function useRegulation(id?: string) {
  const [regulation, setRegulation] = useState<Regulation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRegulation = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const data = await regulationService.getRegulationById(id);
      setRegulation(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch regulation');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRegulation();
  }, [fetchRegulation]);

  return { regulation, loading, error, refetch: fetchRegulation };
}
