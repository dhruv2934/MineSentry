import { DashboardKPISummary, ActivityFeedItem } from '../types';
import {
  mockDashboardKPIs,
  mockRecentActivity,
  mockMonthlyProduction,
  mockRiskBreakdown,
  mockAttentionRequired
} from '../data/dashboard';
import { delay } from './apiClient';

export interface DashboardData {
  kpis: DashboardKPISummary;
  recentActivity: ActivityFeedItem[];
  productionTrends: typeof mockMonthlyProduction;
  riskBreakdown: typeof mockRiskBreakdown;
  attentionRequired: typeof mockAttentionRequired;
}

class DashboardService {
  async getDashboardData(): Promise<DashboardData> {
    await delay();
    return Promise.resolve({
      kpis: { ...mockDashboardKPIs },
      recentActivity: [...mockRecentActivity],
      productionTrends: [...mockMonthlyProduction],
      riskBreakdown: [...mockRiskBreakdown],
      attentionRequired: [...mockAttentionRequired]
    });
  }
}

export const dashboardService = new DashboardService();
