import { CorrectiveAction, ActionStatus } from '../types';
import { mockCorrectiveActions } from '../data/correctiveActions';
import { delay } from './apiClient';

export interface ActionFilters {
  mine_id?: string;
  status?: string;
  priority?: string;
  ai_recommended?: boolean;
  search?: string;
}

class CorrectiveActionService {
  async getCorrectiveActions(filters?: ActionFilters): Promise<CorrectiveAction[]> {
    await delay();
    let result = [...mockCorrectiveActions];

    if (filters) {
      if (filters.mine_id && filters.mine_id !== 'all') {
        result = result.filter((a) => a.mine_id === filters.mine_id);
      }
      if (filters.status && filters.status !== 'all') {
        result = result.filter((a) => a.status === filters.status);
      }
      if (filters.priority && filters.priority !== 'all') {
        result = result.filter((a) => a.priority === filters.priority);
      }
      if (filters.ai_recommended !== undefined) {
        result = result.filter((a) => a.ai_recommended === filters.ai_recommended);
      }
      if (filters.search) {
        const query = filters.search.toLowerCase();
        result = result.filter(
          (a) =>
            a.id.toLowerCase().includes(query) ||
            a.title.toLowerCase().includes(query) ||
            a.description.toLowerCase().includes(query) ||
            a.assigned_engineer.toLowerCase().includes(query) ||
            a.mine_name.toLowerCase().includes(query)
        );
      }
    }

    return Promise.resolve(result);
  }

  async getActionById(id: string): Promise<CorrectiveAction | null> {
    await delay();
    const item = mockCorrectiveActions.find((a) => a.id === id);
    return Promise.resolve(item ? { ...item } : null);
  }

  async approveAction(id: string, comments: string = 'Approved by Shift Safety Officer'): Promise<CorrectiveAction | null> {
    await delay(300);
    const item = mockCorrectiveActions.find((a) => a.id === id);
    if (item) {
      item.status = 'approved';
      item.updated_at = new Date().toISOString();
      item.approval_details = {
        approved_by: 'Authorized Safety Engineer (You)',
        approval_timestamp: new Date().toISOString(),
        comments
      };
      return Promise.resolve({ ...item });
    }
    return Promise.resolve(null);
  }

  async rejectAction(id: string, reason: string): Promise<CorrectiveAction | null> {
    await delay(300);
    const item = mockCorrectiveActions.find((a) => a.id === id);
    if (item) {
      item.status = 'rejected';
      item.updated_at = new Date().toISOString();
      item.rejection_details = {
        rejected_by: 'Authorized Safety Engineer (You)',
        rejection_reason: reason
      };
      return Promise.resolve({ ...item });
    }
    return Promise.resolve(null);
  }

  async updateActionStatus(id: string, status: ActionStatus): Promise<CorrectiveAction | null> {
    await delay(200);
    const item = mockCorrectiveActions.find((a) => a.id === id);
    if (item) {
      item.status = status;
      item.updated_at = new Date().toISOString();
      return Promise.resolve({ ...item });
    }
    return Promise.resolve(null);
  }
}

export const correctiveActionService = new CorrectiveActionService();
