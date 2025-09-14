
import { Button } from './ui/button';
import Breadcrumb from './Breadcrumb';
import { Input } from './ui/input';
import * as React from 'react';
import { SearchContext } from '../App';
import { SearchIcon } from 'lucide-react';

export default function AppNavbar() {
  const { search, setSearch } = React.useContext(SearchContext);
  return (
    <header className="top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 [&_*]:no-underline">
      <nav className="container mx-auto relative flex h-16 max-w-screen-2xl items-center gap-2">
        {/* Left: Breadcrumb */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Breadcrumb />
        </div>
        {/* Center: Search (absolutely centered) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none">
          <div className="relative w-full max-w-xs pointer-events-auto">
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="peer h-8 w-full ps-8 pe-2"
            />
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
              <SearchIcon size={16} />
            </div>
          </div>
        </div>
        {/* Right: Button */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <Button variant="outline" className="text-sm max-sm:aspect-square max-sm:p-0">
            Create package
          </Button>
        </div>
      </nav>
    </header>
  );
}
