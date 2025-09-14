

import * as React from 'react';
// Asset type for context
export type Asset = {
  id: string;
  name: string;
  yaml: string;
};
export type SelectedAssetContextType = {
  selectedAsset: Asset | null;
  setSelectedAsset: (asset: Asset | null) => void;
};
export const SelectedAssetContext = React.createContext<SelectedAssetContextType>({
  selectedAsset: null,
  setSelectedAsset: () => {},
});
import ListingSidebar from './ListingSidebar';
import PackageSidebar from './PackageSidebar';
// Context for activeTab in PackageSidebar
export const ActiveTabContext = React.createContext<{
  activeTab: string;
  setActiveTab: (tab: string) => void;
}>({
  activeTab: 'browse',
  setActiveTab: () => {},
});
import { useLocation } from 'react-router-dom';


export default function Sidebar() {
  const location = useLocation();
  const match = location.pathname.match(/^\/package\/(.+)$/);
  if (match) {
    // Provide ActiveTabContext for PackageSidebar
    const [activeTab, setActiveTab] = React.useState('browse');
    return (
      <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
        <PackageSidebar />
      </ActiveTabContext.Provider>
    );
  } else {
    return <ListingSidebar />;
  }
}
