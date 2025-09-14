

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import * as React from 'react';
import Listing from './pages/Listing';
import PackageDetail from './pages/Package';

export const SearchContext = React.createContext<{
  search: string;
  setSearch: (v: string) => void;
}>({ search: '', setSearch: () => {} });


function App() {
  const [search, setSearch] = React.useState('');
  return (
    <BrowserRouter>
      <SearchContext.Provider value={{ search, setSearch }}>
        <div className="h-screen w-screen flex flex-col bg-[#f8f9fb] overflow-hidden">
          <div className="flex flex-1 min-h-0 min-w-0 overflow-hidden">
            <div className="flex-1 flex min-h-0 min-w-0 justify-center overflow-hidden h-full">
              <main className="flex-1 w-max mx-auto overflow-hidden">
                <Routes>
                  <Route path="/listing" element={<Listing />} />
                  <Route path="/package/:id" element={<PackageDetail />} />
                  <Route path="*" element={<Navigate to="/listing" replace />} />
                </Routes>
              </main>
            </div>
          </div>
        </div>
      </SearchContext.Provider>
    </BrowserRouter>
  );
}

export default App;