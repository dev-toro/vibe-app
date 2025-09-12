

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Listing from './pages/Listing';
import PackageDetail from './pages/Package';
import Navbar from './components/Navbar';
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
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-white">
          <Navbar />
          <div className="w-full max-w-6xl flex-1 px-4 py-8">
            <Routes>
              <Route path="/listing" element={<Listing />} />
              <Route path="/package/:id" element={<PackageDetail />} />
              <Route path="*" element={<Navigate to="/listing" replace />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </BrowserRouter>
  );
}

export default App;