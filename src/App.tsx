

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import * as React from 'react';
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import AppHeader from './components/app-header';

import Listing from './pages/Listing';
import PackageDetail from './pages/Package';
import Playground from './pages/Playground';
import Libraries from './pages/Libraries';
import Marketplace from './pages/Marketplace';
import Runtimes from './pages/Runtimes';
import Workloads from './pages/Workloads';
import DataIngestion from './pages/DataIngestion';

export const SearchContext = React.createContext<{
  search: string;
  setSearch: (v: string) => void;
}>({ search: '', setSearch: () => {} });


function App() {
  const [search, setSearch] = React.useState('');
  return (
    <BrowserRouter>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* Header area */}
          <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4 bg-[#f8f9fb] transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-0 z-10">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <AppHeader />
          </header>
          {/* Main content area */}
          <div className="flex flex-1 flex-col gap-4 p-0 min-h-0 min-w-0 h-full">
            <SearchContext.Provider value={{ search, setSearch }}>
              <div className="flex flex-1 flex-col bg-[#f8f9fb] min-h-0 min-w-0 h-full overflow-hidden">
                <div className="flex flex-1 min-h-0 min-w-0 h-full">
                  <main className="flex-1 min-h-0 min-w-0 w-full mx-auto h-full overflow-auto">
                    <Routes>
                      <Route path="/projects" element={<Listing />} />
                      <Route path="/package/:id" element={<PackageDetail />} />
                      <Route path="/playground" element={<Playground />} />
                      <Route path="/libraries" element={<Libraries />} />
                      <Route path="/marketplace" element={<Marketplace />} />
                      <Route path="/runtimes" element={<Runtimes />} />
                      <Route path="/workloads" element={<Workloads />} />
                      <Route path="/data-ingestion" element={<DataIngestion />} />
                      <Route path="*" element={<Navigate to="/projects" replace />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </SearchContext.Provider>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App;




