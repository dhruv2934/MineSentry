export const mockAnalyticsData = {
  safetyIndices: {
    lostTimeInjuryFrequencyRate: 0.14,
    industryBenchmarkLTIFR: 0.45,
    nearMissReportingRate: 14.8,
    statutoryComplianceIndex: 94.6,
    aiRecommendationAdoptionRate: 88.5
  },
  recurrenceTrends: [
    { month: 'May', strataIssues: 8, gasIssues: 3, hemmIncidents: 4 },
    { month: 'Jun', strataIssues: 6, gasIssues: 2, hemmIncidents: 3 },
    { month: 'Jul', strataIssues: 9, gasIssues: 5, hemmIncidents: 2 },
    { month: 'Aug', strataIssues: 5, gasIssues: 2, hemmIncidents: 1 },
    { month: 'Sep', strataIssues: 3, gasIssues: 2, hemmIncidents: 1 }
  ],
  minePerformanceRankings: [
    { rank: 1, mine: 'Neyveli Specialized Mine-II', compliance: 97.4, riskScore: 31, status: 'EXCELLENT' },
    { rank: 2, mine: 'Korba Open Cast Complex', compliance: 96.8, riskScore: 28, status: 'EXCELLENT' },
    { rank: 3, mine: 'Singrauli Super Pit', compliance: 95.1, riskScore: 35, status: 'GOOD' },
    { rank: 4, mine: 'Jharia Underground Mine', compliance: 93.4, riskScore: 42, status: 'MODERATE' },
    { rank: 5, mine: 'Raniganj Heritage Colliery', compliance: 91.0, riskScore: 51, status: 'MODERATE' },
    { rank: 6, mine: 'Talcher Deep Seam Project', compliance: 87.2, riskScore: 68, status: 'ATTENTION_NEEDED' }
  ]
};

export const mockWorkforceData = {
  activeHeadcount: 9350,
  shiftAttendancePct: 96.2,
  safetyTrainedPct: 98.4,
  openGrievances: 4,
  welfareIndex: 91.5,
  recentGrievances: [
    { id: 'GRV-01', mine: 'Jharia Underground', issue: 'Dust filter mask replenishment delay', status: 'In Review', date: '27 Sep 2026' },
    { id: 'GRV-02', mine: 'Talcher Deep Seam', issue: 'Underground drinking water chiller maintenance', status: 'Resolved', date: '25 Sep 2026' },
    { id: 'GRV-03', mine: 'Singrauli Super Pit', issue: 'Shift change bus timing alignment', status: 'Resolved', date: '24 Sep 2026' }
  ]
};
