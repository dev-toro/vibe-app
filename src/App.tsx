

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Listing from './pages/Listing';
import PackageDetail from './pages/Package';
import Breadcrumb from './components/Breadcrumb';


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col items-center">
        <Breadcrumb />
        <div className="w-full max-w-2xl flex-1">
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