import * as React from 'react';
import { Box, Folder, ChevronDown, ChevronRight, Plus, Search, MoreVertical, ListChecks, LayoutGrid, Plus as PlusIcon, Package2, Lightbulb, Search as SearchIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
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

const L0_ITEMS = [
  { key: 'browse', icon: <Folder className="w-7 h-7" />, label: 'Browse' },
  { key: 'tasks', icon: <ListChecks className="w-7 h-7" />, label: 'Tasks' },
  { key: 'grid', icon: <LayoutGrid className="w-7 h-7" />, label: 'Grid' },
  { key: 'plus', icon: <PlusIcon className="w-7 h-7" />, label: 'Add' },
  { key: 'pkg', icon: <Package2 className="w-7 h-7" />, label: 'Package' },
  { key: 'bulb', icon: <Lightbulb className="w-7 h-7" />, label: 'Ideas' },
  { key: 'search', icon: <SearchIcon className="w-7 h-7" />, label: 'Search' },
];

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
  const [activeTab, setActiveTab] = React.useState('browse');

  const tree = buildTree(pkg);

  function handleToggle(id: string) {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function renderTree(nodes: TreeNode[], depth = 0) {
    return nodes.map(node => {
      if (node.type === 'folder') {
        const isOpen = expanded[node.id] || false;
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
            {isOpen && node.children && node.children.length > 0 && (
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
    <div className="h-screen flex flex-row bg-[#f7f8fa]">
      {/* Vertical L0 Navigation */}
      <nav className="flex flex-col items-center py-2 px-0 gap-0.5 w-12 bg-[#f7f8fa] border-r border-gray-200">
        {L0_ITEMS.map((item, idx) => (
          <Button
            key={item.key}
            variant="ghost"
            size="icon"
            className={`my-1 w-8 h-8 rounded-sm border transition-all flex items-center justify-center ${activeTab === item.key ? 'border-blue-500 bg-white shadow-[0_2px_8px_0_rgba(0,0,0,0.03)] text-blue-700' : 'border-transparent text-blue-900 hover:bg-gray-100'} ${idx === 0 ? 'mt-1' : ''}`}
            onClick={() => setActiveTab(item.key)}
            style={activeTab === item.key ? { boxShadow: '0 0 0 2px #6366f1, 0 2px 8px 0 rgba(0,0,0,0.03)' } : {}}
          >
            {item.icon}
          </Button>
        ))}
        <div className="flex-1" />
      </nav>
      {/* L1 Content */}
      <aside className="flex-1 flex flex-col py-4 px-0 min-w-[320px] max-w-[380px] border-r border-gray-200 bg-white">
        {activeTab === 'browse' && (
          <>
            <div className="flex items-center gap-2 mb-2 px-4">
              <span className="font-semibold text-[16px] text-gray-900">Browse Assets</span>
              <div className="flex-1" />
              <Button variant="ghost" size="icon" className="rounded p-1"><Plus className="w-4 h-4 text-blue-600" /></Button>
              <Button variant="ghost" size="icon" className="rounded p-1"><ChevronDown className="w-4 h-4 text-gray-400" /></Button>
              <Button variant="ghost" size="icon" className="rounded p-1"><MoreVertical className="w-4 h-4 text-gray-400" /></Button>
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
            <div className="flex flex-col gap-1 overflow-y-auto pr-1 px-2" style={{ maxHeight: 'calc(100vh - 210px)' }}>
              {tree.length > 0 ? renderTree(tree) : <div className="text-xs text-gray-400 px-3">No assets</div>}
            </div>
          </>
        )}
        {activeTab === 'tasks' && (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-lg">Tasks Placeholder</div>
        )}
        {activeTab === 'grid' && (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-lg">Grid Placeholder</div>
        )}
        {activeTab === 'plus' && (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-lg">Add Placeholder</div>
        )}
        {activeTab === 'pkg' && (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-lg">Package Placeholder</div>
        )}
        {activeTab === 'bulb' && (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-lg">Ideas Placeholder</div>
        )}
        {activeTab === 'search' && (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-lg">Search Placeholder</div>
        )}
      </aside>
    </div>
  );
}
