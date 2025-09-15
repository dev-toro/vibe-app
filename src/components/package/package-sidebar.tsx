import type { AssetType } from '../../services/packageService';
import { PackageSidebarL0 } from './package-sidebar-L0';
import { PackageSidebarL1 } from './package-sidebar-L1';
import { getPackageById } from '../../services/packageService';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import * as React from 'react';
import type { Asset } from '../../services/packageService';
export type SelectedAssetContextType = {
  selectedAsset: Asset | null;
  setSelectedAsset: (asset: Asset | null) => void;
};
export const SelectedAssetContext = React.createContext<SelectedAssetContextType>({
  selectedAsset: null,
  setSelectedAsset: () => {},
});
export const ActiveTabContext = React.createContext<{
  activeTab: string;
  setActiveTab: (tab: string) => void;
}>({
  activeTab: 'browse',
  setActiveTab: () => {},
});
import type { TreeNode } from '../TreeRenderer';
import { Folder, Layout, Waypoints, Play, DatabaseZap } from 'lucide-react';


export type L1Group = {
  key: string;
  icon: React.ReactNode;
  label: string;
  assetTypes?: AssetType[];
};
export const L1_GROUPS: L1Group[] = [
  { key: 'browse', icon: <Folder className="w-7 h-7" />, label: 'Browse' },
  { key: 'analysis', icon: <Layout className="w-7 h-7" />, label: 'Analysis', assetTypes: ['Views', 'Reports', 'Variables'] },
  { key: 'ontology', icon: <Waypoints className="w-7 h-7" />, label: 'Ontology', assetTypes: ['Objects', 'Events', 'Transformations', 'Knowledge'] },
  { key: 'automation', icon: <Play className="w-7 h-7" />, label: 'Automation', assetTypes: ['Action Flow', 'Tasks'] },
  { key: 'data', icon: <DatabaseZap className="w-7 h-7" />, label: 'Data', assetTypes: ['Data Connection'] },
];

export default function PackageSidebar() {
  const location = useLocation();
  const { selectedAsset, setSelectedAsset } = useContext(SelectedAssetContext);
  const match = location.pathname.match(/^\/package\/(.+)$/);
  if (!match) return null;
  const packageId = match[1];
  const pkg = getPackageById(packageId);
  const [expanded, setExpanded] = React.useState<{ [id: string]: boolean }>({});
  const [search, setSearch] = React.useState('');
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);

  // Reset selectedAsset only when leaving 'browse' tab
  React.useEffect(() => {
    if (activeTab !== 'browse' && selectedAsset) {
      setSelectedAsset(null);
    }
  }, [activeTab]);

  // Helper: flatten all assets of a given type from folders and subfolders
  function flattenAssetsByType(pkg: any, type: AssetType): any[] {
    let result: any[] = [];
    function walkFolders(folders: any[]) {
      for (const folder of folders) {
        if (folder.assets) {
          result = result.concat(folder.assets.filter((a: any) => a.type === type));
        }
        if (folder.folders) {
          walkFolders(folder.folders);
        }
      }
    }
    if (pkg?.folders) walkFolders(pkg.folders);
    if (pkg?.assets) result = result.concat(pkg.assets.filter((a: any) => a.type === type));
    return result;
  }

  // Only build tree and renderTree for browse tab
  let tree: TreeNode[] = [];
  function buildTreeFromFolders(folders: any[]): TreeNode[] {
    return folders.map((folder: any) => {
      let children: TreeNode[] = [];
      if (folder.folders && folder.folders.length > 0) {
        children = children.concat(buildTreeFromFolders(folder.folders));
      }
      if (folder.assets && folder.assets.length > 0) {
        children = children.concat(folder.assets.map((asset: any) => ({
          id: asset.id,
          name: asset.name,
          type: 'asset',
          asset,
        })));
      }
      return {
        id: folder.id,
        name: folder.name,
        type: 'folder',
        children,
      };
    });
  }
  // ...existing code...
  if (activeTab === 'browse' && pkg) {
    if (pkg?.folders && pkg.folders.length > 0) {
      tree.push(...buildTreeFromFolders(pkg.folders));
    }
    if (pkg?.assets && pkg.assets.length > 0) {
      pkg.assets.forEach((asset: any) => {
        tree.push({
          id: asset.id,
          name: asset.name,
          type: 'asset',
          asset,
        });
      });
    }
  }

  // TreeRenderer now handles the tree rendering

  return (
    <div className="h-screen flex flex-row">
      <PackageSidebarL0
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pkg={pkg}
        flattenAssetsByType={flattenAssetsByType}
      />
      <PackageSidebarL1
        activeTab={activeTab}
        search={search}
        setSearch={setSearch}
        expanded={expanded}
        setExpanded={setExpanded}
        selectedAsset={selectedAsset}
        setSelectedAsset={setSelectedAsset}
        pkg={pkg}
        flattenAssetsByType={flattenAssetsByType}
      />
    </div>
  );
}
