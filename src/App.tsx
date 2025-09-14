

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
          <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4 bg-[#f8f9fb] transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <AppHeader />
          </header>
          {/* Main content area */}
          <div className="flex flex-1 flex-col gap-4 p-0 min-h-0 min-w-0">
            <SearchContext.Provider value={{ search, setSearch }}>
              <div className="flex flex-1 flex-col bg-[#f8f9fb] min-h-0 min-w-0 overflow-hidden">
                <div className="flex flex-1 min-h-0 min-w-0 overflow-hidden">
                  <main className="flex-1 min-h-0 min-w-0 w-full mx-auto overflow-auto">
                    <Routes>
                      <Route path="/listing" element={<Listing />} />
                      <Route path="/package/:id" element={<PackageDetail />} />
                      <Route path="*" element={<Navigate to="/listing" replace />} />
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




