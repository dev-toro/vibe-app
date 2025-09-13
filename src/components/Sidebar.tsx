

import * as React from 'react';
import { Button } from './ui/button';
import { Home, Search, Clock, Folder, Layout, Gift, HelpCircle, Bell, Settings, User, Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPackages, getPackageById } from '../services/packageService';
import { useLocation, useParams } from 'react-router-dom';

function SidebarItem({ icon, label, small, to }: { icon: React.ReactNode; label: string; small?: boolean; to?: string }) {
  const content = (
    <span className="flex items-center gap-3">
      <span className="text-blue-900">{icon}</span>
      <span>{label}</span>
    </span>
  );
  if (to) {
    return (
      <Link
        to={to}
        className={`w-full flex items-center gap-3 px-3 ${small ? 'py-1 text-[15px]' : 'py-2 text-base'} rounded-lg text-blue-900 hover:bg-[#e9eaf0] font-normal transition-colors`}
      >
        {icon}
        <span>{label}</span>
      </Link>
    );
  }
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start gap-3 px-3 ${small ? 'py-1 text-[15px]' : 'py-2 text-base'} rounded-lg text-blue-900 hover:bg-[#e9eaf0] font-normal transition-colors`}
    >
      <span className="text-blue-900">{icon}</span>
      <span>{label}</span>
    </Button>
  );
}

export default function Sidebar() {
  const location = useLocation();
  // Match /package/:id
  const match = location.pathname.match(/^\/package\/(.+)$/);
  let content;
  if (match) {
    const packageId = match[1];
    const pkg = getPackageById(packageId);
    content = (
      <>
        <div className="mb-2 mt-4 px-2 text-[11px] font-bold text-gray-500 tracking-widest">ASSETS</div>
        <div className="flex flex-col gap-1 mb-6">
          {pkg?.assets && pkg.assets.length > 0 ? (
            pkg.assets.map(asset => (
              <SidebarItem
                key={asset.id}
                icon={<Box className="w-4 h-4 text-blue-500" />}
                label={asset.name}
                small
                // Optionally, add navigation to asset detail if needed
              />
            ))
          ) : (
            <div className="text-xs text-gray-400 px-3">No assets</div>
          )}
        </div>
      </>
    );
  } else {
    content = (
      <>
        {/* Main nav */}
        <nav className="flex flex-col gap-1 mb-6">
          <SidebarItem icon={<Search className="w-5 h-5" />} label="Search" />
          <SidebarItem icon={<Home className="w-5 h-5" />} label="Home" />
          <SidebarItem icon={<Clock className="w-5 h-5" />} label="Recent" />
          <SidebarItem icon={<Folder className="w-5 h-5" />} label="Projects" />
        </nav>
        <div className="mb-2 mt-4 px-2 text-[11px] font-bold text-gray-500 tracking-widest">FAVORITES</div>
        <div className="flex flex-col gap-1 mb-6">
          {getPackages().filter(pkg => pkg.favorited).map(pkg => (
            <SidebarItem
              key={pkg.id}
              icon={<Box className="w-5 h-5 text-blue-500" />}
              label={pkg.name}
              small
              to={`/package/${pkg.id}`}
            />
          ))}
        </div>
        <div className="mt-auto">
          <nav className="flex flex-col gap-1">
            <SidebarItem icon={<Gift className="w-5 h-5" />} label="Marketplace" />
            <SidebarItem icon={<HelpCircle className="w-5 h-5" />} label="Help" />
            <SidebarItem icon={<Bell className="w-5 h-5" />} label="Notifications" />
            <SidebarItem icon={<Settings className="w-5 h-5" />} label="Settings" />
            <SidebarItem icon={<User className="w-5 h-5" />} label="Profile" />
          </nav>
        </div>
      </>
    );
  }
  return (
    <aside className="h-screen w-60 bg-[#f4f5f7] flex flex-col py-6 px-3 shadow-sm">
      {content}
    </aside>
  );
}
