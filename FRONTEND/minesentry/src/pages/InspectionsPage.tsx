import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInspections } from '../hooks/useInspections';
import { useMines } from '../hooks/useMines';
import { PageHeader } from '../components/common/PageHeader';
import { SearchBar } from '../components/common/SearchBar';
import { FilterSelect } from '../components/common/FilterSelect';
import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';
import {
  ClipboardCheck,
  Clock,
  Calendar,
  Plus,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  X
} from 'lucide-react';
import { inspectionService } from '../services/inspectionService';

export const InspectionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { mines } = useMines();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMine, setSelectedMine] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const { inspections, loading, refetch } = useInspections({
    mine_id: selectedMine,
    status: selectedStatus,
    type: selectedType,
    search: searchTerm
  });

  // Modal State for "+ New Inspection"
  const [showModal, setShowModal] = useState(false);
  const [modalMine, setModalMine] = useState('mine-jharia-ug');
  const [modalType, setModalType] = useState('Safety Inspection');
  const [modalInspector, setModalInspector] = useState('Rajesh Sharma');
  const [modalSection, setModalSection] = useState('Main Incline Haulage Way');
  const [modalSummary, setModalSummary] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Summary Metrics
  const totalCount = inspections.length;
  const pendingCount = inspections.filter(
    (i) => i.status === 'Pending Review' || i.status === 'In Progress'
  ).length;
  const thisWeekCount = inspections.filter((i) => i.inspection_date.includes('2026')).length;

  const handleCreateInspection = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const chosenMineObj = mines.find((m) => m.mine_id === modalMine);
    await inspectionService.createInspection({
      mine_id: modalMine,
      mine_name: chosenMineObj ? chosenMineObj.name : 'Jharia Underground Mine',
      type: modalType as any,
      inspector_name: modalInspector,
      section_inspected: modalSection,
      summary: modalSummary || 'Statutory shift safety inspection.'
    });
    setIsSubmitting(false);
    setShowModal(false);
    refetch();
  };

  if (loading && inspections.length === 0) {
    return <LoadingState message="Loading statutory inspection records & schedules..." />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. PAGE HEADER (Requirement 16) */}
      <PageHeader
        title="Inspections"
        subtitle="Track and manage mine inspections"
        actions={
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded shadow transition-all duration-150 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Inspection</span>
          </button>
        }
      />

      {/* 2. THREE SUMMARY TILES (Requirement 16) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#12161a] border border-white/[0.08] flex items-center justify-between">
          <div>
            <span className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              TOTAL INSPECTIONS
            </span>
            <span className="text-2xl font-bold font-mono text-white mt-1 block">
              {totalCount}
            </span>
          </div>
          <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <ClipboardCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#12161a] border border-white/[0.08] flex items-center justify-between">
          <div>
            <span className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              PENDING INSPECTIONS
            </span>
            <span className="text-2xl font-bold font-mono text-yellow-400 mt-1 block">
              {pendingCount}
            </span>
          </div>
          <div className="p-3 rounded-lg bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#12161a] border border-white/[0.08] flex items-center justify-between">
          <div>
            <span className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              INSPECTIONS THIS WEEK
            </span>
            <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">
              {thisWeekCount}
            </span>
          </div>
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Calendar className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. SEARCH & FILTER BAR (Requirement 16) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-[#111417] p-3.5 rounded-lg border border-white/[0.08]">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search inspections..."
        />

        <FilterSelect
          value={selectedMine}
          onChange={setSelectedMine}
          options={[
            { label: 'All Mines', value: 'all' },
            ...mines.map((m) => ({ label: m.name, value: m.mine_id || m.id }))
          ]}
        />

        <FilterSelect
          value={selectedStatus}
          onChange={setSelectedStatus}
          options={[
            { label: 'All Status', value: 'all' },
            { label: 'Completed', value: 'completed' },
            { label: 'In Progress', value: 'in progress' },
            { label: 'Pending Review', value: 'pending review' },
            { label: 'Scheduled', value: 'scheduled' }
          ]}
        />

        <FilterSelect
          value={selectedType}
          onChange={setSelectedType}
          options={[
            { label: 'All Types', value: 'all' },
            { label: 'Safety Inspection', value: 'safety inspection' },
            { label: 'DGMS Compliance Audit', value: 'dgms compliance audit' },
            { label: 'Ventilation & Gas Audit', value: 'ventilation & gas audit' },
            { label: 'Machinery & Electrical', value: 'machinery & electrical' }
          ]}
        />
      </div>

      {/* 4. INSPECTION LIST (Requirement 16: Columns: Mine, ID, Type, Inspector, Date, Status, Actions) */}
      {inspections.length === 0 ? (
        <EmptyState
          title="No inspections found"
          description="Try adjusting your search criteria or create a new inspection."
          actionText="+ New Inspection"
          onAction={() => setShowModal(true)}
        />
      ) : (
        <div className="bg-[#12161a] border border-white/[0.08] rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#161a1e] border-b border-white/[0.08] text-zinc-400 font-mono uppercase tracking-wider">
                <tr>
                  <th className="p-4">Mine</th>
                  <th className="p-4">ID</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Inspector</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {inspections.map((inspection) => (
                  <tr
                    key={inspection.id}
                    onClick={() => navigate(`/inspections/${inspection.id}`)}
                    className="hover:bg-white/[0.02] cursor-pointer transition-colors group"
                  >
                    <td className="p-4 font-semibold text-white group-hover:text-amber-400 transition-colors">
                      {inspection.mine_name}
                    </td>
                    <td className="p-4 font-mono font-bold text-amber-400">
                      {inspection.id}
                    </td>
                    <td className="p-4 text-zinc-300">
                      {inspection.type}
                    </td>
                    <td className="p-4 text-zinc-300">
                      {inspection.inspector_name}
                    </td>
                    <td className="p-4 font-mono text-zinc-400">
                      {inspection.inspection_date}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={inspection.status} />
                    </td>
                    <td className="p-4 text-right">
                      <span className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1">
                        View Details <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: New Inspection */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#12161a] border border-white/[0.12] rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-amber-400" />
                Schedule New Inspection
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateInspection} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 uppercase font-mono mb-1">Target Mine</label>
                <select
                  value={modalMine}
                  onChange={(e) => setModalMine(e.target.value)}
                  className="w-full bg-[#181d22] border border-white/[0.1] rounded px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                >
                  {mines.map((m) => (
                    <option key={m.mine_id || m.id} value={m.mine_id || m.id}>
                      {m.name} ({m.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase font-mono mb-1">Audit Type</label>
                <select
                  value={modalType}
                  onChange={(e) => setModalType(e.target.value)}
                  className="w-full bg-[#181d22] border border-white/[0.1] rounded px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Safety Inspection">Safety Inspection</option>
                  <option value="DGMS Compliance Audit">DGMS Compliance Audit</option>
                  <option value="Ventilation & Gas Audit">Ventilation &amp; Gas Audit</option>
                  <option value="Machinery & Electrical">Machinery &amp; Electrical</option>
                  <option value="Environmental Check">Environmental Check</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase font-mono mb-1">Assigned Inspector</label>
                <input
                  type="text"
                  required
                  value={modalInspector}
                  onChange={(e) => setModalInspector(e.target.value)}
                  className="w-full bg-[#181d22] border border-white/[0.1] rounded px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase font-mono mb-1">Section / Heading</label>
                <input
                  type="text"
                  required
                  value={modalSection}
                  onChange={(e) => setModalSection(e.target.value)}
                  className="w-full bg-[#181d22] border border-white/[0.1] rounded px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase font-mono mb-1">Audit Scope / Notes</label>
                <textarea
                  rows={3}
                  value={modalSummary}
                  onChange={(e) => setModalSummary(e.target.value)}
                  placeholder="Detail statutory check items and required instruments..."
                  className="w-full bg-[#181d22] border border-white/[0.1] rounded px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded shadow"
                >
                  {isSubmitting ? 'Scheduling...' : 'Confirm Schedule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
