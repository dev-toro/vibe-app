
import { Button } from './ui/button';
import Breadcrumb from './Breadcrumb';
import { Input } from './ui/input';
import * as React from 'react';
import { SearchContext } from '../App';

export default function Navbar() {
  const { search, setSearch } = React.useContext(SearchContext);
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-20">
      <nav className="flex items-center h-[72px] gap-4 px-6">
        {/* Left: Breadcrumb in card */}
        <div className="flex items-center">
          <div className="bg-transparent h-12 flex items-center px-0">
            <Breadcrumb />
          </div>
        </div>
        {/* Center: Search in card */}
        <div className="flex-1 flex justify-end items-center gap-3">
          <div className="bg-[#f4f5f7] border border-gray-200 rounded-md flex items-center h-10 px-3 w-72">
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border-0 shadow-none focus:ring-0 focus:outline-none px-0 bg-transparent h-8 text-blue-900 placeholder:text-gray-400"
            />
          </div>
          <Button variant="ghost" className="h-10 px-5 text-base font-semibold bg-[#f4f5f7] border border-gray-200 rounded-md hover:bg-[#e9eaf0]">
            <span className="mr-2 text-lg">＋</span> Create package
          </Button>
        </div>
      </nav>
    </header>
  );
}
