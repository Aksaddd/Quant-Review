'use client';

import SidebarNav from './SidebarNav';

export default function Sidebar() {
  return (
    <aside
      className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0"
      style={{
        background: 'var(--material-thin-light)',
        backdropFilter: 'var(--material-blur)',
        WebkitBackdropFilter: 'var(--material-blur)',
        borderRight: '0.5px solid rgba(0,0,0,0.06)',
      }}
    >
      <SidebarNav />
    </aside>
  );
}
