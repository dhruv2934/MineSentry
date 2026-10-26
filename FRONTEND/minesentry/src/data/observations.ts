import { Observation } from '../types';

export const mockObservations: Observation[] = [
  {
    id: 'OBS-006',
    mine_id: 'mine-jharia-ug',
    mine_name: 'Jharia Underground Mine',
    inspection_id: 'INS-001',
    observation_date: '28 Sep 2026 09:15',
    reported_by: 'Shift Overman Manoj Sinha (via Mobile Sentry App)',
    title: '3 workers found without helmets',
    description: 'During routine inspection, 3 workers were observed working in the coal face without wearing safety helmets. Immediate corrective action was taken to provide helmets and ensure compliance with PPE regulations.',
    location_in_mine: 'Seam XIII, Level 4 West, Junction 14',
    severity: 'MEDIUM',
    status: 'Flagged as Violation',
    created_at: '2026-09-28T03:45:00Z',
    ai_analysis_status: 'Analyzed',
    detected_hazard: 'Roof fall / Strata collapse hazard near active haulage junction',
    ai_confidence_score: 0.96,
    recommended_violation_flag: true,
    rag_matched_clauses: [
      {
        regulation_id: 'CMR-2017-123',
        clause: 'Regulation 421: Personal Protective Equipment (PPE) Requirements',
        similarity_score: 0.94,
        citation: 'Coal Mines Regulations 2017 - Every gallery and roadway within 9 meters of face must be systematically supported as per SSR approved by CIM.'
      },
      {
        regulation_id: 'DGMS-TECH-CIRC-06',
        clause: 'DGMS Tech Circular No. 6: Resin Grouted Roof Bolting Standards',
        similarity_score: 0.89,
        citation: 'Minimum anchorage capacity of 100 kN required; warped plates must be replaced within the same operational shift.'
      }
    ]
  },
  {
    id: 'OBS-402',
    mine_id: 'mine-talcher-ds',
    mine_name: 'Talcher Deep Seam Project',
    inspection_id: 'INS-003',
    observation_date: '26 Sep 2026 14:30',
    reported_by: 'Ventilation Officer Sunil Jena',
    title: 'CH4 Telemetry Sensor Drift & Auxiliary Fan Stoppage',
    description: 'Telemetry sensor MS-CH4-09 showed flatline reading at 0.02% while manual methanometer probe verified 0.85% CH4 in dead end heading. Auxiliary ducting disconnected at joint 18.',
    location_in_mine: 'Return Drift Section 4B',
    severity: 'CRITICAL',
    status: 'Flagged as Violation',
    created_at: '2026-09-26T09:00:00Z',
    ai_analysis_status: 'Analyzed',
    detected_hazard: 'Potentially explosive inflammable gas buildup / deficient ventilation',
    ai_confidence_score: 0.98,
    recommended_violation_flag: true,
    rag_matched_clauses: [
      {
        regulation_id: 'CMR-2017-153',
        clause: 'Regulation 153: General Ventilation Requirements',
        similarity_score: 0.98,
        citation: 'Air current shall not contain more than 0.75% inflammable gas in return airway and ventilation shall be continuous without interruption.'
      },
      {
        regulation_id: 'CMR-2017-160',
        clause: 'Regulation 160: Precaution against inflammable gas',
        similarity_score: 0.93,
        citation: 'Immediate withdrawal of workers if inflammable gas exceeds 1.25% or ventilation mechanism fails.'
      }
    ]
  },
  {
    id: 'OBS-403',
    mine_id: 'mine-korba-oc',
    mine_name: 'Korba Open Cast Complex',
    inspection_id: 'INS-002',
    observation_date: '27 Sep 2026 11:20',
    reported_by: 'Safety Marshall Priya Rao',
    title: 'Bench Safety Berm Height Deficit along Dump Point #2',
    description: 'Safety berm height measured 1.1 meters along the active crest of Bench 4. Standard requires berm height equal to largest vehicle tire diameter (2.1 meters for 240T dumpers).',
    location_in_mine: 'Overburden Bench #4, Dump Point 2',
    severity: 'MEDIUM',
    status: 'Open',
    created_at: '2026-09-27T05:50:00Z',
    ai_analysis_status: 'Analyzed',
    detected_hazard: 'Dumper rollover risk during nighttime reverse tipping',
    ai_confidence_score: 0.92,
    recommended_violation_flag: false,
    rag_matched_clauses: [
      {
        regulation_id: 'CMR-2017-106',
        clause: 'Regulation 106: Spoil-banks and Dumps',
        similarity_score: 0.91,
        citation: 'Substantial parapet or berm equal to wheel axle/tire height of the largest haulage vehicle must be maintained along edges.'
      }
    ]
  },
  {
    id: 'OBS-404',
    mine_id: 'mine-singrauli-sp',
    mine_name: 'Singrauli Super Pit',
    inspection_id: 'INS-004',
    observation_date: '25 Sep 2026 08:40',
    reported_by: 'Electrical Supervisor Anand Prakash',
    title: 'Minor Cable Tray Corrosion at Primary Crusher Substation',
    description: 'Galvanized cable tray near secondary vibration screen shows superficial atmospheric sulfur staining. Ground earth continuity passes IEEE 80 test at 0.42 ohms.',
    location_in_mine: 'Primary Crusher Substation Bay 1',
    severity: 'LOW',
    status: 'Resolved',
    created_at: '2026-09-25T03:10:00Z',
    ai_analysis_status: 'Analyzed',
    detected_hazard: 'Non-critical asset wear; no immediate shock or fire hazard',
    ai_confidence_score: 0.88,
    recommended_violation_flag: false,
    rag_matched_clauses: [
      {
        regulation_id: 'CEA-2010-34',
        clause: 'CEA Measures relating to Safety & Electric Supply (Rule 34)',
        similarity_score: 0.84,
        citation: 'Periodic corrosion assessment and painting of structural metalwork.'
      }
    ]
  },
  {
    id: 'OBS-405',
    mine_id: 'mine-raniganj-colliery',
    mine_name: 'Raniganj Heritage Colliery',
    inspection_id: 'INS-005',
    observation_date: '24 Sep 2026 13:00',
    reported_by: 'Mining Sirdar Kamal Kant',
    title: 'Dust Explosion Barrier Water Trough Leakage',
    description: 'Four concentrated stone-dust / water trough barriers on Main Haulage Level 6 have dried out or suffered seal cracks. Stone dust dispersibility ratio below 70%.',
    location_in_mine: 'Main Haulage Level 6 South',
    severity: 'HIGH',
    status: 'Flagged as Violation',
    created_at: '2026-09-24T07:30:00Z',
    ai_analysis_status: 'Analyzed',
    detected_hazard: 'Secondary coal dust explosion propagation risk',
    ai_confidence_score: 0.95,
    recommended_violation_flag: true,
    rag_matched_clauses: [
      {
        regulation_id: 'CMR-2017-142',
        clause: 'Regulation 142: Precautions against Coal Dust',
        similarity_score: 0.96,
        citation: 'Incombustible dust barriers or water barriers of approved specification must be maintained in operational state in all haulage roads.'
      }
    ]
  }
];
