

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Listing from './pages/Listing';
import PackageDetail from './pages/Package';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import * as React from 'react';



export const SearchContext = React.createContext<{
  search: string;
  setSearch: (v: string) => void;
}>({ search: '', setSearch: () => {} });

function App() {
  const [search, setSearch] = React.useState('');
  return (
    <BrowserRouter>
      <SearchContext.Provider value={{ search, setSearch }}>
        <div className="min-h-screen flex flex-col bg-[#f8f9fb]">
          <Navbar />
          <div className="flex flex-1 min-h-0">
            {/* Sidebar */}
            <Sidebar />
            {/* Main content area */}
            <div className="flex-1 flex min-h-0">
              <main className="flex-1 bg-white border-x border-gray-200 p-6 overflow-auto">
                <Routes>
                  <Route path="/listing" element={<Listing />} />
                  <Route path="/package/:id" element={<PackageDetail />} />
                  <Route path="*" element={<Navigate to="/listing" replace />} />
                </Routes>
              </main>
              {/* Details panel placeholder */}
              <aside className="w-[340px] bg-white border-l border-gray-200 p-6 hidden lg:block">
                <div className="text-gray-400 text-center mt-10">Details</div>
              </aside>
            </div>
          </div>
        </div>
      </SearchContext.Provider>
    </BrowserRouter>
  );
}

export default App;