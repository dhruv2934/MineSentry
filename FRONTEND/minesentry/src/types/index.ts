/**
 * MineSentry Core Domain Types
 * 
 * Strict backend-aligned schemas with snake_case naming for existing backend
 * entities, combined with frontend-extended intelligence fields.
 */

// ==========================================
// 1. MINE TYPES
// ==========================================

export type MineStatus = 'ACTIVE' | 'UNDER_AUDIT' | 'MAINTENANCE' | 'RESTRICTED';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface Mine {
  // Backend Core Fields
  mine_id: string; // or id
  id: string;
  name: string;
  code: string;
  location: string;
  state: string;
  district: string;
  description: string;
  status: MineStatus;
  created_at: string;
  updated_at: string;

  // Frontend Extended View-Model Fields
  image_url: string;
  production: string; // e.g. "720K t"
  production_tons: number;
  risk_score: number; // 0 - 100 (lower is safer)
  risk_level: RiskLevel;
  open_items: number;
  compliance_score: number; // 0 - 100%
  active_inspections: number;
  open_violations: number;
  open_corrective_actions: number;
  seam_depth_meters: number;
  methane_classification: 'Degree I' | 'Degree II' | 'Degree III';
  workforce_headcount: number;
  chief_mining_engineer: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// ==========================================
// 2. INSPECTION TYPES
// ==========================================

export type InspectionStatus = 'Completed' | 'In Progress' | 'Scheduled' | 'Pending Review';
export type InspectionType = 'Safety Inspection' | 'DGMS Compliance Audit' | 'Environmental Check' | 'Ventilation & Gas Audit' | 'Machinery & Electrical';

export interface Inspection {
  // Backend Core Fields
  id: string;
  mine_id: string;
  mine_name: string;
  inspection_date: string;
  type: InspectionType;
  inspector_name: string;
  inspector_designation: string;
  status: InspectionStatus;
  summary: string;
  created_at: string;
  updated_at?: string;

  // Frontend Extended Fields
  observations_count: number;
  violations_found: number;
  risk_score: number;
  shift: 'Shift A (Morning)' | 'Shift B (Afternoon)' | 'Shift C (Night)';
  section_inspected: string;
  dgms_officer_present: boolean;
  completion_percentage: number;
}

// ==========================================
// 3. OBSERVATION TYPES (AI / RAG Entry)
// ==========================================

export type ObservationSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type AIAnalysisStatus = 'Analyzed' | 'Processing' | 'Pending Review';

export interface Observation {
  id: string;
  mine_id: string;
  mine_name: string;
  inspection_id?: string;
  observation_date: string;
  reported_by: string;
  title: string;
  description: string;
  location_in_mine: string;
  severity: ObservationSeverity;
  status: 'Open' | 'Under AI Review' | 'Flagged as Violation' | 'Resolved';
  image_url?: string;
  created_at: string;

  // AI & RAG Engine Metadata
  ai_analysis_status: AIAnalysisStatus;
  detected_hazard: string;
  rag_matched_clauses: Array<{
    regulation_id: string;
    clause: string;
    similarity_score: number;
    citation: string;
  }>;
  ai_confidence_score: number; // e.g. 0.94
  recommended_violation_flag: boolean;
}

// ==========================================
// 4. VIOLATION TYPES
// ==========================================

export type ViolationSeverity = 'Minor' | 'Moderate' | 'Major' | 'Critical';
export type ViolationStatus = 'Open' | 'Under Remediation' | 'Verification Pending' | 'Closed';

export interface Violation {
  id: string;
  mine_id: string;
  mine_name: string;
  inspection_id?: string;
  observation_id?: string;
  regulation_id: string;
  regulation_clause: string;
  act_name: string; // e.g. "Coal Mines Regulations, 2017"
  title: string;
  description: string;
  severity: ViolationSeverity;
  status: ViolationStatus;
  penalty_risk: string; // e.g. "Statutory Notice u/s 22(3) Mines Act"
  due_date: string;
  assigned_to: string;
  created_at: string;
  updated_at: string;
  closure_evidence?: string;
}

// ==========================================
// 5. CORRECTIVE ACTION TYPES (Action Engine)
// ==========================================

export type ActionStatus = 'pending_approval' | 'approved' | 'in_progress' | 'completed' | 'rejected';
export type PriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface CorrectiveAction {
  id: string;
  violation_id?: string;
  mine_id: string;
  mine_name: string;
  title: string;
  description: string;
  ai_recommended: boolean;
  recommendation_rationale?: string;
  status: ActionStatus;
  priority: PriorityLevel;
  assigned_engineer: string;
  target_completion_date: string;
  created_at: string;
  updated_at: string;
  approval_details?: {
    approved_by?: string;
    approval_timestamp?: string;
    comments?: string;
  };
  rejection_details?: {
    rejected_by?: string;
    rejection_reason?: string;
  };
}

// ==========================================
// 6. REGULATION & COMPLIANCE TYPES
// ==========================================

export interface Regulation {
  id: string;
  code: string;
  act_name: string;
  chapter: string;
  regulation_number: string;
  title: string;
  summary: string;
  full_text: string;
  risk_category: 'Strata & Support' | 'Ventilation & Gases' | 'Haulage & Transport' | 'Machinery' | 'Dust & Spontaneous Combustion';
  statutory_penalty: string;
}

// ==========================================
// 7. DASHBOARD & ANALYTICS TYPES
// ==========================================

export interface DashboardKPISummary {
  total_mines: number;
  active_mines: number;
  total_production: string;
  production_growth_pct: number;
  overall_compliance_pct: number;
  compliance_trend: 'up' | 'down' | 'stable';
  open_violations: number;
  critical_violations: number;
  high_risk_issues: number;
  actions_requiring_attention: number;
}

export interface ActivityFeedItem {
  id: string;
  timestamp: string;
  type: 'inspection' | 'violation' | 'ai_rag' | 'action_approved' | 'compliance_alert';
  title: string;
  description: string;
  mine_name: string;
  severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}
