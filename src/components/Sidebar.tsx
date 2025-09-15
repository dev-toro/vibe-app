

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
import PackageSidebar from './package-sidebar';
// Context for activeTab in PackageSidebar
export const ActiveTabContext = React.createContext<{
  activeTab: string;
  setActiveTab: (tab: string) => void;
}>({
  activeTab: 'browse',
  setActiveTab: () => {},
});
import { useLocation } from 'react-router-dom';


// This component is now removed. Use PackageSidebar in Package and ListingSidebar in Listing.
