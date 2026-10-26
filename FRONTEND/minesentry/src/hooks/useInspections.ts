import { useState, useEffect, useCallback } from 'react';
import { Inspection } from '../types';
import { inspectionService, InspectionFilters } from '../services/inspectionService';

export function useInspections(filters?: InspectionFilters) {
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInspections = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await inspectionService.getInspections(filters);
      setInspections(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch inspections');
    } finally {
      setLoading(false);
    }
  }, [filters?.mine_id, filters?.status, filters?.type, filters?.search]);

  useEffect(() => {
    fetchInspections();
  }, [fetchInspections]);

  return { inspections, loading, error, refetch: fetchInspections };
}

export function useInspection(id?: string) {
  const [inspection, setInspection] = useState<Inspection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInspection = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const data = await inspectionService.getInspectionById(id);
      setInspection(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch inspection');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchInspection();
  }, [fetchInspection]);

  return { inspection, loading, error, refetch: fetchInspection };
}
