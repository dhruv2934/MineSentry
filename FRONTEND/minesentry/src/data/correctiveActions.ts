import { CorrectiveAction } from '../types';

export const mockCorrectiveActions: CorrectiveAction[] = [
  {
    id: 'ACT-301',
    violation_id: 'VIO-902',
    mine_id: 'mine-jharia-ug',
    mine_name: 'Jharia Underground Mine',
    title: 'Install 6 additional full-column resin bolts & W-strap steel trusses at Junction 14',
    description: 'Bore 32mm holes at 1.2m staggered grid, deploy quick-setting 24mm resin capsules, pre-torque plates to 120 N-m, and mount tell-tale dual-height extensometers.',
    ai_recommended: true,
    recommendation_rationale: 'AI RAG analyzed roof stratum geological facies (sandstone-shale transition) and DGMS Tech Circular 06/2021. Recommended 1.8m resin grouting to span over sheared bedding plane.',
    status: 'pending_approval',
    priority: 'HIGH',
    assigned_engineer: 'Strata Control Engineer Amit Roy',
    target_completion_date: '30 Sep 2026',
    created_at: '2026-09-28T04:30:00Z',
    updated_at: '2026-09-28T04:30:00Z'
  },
  {
    id: 'ACT-302',
    violation_id: 'VIO-901',
    mine_id: 'mine-talcher-ds',
    mine_name: 'Talcher Deep Seam Project',
    title: 'Replace damaged flexible ventilation ducting and recalibrate CH4 optical sensor MS-CH4-09',
    description: 'Install anti-static fire-resistant 800mm spiral ducting across joint 18, perform zero-gas and 1.5% calibration bottle verification on optical sensor, and test automatic fan interlock.',
    ai_recommended: true,
    recommendation_rationale: 'High flammable gas risk classification (CMR 153). AI recommends immediate ventilation restore + fail-safe electrical trip interlock within 24h to avoid statutory mine stoppage.',
    status: 'in_progress',
    priority: 'URGENT',
    assigned_engineer: 'Ventilation Superintendent Sunil Jena',
    target_completion_date: '29 Sep 2026',
    created_at: '2026-09-26T11:00:00Z',
    updated_at: '2026-09-27T08:30:00Z',
    approval_details: {
      approved_by: 'Er. B. C. Nayak (Chief Mining Engineer)',
      approval_timestamp: '2026-09-26T11:45:00Z',
      comments: 'Authorized urgent requisition from Central Mine Rescue inventory.'
    }
  },
  {
    id: 'ACT-303',
    violation_id: 'VIO-903',
    mine_id: 'mine-raniganj-colliery',
    mine_name: 'Raniganj Heritage Colliery',
    title: 'Replenish and seal 4 stone-dust explosion barrier shelves on Haulage Level 6',
    description: 'Empty contaminated damp dust, inspect structural hanger cables, reload with 120 kg/shelf certified limestone dust (>85% passing 200 mesh), and install moisture-proof seals.',
    ai_recommended: true,
    recommendation_rationale: 'CMR-2017 Regulation 142 statutory mandate for coal dust explosion arrest. Recommended based on dust dispersion sampling records.',
    status: 'in_progress',
    priority: 'HIGH',
    assigned_engineer: 'Safety Officer Kamal Kant',
    target_completion_date: '01 Oct 2026',
    created_at: '2026-09-24T09:15:00Z',
    updated_at: '2026-09-25T14:00:00Z',
    approval_details: {
      approved_by: 'Er. Swapan Banerjee',
      approval_timestamp: '2026-09-24T10:00:00Z',
      comments: 'Work underway by morning shift maintenance crew.'
    }
  },
  {
    id: 'ACT-304',
    violation_id: 'VIO-904',
    mine_id: 'mine-singrauli-sp',
    mine_name: 'Singrauli Super Pit',
    title: 'Execute dozer pushback and step-bench stabilization on Western Overburden Dump',
    description: 'Deploy two CAT D11 dozers to reduce overall slope to 34 degrees, establish 8-meter catchment berm at midway elevation, and seed fast-rooting vetiver grass for erosion arrest.',
    ai_recommended: false,
    recommendation_rationale: 'Civil & Geotechnical committee recommendation following 3D drone photogrammetry analysis.',
    status: 'completed',
    priority: 'MEDIUM',
    assigned_engineer: 'Geotech Lead Rashmi Patel',
    target_completion_date: '28 Sep 2026',
    created_at: '2026-09-23T14:00:00Z',
    updated_at: '2026-09-27T17:00:00Z',
    approval_details: {
      approved_by: 'Er. Sandeep Shrivastava',
      approval_timestamp: '2026-09-23T15:30:00Z',
      comments: 'Slope verification report confirmed stable by ISM Dhanbad consultant.'
    }
  },
  {
    id: 'ACT-305',
    mine_id: 'mine-korba-oc',
    mine_name: 'Korba Open Cast Complex',
    title: 'Deploy solar high-mast lighting trailers at North Switchback Turn #4',
    description: 'Erect 2 mobile telescoping 4x300W LED towers to raise minimum road surface illuminance from 6.2 lux to over 20 lux.',
    ai_recommended: true,
    recommendation_rationale: 'AI haul road telemetry identified proximity warning frequency clustering during 02:00-04:00 night haul cycles.',
    status: 'completed',
    priority: 'LOW',
    assigned_engineer: 'Electrical Foreman Rajesh Sahu',
    target_completion_date: '25 Sep 2026',
    created_at: '2026-09-22T10:30:00Z',
    updated_at: '2026-09-25T18:00:00Z',
    approval_details: {
      approved_by: 'Er. Alok Vardhan',
      approval_timestamp: '2026-09-22T11:00:00Z'
    }
  },
  {
    id: 'ACT-306',
    mine_id: 'mine-jharia-ug',
    mine_name: 'Jharia Underground Mine',
    title: 'Thermal imaging scan of isolation fire-stopping wall Seal #7',
    description: 'Perform infrared thermographic sweep across goaf boundary wall #7 to verify differential temperature is below 2.0 deg C.',
    ai_recommended: true,
    recommendation_rationale: 'RAG early warning model flagged seasonal barometric drop which can pull spontaneous heating gases across porous seals.',
    status: 'pending_approval',
    priority: 'HIGH',
    assigned_engineer: 'Mine Rescue Captain D. N. Yadav',
    target_completion_date: '02 Oct 2026',
    created_at: '2026-09-28T05:00:00Z',
    updated_at: '2026-09-28T05:00:00Z'
  }
];
