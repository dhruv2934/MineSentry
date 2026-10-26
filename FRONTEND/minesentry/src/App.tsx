import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { MinesPage } from './pages/MinesPage';
import { MineDetailPage } from './pages/MineDetailPage';
import { InspectionsPage } from './pages/InspectionsPage';
import { InspectionDetailPage } from './pages/InspectionDetailPage';
import { ObservationsPage } from './pages/ObservationsPage';
import { ObservationDetailPage } from './pages/ObservationDetailPage';
import { ViolationsPage } from './pages/ViolationsPage';
import { ViolationDetailPage } from './pages/ViolationDetailPage';
import { CorrectiveActionsPage } from './pages/CorrectiveActionsPage';
import { CorrectiveActionDetailPage } from './pages/CorrectiveActionDetailPage';
import { RegulationsPage } from './pages/RegulationsPage';
import { CompliancePage } from './pages/CompliancePage';
import { RiskPage } from './pages/RiskPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { WorkforcePage } from './pages/WorkforcePage';
import { AdminPage } from './pages/AdminPage';


import { PlatformHomePage } from './pages/PlatformHomePage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Experience */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LandingPage />} />
        <Route path="/home" element={<PlatformHomePage />} />

        {/* Authenticated Application Shell */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Operations */}
          <Route path="/mines" element={<MinesPage />} />
          <Route path="/mines/:mineId" element={<MineDetailPage />} />

          <Route path="/inspections" element={<InspectionsPage />} />
          <Route path="/inspections/:inspectionId" element={<InspectionDetailPage />} />

          <Route path="/observations" element={<ObservationsPage />} />
          <Route path="/observations/:observationId" element={<ObservationDetailPage />} />

          <Route path="/violations" element={<ViolationsPage />} />
          <Route path="/violations/:violationId" element={<ViolationDetailPage />} />

          <Route path="/corrective-actions" element={<CorrectiveActionsPage />} />
          <Route path="/corrective-actions/:actionId" element={<CorrectiveActionDetailPage />} />

          {/* Compliance & Intelligence */}
          <Route path="/compliance" element={<CompliancePage />} />
          <Route path="/regulations" element={<RegulationsPage />} />
          <Route path="/regulations/:regulationId" element={<RegulationsPage />} />
          <Route path="/risk" element={<RiskPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />

          {/* Workforce */}
          <Route path="/workforce" element={<WorkforcePage />} />
          <Route path="/attendance" element={<WorkforcePage />} />
          <Route path="/grievances" element={<WorkforcePage />} />
          <Route path="/welfare" element={<WorkforcePage />} />

          {/* Administration */}
          <Route path="/users" element={<AdminPage />} />
          <Route path="/audit-logs" element={<AdminPage />} />
          <Route path="/settings" element={<AdminPage />} />
        </Route>

        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
