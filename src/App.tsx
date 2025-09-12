

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Listing from './pages/Listing';
import PackageDetail from './pages/Package';
import Breadcrumb from './components/Breadcrumb';


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-white">
        <header className="w-full shadow-md bg-white/90 backdrop-blur sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 flex flex-col">
            <div className="flex items-center h-16">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white text-2xl font-bold shadow mr-2 select-none">📦</span>
                <span className="text-xl sm:text-2xl font-bold text-blue-700 tracking-tight">Package Explorer</span>
              </div>
              {/* Optionally, add actions or user avatar to the right */}
            </div>
            <div className="mt-1 mb-2">
              <Breadcrumb />
            </div>
          </div>
        </header>
        <div className="w-full max-w-4xl flex-1 px-4 py-8">
          <Routes>
            <Route path="/listing" element={<Listing />} />
            <Route path="/package/:id" element={<PackageDetail />} />
            <Route path="*" element={<Navigate to="/listing" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;