import * as React from 'react';
import { getPackages } from '../services/packageService';
import PackageTable from '../components/PackageTable';
import fuzzysort from 'fuzzysort';
import { useContext, createContext, useState } from 'react';
import { SearchContext } from '../App';
import AppNavbar from '../components/Navbar';
import ListingSidebar from '../components/ListingSidebar';
import type { SortingState } from '@tanstack/react-table';


// ...existing code...




// Minimal context for selectedAsset in Listing
const SelectedAssetContext = createContext({
  selectedAsset: null,
  setSelectedAsset: (_: any) => {},
});

export default function Listing() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { search } = useContext(SearchContext);
  const [packages, setPackages] = useState(() => getPackages());
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const allPackages = packages;
  const filteredPackages = React.useMemo(() => {
    if (!search.trim()) return allPackages;
    const results = fuzzysort.go(search, allPackages, { key: 'name' });
    return results.map(r => r.obj);
  }, [allPackages, search]);

  const onToggleFavorite = (id: string) => {
    setPackages(pkgs => pkgs.map(pkg => pkg.id === id ? { ...pkg, favorited: !pkg.favorited } : pkg));
  };

  return (
    <SelectedAssetContext.Provider value={{ selectedAsset, setSelectedAsset }}>
      <div className="flex flex-col h-screen">
        <AppNavbar />
        <div className="w-full flex flex-1">
          <ListingSidebar />
          <div className="flex-1 p-6 overflow-auto">
            <div className="flex flex-col gap-4 w-full">
              {/* Table controls row (filters, sort, etc.) can go here if needed */}
              <PackageTable
                packages={filteredPackages}
                sorting={sorting}
                setSorting={setSorting}
                onToggleFavorite={onToggleFavorite}
              />
            </div>
          </div>
        </div>
      </div>
    </SelectedAssetContext.Provider>
  );
}
