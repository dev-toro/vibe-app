// import * as React from 'react';
import { Box, Folder, Plus, Search, MoreVertical, Layout, Server, Settings, Play, SeparatorHorizontal } from 'lucide-react';
import type { AssetType } from '../services/packageService';
// Map asset type to icon component
const assetTypeIcon: Record<AssetType, import('lucide-react').LucideIcon> = {
  view: Layout,
  api: Server,
  config: Settings,
  job: Play,
};
import { Button } from './ui/button';
import { Input } from './ui/input';
import { getPackageById } from '../services/packageService';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
// Contexts moved from Sidebar.tsx
import * as React from 'react';
import type { Asset } from '../services/packageService';
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
import type { TreeNode } from './TreeRenderer';
import { TreeSidebar } from './tree-sidebar';
import { Separator } from '@radix-ui/react-dropdown-menu';



const ASSET_TYPES: { key: string; icon: React.ReactNode; label: string }[] = [
  { key: 'browse', icon: <Folder className="w-7 h-7" />, label: 'Browse' },
  { key: 'view', icon: <Layout className="w-7 h-7" />, label: 'Analysis' },
  { key: 'api', icon: <Server className="w-7 h-7" />, label: 'APIs' },
  { key: 'config', icon: <Settings className="w-7 h-7" />, label: 'Configs' },
  { key: 'job', icon: <Play className="w-7 h-7" />, label: 'Jobs' },
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
      {/* Vertical L0 Navigation: one per asset type */}
      <nav className="flex flex-col items-center py-2 px-0 gap-0.5 w-12 border-r border-gray-200 h-full">
        {/* Browse always on top */}
        <Button
          key="browse"
          variant="ghost"
          size="icon"
          className={`my-1 w-8 h-8 rounded-sm border transition-all flex items-center justify-center ${activeTab === 'browse' ? 'border-black text-black shadow-[0_2px_8px_0_rgba(0,0,0,0.03)] ' : 'border-transparent text-gray-700 hover:bg-gray-100 hover:text-black'} mt-1`}
          onClick={() => setActiveTab('browse')}
          style={activeTab === 'browse' ? { boxShadow: '0 0 0 2px #222, 0 2px 8px 0 rgba(0,0,0,0.03)' } : {}}
        >
          <Folder className="w-7 h-7" />
          <span className="sr-only">Browse</span>
        </Button>
        {/* Render a button for each asset type except 'browse' */}
        {ASSET_TYPES.filter(t => t.key !== 'browse').map((item) => {
        // Check if there are assets of this type
        const hasAssets = flattenAssetsByType(pkg, item.key as AssetType).length > 0;
        return (
            <Button
            key={item.key}
            variant="ghost"
            size="icon"
            className={`my-1 w-8 h-8 rounded-sm border transition-all flex items-center justify-center ${activeTab === item.key ? 'border-black text-black shadow-[0_2px_8px_0_rgba(0,0,0,0.03)]' : 'border-transparent text-gray-700 hover:bg-gray-100 hover:text-black'} ${!hasAssets ? 'opacity-40 pointer-events-none' : ''}`}
            onClick={() => setActiveTab(item.key)}
            style={activeTab === item.key ? { boxShadow: '0 0 0 2px #222, 0 2px 8px 0 rgba(0,0,0,0.03)' } : {}}
            disabled={!hasAssets}
            >
            {item.icon}
            <span className="sr-only">{item.label}</span>
            </Button>
        );
        })}
      </nav>
      {/* L1 Content: flat list of assets by type */}
      <aside className="flex-1 flex flex-col py-4 px-0 min-w-[280px] max-w-[380px] border-r border-gray-200">
        {activeTab === 'browse' ? (
          <>
            <div className="flex items-center gap-2 mb-2 px-4">
              <span className="font-semibold text-[16px] text-gray-900">Browse</span>
              <div className="flex-1" />
              <Button variant="ghost" size="icon" className="rounded p-1"><Plus className="w-4 h-4 text-gray-900" /></Button>
            </div>
            <div className="flex items-center gap-2 mb-3 px-4">
              <div className="relative w-full">
                <Input
                  className="w-full pl-8 pr-2 text-[15px] h-9 border-gray-200 bg-[#f7f8fa] focus:bg-white"
                  placeholder="Search"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div className="flex flex-col gap-1 overflow-y-auto overflow-x-scroll-auto pr-1 px-2" style={{ maxHeight: 'calc(100vh - 210px)' }}>
              {tree.length > 0 ? (
                <TreeSidebar
                  nodes={tree}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  selectedAsset={selectedAsset}
                  setSelectedAsset={setSelectedAsset}
                  assetTypeIcon={assetTypeIcon}
                  activeTab={activeTab}
                />
              ) : <div className="text-xs text-gray-400 px-3">No assets</div>}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-2 px-4">
              <span className="font-semibold text-[16px] text-gray-900">{ASSET_TYPES.find(t => t.key === activeTab)?.label}</span>
              <div className="flex-1" />
              <Button variant="ghost" size="icon" className="rounded p-1"><Plus className="w-4 h-4 text-gray-900" /></Button>
            </div>
            <div className="flex items-center gap-2 mb-3 px-4">
              <div className="relative w-full">
                <Input
                  className="w-full pl-8 pr-2 text-[15px] h-9 border-gray-200 bg-[#f7f8fa] focus:bg-white"
                  placeholder={`Search ${ASSET_TYPES.find(t => t.key === activeTab)?.label?.toLowerCase()}`}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div className="flex flex-col gap-1 overflow-y-auto pr-1 px-2" style={{ maxHeight: 'calc(100vh - 210px)' }}>
              {(() => {
                const assets = flattenAssetsByType(pkg, activeTab as AssetType).filter((a: any) =>
                  a.name.toLowerCase().includes(search.toLowerCase())
                );
                if (assets.length === 0) return <div className="text-xs text-gray-400 px-3">No assets</div>;
                return assets.map((asset: any) => {
                  const Icon = assetTypeIcon[asset.type as AssetType] || Box;
                  const handleAssetClick = (asset: any) => {
                    if (asset && typeof asset.id === 'string' && typeof asset.name === 'string' && typeof asset.yaml === 'string') {
                      setSelectedAsset(asset);
                    }
                  };
                  return (
                    <button
                      key={asset.id}
                      className={`group flex items-center gap-2 px-2 py-1 rounded-lg w-full text-[15px] hover:bg-gray-100 font-normal transition-colors ${selectedAsset?.id === asset.id ? 'bg-gray-200 text-black' : 'text-gray-800'}`}
                      onClick={() => handleAssetClick(asset)}
                    >
                      <Icon className={`w-4 h-4 ${selectedAsset?.id === asset.id ? 'text-black' : 'text-gray-700 group-hover:text-black'}`} />
                      <span>{asset.name}</span>
                      <MoreVertical className="w-4 h-4 ml-auto text-gray-400 group-hover:text-black" />
                    </button>
                  );
                });
              })()}
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
