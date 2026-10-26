import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { cn } from '../../utils/cn';

export const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#080a0c] text-zinc-100 flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Persistent Left Sidebar */}
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      {/* Top Utility Bar */}
      <TopBar collapsed={collapsed} />

      {/* Main Content Area */}
      <main
        className={cn(
          'flex-1 pt-16 min-h-screen transition-all duration-300 flex flex-col',
          collapsed ? 'pl-16' : 'pl-64'
        )}
      >
        <div className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
