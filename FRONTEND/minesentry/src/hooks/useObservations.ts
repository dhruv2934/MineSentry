import { useState, useEffect, useCallback } from 'react';
import { Observation } from '../types';
import { observationService, ObservationFilters } from '../services/observationService';

export function useObservations(filters?: ObservationFilters) {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchObservations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await observationService.getObservations(filters);
      setObservations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch observations');
    } finally {
      setLoading(false);
    }
  }, [filters?.mine_id, filters?.severity, filters?.status, filters?.search]);

  useEffect(() => {
    fetchObservations();
  }, [fetchObservations]);

  return { observations, loading, error, refetch: fetchObservations };
}

export function useObservation(id?: string) {
  const [observation, setObservation] = useState<Observation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchObservation = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const data = await observationService.getObservationById(id);
      setObservation(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch observation');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchObservation();
  }, [fetchObservation]);

  return { observation, loading, error, refetch: fetchObservation };
}
