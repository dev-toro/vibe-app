import * as React from 'react';
import { Button } from './ui/button';
import { Home, Search, Clock, Folder, Gift, HelpCircle, Bell, Settings, User, Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPackages } from '../services/packageService';

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  small?: boolean;
  to?: string;
  onClick?: () => void;
  className?: string;
};

function SidebarItem({ icon, label, small, to, onClick, className }: SidebarItemProps) {
  if (to) {
    return (
      <Link
        to={to}
        className={`w-full flex items-center gap-3 px-3 ${small ? 'py-1 text-[15px]' : 'py-2 text-base'} rounded-lg text-blue-900 hover:bg-[#e9eaf0] font-normal transition-colors ${className || ''}`}
        onClick={onClick}
      >
        {icon}
        <span>{label}</span>
      </Link>
    );
  }
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start gap-3 px-3 ${small ? 'py-1 text-[15px]' : 'py-2 text-base'} rounded-lg text-blue-900 hover:bg-[#e9eaf0] font-normal transition-colors ${className || ''}`}
      onClick={onClick}
    >
      <span className="text-blue-900">{icon}</span>
      <span>{label}</span>
    </Button>
  );
}

export default function ListingSidebar() {
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
    </aside>
  );
}
