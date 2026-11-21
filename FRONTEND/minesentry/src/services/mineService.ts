
import { api } from './apiClient';

import type {
  Mine,
  MineCreate,
  MineUpdate,
  MineStatus
} from '../types';

class MineService {

  // Fetch all mines
  async getMines(): Promise<Mine[]> {
    return api.get<Mine[]>('/mines/');
  }

  // Fetch mine by database ID
  async getMineById(id: number): Promise<Mine> {
    return api.get<Mine>(`/mines/${id}`);
  }

  // Create a mine
  async createMine(data: MineCreate): Promise<Mine> {
    return api.post<Mine>('/mines/', data);
  }

  // Update mine information
  async updateMine(
    id: number,
    data: MineUpdate
  ): Promise<Mine> {
    return api.patch<Mine>(`/mines/${id}`, data);
  }

  // Change ACTIVE / INACTIVE status
  async updateMineStatus(
    id: number,
    status: MineStatus
  ): Promise<Mine> {
    return this.updateMine(id, { status });
  }

  // Soft-deactivate mine
  async deactivateMine(id: number): Promise<Mine> {
    return api.delete<Mine>(`/mines/${id}`);
  }
}

export const mineService = new MineService();
