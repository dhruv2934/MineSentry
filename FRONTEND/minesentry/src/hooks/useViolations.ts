import { useState, useEffect, useCallback } from 'react';
import { Violation } from '../types';
import { violationService, ViolationFilters } from '../services/violationService';

export function useViolations(filters?: ViolationFilters) {
  const [violations, setViolations] = useState<Violation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchViolations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await violationService.getViolations(filters);
      setViolations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch violations');
    } finally {
      setLoading(false);
    }
  }, [filters?.mine_id, filters?.severity, filters?.status, filters?.search]);

  useEffect(() => {
    fetchViolations();
  }, [fetchViolations]);

  return { violations, loading, error, refetch: fetchViolations };
}

export function useViolation(id?: string) {
  const [violation, setViolation] = useState<Violation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchViolation = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const data = await violationService.getViolationById(id);
      setViolation(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch violation');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchViolation();
  }, [fetchViolation]);

  return { violation, loading, error, refetch: fetchViolation };
}
