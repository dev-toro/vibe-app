
import { Button } from './ui/button';
import Breadcrumb from './Breadcrumb';
import { Input } from './ui/input';
import * as React from 'react';
import { SearchContext } from '../App';
import { SearchIcon } from 'lucide-react';

export default function Navbar() {
  const { search, setSearch } = React.useContext(SearchContext);
  return (
    <header className="top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 [&_*]:no-underline">
      <nav className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-2">
        {/* Left: Breadcrumb in card */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
           <Breadcrumb />
        </div>
        {/* Center: Search in card */}
        <div className="flex-1 flex justify-end items-center gap-3">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="peer h-8 w-full max-w-xs ps-8 pe-2"
            />
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
              <SearchIcon size={16} />
            </div>
          </div>
          <Button variant="ghost" className="h-10 px-5 text-base font-semibold bg-[#f4f5f7] border border-gray-200 rounded-md hover:bg-[#e9eaf0]">
            <span className="mr-2 text-lg">＋</span> Create package
          </Button>
        </div>
      </nav>
    </header>
  );
}
