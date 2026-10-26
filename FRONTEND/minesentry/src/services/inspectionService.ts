import { Inspection } from '../types';
import { mockInspections } from '../data/inspections';
import { delay } from './apiClient';

export interface InspectionFilters {
  mine_id?: string;
  status?: string;
  type?: string;
  search?: string;
}

class InspectionService {
  async getInspections(filters?: InspectionFilters): Promise<Inspection[]> {
    await delay();
    let result = [...mockInspections];

    if (filters) {
      if (filters.mine_id && filters.mine_id !== 'all') {
        result = result.filter((i) => i.mine_id === filters.mine_id);
      }
      if (filters.status && filters.status !== 'all') {
        result = result.filter((i) => i.status.toLowerCase() === filters.status?.toLowerCase());
      }
      if (filters.type && filters.type !== 'all') {
        result = result.filter((i) => i.type.toLowerCase() === filters.type?.toLowerCase());
      }
      if (filters.search) {
        const query = filters.search.toLowerCase();
        result = result.filter(
          (i) =>
            i.id.toLowerCase().includes(query) ||
            i.mine_name.toLowerCase().includes(query) ||
            i.inspector_name.toLowerCase().includes(query) ||
            i.type.toLowerCase().includes(query)
        );
      }
    }

    return Promise.resolve(result);
  }

  async getInspectionById(id: string): Promise<Inspection | null> {
    await delay();
    const item = mockInspections.find((i) => i.id === id);
    return Promise.resolve(item ? { ...item } : null);
  }

  async createInspection(data: Partial<Inspection>): Promise<Inspection> {
    await delay(350);
    const newId = `INS-${String(mockInspections.length + 1).padStart(3, '0')}`;
    const newRecord: Inspection = {
      id: newId,
      mine_id: data.mine_id || 'mine-jharia-ug',
      mine_name: data.mine_name || 'Jharia Underground Mine',
      inspection_date: '28 Sep 2026',
      type: data.type || 'Safety Inspection',
      inspector_name: data.inspector_name || 'Safety Officer',
      inspector_designation: data.inspector_designation || 'Shift Safety Inspector',
      status: 'Scheduled',
      summary: data.summary || 'Scheduled routine safety audit.',
      created_at: new Date().toISOString(),
      observations_count: 0,
      violations_found: 0,
      risk_score: 10,
      shift: data.shift || 'Shift A (Morning)',
      section_inspected: data.section_inspected || 'General Heading',
      dgms_officer_present: false,
      completion_percentage: 0
    };
    mockInspections.unshift(newRecord);
    return Promise.resolve({ ...newRecord });
  }
}

export const inspectionService = new InspectionService();
