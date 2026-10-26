import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ASSETS } from '../../config/assets';
import {
  LayoutDashboard,
  Pickaxe,
  ClipboardCheck,
  Eye,
  AlertOctagon,
  CheckSquare,
  ShieldCheck,
  BookOpen,
  AlertTriangle,
  BarChart3,
  Users,
  CalendarCheck,
  MessageSquareWarning,
  HeartHandshake,
  UserCog,
  FileClock,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ExternalLink
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const navSectionClasses = 'text-[10px] font-mono tracking-wider text-zinc-400 uppercase px-3 py-2 mt-4';
  const navItemClasses = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium tracking-wide transition-all group relative',
      isActive
        ? 'bg-amber-500/15 text-amber-300 font-semibold border-l-2 border-amber-500'
        : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
    );

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 bottom-0 z-40 bg-[#0d1013] border-r border-white/[0.08] flex flex-col transition-all duration-300 select-none',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/[0.08] shrink-0">
        {!collapsed ? (
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <img src={ASSETS.brand.fullLogo} alt="MineSentry" className="h-7 w-auto object-contain" />
          </div>
        ) : (
          <div className="mx-auto cursor-pointer" onClick={() => navigate('/dashboard')}>
            <img src={ASSETS.brand.markOnly} alt="MS" className="h-7 w-7 object-contain" />
          </div>
        )}

        <button
          onClick={onToggle}
          className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Scroll Area */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {/* DASHBOARD */}
        <NavLink to="/dashboard" className={navItemClasses}>
          <LayoutDashboard className="w-4 h-4 shrink-0 text-amber-400" />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        {/* OPERATIONS */}
        {!collapsed ? (
          <div className={navSectionClasses}>Operations</div>
        ) : (
          <div className="h-2" />
        )}
        <NavLink to="/mines" className={navItemClasses} title="Mines">
          <Pickaxe className="w-4 h-4 shrink-0 text-amber-500" />
          {!collapsed && <span>Mines</span>}
        </NavLink>
        <NavLink to="/inspections" className={navItemClasses} title="Inspections">
          <ClipboardCheck className="w-4 h-4 shrink-0 text-emerald-400" />
          {!collapsed && (
            <div className="flex items-center justify-between w-full">
              <span>Inspections</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono">
                3 New
              </span>
            </div>
          )}
        </NavLink>
        <NavLink to="/observations" className={navItemClasses} title="Observations">
          <Eye className="w-4 h-4 shrink-0 text-cyan-400" />
          {!collapsed && <span>Observations</span>}
        </NavLink>
        <NavLink to="/violations" className={navItemClasses} title="Violations">
          <AlertOctagon className="w-4 h-4 shrink-0 text-rose-400" />
          {!collapsed && (
            <div className="flex items-center justify-between w-full">
              <span>Violations</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-500/20 text-red-300 font-mono">
                2 Crit
              </span>
            </div>
          )}
        </NavLink>
        <NavLink to="/corrective-actions" className={navItemClasses} title="Corrective Actions">
          <CheckSquare className="w-4 h-4 shrink-0 text-amber-400" />
          {!collapsed && <span>Corrective Actions</span>}
        </NavLink>

        {/* COMPLIANCE & INTELLIGENCE */}
        {!collapsed ? (
          <div className={navSectionClasses}>Compliance &amp; Intel</div>
        ) : (
          <div className="h-2" />
        )}
        <NavLink to="/compliance" className={navItemClasses} title="Compliance">
          <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
          {!collapsed && <span>Compliance</span>}
        </NavLink>
        <NavLink to="/regulations" className={navItemClasses} title="Regulations">
          <BookOpen className="w-4 h-4 shrink-0 text-blue-400" />
          {!collapsed && <span>Regulations (CMR 2017)</span>}
        </NavLink>
        <NavLink to="/risk" className={navItemClasses} title="Risk & Recurrence">
          <AlertTriangle className="w-4 h-4 shrink-0 text-yellow-400" />
          {!collapsed && <span>Risk &amp; Recurrence</span>}
        </NavLink>
        <NavLink to="/analytics" className={navItemClasses} title="Analytics">
          <BarChart3 className="w-4 h-4 shrink-0 text-purple-400" />
          {!collapsed && <span>Analytics</span>}
        </NavLink>

        {/* WORKFORCE */}
        {!collapsed ? (
          <div className={navSectionClasses}>Workforce (Mock)</div>
        ) : (
          <div className="h-2" />
        )}
        <NavLink to="/workforce" className={navItemClasses} title="Workforce">
          <Users className="w-4 h-4 shrink-0 text-zinc-400" />
          {!collapsed && <span>Workforce</span>}
        </NavLink>
        <NavLink to="/attendance" className={navItemClasses} title="Attendance">
          <CalendarCheck className="w-4 h-4 shrink-0 text-zinc-400" />
          {!collapsed && <span>Attendance</span>}
        </NavLink>
        <NavLink to="/grievances" className={navItemClasses} title="Grievances">
          <MessageSquareWarning className="w-4 h-4 shrink-0 text-zinc-400" />
          {!collapsed && <span>Grievances</span>}
        </NavLink>
        <NavLink to="/welfare" className={navItemClasses} title="Welfare">
          <HeartHandshake className="w-4 h-4 shrink-0 text-zinc-400" />
          {!collapsed && <span>Welfare</span>}
        </NavLink>

        {/* ADMINISTRATION */}
        {!collapsed ? (
          <div className={navSectionClasses}>Administration</div>
        ) : (
          <div className="h-2" />
        )}
        <NavLink to="/users" className={navItemClasses} title="Users">
          <UserCog className="w-4 h-4 shrink-0 text-zinc-400" />
          {!collapsed && <span>Users</span>}
        </NavLink>
        <NavLink to="/audit-logs" className={navItemClasses} title="Audit Logs">
          <FileClock className="w-4 h-4 shrink-0 text-zinc-400" />
          {!collapsed && <span>Audit Logs</span>}
        </NavLink>
        <NavLink to="/settings" className={navItemClasses} title="Settings">
          <Settings className="w-4 h-4 shrink-0 text-zinc-400" />
          {!collapsed && <span>Settings</span>}
        </NavLink>
      </div>

      {/* Bottom User Profile & Logout */}
      <div className="p-3 border-t border-white/[0.08] bg-[#0a0d10] shrink-0">
        {!collapsed ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
                SC
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">Er. R. S. Varma</p>
                <p className="text-[10px] text-zinc-400 truncate">Chief Safety Controller</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors"
              title="Logout session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="w-full flex justify-center p-2 text-zinc-400 hover:text-rose-400 rounded transition-colors"
            title="Logout session"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </aside>
  );
};
