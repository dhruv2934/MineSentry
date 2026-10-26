import { useState, useEffect, useCallback } from 'react';
import { CorrectiveAction, ActionStatus } from '../types';
import { correctiveActionService, ActionFilters } from '../services/correctiveActionService';

export function useCorrectiveActions(filters?: ActionFilters) {
  const [actions, setActions] = useState<CorrectiveAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await correctiveActionService.getCorrectiveActions(filters);
      setActions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch corrective actions');
    } finally {
      setLoading(false);
    }
  }, [filters?.mine_id, filters?.status, filters?.priority, filters?.ai_recommended, filters?.search]);

  useEffect(() => {
    fetchActions();
  }, [fetchActions]);

  const approve = async (id: string, comments?: string) => {
    const updated = await correctiveActionService.approveAction(id, comments);
    if (updated) {
      setActions((prev) => prev.map((a) => (a.id === id ? updated : a)));
    }
    return updated;
  };

  const reject = async (id: string, reason: string) => {
    const updated = await correctiveActionService.rejectAction(id, reason);
    if (updated) {
      setActions((prev) => prev.map((a) => (a.id === id ? updated : a)));
    }
    return updated;
  };

  const updateStatus = async (id: string, status: ActionStatus) => {
    const updated = await correctiveActionService.updateActionStatus(id, status);
    if (updated) {
      setActions((prev) => prev.map((a) => (a.id === id ? updated : a)));
    }
    return updated;
  };

  return { actions, loading, error, refetch: fetchActions, approve, reject, updateStatus };
}

export function useCorrectiveAction(id?: string) {
  const [action, setAction] = useState<CorrectiveAction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAction = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const data = await correctiveActionService.getActionById(id);
      setAction(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch corrective action');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAction();
  }, [fetchAction]);

  return { action, loading, error, refetch: fetchAction };
}
