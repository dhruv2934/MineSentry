import { Mine } from '../types';
import { mockMines } from '../data/mines';
import { delay } from './apiClient';

class MineService {
  /**
   * Fetches all registered mines in the portfolio.
   * Future backend integration:
   * const response = await api.get<Mine[]>('/mines');
   * return response.data;
   */
  async getMines(): Promise<Mine[]> {
    await delay();
    return Promise.resolve([...mockMines]);
  }

  /**
   * Fetches a single mine by its unique mine_id or id.
   * Future backend integration:
   * const response = await api.get<Mine>(`/mines/${id}`);
   * return response.data;
   */
  async getMineById(id: string): Promise<Mine | null> {
    await delay();
    const mine = mockMines.find((m) => m.mine_id === id || m.id === id);
    return Promise.resolve(mine ? { ...mine } : null);
  }

  /**
   * Updates status or metadata of a mine
   */
  async updateMineStatus(id: string, status: Mine['status']): Promise<Mine | null> {
    await delay();
    const mine = mockMines.find((m) => m.mine_id === id || m.id === id);
    if (mine) {
      mine.status = status;
      mine.updated_at = new Date().toISOString();
      return Promise.resolve({ ...mine });
    }
    return Promise.resolve(null);
  }
}

export const mineService = new MineService();
