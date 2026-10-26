import { Observation } from '../types';
import { mockObservations } from '../data/observations';
import { delay } from './apiClient';

export interface ObservationFilters {
  mine_id?: string;
  severity?: string;
  status?: string;
  search?: string;
}

class ObservationService {
  async getObservations(filters?: ObservationFilters): Promise<Observation[]> {
    await delay();
    let result = [...mockObservations];

    if (filters) {
      if (filters.mine_id && filters.mine_id !== 'all') {
        result = result.filter((o) => o.mine_id === filters.mine_id);
      }
      if (filters.severity && filters.severity !== 'all') {
        result = result.filter((o) => o.severity.toLowerCase() === filters.severity?.toLowerCase());
      }
      if (filters.status && filters.status !== 'all') {
        result = result.filter((o) => o.status.toLowerCase() === filters.status?.toLowerCase());
      }
      if (filters.search) {
        const query = filters.search.toLowerCase();
        result = result.filter(
          (o) =>
            o.id.toLowerCase().includes(query) ||
            o.title.toLowerCase().includes(query) ||
            o.description.toLowerCase().includes(query) ||
            o.mine_name.toLowerCase().includes(query) ||
            o.detected_hazard.toLowerCase().includes(query)
        );
      }
    }

    return Promise.resolve(result);
  }

  async getObservationById(id: string): Promise<Observation | null> {
    await delay();
    const item = mockObservations.find((o) => o.id === id);
    return Promise.resolve(item ? { ...item } : null);
  }
}

export const observationService = new ObservationService();
