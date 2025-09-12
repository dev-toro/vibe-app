import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import Breadcrumb from './Breadcrumb';
import { PackageSearch } from './PackageSearch';
import * as React from 'react';
import { SearchContext } from '../App';

export default function Navbar() {
  const { search, setSearch } = React.useContext(SearchContext);
  return (
    <header className="w-full shadow-md bg-white/90 backdrop-blur sticky top-0 z-10">
      <nav className="max-w-6xl mx-auto px-4 flex items-center h-20 gap-4">
        {/* Left: Logo and App Name */}
        <div className="flex items-center gap-3 min-w-[180px]">
          <Button variant="ghost" size="icon" className="rounded-full bg-blue-600 text-white hover:bg-blue-700">
            <span className="text-2xl">📦</span>
          </Button>
          <span className="text-xl sm:text-2xl font-bold text-blue-700 tracking-tight">Workbench</span>
        </div>
        {/* Center: Breadcrumbs and Search */}
        <div className="flex-1 flex flex-col items-center">
          <Breadcrumb />
          <div className="w-full max-w-md mt-1">
            <PackageSearch value={search} onChange={setSearch} />
          </div>
        </div>
        {/* Right: Avatar */}
        <div className="min-w-[180px] flex justify-end">
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </nav>
    </header>
  );
}
