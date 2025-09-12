

import * as React from 'react';
import { Button } from './ui/button';
import { Home, Search, Clock, Folder, Layout, Gift, HelpCircle, Bell, Settings, User, Star } from 'lucide-react';
import { getPackages } from '../services/packageService';

function SidebarItem({ icon, label, small }: { icon: React.ReactNode; label: string; small?: boolean }) {
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
  return (
    <aside className="h-screen w-60 bg-[#f4f5f7] flex flex-col py-6 px-3 shadow-sm">
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
          <SidebarItem key={pkg.id} icon={<Star className="w-5 h-5 text-yellow-400" />} label={pkg.name} small />
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
    </aside>
  );
}
