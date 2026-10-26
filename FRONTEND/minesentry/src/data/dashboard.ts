import { DashboardKPISummary, ActivityFeedItem } from '../types';

export const mockDashboardKPIs: DashboardKPISummary = {
  total_mines: 6,
  active_mines: 5,
  total_production: '6.07M t',
  production_growth_pct: 8.4,
  overall_compliance_pct: 93.8,
  compliance_trend: 'up',
  open_violations: 11,
  critical_violations: 2,
  high_risk_issues: 4,
  actions_requiring_attention: 3
};

export const mockRecentActivity: ActivityFeedItem[] = [
  {
    id: 'act-01',
    timestamp: '25 mins ago',
    type: 'ai_rag',
    title: 'AI RAG Engine Flagged Strata Hazard',
    description: 'Observation OBS-401 matched with CMR-2017 Reg 123 (94% confidence). High spallation risk at Jharia Seam XIII.',
    mine_name: 'Jharia Underground Mine',
    severity: 'HIGH'
  },
  {
    id: 'act-02',
    timestamp: '1 hour ago',
    type: 'inspection',
    title: 'Morning Shift Safety Audit Completed',
    description: 'Inspector Raj Kumar completed 100% inspection checklist for Heading West #3.',
    mine_name: 'Jharia Underground Mine',
    severity: 'LOW'
  },
  {
    id: 'act-03',
    timestamp: '3 hours ago',
    type: 'action_approved',
    title: 'Corrective Action ACT-302 In Progress',
    description: 'Ventilation crew dispatched to replace spiral ducting and recalibrate CH4 optical sensor.',
    mine_name: 'Talcher Deep Seam Project',
    severity: 'CRITICAL'
  },
  {
    id: 'act-04',
    timestamp: '5 hours ago',
    type: 'compliance_alert',
    title: 'DGMS Statutory Benchmark Passed',
    description: 'Korba Open Cast Complex achieved 96.8% quarterly compliance rating with zero lost-time incidents.',
    mine_name: 'Korba Open Cast Complex',
    severity: 'LOW'
  },
  {
    id: 'act-05',
    timestamp: 'Yesterday',
    type: 'violation',
    title: 'Waste Dump Slope Angle Violation Registered',
    description: 'Automated slope radar flagged Bench #4 crest slope at 39 degrees. Remediation work initiated.',
    mine_name: 'Singrauli Super Pit',
    severity: 'MEDIUM'
  }
];

export const mockMonthlyProduction = [
  { month: 'Apr', target: 510, actual: 495 },
  { month: 'May', target: 520, actual: 535 },
  { month: 'Jun', target: 530, actual: 512 },
  { month: 'Jul', target: 500, actual: 488 },
  { month: 'Aug', target: 540, actual: 560 },
  { month: 'Sep', target: 550, actual: 580 }
];

export const mockRiskBreakdown = [
  { category: 'Strata & Roof Stability', score: 38, count: 5, status: 'Moderate' },
  { category: 'Ventilation & Noxious Gases', score: 64, count: 3, status: 'High' },
  { category: 'Heavy Earth Moving (HEMM)', score: 22, count: 2, status: 'Low' },
  { category: 'Coal Dust & Explosion Arrest', score: 45, count: 4, status: 'Moderate' },
  { category: 'Electrical & Earthing Safety', score: 18, count: 1, status: 'Low' }
];

export const mockAttentionRequired = [
  {
    id: 'ATT-01',
    item_type: 'Urgent Action Approval',
    headline: 'ACT-301: Resin bolting & steel truss installation',
    mine: 'Jharia Underground Mine',
    urgency: 'URGENT',
    days_remaining: '2 days',
    action_url: '/corrective-actions/ACT-301'
  },
  {
    id: 'ATT-02',
    item_type: 'Statutory Violation Notice',
    headline: 'VIO-901: Flammable gas accumulation > 0.75%',
    mine: 'Talcher Deep Seam Project',
    urgency: 'CRITICAL',
    days_remaining: '1 day',
    action_url: '/violations/VIO-901'
  },
  {
    id: 'ATT-03',
    item_type: 'Upcoming DGMS Audit',
    headline: 'Environmental discharge audit scheduled for tomorrow',
    mine: 'Jharia Underground Mine',
    urgency: 'HIGH',
    days_remaining: 'Tomorrow',
    action_url: '/inspections/INS-006'
  }
];
