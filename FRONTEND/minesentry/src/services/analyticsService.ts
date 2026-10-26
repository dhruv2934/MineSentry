import { mockAnalyticsData, mockWorkforceData } from '../data/analytics';
import { delay } from './apiClient';

class AnalyticsService {
  async getAnalyticsData() {
    await delay();
    return Promise.resolve({ ...mockAnalyticsData });
  }

  async getWorkforceData() {
    await delay();
    return Promise.resolve({ ...mockWorkforceData });
  }
}

export const analyticsService = new AnalyticsService();
