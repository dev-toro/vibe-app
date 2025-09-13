

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Listing from './pages/Listing';
import PackageDetail from './pages/Package';
import Navbar from './components/Navbar';
import Sidebar, { SelectedAssetContext } from './components/Sidebar';
import type { Asset } from './components/Sidebar';
import * as React from 'react';



export const SearchContext = React.createContext<{
  search: string;
  setSearch: (v: string) => void;
}>({ search: '', setSearch: () => {} });


function App() {
  const [search, setSearch] = React.useState('');
  const [selectedAsset, setSelectedAsset] = React.useState<Asset | null>(null);
  return (
    <BrowserRouter>
      <SearchContext.Provider value={{ search, setSearch }}>
        <SelectedAssetContext.Provider value={{ selectedAsset, setSelectedAsset }}>
          <div className="min-h-screen flex flex-col bg-[#f8f9fb]">
            <Navbar />
            <div className="flex flex-1 min-h-0">
              {/* Sidebar */}
              <Sidebar />
              {/* Main content area */}
              <div className="flex-1 flex min-h-0 justify-center">
                <main className="flex-1 w-max mx-auto overflow-auto">
                  <Routes>
                    <Route path="/listing" element={<Listing />} />
                    <Route path="/package/:id" element={<PackageDetail />} />
                    <Route path="*" element={<Navigate to="/listing" replace />} />
                  </Routes>
                </main>
              </div>
            </div>
          </div>
        </SelectedAssetContext.Provider>
      </SearchContext.Provider>
    </BrowserRouter>
  );
}

export default App;