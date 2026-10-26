import { Regulation } from '../types';
import { mockRegulations } from '../data/regulations';
import { delay } from './apiClient';

class RegulationService {
  async getRegulations(): Promise<Regulation[]> {
    await delay();
    return Promise.resolve([...mockRegulations]);
  }

  async getRegulationById(id: string): Promise<Regulation | null> {
    await delay();
    const item = mockRegulations.find((r) => r.id === id || r.code === id);
    return Promise.resolve(item ? { ...item } : null);
  }

  async searchRegulations(query: string): Promise<Regulation[]> {
    await delay();
    const q = query.toLowerCase();
    const matches = mockRegulations.filter(
      (r) =>
        r.code.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        r.risk_category.toLowerCase().includes(q) ||
        r.act_name.toLowerCase().includes(q)
    );
    return Promise.resolve(matches);
  }
}

export const regulationService = new RegulationService();
