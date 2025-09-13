import * as React from 'react';
import { Box, Folder, ChevronDown, ChevronRight, Plus, Search, MoreVertical } from 'lucide-react';
import { getPackageById } from '../services/packageService';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { SelectedAssetContext } from './Sidebar';

type TreeNode = {
  id: string;
  name: string;
  type: 'folder' | 'asset';
  children?: TreeNode[];
  asset?: any;
};

export default function PackageSidebar() {
  const location = useLocation();
  const { selectedAsset, setSelectedAsset } = useContext(SelectedAssetContext);
  const match = location.pathname.match(/^\/package\/(.+)$/);
  if (!match) return null;
  const packageId = match[1];
  const pkg = getPackageById(packageId);
  // Build a tree structure for folders/assets
  // Recursively build a tree structure for folders/assets (supports nested folders)
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

  function buildTree(pkg: any): TreeNode[] {
    const nodes: TreeNode[] = [];
    if (pkg?.folders && pkg.folders.length > 0) {
      nodes.push(...buildTreeFromFolders(pkg.folders));
    }
    if (pkg?.assets && pkg.assets.length > 0) {
      pkg.assets.forEach((asset: any) => {
        nodes.push({
          id: asset.id,
          name: asset.name,
          type: 'asset',
          asset,
        });
      });
    }
    return nodes;
  }

  // State for expanded folders
  const [expanded, setExpanded] = React.useState<{ [id: string]: boolean }>({});
  const [search, setSearch] = React.useState('');

  const tree = buildTree(pkg);

  function handleToggle(id: string) {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function renderTree(nodes: TreeNode[], depth = 0) {
    return nodes.map(node => {
      if (node.type === 'folder') {
        const isOpen = expanded[node.id] || depth === 0;
        return (
          <div key={node.id} className="ml-2">
            <button
              className="flex items-center gap-1 px-1 py-0.5 rounded hover:bg-gray-200 w-full"
              onClick={() => handleToggle(node.id)}
              type="button"
            >
              {isOpen ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
              <Folder className="w-4 h-4 text-blue-700 mr-1" />
              <span className="text-[15px] text-gray-800 font-medium">{node.name}</span>
            </button>
            {isOpen && node.children && (
              <div className="ml-4 border-l border-gray-200 pl-2">
                {renderTree(node.children, depth + 1)}
              </div>
            )}
          </div>
        );
      }
      return (
        <button
          key={node.id}
          className={`group flex items-center gap-2 px-2 py-1 rounded-lg w-full text-[15px] text-blue-900 hover:bg-[#e9eaf0] font-normal transition-colors ${selectedAsset?.id === node.id ? 'bg-blue-100' : ''}`}
          onClick={() => setSelectedAsset(node.asset)}
        >
          <Box className="w-4 h-4 text-blue-500" />
          <span>{node.name}</span>
          <MoreVertical className="w-4 h-4 ml-auto text-gray-300 group-hover:text-gray-400" />
        </button>
      );
    });
  }

  return (
    <aside className="h-screen w-64 bg-[#f4f5f7] flex flex-col py-4 px-3 shadow-sm border-r border-gray-200">
      <div className="flex items-center gap-2 mb-2 px-1">
        <span className="font-semibold text-[15px] text-gray-900">Browse Assets</span>
        <button className="ml-auto p-1 rounded hover:bg-gray-200"><Plus className="w-4 h-4 text-blue-600" /></button>
        <button className="p-1 rounded hover:bg-gray-200"><ChevronDown className="w-4 h-4 text-gray-400" /></button>
        <button className="p-1 rounded hover:bg-gray-200"><MoreVertical className="w-4 h-4 text-gray-400" /></button>
      </div>
      <div className="flex items-center gap-2 mb-3 px-1">
        <div className="relative w-full">
          <input
            className="w-full rounded border border-gray-200 bg-white py-1.5 pl-8 pr-2 text-[14px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
        </div>
        <button className="p-1 rounded hover:bg-gray-200"><ChevronDown className="w-4 h-4 text-gray-400" /></button>
      </div>
      <button className="flex items-center gap-2 px-2 py-1 mb-2 rounded-lg text-[15px] text-blue-700 hover:bg-blue-50 font-medium">
        <Plus className="w-4 h-4" /> New Asset
      </button>
      <div className="text-xs font-semibold text-gray-500 px-2 mb-1 mt-2">Asset Name</div>
      <div className="flex flex-col gap-1 overflow-y-auto pr-1" style={{ maxHeight: 'calc(100vh - 210px)' }}>
        {tree.length > 0 ? renderTree(tree) : <div className="text-xs text-gray-400 px-3">No assets</div>}
      </div>
    </aside>
  );
}
