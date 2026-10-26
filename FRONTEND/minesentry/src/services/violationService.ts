import { Violation } from '../types';
import { mockViolations } from '../data/violations';
import { delay } from './apiClient';

export interface ViolationFilters {
  mine_id?: string;
  severity?: string;
  status?: string;
  search?: string;
}

class ViolationService {
  async getViolations(filters?: ViolationFilters): Promise<Violation[]> {
    await delay();
    let result = [...mockViolations];

    if (filters) {
      if (filters.mine_id && filters.mine_id !== 'all') {
        result = result.filter((v) => v.mine_id === filters.mine_id);
      }
      if (filters.severity && filters.severity !== 'all') {
        result = result.filter((v) => v.severity.toLowerCase() === filters.severity?.toLowerCase());
      }
      if (filters.status && filters.status !== 'all') {
        result = result.filter((v) => v.status.toLowerCase() === filters.status?.toLowerCase());
      }
      if (filters.search) {
        const query = filters.search.toLowerCase();
        result = result.filter(
          (v) =>
            v.id.toLowerCase().includes(query) ||
            v.title.toLowerCase().includes(query) ||
            v.regulation_clause.toLowerCase().includes(query) ||
            v.mine_name.toLowerCase().includes(query)
        );
      }
    }

    return Promise.resolve(result);
  }

  async getViolationById(id: string): Promise<Violation | null> {
    await delay();
    const item = mockViolations.find((v) => v.id === id);
    return Promise.resolve(item ? { ...item } : null);
  }
}

export const violationService = new ViolationService();
