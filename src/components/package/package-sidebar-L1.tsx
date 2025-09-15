import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Plus, Search } from 'lucide-react';
import { TreeSidebar } from '../ui/tree-sidebar';
import type { AssetType } from '../../services/packageService';
import { L1_GROUPS } from './package-sidebar';

export function PackageSidebarL1({
  activeTab,
  search,
  setSearch,
  expanded,
  setExpanded,
  selectedAsset,
  setSelectedAsset,
  pkg,
  flattenAssetsByType,
}: {
  activeTab: string;
  search: string;
  setSearch: (s: string) => void;
  expanded: { [id: string]: boolean };
  setExpanded: (cb: (prev: { [id: string]: boolean }) => { [id: string]: boolean }) => void;
  selectedAsset: any;
  setSelectedAsset: (asset: any) => void;
  pkg: any;
  flattenAssetsByType: (pkg: any, type: AssetType) => any[];
}) {
  // Only build tree and renderTree for browse tab
  let tree: any[] = [];
  function buildTreeFromFolders(folders: any[]): any[] {
    return folders.map((folder: any) => {
      let children: any[] = [];
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

  return (
    <aside className="flex-1 flex flex-col py-1 px-0 min-w-[280px] max-w-[380px] border-r border-gray-200">
      {activeTab === 'browse' ? (
        <>
          <div className="flex items-center gap-2 mb-2 px-4">
            <span className="font-semibold text-[16px] text-gray-900">Browse</span>
            <div className="flex-1" />
            <Button variant="ghost" size="icon" className="rounded p-1"><Plus className="w-4 h-4 text-gray-900" /></Button>
          </div>
          <div className="flex items-center gap-2 px-4">
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
              />
            ) : <div className="text-xs text-gray-400 px-3">No assets</div>}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-2 px-4">
            <span className="font-semibold text-[16px] text-gray-900">{L1_GROUPS.find(t => t.key === activeTab)?.label}</span>
            <div className="flex-1" />
            <Button variant="ghost" size="icon" className="rounded p-1"><Plus className="w-4 h-4 text-gray-900" /></Button>
          </div>
          <div className="flex items-center gap-2 px-4">
            <div className="relative w-full">
              <Input
                className="w-full pl-8 pr-2 text-[15px] h-9 border-gray-200 bg-[#f7f8fa] focus:bg-white"
                placeholder={`Search ${L1_GROUPS.find(t => t.key === activeTab)?.label?.toLowerCase()}`}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="flex flex-col gap-1 overflow-y-auto pr-1 px-2" style={{ maxHeight: 'calc(100vh - 210px)' }}>
            {(() => {
              const group = L1_GROUPS.find(t => t.key === activeTab);
              const assetTypes = group?.assetTypes || [activeTab as AssetType];
              let assets: any[] = [];
              assetTypes.forEach(type => {
                assets = assets.concat(flattenAssetsByType(pkg, type));
              });
              assets = assets.filter((a: any) => a.name.toLowerCase().includes(search.toLowerCase()));
              if (assets.length === 0) return <div className="text-xs text-gray-400 px-3">No assets</div>;
              // Build a tree where each asset type is a folder
              const assetTypeFolders = assetTypes.map(type => ({
                id: `type-folder-${type}`,
                name: type,
                type: 'folder',
                children: assets
                  .filter((a: any) => a.type === type)
                  .map((asset: any) => ({
                    id: asset.id,
                    name: asset.name,
                    type: 'asset',
                    asset,
                  })),
              })).filter(folder => folder.children.length > 0);
              return (
                <TreeSidebar
                  nodes={assetTypeFolders}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  selectedAsset={selectedAsset}
                  setSelectedAsset={setSelectedAsset}
                />
              );
            })()}
          </div>
        </>
      )}
    </aside>
  );
}
