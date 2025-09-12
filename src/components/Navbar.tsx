
import { Button } from './ui/button';
import Breadcrumb from './Breadcrumb';
import { Input } from './ui/input';
import * as React from 'react';
import { SearchContext } from '../App';

export default function Navbar() {
  const { search, setSearch } = React.useContext(SearchContext);
  return (
    <header className="w-full bg-transparent sticky top-0 z-10">
      <nav className="max-w-7xl mx-auto px-4 flex items-center h-[72px] gap-4">
        {/* Left: Breadcrumb in card */}
        <div className="flex items-center">
          <div className="bg-white border rounded-xl shadow-md h-12 flex items-center px-6">
            <Breadcrumb />
          </div>
        </div>
        {/* Center: Search in card */}
        <div className="flex-1 flex justify-end">
          <div className="bg-white border rounded-md shadow-sm flex items-center h-12 px-3 w-72">
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border-0 shadow-none focus:ring-0 focus:outline-none px-0 bg-transparent h-10"
            />
          </div>
          {/* Right: Create button in card */}
          <div className="ml-3">
            <div className="bg-white border rounded-md shadow-sm h-12 flex items-center">
              <Button variant="ghost" className="h-10 px-5 text-base font-semibold">
                <span className="mr-2 text-lg">＋</span> Create package
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
